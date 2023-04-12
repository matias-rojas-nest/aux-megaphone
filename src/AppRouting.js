import React, { Fragment, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home  from './components/pages/Home'
import CreateUser from './components/pages/CreateUser'
import DeleteUser from './components/pages/DeleteUser'
import EditProfile from './components/pages/EditProfile'
import Footer from './sections/footer/Footer'
import { HomeContext, HomeProvider } from './context/HomeContext'
import DashboardAdmin from './components/pages/DashboardAdmin'
import Login from './components/pages/Login'
import MainDrawer from './components/pages/Nav/MainDrawer'

const AppRouting = () => {

  const [auth, setAuth] = useContext(HomeContext)

  return (
    <>
      <HomeProvider value={[auth, setAuth]}>
      <Routes>
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route element={<MainDrawer />}>
          <Route exact path="/inicio" element={<Home />} />
          <Route path='/crear-usuario' element={<CreateUser />} />
          <Route path='/eliminar-usuario' element={<DeleteUser />} />
          <Route path='/editar-perfil' element={<EditProfile />} />
          <Route path='/dashboard' element={<DashboardAdmin />} />
        </Route>
        <Route
        path="*"
        element={<Navigate to="/iniciar-sesion" replace />}
    />
      </Routes>
      </HomeProvider>
      {/* <Footer/> */}
    </>
  )
}

export default AppRouting