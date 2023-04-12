import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { HomeContext } from '../../context/HomeContext'
import dashAxios from '../../config/axios'

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



const CreateAccountProfile = () => {
  let navigate = useNavigate()
  const [auth] = useContext(HomeContext)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    // TODO: remover este active
    active: 1
  })

  useEffect(() => {

    if (!localStorage.getItem('role') || localStorage.getItem('role') === 'supervisor') {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: 'No tienes los permisos para acceder a esta función',
      })
      navigate('/iniciar-sesion')
    }
  }, [auth.isAuth, auth.token, navigate])



  const createUser = async (user) => {
    // const {name, email, password, role} = user
    try {
      await dashAxios.post('/crear-usuario', user, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })

      Swal.fire({
        icon: 'success',
        title: 'Usuario creado correctamente',
        showConfirmButton: false,
        timer: 1500
      })

      setUser({
        name: '',
        email: '',
        password: '',
        role: '',
        active: 1
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: 'Revise los campos ingresados e intente nuevamente. En caso de persistir, comuníquese con el administrador'
      })
    }
  }

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createUser(user)
  }

  function isValidUser(user) {
    return !!user.role && !!user.name && !!user.email && !!user.password;
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
          title="Crea un nuevo usuario para tu organización"
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
                  label="Ingrese el nombre del usuario"
                  name="name"
                  onChange={handleInputChange}
                  required
                  value={user.name}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Correo electrónico asociado"
                  name="email"
                  onChange={handleInputChange}
                  required
                  value={user.email}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Contraseña"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Seleccione un rol"
                  name="role"
                  onChange={handleInputChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={user.role}
                >
                  {
                    user.role === 'supervisor' ? (
                      <>
                        <option value='null'></option>
                        <option value='gerente'>Gerente</option>
                        <option value='supervisor'>Supervisor</option>
                      </>
                    ) : (
                      <>
                        <option value='null'></option>
                        <option value='gerente'>Gerente</option>
                        <option value='supervisor'>Supervisor</option>
                        <option value='encargado'>Encargado</option>
                      </>
                    )
                  }

                </TextField>
              </Grid>

            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button disabled = { !isValidUser(user) } type='submit' variant="contained">
            Crear
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default CreateAccountProfile