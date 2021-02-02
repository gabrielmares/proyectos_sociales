import { useContext } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap'
import { sessionContext } from '../../provider/contextGlobal'
import { inputsOnSiteValidator } from '../../helpers/helpers'
import ModalConfirmComponentJSX from './ModalConfirmSave'

// componente que presenta los datos complementarios del formulario
// para eventos en campo
const ActivityOnSiteComponent = () => {

    const { errors,
        setErrors,
        onSite,
        setOnSite,
        generales,
        setGenerales,
        modalConfirm,
        setModalConfirm,
        dateEvent,
        selection,
        active,
        impacto,
        setImpacto,
        period
    } = useContext(sessionContext)
    const { start, end } = dateEvent;



    const saveOnSiteEvent = () => {
        const erroresValidacion = inputsOnSiteValidator(generales, start, onSite)
        if (Object.keys(erroresValidacion).length === 0) {
            setGenerales({
                ...generales,
                lugar: onSite,
                selection,
                period,
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
                <Label className="col-3 mr-auto">Lugar del evento</Label>
                <Input
                    type='text'
                    onChange={e => setOnSite(e.target.value)}
                    required='true'
                    className={` col-8 ${errors.place ? ('border border-danger') : null}`}
                    name='onSite'
                    value={onSite}
                />
                {/* funcion que muestra el correo que no pasa la validacion */}
                {errors.place && (<small className="text-center text-danger col-12 mr-auto">{errors.place}</small>)}

            </FormGroup>
            <FormGroup row hidden={active}>
                <Label className="col-6 mt-2">Numero de asistentes</Label>
                <Input
                    type="number"
                    name="impacto"
                    required={true}
                    disabled={active}
                    value={impacto}
                    onChange={e => setImpacto(e.target.value)}
                    className={`col-6 ${errors.impacto ? ('border border-danger') : null}`}
                />
                {errors.impacto && (<small className="text-center text-danger">{errors.impacto}</small>)}
            </FormGroup>
            <FormGroup className="text-center">
                <Button
                    type='submit'
                    color="primary"
                    style={{ borderRadius: '25px', fontSize: '20px', marginTop: '1rem' }}
                    onClick={() => saveOnSiteEvent()}
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

export default ActivityOnSiteComponent;