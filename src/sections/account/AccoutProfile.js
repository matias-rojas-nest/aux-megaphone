import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const user = {
  city: 'Santiago',
  country: 'Chile',
  name: 'Matías Rojas',
  timezone: 'GTM-7'
};

export const AccountProfile = () => (
  <Card sx={{
    mx: 2
  }}>
    <CardContent >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
          
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.city} {user.country}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />

  </Card>
);
