import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DeleteAccountData } from '../../sections/delete-account/DeleteAccountData'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { getAllUsersQuery } from '../../config/axios'

const DeleteUser = () => {
  const [emails, setEmails] = useState([])
  const navigate = useNavigate()
  
  useEffect(  () => {

    const getUsers = async () => {
      const {allEmails} = await getAllUsersQuery('/usuarios')
      setEmails(allEmails)
    }
    getUsers ()

    if (localStorage.getItem('role') === 'gerente' || localStorage.getItem('role') === 'supervisor') {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: 'No tienes los permisos para acceder a esta función',
      })
      navigate('/iniciar-sesion')
    }


  }, [ navigate])


  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex'
      }}
    >
      <Container >
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Eliminar usuario
            </Typography>
          </div>
          <div>
            <Grid container >
              <Grid
                item={true}
                xs={12}
                md={12}
                lg={12}
              >
              <DeleteAccountData emails = {emails} />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  )
}

export default DeleteUser