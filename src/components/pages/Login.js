import {
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../context/HomeContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { queryLogin } from '../../config/axios'
import Logo from '../../assets/images/logo-megaphone.png'

const Login = () => {

  const [, setAuth] = useContext(HomeContext)
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/inicio')
    }
  }, [navigate])

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await queryLogin('/iniciar-sesion', user)
      // get token and and save it in ls
      const { token } = response.data
      const { user: { id, role, name, email } } = response.data

      localStorage.setItem('id', id)
      localStorage.setItem('token', token)
      localStorage.setItem('userName', name)
      localStorage.setItem('email', email)
      localStorage.setItem('role', role)

      setAuth({
        id,
        isAuth: true,
        token,
        role,
        name,
        email
      })


      Swal.fire({
        icon: 'success',
        title: 'Has iniciado sesión correctamente',
        showConfirmButton: false,
        timer: 1500
      })

      // redirect
      navigate('/inicio')

    } catch (error) {
      setError(true)
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: error.response.data.msg,
      })
    }
  }


  return (
    <>

      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <img src={Logo} alt='Megaphone' className='img-login'/>
              <Typography variant="h4">
                Iniciar sesión
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Debes solicitar una cuenta en caso de no tenerla
                &nbsp;

              </Typography>
            </Stack>

            <form
              onSubmit={handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  onChange={handleInputChange}
                  type="email"
                />
                <TextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                />
              </Stack>
              {
                error &&
                <FormHelperText sx={{ mt: 1 }} error>
                  Vuelve a revisar el correo electrónico y la contraseña
                </FormHelperText>

              }
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  )
}



export default Login
