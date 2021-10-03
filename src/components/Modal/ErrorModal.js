import React, { Fragment } from "react";
import ReactDom from 'react-dom'
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/user";

const Backdrop = () => {

    const dispatch = useDispatch()

    const closeModal = () => {

        dispatch(userActions.closeNotification())

    }


    return <div className='Backdrop' onClick={closeModal}></div>

}

const Modal = () => {

    const dispatch = useDispatch()

    const errorMsg = useSelector(state => state.users.errorMsg)

    const closeModal = () => {

        dispatch(userActions.closeNotification())

    }

    return (

        <div className='Modal'>
            <h2>Error</h2>
            <p>{errorMsg}</p>
            <button onClick={closeModal}>Okay</button>
        </div>

    )

}

const ErrorModal = () => {

    const error = useSelector(state => state.users.errorModal)

    return (

        <Fragment>
            {   
                error ?

                ReactDom.createPortal(
                <div>
                    <Backdrop />
                    <Modal />
                </div>,

                document.getElementById('ModalWrapp')
                
                )

                : null
            }
        </Fragment>

    )

}

export default ErrorModal