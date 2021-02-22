import { useContext } from 'react';
import ProjectComponentJSX from './ProjectComponent'
import ComponentActivity from './ActivityComponent'
import { sessionContext } from '../../provider/contextGlobal'
import ModalComponentJSX from './ModalComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap"
import { GetDocuments } from '../../firebase/firebase'
import ActivityComponent from "./VirtualActivity";
function SidebarFlex() {

    const {
        showModal,
        setShowModal,
        generales,
        errors,
        active,
        setGenerales,
        setPropsModal,
        resetDropdown,
        handleChange
    } = useContext(sessionContext);
    const { title,
        responsable,
        lineasIntervencion,
        objective,
        tipoEvento,
    } = generales;



    // funcion que descarga las lineas de internvencion almacenadas en la coleccion
    const ListComunity = GetDocuments('lineasIntervencion');

    const { pending, coleccion } = ListComunity

    if (pending) return false


    const selectLinesOpportunity = e => {
        setGenerales({
            ...generales,
            lineasIntervencion: e
        });
    };

    // objeto que pasa al modal para desplegar informacion y seleccion de modelo a almacenar
    const Agregar = {
        modelo: 'lineasIntervencion',
        titulo: 'Agregar linea de intervencion',
        cuerpoMsg: 'linea',
        placeholder: 'nueva linea de intervencion'
    };

    const showAndPropsModal = () => {
        setPropsModal(Agregar);
        setShowModal(true);
    };


    const componentShow = (tipoEvento) => {
        switch (parseInt(tipoEvento)) {
            case 1:
                return <ProjectComponentJSX />;
            case 2:
                return <ComponentActivity />
            case 3:
                return <ActivityComponent />

            default:
                return false
        }
    }


    return (
        <div className="container sidebarCss">
            <h4 className="text-center">Registro</h4>
            <h6>*Todos los campos son obligatorios</h6>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
                <div className="row">
                    <label id="labelActividad" >Actividad</label>
                    <input
                        id="titleEvent"
                        type="text"
                        name="title"
                        value={title}
                        required={true}
                        disabled={!active}
                        onChange={e => handleChange(e)}
                        className={`  ${errors.title ? ('border border-danger') : null} `} />
                    {errors.title && (<small className="text-center text-danger col-12 mr-auto">{errors.title}</small>)}
                </div>
                <div className="row">
                    <label id="labelResponsable" >Responsable</label>
                    <input
                        type='text'
                        id="responsableProyecto"
                        name="responsable"
                        value={responsable}
                        onChange={e => handleChange(e)}
                        required={true}
                        disabled={!active}
                        className={` ${errors.responsable ? ('border border-danger') : null} `} />
                    {errors.responsable && (<small className="text-center text-danger col-12 mr-auto">{errors.responsable}</small>)}
                </div>
                <div className="row">
                    <label id="labelObjetivo" >Objetivo</label>
                    <input
                        type='text'
                        id="objetivoProyecto"
                        name="objective"
                        value={objective}
                        onChange={e => handleChange(e)}
                        required={true}
                        disabled={!active}
                        className={` ${errors.objetivo ? ('border border-danger') : null}`} />
                    {errors.objetivo && (<small className="text-center text-danger col-12 mr-auto">{errors.objetivo}</small>)}
                </div>

                <div className="row">
                    {(!showModal || !resetDropdown) &&
                        (<DropdownMultiselect
                            placeholder="Lineas de Intervencion"
                            options={coleccion}
                            buttonClass={` oportunityLines ${errors.lineasIntervencion ? ('border border-danger') : null} ${!active && ('oportunityLinesDisable')} `}
                            disabled={!active}
                            required={true}
                            selected={lineasIntervencion}
                            name="lineasIntervencion"
                            handleOnChange={e => selectLinesOpportunity(e)}
                        />)}
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className={`iconcolor  ${showModal && ('align-items-end')} `}
                        onClick={() => showAndPropsModal()}
                        title="Nueva linea" />
                    {errors.lineasIntervencion && (<small className="text-center text-danger col-12 mr-auto">{errors.lineasIntervencion}</small>)}

                </div>

                <div className="row">
                    <label id="labelEvento">Tipo</label>
                    <select
                        id="tipoEvento"
                        name="tipoEvento"
                        disabled={!active}
                        value={tipoEvento}
                        onChange={e => handleChange(e)}
                        required={true}
                    >
                        <option value="" defaultValue>Proyecto/Actividad</option>
                        <option value={1}>Proyecto en campo</option>
                        <option value={2}>Actividad en comunidad</option>
                        <option value={3}>Actividad virtual</option>
                    </select>
                </div>
                {(tipoEvento !== "") && componentShow(tipoEvento)}
            </form>
            {showModal && (<ModalComponentJSX />)}
        </div>

    );
}

export default SidebarFlex;