import React, { Fragment } from "react";
import { useHistory } from "react-router";

const Repo = (props) => {

    let history = useHistory()

    const repoClickHandler = (e, link) => {

        window.open(link, '_blank')

    }

    const mapRepos = props.repos.map(repo => {

        return (
            <div className='Repo' key={repo.id} onClick={(e) => repoClickHandler(e,repo.html_url)}>
                
                <h2>{repo.name}</h2>

                {
                    repo.description !== null ?

                    <p><b>Description: </b> {repo.description}</p>
                    
                    : null
                }

                <p><b>Created:</b> {new Date(repo.created_at).toLocaleString()}</p>

                <p><b>Stargazers:</b> {repo.stargazers_count}</p>

                <p><b>Watchers:</b> {repo.watchers}</p>

                <p><b>Forks:</b> {repo.forks}</p>

                
                {
                    repo.license !== null ?

                    <p><b>License: </b> {repo.license.name}</p>
                    
                    : null
                }

            </div>
        )
    })

    return (
    
        <Fragment>

            <div className='Repos'>
                
                <button className='BackBtn' onClick={() => history.goBack()}>Back</button>

                <div>
                    {mapRepos}
                </div>

            </div>

        </Fragment>
        
        )

    

}

export default Repo