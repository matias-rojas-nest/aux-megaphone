import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AccountProfileDetails } from '../../sections/account/AccountProfileDetails'
import { useNavigate } from 'react-router-dom'
import { HomeContext } from '../../context/HomeContext'

const EditProfile = () => {

  const navigate = useNavigate()
  const [auth, setAuth] = useContext(HomeContext)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
  })


  useEffect(() => {

    if ( !localStorage.getItem('role')) {
      localStorage.clear()
      navigate('/iniciar-sesion')
    }
      
    setUser({
      ...auth,
      password: ''
    })


  }, [auth, navigate, setAuth])


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
              Editar perfil
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
                <AccountProfileDetails auth = {auth} setAuth = {setAuth} user = {user} setUser = {setUser} />
              </Grid>

            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  )
}

export default EditProfile