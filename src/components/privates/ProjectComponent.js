import { FormGroup, Input, Label, Col, Button } from 'reactstrap'
import { useContext } from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import "react-datetime/css/react-datetime.css";
import 'moment/locale/es-mx'
import { sessionContext } from '../../provider/contextGlobal'
import ModalComponentJSX from './ModalComponent'
import ModalConfirmComponentJSX from './ModalConfirmSave'
import ResetForm from './ModalResetForm'
import { GetDocuments } from '../../firebase/firebase'
import { inputsProjectValidator } from '../../helpers/helpers'


const ProjectComponentJSX = () => {

    const { setShowModal,
        showModal,
        setPropsModal,
        generales,
        setGenerales,
        setModalConfirm,
        modalConfirm,
        errors,
        setErrors,
        active,
        resetDropdown,
        handleChange,
        setResetForm,
        resetForm
    } = useContext(sessionContext)




    const {
        tema,
        start,
        end,
        listaDeComunidadesAsignadas,
        impactPeople
    } = generales

    // objeto que pasa al modal para desplegar informacion y seleccion de modelo a almacenar
    const Agregar = {
        modelo: 'comunidades',
        titulo: 'Agregar Comunidad',
        cuerpoMsg: 'comunidad',
        placeholder: 'la comunidad',
    }


    // funcion que lee los datos almacenados en la coleccion
    const ListComunity = GetDocuments('comunidades');

    // destructuramos ol objeto recibido de la funcion
    // revisamos el status del mismo para ser enviado a pantalla
    const { pending, coleccion } = ListComunity

    // cuando responde la funcion y aun no se resuelve, se regresa
    // hasta que la funcion termine su ejecucion
    if (pending) return false

    // funcion que sobrescribe las comunidades al objeto
    const selectCommunity = e => {
        setGenerales({
            ...generales,
            listaDeComunidadesAsignadas: e
        })
    }


    // pantalla modal utilizada para agregar
    // nueva comunidad de operacion de proyectos
    const showAndPropsModal = () => {
        setPropsModal(Agregar)
        setShowModal(true)
    }

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
            <FormGroup row inline className="btndropdown">
                <Col >
                    {(!showModal || !resetDropdown) && ( //comparacion que restablece el componente despues de agregar un campo o un nuevo evento
                        <DropdownMultiselect
                            placeholder="Comunidades"
                            options={coleccion}
                            selected={listaDeComunidadesAsignadas}
                            name="listaDeComunidadesAsignadas"
                            disabled={!active}
                            handleOnChange={e => selectCommunity(e)}
                            required={true}
                            className={`col-6 ${errors.listaDeComunidadesAsignadas ? ('border border-danger') : null}`}
                        />
                    )}
                </Col>
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    className={`iconcolor mt-1  ${showModal && ('align-items-end')}`}
                    size='2x'
                    onClick={() => showAndPropsModal()}
                    title="Agregar comunidades"
                />
                {errors.listaDeComunidadesAsignadas && (<small className="text-center text-danger">{errors.listaDeComunidadesAsignadas}</small>)}
            </FormGroup>
            <FormGroup row>
                <Label className="col-6 text-center">Inicio</Label>
                <Label className="col-6 text-center">Fin</Label>
            </FormGroup>
            <FormGroup row className="ml-1 justify-content-between">
                <Input
                    type='datetime-local'
                    onChange={e => handleChange(e)}
                    defaultValue={start}
                    disabled={!active}
                    className={` ${errors.fechaFin ? ('border border-danger') : null}`}
                    style={{ fontSize: '12px', height: '4vh', width: '10vw' }}
                    name='start'
                    required={true}
                />

                <Input
                    type='datetime-local'
                    onChange={e => handleChange(e)}
                    defaultValue={end}
                    className={` ${errors.fechaFin ? ('border border-danger') : null}`}
                    style={{ fontSize: '12px', height: '4vh', width: '10vw' }}
                    name='end'
                    required={true}
                    disabled={!active}
                />
                {errors.fechaFin && (<small className="text-center text-danger">{errors.fechaFin}</small>)}
            </FormGroup>

            <FormGroup row>
                <Label className="col-3 mt-2">Tematica</Label>
                <Input
                    type="text"
                    name="tema"
                    required={true}
                    disabled={!active}
                    value={tema}
                    onChange={e => handleChange(e)}
                    className={`col-9 ${errors.tema ? ('border border-danger') : null}`}
                />
                {errors.tema && (<small className="text-center text-danger">{errors.tema}</small>)}
            </FormGroup>
            <FormGroup row hidden={active}>
                <Label className="col-6 mt-2">Numero de asistentes</Label>
                <Input
                    type="number"
                    name="impactPeople"
                    required={true}
                    disabled={active}
                    value={impactPeople}
                    onChange={e => handleChange(e)}
                    className={`col-6 ${errors.impacto ? ('border border-danger') : null}`}
                />
                {errors.impacto && (<small className="text-center text-danger">{errors.impacto}</small>)}
            </FormGroup>
            <FormGroup className="justify-content-center" row>
                <Button
                    color="warning"
                    style={{ borderRadius: '25px', fontSize: '18px', marginTop: '1rem', marginRight: '1rem' }}
                    onClick={() => (setResetForm(true))}
                    className="col-4"
                >
                    Restablecer
                        </Button>
                <Button
                    type='submit'
                    color="primary"
                    // size='lg'
                    size='lg'
                    required={true}
                    style={{ borderRadius: '25px', fontSize: '18px', marginTop: '1rem', marginLeft:'1rem' }}
                    className="col-4"
                    onClick={() => saveProjectEvent()}
                >
                    Registrar
                </Button>

            </FormGroup>

            {showModal && (<ModalComponentJSX />)}
            {modalConfirm && (<ModalConfirmComponentJSX />)}
            {resetForm && (<ResetForm />)}
        </>
    );
}

export default ProjectComponentJSX;