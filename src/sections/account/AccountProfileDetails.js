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
import { editProfileQuery } from '../../config/axios'
import { useNavigate } from 'react-router-dom'


export const AccountProfileDetails = ({user, setUser, auth, setAuth}) => {


  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    editProfile(user)
  }
  
  const editProfile = async (user) => {
    // const {name, email, password, role} = user
    try {
      
      await editProfileQuery('/editar-perfil', user, auth.token)

      Swal.fire({
        icon: 'success',
        title: 'Se ha editado el perfil correctamente',
        text: "Inicia sesión nuevamente",
      })

      setUser({
        id: '',
        name: '',
        email: '',
        password: '',
        role: '',
        active: 1
      })

      setAuth({
        id: '',
        isAuth: false,
        token: '',
        role: '',
        name: '',
        email: ''
      })

      localStorage.clear()
      

      navigate('/iniciar-sesion')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error.',
        text: "Vuelva a intentar o comuníquese con el administrador",
      })
    }
  }

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
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
          subheader="Puedes editar esta información"
          title="Edita tu perfil"
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
                  helperText="Ingrese su nombre"
                  name="name"
                  onChange={handleInputChange}
                  value={user.name}
                  required
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Correo electrónico"
                  name="email"
                  value={user.email}
                  required
                  disabled
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  type="password"
                  label="Contraseña"
                  onChange={handleInputChange}
                  value={user.password}
                  name="password"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit} variant="contained">
            Guardar cambios
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
