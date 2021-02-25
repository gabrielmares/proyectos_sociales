import { useContext, useState } from 'react'
import { sessionContext } from '../../provider/contextGlobal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import SelectParticipantsController from './AgeSelect'
import { CloseEvent } from '../../firebase/firebase'
import {
    Modal,
    ModalBody,
    ModalFooter,
    Button,
} from 'reactstrap';


const AddParticipants = () => {

    const { addParticipants, setAddParticipants, generales } = useContext(sessionContext)
    const inputsForm = {
        ageValue: '',
        genderValue: '',
        participants: 1
    }
    const [arrayObject, setArrayObject] = useState([inputsForm])
    let arr = [];
    const [counter, setCounter] = useState(1);



    const setValuesRow = (e) => {
        if (['ageValue', 'genderValue', 'participants'].includes(e.target.name)) {
            let rows = [...arrayObject];
            rows[e.target.dataset.id][e.target.name] = e.target.value
            setArrayObject(rows)
        }

    }

    const [nestedModal, setNestedModal] = useState(false)

    const toggleNested = () => {
        setNestedModal(!nestedModal);
    }
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setAddParticipants(!addParticipants)
    }

    const updateEventWithParticipants = () => {
        CloseEvent(generales.title, arrayObject)
            .then(() => {
                toggleNested()
            })
            .catch(err => console.error(err))
    }

    return (
        <Modal isOpen={addParticipants} size='lg' scrollable={true} >
            <h4 className="text-center mt-2">Asistentes</h4>
            <ModalBody>
                <div>
                    <div className="float-right" style={{ height: '4em' }}>
                        <label className="mr-2">Renglones</label>
                        <FontAwesomeIcon
                            style={{ color: 'red', fontSize: '25px' }}
                            icon={faMinusSquare}
                            onClick={() => {
                                if (counter <= 1) return setCounter(1);
                                setCounter(counter - 1)
                                arr = arrayObject;
                                arr.pop();
                                return setArrayObject(arr);
                            }}
                        />
                        <input
                            type='number'
                            className="mr-1 ml-1"
                            style={{ width: '3em', height: '2.4em', marginTop: '1em' }}
                            value={counter}
                        />
                        <FontAwesomeIcon
                            style={{ color: 'green', fontSize: '25px' }}
                            icon={faPlusSquare}
                            onClick={() => {
                                setCounter(counter + 1);
                                return setArrayObject([...arrayObject, inputsForm]);
                            }}
                        />
                    </div>
                    <div className="col-9">
                        <p>Asigne los grupos de personas que asistieron al evento</p>
                    </div>
                </div>
                {arrayObject.map((row, index) => (<SelectParticipantsController key={index} inputsForm={row} rows={index} fn={setValuesRow} />))}
                <Modal isOpen={nestedModal} toggle={toggleNested}>
                    <h3 className="text-center mt-2">Guardado</h3>
                    <ModalBody className="text-center">Cambios guardados correctamente</ModalBody>
                    <ModalFooter className="justify-content-center">
                        <Button color="success" onClick={toggleAll}>Entendido</Button>
                    </ModalFooter>
                </Modal>
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <Button
                    color="secondary"
                    onClick={() => (setAddParticipants(!addParticipants))}
                >
                    Cancelar
                        </Button>
                <Button
                    color="primary"
                    onClick={updateEventWithParticipants}
                >
                    Guardar
                        </Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddParticipants;