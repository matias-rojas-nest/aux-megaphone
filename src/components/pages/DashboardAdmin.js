import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import DashboardEdits from '../../sections/account/DashboardEdit'
import { HomeContext } from '../../context/HomeContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const DashboardAdmin = () => {

  const [auth] = useContext(HomeContext)
  const navigate = useNavigate()

  useEffect(() => {

    if(localStorage.getItem('role') !== 'admin' || !localStorage.getItem('token') ) {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: 'No tienes los permisos para acceder a esta opción',
      })

      navigate('/inicio')
    }

  }, [auth, navigate])
  

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex'
      }}
    >
      <Container maxWidth="lg" >
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Crear o editar dashboard
            </Typography>
          </div>
          <div>
            <Grid container display='flex'  >
              <Grid
                item={true}
                xs={12}
                md={12}
                lg={12}
              >
                <DashboardEdits />
              </Grid>

            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  )
}

export default DashboardAdmin