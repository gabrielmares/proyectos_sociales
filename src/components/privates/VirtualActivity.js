import { useContext } from 'react';
import { FormGroup, Input, Button, Label } from 'reactstrap'
import ModalConfirmComponentJSX from './ModalConfirmSave'
import { sessionContext } from '../../provider/contextGlobal'
import { inputsVirtualEventValidator } from '../../helpers/helpers'

const ActivityComponent = () => {

    const { virtualEvent,
        generales,
        setVirtualEvent,
        errors,
        setErrors,
        setGenerales,
        modalConfirm,
        setModalConfirm,
        dateEvent,
    } = useContext(sessionContext);
    const { end, start } = dateEvent


    const saveVirtualEvent = () => {
        const erroresValidacion = inputsVirtualEventValidator(generales, start, virtualEvent) //pasamos a la funcion los valores a revisar 
        if (Object.keys(erroresValidacion).length === 0) {
            setGenerales({
                ...generales,
                lugar: 'ZOOM',
                start: start.replace('T', " "),
                end: end.replace('T', " "),
                invitados: virtualEvent,
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
                    for="virtualEvent"
                    className="mt-1"
                >
                    Asistentes
                     
                </Label>
               
                <Input
                    id="virtualEvent"
                    type="textarea"
                    value={virtualEvent}
                    onChange={e => setVirtualEvent(e.target.value)}
                    style={{maxHeight:'9rem'}}
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