import { useContext } from 'react'
import { Col, Form, FormGroup, Input, Label } from 'reactstrap'
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
        active,
        handleChange
    } = useContext(sessionContext)
    const { title, responsable, objective, tipoEvento, lineasIntervencion } = generales
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


    const selectLinesOpportunity = e => {
        setGenerales({
            ...generales,
            lineasIntervencion: e
        })
    }


    const showAndPropsModal = () => {
        setPropsModal(Agregar)
        setShowModal(true)
    }

    return (
        <Col className="sidebarCss" >
            <Col className="justify-content-center">
                <h3 className="text-center">Registro</h3>
                <h6 className="text-center" >*Todos los campos son obligatorios</h6>
            </Col>
            <Form onSubmit={e => e.preventDefault()} noValidate>
                <FormGroup row style={{marginTop:'-0.1em'}}>
                    <Label id="labelNombrePro" for="nombreProyecto" className="labelsForm" >Actividad</Label>
                    <Input type="text"
                        id="nombreProyecto"
                        name="title"
                        value={title}
                        onChange={e => handleChange(e)}
                        required={true}
                        disabled={!active}
                        className={`  ${errors.lineasIntervencion ? ('border border-danger') : null} `}
                    />
                    {errors.nombre && (<small className="text-center text-danger col-12 mr-auto">{errors.nombre}</small>)}
                </FormGroup>
                <FormGroup row style={{marginTop:'-0.5em'}}>
                    <Label id="labelResPro" for="responsableProyecto" className="labelsForm" >Responsable</Label>
                    <Input
                        type='text'
                        id="responsableProyecto"
                        name="responsable"
                        value={responsable}
                        onChange={e => handleChange(e)}
                        required={true}
                        disabled={!active}
                        className={` ${errors.responsable ? ('border border-danger') : null} `}
                    />
                    {errors.responsable && (<small className="text-center text-danger col-12 mr-auto">{errors.responsable}</small>)}
                </FormGroup>
                <FormGroup row style={{marginTop:'-0.5em'}}>
                    <Label id="objPro" for="objetivoProyecto" className="labelsForm">Objetivo</Label>
                    <Input
                        type='text'
                        id="objetivoProyecto"
                        name="objective"
                        value={objective}
                        onChange={e => handleChange(e)}
                        required={true}
                        disabled={!active}
                        className={` ${errors.objetivo ? ('border border-danger') : null}`}
                    />
                    {errors.objetivo && (<small className="text-center text-danger col-12 mr-auto">{errors.objetivo}</small>)}
                </FormGroup>

                <FormGroup row  style={{marginTop:'-0.5em'}}>
                    <Col>
                        {(!showModal || !resetDropdown) && (<DropdownMultiselect
                            placeholder="Lineas de Intervencion"
                            className={`dropdownsLineas ${errors.lineasIntervencion ? ('border border-danger') : null}`}
                            options={coleccion}
                            disabled={!active}
                            required={true}
                            selected={lineasIntervencion}
                            name="lineasIntervencion"
                            handleOnChange={e => selectLinesOpportunity(e)}
                        />)}
                    </Col>
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className={`iconcolor  ${showModal && ('align-items-end')} `}
                        onClick={() => showAndPropsModal()}
                        title="Agregar comunidades"
                    />
                    {errors.lineasIntervencion && (<small className="text-center text-danger col-12 mr-auto">{errors.lineasIntervencion}</small>)}
                </FormGroup>
                <FormGroup className="row" style={{marginTop:'-1em'}}>
                    <Label id="tipoEven" className="mt-2 col-3 mr-auto" >
                        Tipo
                    </Label>
                    <Input type="select"
                        id="tipoEvento"
                        name="tipoEvento"
                        disabled={!active}
                        placeholder="Proyecto/Actividad"
                        value={tipoEvento}
                        onChange={e => handleChange(e)}
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