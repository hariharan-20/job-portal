import { useState, useEffect } from 'react'
import { Button, Toast, ToastHeader,  } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { changeToast, toastReducer } from '../../Redux/Features/alertToast'

const AlertModal = (props) => {   
    const dispatch = useDispatch() 
    const toast = useSelector(toastReducer)    
    
    // useEffect(() => {
    //     setIsOpen(props.modalOpen)        
    // }, [])

    return (
        <Toast onClose={() => dispatch(changeToast(false)) } show={toast} delay={3000} autohide>
          <Toast.Header>            
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
    )
}

export default AlertModal