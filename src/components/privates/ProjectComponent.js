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
        setProjectInfo,
        projectInfo,
        resetDropdown
    } = useContext(sessionContext)




    const { tema, fechaFin, fechaInicio, listaDeComunidadesAsignadas } = projectInfo

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
        setProjectInfo({
            ...projectInfo,
            listaDeComunidadesAsignadas: e
        })
    }


    // manejador de valores de entrada del formulario
    // objeto global
    const handleChange = e => {
        setProjectInfo({
            ...projectInfo,
            [e.target.name]: e.target.value
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
        const erroresValidacion = inputsProjectValidator(generales, listaDeComunidadesAsignadas, fechaInicio, fechaFin, tema)
        if (Object.keys(erroresValidacion).length === 0) {
            setGenerales({
                ...generales,
                listaDeComunidadesAsignadas,
                start: fechaInicio.replace('T', " "),
                end: fechaFin.replace('T', " "),
                bgcolor: Math.floor(Math.random() * 16777215).toString(16), //funcion que genera el color de manera aleatoria
                tema
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
                            name="comunity"
                            handleOnChange={e => selectCommunity(e)}
                            required='true'
                            className={`col-6 ${errors.lineasIntervencion ? ('border border-danger') : null}`}
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
                    defaultValue={fechaInicio}
                    className={` ${errors.fechaFin ? ('border border-danger') : null}`}
                    style={{ fontSize: '12px', height: '4vh', width: '10vw' }}
                    name='fechaInicio'
                    required='true'
                />

                <Input
                    type='datetime-local'
                    onChange={e => handleChange(e)}
                    defaultValue={fechaFin}
                    className={` ${errors.fechaFin ? ('border border-danger') : null}`}
                    style={{ fontSize: '12px', height: '4vh', width: '10vw' }}
                    name='fechaFin'
                    required='true'
                />
                {errors.fechaFin && (<small className="text-center text-danger">{errors.fechaFin}</small>)}
            </FormGroup>

            <FormGroup row>
                <Label className="col-3 mt-2">Tematica</Label>
                <Input
                    type="text"
                    name="tema"
                    required='true'
                    value={tema}
                    onChange={e => handleChange(e)}
                    className={`col-9 ${errors.tema ? ('border border-danger') : null}`}
                />
                {errors.tema && (<small className="text-center text-danger">{errors.tema}</small>)}
            </FormGroup>
            <FormGroup className="text-center">
                <Button
                    type='submit'
                    color="primary"
                    // size='lg'
                    style={{ borderRadius: '25px', fontSize: '20px', marginTop: '1rem' }}
                    onClick={() => saveProjectEvent()}
                >
                    Guardar
                </Button>
            </FormGroup>

            {showModal &&
                (<ModalComponentJSX />)
            }
            {modalConfirm &&
                (<ModalConfirmComponentJSX />)

            }
        </>
    );
}

export default ProjectComponentJSX;