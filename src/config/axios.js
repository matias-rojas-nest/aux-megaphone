import axios from 'axios'

const dashAxios = axios.create({
  baseURL: 'https://nest-megaphone-backend-dbmongodb.up.railway.app/api/v1/'
})

export const getDashboardQuery = async (url, role, query, token) => {
  const response = await dashAxios.get(`${url}/${role}/${query}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const createUserAccount = async (url, user,token) => {
  const newUser = await dashAxios.post(url, user, token, {
    headers: {
      Authorization: `Bearer ${token} `
    }
  })
  return newUser
}


export const queryLogin = async (url, user) => {
  const login = await dashAxios.post(url, user)
  return login
}

export const getAllUsersQuery = async (url) => {
  const response = await dashAxios.get(url)
  return response.data
}
export const editProfileQuery = async (url, user, token) => {
  const login = await dashAxios.put(url, user, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return login
}

export const createOrEditDashboardQuery = async (url, dashboard, token) => {
  const response = await dashAxios.post(url, dashboard, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

export const deleteAccountQuery = async (url, user, userRole, emailToDelete, token) => {
  const data = await dashAxios.delete(`${url}/${user}/${userRole}/${emailToDelete}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  return data
}



export default dashAxios