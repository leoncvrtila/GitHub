import React from "react";
import { useHistory } from "react-router-dom";

const Users = (props) => {

    const history = useHistory()

    const pushRepo = (e, userId) => {
        history.push('/repo/' + userId)
    }

    const mapUsers = props.users.map(user => {
        return(
            <div className="User" key={Math.random()} onClick={(e) => {props.onClickUserHandler(e, user.id, user.login); pushRepo(e, user.id);}}>

                <div>
                    <img src={user.avatar_url} alt={user.login} />
                </div>

                <div>
                    <h4>{user.name}</h4>
                    <p>{user.bio}</p>
                </div>
            
            </div>
        )
    })

    return (

        <div className='Users'>
            {props.users.length > 0 ? mapUsers : <div className="loader">Loading...</div>}
        </div>
    
    )
    

}

export default Users