import { useContext } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import { sessionContext } from '../../provider/contextGlobal'

const ResetForm = () => {
    const { setResetForm, resetForm, resetFormFunction } = useContext(sessionContext)


    return (
        <Modal isOpen={resetForm} className="modal-dialog modal-dialog-centered">
            <ModalHeader className="bg-warning justify-content-center">
                <h4><strong>Restablecer Formulario</strong></h4>
            </ModalHeader>
            <ModalBody>
                Se perderan los datos capturados, desea vaciar el formulario
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <Button
                    color="secondary"
                    className="col-4"
                    style={{ borderRadius: '25px', fontSize: '18px', marginTop: '1rem' }}
                    onClick={() => (setResetForm(false))}
                >
                    Cancelar
                        </Button>
                <Button
                    color="warning"
                    className="col-4"
                    style={{ borderRadius: '25px', fontSize: '18px', marginTop: '1rem' }}
                    onClick={() => resetFormFunction()}
                >
                    Sí, restablecer
                        </Button>

            </ModalFooter>
        </Modal>
    );
}

export default ResetForm;