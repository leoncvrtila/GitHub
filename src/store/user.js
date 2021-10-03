import { createSlice } from '@reduxjs/toolkit'

const initialState = {users: [], errorModal: false, errorMsg: ''}

const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUsers(state, action) {

            let usersArr = []

            for(let key in action.payload){

                if(action.payload[key].name) {

                    usersArr.push(
                            {
                                ...action.payload[key]
                            }
                        )
                
                    }
            
            }

            state.users.push(usersArr)

        },
        showNotification(state, action) {

            state.errorModal = true
            state.errorMsg = action.payload.message

        },
        closeNotification(state, action) {

            state.errorModal = false
            state.errorMsg = ''

        }
    }
})

export const userActions = userSlice.actions

export default userSlice.reducer