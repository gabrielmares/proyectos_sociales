import { useContext } from 'react';
import { FormGroup, Input, Button, Label } from 'reactstrap'
import ModalConfirmComponentJSX from './ModalConfirmSave'
import { sessionContext } from '../../provider/contextGlobal'
import { inputsVirtualEventValidator } from '../../helpers/helpers'

const ActivityComponent = () => {

    const {
        generales,
        errors,
        setErrors,
        setGenerales,
        modalConfirm,
        setModalConfirm,
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
            <FormGroup row>
                <Label
                    for="emails"
                    className="mt-1"
                >
                    Asistentes

                </Label>

                <Input
                    id="emails"
                    type="textarea"
                    value={emailAsistentes}
                    onChange={e => handleChange(e)}
                    style={{ maxHeight: '9rem' }}
                />
                <small>Separe los asistentes por ","</small>
                {errors.virtualEvent && (<small className="text-center text-danger col-12 mr-auto">{errors.virtualEvent}</small>)}
            </FormGroup>
            <FormGroup className="text-center">
                <Button
                    type='submit'
                    color="primary"
                    style={{ borderRadius: '25px', fontSize: '20px', marginTop: '1rem' }}
                    onClick={() => saveVirtualEvent()}
                >
                    Guardar
                </Button>
            </FormGroup>
            {modalConfirm &&
                (<ModalConfirmComponentJSX />)

            }
        </>
    );
}

export default ActivityComponent;