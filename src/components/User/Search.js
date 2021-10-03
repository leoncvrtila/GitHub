import React from "react";

const Search = (props) => {

    const sendHandler = (e) => {

        props.searchHandler(e.target.value)

    }

    return (

        <div className='Search'>
            <input 
                type='text' 
                placeholder='Search Users' 
                onChange={(e) => sendHandler(e)} 
            />
        </div>

    )

}

export default Search