import { useContext } from 'react';
import { Button } from 'reactstrap'
import { sessionContext } from '../../provider/contextGlobal'
import { inputsOnSiteValidator } from '../../helpers/helpers'
import ModalConfirmComponentJSX from './ModalConfirmSave'
import ResetForm from './ModalResetForm'
// componente que presenta los datos complementarios del formulario
// para eventos en campo
const ActivityOnSiteComponent = () => {

    const {
        setErrors,
        onSite,
        generales,
        setGenerales,
        modalConfirm,
        setModalConfirm,
        setResetForm,
        resetForm
    } = useContext(sessionContext)
    const { start, end } = generales;



    const saveOnSiteEvent = () => {
        const erroresValidacion = inputsOnSiteValidator(generales, start, onSite)
        if (Object.keys(erroresValidacion).length === 0) {
            setGenerales({
                ...generales,
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
            <div className="justify-content-around row mt-4" >
                <Button
                    color="warning"
                    onClick={() => (setResetForm(true))}
                    className="col-4 buttonsProjects"
                >
                    Restablecer
                </Button>
                <Button
                    type='submit'
                    color="primary"
                    className="col-4 buttonsProjects"
                    onClick={() => saveOnSiteEvent()}
                >
                    Guardar
                </Button>
            </div>
            {modalConfirm && (<ModalConfirmComponentJSX />)}
            {resetForm && (<ResetForm />)}
        </>
    );
}

export default ActivityOnSiteComponent;