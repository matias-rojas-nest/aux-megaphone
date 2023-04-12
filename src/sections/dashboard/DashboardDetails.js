import {
  Box,
  Card,
  CardContent,
  Unstable_Grid2 as Grid
} from '@mui/material'


const DashboardDetails = ({ dashboard }) => {
  const { name, link } = dashboard

  return (

    <Card sx={{
      px: 2,
      mx: 2,
      my: 1
    }}>

      <CardContent>
        <Box sx={{ m: -1.5 }} >
          <Grid
            container
            spacing={3}
          >
            <iframe width="1100px" height='600px' className='dashboard-view' title={name} src={link} ></iframe>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DashboardDetails