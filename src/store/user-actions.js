import { userActions } from "./user"

export const fetchUsersData = () => {

    return async dispatch => {

        const fetchData = async () => {

            const response = await fetch('https://api.github.com/users')

            if(!response.ok){
                throw new Error('Could not fetch data!')
            }

            const data = await response.json()

            return data

        }

        try{

           const usersData = await fetchData()

           let users = []

           for(let key in usersData){

                const fetchData = async () => {

                    const response = await fetch('https://api.github.com/users/' + usersData[key].login)
        
                    if(!response.ok){
                        throw new Error('Could not fetch data!')
                    }
        
                    const data = await response.json()
        
                    return data
        
                }

                try {

                    const usersData = await fetchData()

                    users.push(usersData)
                    
                } catch(error) {

                    dispatch(userActions.showNotification({
                        status: 'error', 
                        title: 'Error!', 
                        message: 'Fetching data failed!'
                      }))

                }

           }

           dispatch(userActions.setUsers(users))

        }catch(error){

            dispatch(userActions.showNotification({
                status: 'error', 
                title: 'Error!', 
                message: 'Fetching data failed!'
              }))

        }
    }
}