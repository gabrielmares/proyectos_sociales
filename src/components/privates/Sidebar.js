import { useContext } from 'react'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap"
import ProjectComponentJSX from './ProjectComponent'
import ComponentActivity from './ActivityComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { sessionContext } from '../../provider/contextGlobal'
import ModalComponentJSX from './ModalComponent'
import { GetDocuments } from '../../firebase/firebase'

const SidebarComponent = () => {


    const { setShowModal,
        showModal,
        setPropsModal,
        generales,
        setGenerales,
        errors,
        resetDropdown,
        active
    } = useContext(sessionContext)
    const { title, responsable, objetivo, tipoEvento } = generales
    // objeto que pasa al modal para desplegar informacion y seleccion de modelo a almacenar
    const Agregar = {
        modelo: 'lineasIntervencion',
        titulo: 'Agregar linea de intervencion',
        cuerpoMsg: 'linea',
        placeholder: 'nueva linea de intervencion'
    }



    // const { error_nombre, error_objetivo, error_responsable, error_tipoEvento } = errors
    // funcion que descarga las lineas de internvencion almacenadas en la coleccion
    const ListComunity = GetDocuments('lineasIntervencion');

    const { pending, coleccion } = ListComunity

    if (pending) return false

    const handleChangeInputs = e => {
        setGenerales({
            ...generales,
            [e.target.name]: e.target.value
        })
    }


    const selectLinesOpportunity = e => {
        setGenerales({
            ...generales,
            lineasIntervencion: e
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    const showAndPropsModal = () => {
        setPropsModal(Agregar)
        setShowModal(true)
    }

    return (
        <Col lg={12} >
            <Row>
                <Col className="justify-content-center mt-4">
                    <h3 className="text-center">Registro</h3>
                    <h6 className="text-center mt-2" style={{ fontSize: '12px' }}>*Todos los campos son obligatorios</h6>
                </Col>
            </Row>
            <hr />
            <Form style={{ marginTop: '1rem', marginLeft: '1rem' }} onSubmit={e => handleSubmit(e)} noValidate>
                <FormGroup row>
                    <Label for="nombreProyecto" className="col-4 mt-2">Actividad</Label>
                    <Input type="text"
                        id="nombreProyecto"
                        name="title"
                        value={title}
                        onChange={e => handleChangeInputs(e)}
                        required={true}
                        disabled={!active}
                        className={`col-8  ${errors.lineasIntervencion ? ('border border-danger') : null}`}
                    />
                    {errors.nombre && (<small className="text-center text-danger col-12 mr-auto">{errors.nombre}</small>)}
                </FormGroup>
                <FormGroup row>
                    <Label for="responsableProyecto" className="col-4 mt-2">Responsable</Label>
                    <Input
                        type='text'
                        id="responsableProyecto"
                        name="responsable"
                        value={responsable}
                        onChange={e => handleChangeInputs(e)}
                        required={true}
                        disabled={!active}
                        className={`col-8  ${errors.responsable ? ('border border-danger') : null}`}
                    />
                    {errors.responsable && (<small className="text-center text-danger col-12 mr-auto">{errors.responsable}</small>)}
                </FormGroup>
                <FormGroup row>
                    <Label for="objetivoProyecto" className="col-4 mt-2">Objetivo</Label>
                    <Input
                        type='text'
                        id="objetivoProyecto"
                        name="objetivo"
                        value={objetivo}
                        onChange={e => handleChangeInputs(e)}
                        required={true}
                        disabled={!active}
                        className={`col-8  ${errors.objetivo ? ('border border-danger') : null}`}
                    />
                    {errors.objetivo && (<small className="text-center text-danger col-12 mr-auto">{errors.objetivo}</small>)}
                </FormGroup>

                <FormGroup row >
                    <Col>
                        {(!showModal && !resetDropdown) && (<DropdownMultiselect
                            placeholder="Lineas de Intervencion"
                            options={coleccion}
                            handleOnChange={e => selectLinesOpportunity(e)}
                        />)}
                    </Col>
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className={`iconcolor mt-1  ${showModal && ('align-items-end')}`}
                        size='2x'
                        onClick={() => showAndPropsModal()}
                        title="Agregar comunidades"
                    />
                    {errors.lineasIntervencion && (<small className="text-center text-danger col-12 mr-auto">{errors.lineasIntervencion}</small>)}
                </FormGroup>
                <FormGroup className="row">
                    <Label className="mt-2 col-3 mr-auto">
                        Tipo
                    </Label>
                    <Input type="select"
                        id="tipoEvento"
                        className="col-8"
                        name="tipoEvento"
                        disabled={!active}
                        placeholder="Proyecto/Actividad"
                        value={tipoEvento}
                        onChange={e => handleChangeInputs(e)}
                        required={true}
                    >
                        <option value={0}>Proyecto/Actividad</option>
                        <option value={1}>Proyecto</option>
                        <option value={2}>Actividad</option>
                    </Input>
                    {errors.tipoEvento && (<small className="text-center text-danger col-12 mr-auto">{errors.tipoEvento}</small>)}
                </FormGroup>
                {(parseInt(tipoEvento) === 1)
                    ?
                    (
                        <ProjectComponentJSX />
                    ) :
                    (
                        (parseInt(tipoEvento) === 2) ? (<ComponentActivity />) : undefined
                    )}
            </Form>
            {
                showModal &&
                (
                    <ModalComponentJSX />
                )
            }
        </Col>
    );
}

export default SidebarComponent;