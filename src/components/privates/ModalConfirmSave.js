import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap'
import { useContext } from 'react';
import { sessionContext } from '../../provider/contextGlobal';
import { saveEvents } from '../../firebase/firebase'
const ModalConfirmComponentJSX = () => {

    const {
        modalConfirm,
        setModalConfirm,
        generales,
        errors,
        setGenerales,
        setResetDropdown,
        setActive,
    } = useContext(sessionContext)


    const newElement = () => {
        if (Object.keys(errors).length === 0) {
            saveEvents(generales)
                .then(() => {
                    setResetDropdown(true)
                    setActive(true);
                    setGenerales({
                        objective: "",
                        title: "",
                        allday: false,
                        responsable: "",
                        lineasIntervencion: [],
                        tipoEvento: 0,
                        listaDeComunidadesAsignadas: [],
                        tema: '',
                        impactPeople: '',
                        period: '1',
                        start: '',
                        end: '',
                        eventSelection: '',
                        placeEvent: '',
                        bgcolor: '',
                        emailAsistentes: '',
                    })
                    setResetDropdown(false)
                    setModalConfirm(false)
                })
                .catch(err => {
                    alert('no se pudo guardar el documento', err)
                    console.log(err)
                })
        }
    }

    return (
        <Modal isOpen={modalConfirm} className="modal-dialog modal-dialog-centered">
            <ModalHeader className="bg-info text-white justify-content-center">
                <strong>Confirmacion</strong>
            </ModalHeader>
            <ModalBody className="text-center">
                <h6>De click en guardar para almacenar el proyecto/evento</h6>
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <Button
                    color="secondary"
                    className="buttonsProjects"
                    onClick={() => (setModalConfirm(false))}
                >
                    Cancelar
                        </Button>
                <Button
                    color="primary"
                    className="buttonsProjects"
                    onClick={() => newElement()}
                >
                    Guardar
                        </Button>

            </ModalFooter>
        </Modal>

    );
}

export default ModalConfirmComponentJSX;