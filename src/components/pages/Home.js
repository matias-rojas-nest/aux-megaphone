import { Box, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import DashboardDetails from '../../sections/dashboard/DashboardDetails'
import { useNavigate } from 'react-router-dom'
import { HomeContext } from '../../context/HomeContext'
import Swal from 'sweetalert2'
import { getDashboardQuery } from '../../config/axios'

const Home = () => {

  const [auth] = useContext(HomeContext)
  const [query, setQuery] = useState('operativo')
  const [dashboard, setDashboard] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token') || !localStorage.getItem('userName') || !localStorage.getItem('email') || !localStorage.getItem('role')) {
      localStorage.clear()
      navigate('/iniciar-sesion')
    }

    // if(auth.role === 'supervisor') {
    //   setQuery('operativo')
    // }

  }, [navigate, auth.id])

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    const getDashboard = async (dashToFound) => {
      const { role } = auth
      try {

        const { dashboard } = await getDashboardQuery('/inicio', role, dashToFound, auth.token)
        setDashboard(dashboard)

      } catch (error) {
        const { msg } = error.response.data
        if (error.response.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'No se encuentra autenticado. Por favor, inicie sesión',
            text: error.response.data.msg,
          })
          navigate('/iniciar-sesion')
        }

        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: msg.error,
        })

        setDashboard('')
      }
    }

    getDashboard(query || 'operativo')
  }, [auth, navigate, query])


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
              Reportes
            </Typography>
          </div>
          <div>
            <Grid container >
              <Grid
                item={true}
                xs={12}
                md={12}
              >
                <Grid
                  item={true}
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Seleccione un reporte"
                    name="query"
                    value={query}
                    onChange={handleInputChange}
                    required
                    select
                    SelectProps={{ native: true }}
                  >
                    {
                      auth.role === 'supervisor' ? (
                        <>
                          <option value='operativo'>Reporte de emisiones</option>
                        </>
                      ) : (
                        <>
                          <option value='operativo'>Reporte de emisiones</option>
                          <option value='estratégico'>Reporte estratégico</option>
                          <option value='rentabilidad'>Reporte de rentabilidad</option>
                        </>
                      )
                    }

                  </TextField>
                </Grid>
                <DashboardDetails dashboard={dashboard} />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  )
}

export default Home