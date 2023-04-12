
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import  CreateAccountProfile  from '../../sections/account/CreateAccountProfile'
import { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'


const CreateUser = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem('role') || localStorage.getItem('role') === 'supervisor') navigate('/iniciar-sesion')
  }, [ navigate])
  

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
              Crear usuario
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
                <CreateAccountProfile />
              </Grid>

            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  )
}

export default CreateUser