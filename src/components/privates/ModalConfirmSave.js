import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap'
import { useContext } from 'react';
import { sessionContext } from '../../provider/contextGlobal';
import { saveEvents } from '../../firebase/firebase'
const ModalConfirmComponentJSX = () => {

    const { modalConfirm, setModalConfirm, generales, errors, setGenerales, setProjectInfo } = useContext(sessionContext)


    const newElement = () => {
        if (Object.keys(errors).length === 0) {
            saveEvents(generales)
                .then(() => {
                    setProjectInfo({
                        listaDeComunidadesAsignadas: [],
                        fechaInicio: '',
                        fechaFin: '',
                        tema: ''
                    });
                    setGenerales({
                        objetivo: "",
                        title: "",
                        allday: false,
                        responsable: "",
                        lineasIntervencion: [],
                        tipoEvento: 0
                    })
                    setModalConfirm(false)
                })
                .catch(err => {
                    alert('no se pudo guardar el documento')
                    console.log(err)
                })
        }
    }

    return (
        <Modal isOpen={modalConfirm} className="modal-dialog modal-dialog-centered">
            <ModalHeader className="bg-info text-white justify-content-center">
                <h3><strong>Confirmacion</strong></h3>
            </ModalHeader>
            <ModalBody className="text-center">
                <h4>De click en guardar para almacenar el proyecto/evento</h4>
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <Button
                    color="secondary"
                    onClick={() => (setModalConfirm(false))}
                >
                    Cancelar
                        </Button>
                <Button
                    color="primary"
                    onClick={() => newElement()}
                >
                    Guardar
                        </Button>

            </ModalFooter>
        </Modal>

    );
}

export default ModalConfirmComponentJSX;