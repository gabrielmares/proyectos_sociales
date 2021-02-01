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
        setProjectInfo,
        setResetDropdown,
        setDateEvent,
        setVirtualEvent,
        setOnsite } = useContext(sessionContext)


    const newElement = () => {
        if (Object.keys(errors).length === 0) {
            saveEvents(generales)
                .then(() => {
                    setResetDropdown(true)
                    setProjectInfo({
                        listaDeComunidadesAsignadas: [],
                        fechaInicio: '',
                        fechaFin: '',
                        tema: ''
                    });
                    setOnsite('');
                    setVirtualEvent('')
                    setDateEvent({
                        start: '',
                        end: '',
                    })
                    setGenerales({
                        objetivo: "",
                        title: "",
                        allday: false,
                        responsable: "",
                        lineasIntervencion: [],
                        tipoEvento: 0
                    })
                    setResetDropdown(false)
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
                <strong>Confirmacion</strong>
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