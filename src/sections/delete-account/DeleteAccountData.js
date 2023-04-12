import { useCallback, useContext, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material'
import { HomeContext } from '../../context/HomeContext'
import Swal from 'sweetalert2'
import { deleteAccountQuery } from '../../config/axios'
import { useNavigate } from 'react-router-dom'

const useSelectedEmail = (initialValue) => {
  const [selectedEmail, setSelectedEmail] = useState(initialValue)

  const handleChange = useCallback((event) => {
    setSelectedEmail(event.target.value)
  }, [])

  return [selectedEmail, handleChange]
}

const EmailSelector = ({ emails, selectedEmail, handleChange }) => (
  <TextField
    fullWidth
    helperText="Correo electrónico"
    name="state"
    onChange={handleChange}
    required
    select
    SelectProps={{ native: true }}
    value={selectedEmail}
  >
    {emails.map((option) => (
      <option
        key={option}
        value={option}
      >
        {option}
      </option>
    ))}
  </TextField>
)

export const DeleteAccountData = ({ emails }) => {
  const [selectedEmail, handleChange] = useSelectedEmail('')
  const [auth] = useContext(HomeContext)
  const navigate = useNavigate()

  const deleteUser  = ( email ) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta cuenta?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAccountQuery('/eliminar-cuenta', auth.email, auth.role, email, auth.token)
          Swal.fire(
            'Eliminado',
            'La cuenta ha sido eliminada con éxito',
            'success'
          )
          navigate(0)
        } catch (error) {
          const { msg } = error.response.data
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: msg,
          })
        }
      }
    })

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    deleteUser(selectedEmail)
  };

  return (
    <FormControl
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      fullWidth
    >
      <Card sx={{ px: 2, mx: 2 }}>
        <CardHeader subheader="Debes seleccionar el correo electrónico del usuario a eliminar" />
        <CardContent>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <EmailSelector emails={emails} selectedEmail={selectedEmail} handleChange={handleChange} />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit} variant="contained">Borrar cuenta</Button>
        </CardActions>
      </Card>
    </FormControl>
  )
}