import { createContext, useState } from "react"

const HomeContext = createContext([{}, () => {}])

const HomeProvider = props => {

  const [auth, setAuth] = useState({
    id: '',
    token: '',
    isAuth: false,
    role: '',
    name: '',
    email: ''
  })

  return (
    <HomeContext.Provider value={[auth, setAuth]}>
      {props.children}
    </HomeContext.Provider>
  )
}

export {HomeContext, HomeProvider} 