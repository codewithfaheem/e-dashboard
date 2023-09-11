import React from 'react'
import { Modal } from "react-bootstrap"



const TbModal = (props) => {
    return(
        <Modal
            {...props}
            onHide={()=>props.onHide(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.modal_header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>                
                {props.modal_body}
            </Modal.Body>
            <Modal.Footer>
                {props.modal_footer.map((item,i)=>{
                    return(
                        <span key={item+i}>{item}</span>
                    )
                })}
            </Modal.Footer>
        </Modal>
    )
}

export default TbModal