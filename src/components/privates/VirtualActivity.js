import { useContext } from 'react';
import { FormGroup, Button } from 'reactstrap'
import ModalConfirmComponentJSX from './ModalConfirmSave'
import { sessionContext } from '../../provider/contextGlobal'
import { inputsVirtualEventValidator } from '../../helpers/helpers'
import EventTime from './EventTime'
import ResetForm from './ModalResetForm'

const ActivityComponent = () => {

    const {
        generales,
        errors,
        setErrors,
        setGenerales,
        modalConfirm,
        setModalConfirm,
        setResetForm,
        resetForm,
        handleChange
    } = useContext(sessionContext);
    const { end, start, emailAsistentes } = generales


    const saveVirtualEvent = () => {
        const erroresValidacion = inputsVirtualEventValidator(generales) //pasamos a la funcion los valores a revisar 
        if (Object.keys(erroresValidacion).length === 0) {
            setGenerales({
                ...generales,
                placeEvent: 'ZOOM',
                start: start.replace('T', " "),
                end: end.replace('T', " "),
                bgcolor: Math.floor(Math.random() * 16777215).toString(16), //funcion que genera el color de manera aleatoria
            })
            setModalConfirm(true)
        }

        setErrors(erroresValidacion)

    }



    return (
        <>
            <EventTime />
            <div className="row">
                <label
                    id="LabelemailsList"
                    for="emails"
                    className="mt-1"
                >
                    Asistentes

                </label>
                <textarea
                    id="emails"
                    className="ml-auto"
                    name='emails'
                    value={emailAsistentes}
                    onChange={e => handleChange(e)}
                />
                <small className="ml-auto mr-3">Separe los asistentes por ","</small>
                {errors.virtualEvent && (<small className="text-center text-danger col-12 mr-auto">{errors.virtualEvent}</small>)}
            </div>
            <FormGroup className="justify-content-around mt-4" row >
                <Button
                    color="warning"
                    onClick={() => (setResetForm(true))}
                    className="col-4 buttonsProjects"
                >
                    Restablecer
                </Button>
                <Button
                    type='submit'
                    className="col-4 buttonsProjects"
                    color="primary"
                    onClick={() => saveVirtualEvent()}
                >
                    Registrar
                </Button>
            </FormGroup>
            {modalConfirm && (<ModalConfirmComponentJSX />)}
            {resetForm && (<ResetForm />)}
        </>
    );
}

export default ActivityComponent;