import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const adminPaths = [
  {
    index: 1,
    title: 'Inicio',
    path: '/',
    icon: (
      <DashboardIcon sx={{ color: '#fafafa' }} />
    )
  },
  {
    index: 2,
    title: 'Crear usuarios',
    path: '/crear-usuario',
    icon: (
      <PersonAddAlt1Icon sx={{ color: '#fafafa' }} />
    )
  },
  {
    index: 3,
    title: 'Eliminar usuario',
    path: '/eliminar-usuario',
    icon: (
      <PersonRemoveAlt1Icon  sx={{ color: '#fafafa' }} />
    )
  },
  {
    index: 4,
    title: 'Editar perfil',
    path: '/editar-perfil',
    icon: (
      <ManageAccountsIcon sx={{ color: '#fafafa' }}/>
    )
  },
  {
    index: 5,
    title: 'Crear o editar dashboard',
    path: '/dashboard',
    icon: (
      <ExitToAppIcon sx={{ color: '#fafafa' }} />
    )
  },
  {
    index: 6,
    title: 'Cerrar sesión',
    path: '/logout',
    icon: (
      <ExitToAppIcon sx={{ color: '#fafafa' }} />
    )
  },

];

export const encargadoPaths = [
  {
    index: 1,
    title: 'Inicio',
    path: '/',
    icon: (
      <DashboardIcon sx={{ color: '#fafafa' }} />
    )
  },
  {
    index: 2,
    title: 'Crear usuarios',
    path: '/crear-usuario',
    icon: (
      <PersonAddAlt1Icon sx={{ color: '#fafafa' }} />
    )
  },
  {
    index: 3,
    title: 'Eliminar usuario',
    path: '/eliminar-usuario',
    icon: (
      <PersonRemoveAlt1Icon  sx={{ color: '#fafafa' }} />
    )
  },
  {
    index: 4,
    title: 'Editar perfil',
    path: '/editar-perfil',
    icon: (
      <ManageAccountsIcon sx={{ color: '#fafafa' }}/>
    )
  },
  {
    index: 5,
    title: 'Cerrar sesión',
    path: '/logout',
    icon: (
      <ExitToAppIcon sx={{ color: '#fafafa' }} />
    )
  }
];

export const superPaths = [
  {
    index: 1,
    title: 'Inicio',
    path: '/',
    icon: (
      <DashboardIcon sx={{ color: '#fafafa' }} />
    )
  },
  {
    index: 4,
    title: 'Editar perfil',
    path: '/editar-perfil',
    icon: (
      <ManageAccountsIcon sx={{ color: '#fafafa' }}/>
    )
  },
  {
    index: 5,
    title: 'Cerrar sesión',
    path: '/logout',
    icon: (
      <ExitToAppIcon sx={{ color: '#fafafa' }} />
    )
  }
];


