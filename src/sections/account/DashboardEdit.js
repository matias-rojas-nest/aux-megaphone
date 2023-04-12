import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { HomeContext } from '../../context/HomeContext'
import { createOrEditDashboardQuery } from '../../config/axios'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material'
import Swal from 'sweetalert2'



const DashboardEdits = () => {
  let navigate = useNavigate()
  const [auth, setAuth] = useContext(HomeContext)
  const [ setErrors] = useState([])

  const [dashboard, setDashboard] = useState({
    name: '',
    link: '',
    requiredRole: '',
  })

  useEffect(() => {

    if (!auth.token || !localStorage.getItem('role') || localStorage.getItem('role') === 'supervisor') {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: 'No tienes los permisos para acceder a esta función',
      })
      navigate('/iniciar-sesion')
    }
    // setAuth({
    //   ...auth,
    //   token: localStorage.getItem('token')
    // })
  }, [auth.isAuth, auth.token, navigate, setAuth])



  const createOrEditDashboard = async (data) => {
    // const {name, email, password, role} = user
    
    try {

      await createOrEditDashboardQuery('/administracion/crear-dashboard', auth.token, data)

      Swal.fire({
        icon: 'success',
        title: 'Usuario creado correctamente',
        showConfirmButton: false,
        timer: 1500
      })

    } catch (error) {
      const { msg } = error.response.data
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: msg,
      })
      setErrors(error.response.data.errors)
    }
  }

  const handleInputChange = (event) => {
    setDashboard({
      ...dashboard,
      [event.target.name]: event.target.value
    })
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    
    createOrEditDashboard(dashboard)
  }

  function isValidUser(dashboard) {
    return !!dashboard.name && !!dashboard.link && !!dashboard.requiredRole
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card sx={{
        flexGrow: 1,
        px: 2,
        mx: 2
      }}>
        <CardHeader
          title="Crea un nuevo dashboard o edita uno que ya tengas"
          subheader="Debes ingresar los datos en los campos respectivos"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  // error = {!dashboard.name && true}
                  label="Nombre del reporte"
                  name="name"
                  onChange={handleInputChange}
                  required={true}
                  value={dashboard.name}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Url asociado"
                  name="link"
                  onChange={handleInputChange}
                  required
                  value={dashboard.link}
                />
              </Grid>


              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Usuarios que podrán ver este reporte"
                  name="requiredRole"
                  onChange={handleInputChange}
                  required
                  value={dashboard.requiredRole}
                />
              </Grid>

            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={!isValidUser(dashboard)} type='submit' variant="contained">
            Crear
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default DashboardEdits