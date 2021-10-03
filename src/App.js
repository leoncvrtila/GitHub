import React, { useEffect, Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from "react-router";

import Layout from './components/Layout';
import Search from './components/User/Search';
import Users from './components/User/Users';
import Repo from './components/Repo/Repo';
import ErrorModal from './components/Modal/ErrorModal';

import { userActions } from './store/user'
import { fetchUsersData } from './store/user-actions'

function App() {

  const dispatch = useDispatch()

  const users = useSelector(state => state.users.users)

  let [filteredUsers, setFileteredUsers] = useState([])
  let [repos, setRepos] = useState([])
  
  useEffect(()=>{

    dispatch(fetchUsersData())

  }, [dispatch])


  let usersArr = []

  for(let key in users[0]){

          usersArr.push(
              {
                  ...users[0][key]
              }
          )
  }

  const searchHandler = (input) => {

      let newUsers

      if (input !== '') {

          newUsers = usersArr.filter(user => {

              return user.name.toLowerCase().indexOf(input.toLowerCase()) !== -1
  
          })

      } else {

          newUsers = [...usersArr]

      }

      setFileteredUsers(newUsers)

  }

  const fetchRepoData = async (e, userId, userName) => {

        const fetchData = async () => {

            const response = await fetch('https://api.github.com/users/' + userName + '/repos')

            if(!response.ok){
                throw new Error('Could not fetch data!')
            }

            const data = await response.json()

            return data

        }

        try {

           const repoData = await fetchData()

           setRepos(repoData)


        } catch(error) {

            dispatch(userActions.showNotification({
                status: 'error', 
                title: 'Error!', 
                message: 'Fetching data failed!'
              }))

        }

}


  return (
    <BrowserRouter>
      <Layout>

        <Suspense fallback={<div className="loader">Loading...</div>}>

          <Switch>

            <Route path='/' exact>
              <ErrorModal />
              <Search searchHandler={searchHandler} />
              <Users users={filteredUsers.length > 0 ? filteredUsers : usersArr} onClickUserHandler={fetchRepoData} />
            </Route>

            <Route path='/repo/:id' exact>
              <Repo repos={repos} />
            </Route>

            <Route path='*'>
              Not found!
            </Route>

          </Switch>

        </Suspense>

      </Layout>
    </BrowserRouter>
  );
}

export default App;
