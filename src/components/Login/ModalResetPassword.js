import { useState } from 'react';
import { ModalFooter, ModalBody, Modal, ModalHeader, Row, Label, Input, Button } from 'reactstrap';
import { ResetPassword } from '../../firebase/firebase'

const ModalResetPassword = () => {
    const [email, setEmail] = useState('')
    const [modal, setCloseModal] = useState(true)
    return (
        <Modal isOpen={modal} className="modal-dialog modal-dialog-centered">
            <ModalHeader className="justify-content-center">
                <h2>Restablecer contraseña</h2>
                <h6 className="text-center" >Se enviara un enlace con los pasos a seguir</h6>
            </ModalHeader>
            <ModalBody className="justify-content-center ">
                <Row>
                    <Label className="mt-2 col-3 ml-4">
                        Email
                    </Label>
                    <Input className="col-7" onChange={e => setEmail(e.target.value)} />
                </Row>
            </ModalBody>
            <ModalFooter className="justify-content-center" row>
                <Button
                    color="secondary"
                    style={{ borderRadius: '25px', fontSize: '18px', marginTop: '1rem', marginRight: '1rem' }}
                    onClick={() => setCloseModal(!modal)}
                    className="col-4"
                >
                    cancelar
                        </Button>
                <Button
                    type='submit'
                    color="primary"
                    // size='lg'
                    size='lg'
                    required={true}
                    style={{ borderRadius: '25px', fontSize: '18px', marginTop: '1rem', marginLeft: '1rem' }}
                    className="col-4"
                    onClick={() => ResetPassword(email)}
                >
                    Restablecer
                </Button>

            </ModalFooter>
        </Modal>
    );
}

export default ModalResetPassword;