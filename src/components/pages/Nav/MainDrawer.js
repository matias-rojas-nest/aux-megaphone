import { Fragment, useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { adminPaths, superPaths } from '../../../utils'
import { encargadoPaths } from '../../../utils'
import { HomeContext } from '../../../context/HomeContext'
import Logo from '../../../assets/images/logo-megaphone.png'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'


const MainDrawer = () => {

  const [auth, setAuth] = useContext(HomeContext)
  const navigate = useNavigate()
  const [state, setState] = useState({
    left: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const logout = () => {
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
  }

  useEffect(() => {
    setAuth({
      id: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
      isAuth: true,
      role: localStorage.getItem('role'),
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('email'),
    })

  }, [setAuth])

  const mainPath = auth.role === 'admin'
    ? adminPaths
    : auth.role === 'encargado'
      ? encargadoPaths
      : superPaths

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{ p: 2 }}>
        <Box
          href="/"
          sx={{
            display: 'inline-flex',
            width: 16
          }}
        >
        </Box>
        <img src={Logo} alt='Megaphone' />
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 1,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            p: '12px'
          }}
        >
          <div>
            <Typography
              color="white"
              variant="subtitle1"
            >
              {auth.name}
            </Typography>
          </div>

        </Box>
      </Box>
      <List>
        {mainPath.map(({ title, index, icon, path }) => (
          <ListItem
            key={index}
            disablePadding
            component={Link}
            to={path}
            style={{ color: 'white' }}
          >
            <ListItemButton onClick={title === 'Cerrar sesión' ? logout : null}>

              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

    </Box>
  )

  return (
    <div>
      {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <Button style={{ marginTop: '5px', color: 'black' }} onClick={toggleDrawer(anchor, true)}> <MenuIcon /> </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>

      ))}

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}

      >
        <Outlet />
      </Box>
    </div>
  )
}

export default MainDrawer