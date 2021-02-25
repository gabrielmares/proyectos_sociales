import { Button } from 'reactstrap'
import { useContext } from "react";
import { sessionContext } from '../../provider/contextGlobal'
import ModalComponentJSX from './ModalComponent'
import ModalConfirmComponentJSX from './ModalConfirmSave'
import ResetForm from './ModalResetForm'
import { GetDocuments } from '../../firebase/firebase'
import { inputsProjectValidator } from '../../helpers/helpers'
import HandleSucursal from './HandleSucursal'


const ProjectComponentJSX = () => {

    const { showModal,
        generales,
        setGenerales,
        setModalConfirm,
        modalConfirm,
        errors,
        setErrors,
        handleChange,
        setResetForm,
        resetForm,
        active,
        editEvent,
        handleDeleteDocuments
    } = useContext(sessionContext)


    const {
        tema,
        start,
        end,
        sucursal
    } = generales


    

    let lineas = [];
    const ListComunity = GetDocuments('lineasIntervencion');
    const { pending, coleccion } = ListComunity
    if (pending) return false

    coleccion.map(linea => lineas.push({ value: linea, label: linea }));


    // funcion utilizada para guardar el documento en la coleccion
    // se une el objeto local al objeto global y pasa a la coleccion
    const saveProjectEvent = () => {
        const erroresValidacion = inputsProjectValidator(generales)
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
            <HandleSucursal />
            <div className="justify-content-between mt-0 ml-0 row">
                <label className="text-left" id='labelInicio'>Inicio</label>
                <input
                    type='datetime-local'
                    onChange={e => handleChange(e)}
                    defaultValue={start}
                    disabled={(sucursal === '' || !active) ? true : false}
                    className={` ${errors.fechaFin ? ('border border-danger') : null}`}
                    name='start'
                    id="start"
                    required={true}
                />
            </div>
            <div className="justify-content-between mt-1 ml-0 row">
                <label className="text-left" id='labelFin' >Fin</label>
                <input
                    type='datetime-local'
                    onChange={e => handleChange(e)}
                    defaultValue={end}
                    className={` ${errors.fechaFin ? ('border border-danger') : null}`}
                    name='end'
                    id="end"
                    required={true}
                    disabled={(sucursal === '' || !active) ? true : false}
                />
                {(errors.fechaFin || errors.fechaInicio) && (<small className="text-center text-danger col-12 mr-auto">{errors.fechaFin || errors.fechaInicio}</small>)}
            </div>

            <div className="row">
                <label className="text-left" id="labelTema">Tema</label>
                <input
                    type="text"
                    name="tema"
                    id="tema"
                    required={true}
                    disabled={(sucursal === '' || !active) ? true : false}
                    value={tema}
                    onChange={e => handleChange(e)}
                    className={`${errors.tema ? ('border border-danger') : null}`}
                />
                {errors.tema && (<small className="text-center text-danger col-12 mr-auto">{errors.tema}</small>)}
            </div>

            <div className="justify-content-around row mt-4" >
                {(editEvent) && (
                    <Button
                        color="danger"
                        className="col-3 buttonsProjects"
                        onClick={() => (handleDeleteDocuments(generales.title))}
                    >
                        Eliminar
                    </Button>
                )}
                <Button
                    color="warning"
                    className="col-3 buttonsProjects"
                    onClick={() => (setResetForm(true))}
                >
                    Cancelar
                        </Button>
                <Button
                    type='submit'
                    color="primary"
                    required={true}
                    className="col-3 buttonsProjects"
                    onClick={() => saveProjectEvent()}
                >
                    Registrar
                </Button>
            </div>

            {showModal && (<ModalComponentJSX />)}
            {modalConfirm && (<ModalConfirmComponentJSX />)}
            {resetForm && (<ResetForm />)}
        </>
    );
}

export default ProjectComponentJSX;