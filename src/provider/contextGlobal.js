import { createContext, useState } from 'react';
import { GetEvents } from '../firebase/firebase'

export const sessionContext = createContext();

const GlobalContext = (props) => {


    const [sidebar, setSidebar] = useState(true)  // state que muestra el formulario sidebar para registro de eventos
    const [showModal, setShowModal] = useState(false) // I/O del modal que agrega nuevos valores a las listas desplegables
    const [propsModal, setPropsModal] = useState({}); //cuando se llama al modal de agregar comunidades o lineas de interes, se pasan las props por este objeto

    const [modalConfirm, setModalConfirm] = useState(false) //manejo de entrada y salida del modal de confirmacion
    const [errors, setErrors] = useState({}) //manejo de errores del formulario

    // objeto global que almacena la informacion de la primera parte
    // del formulario
    const [generales, setGenerales] = useState({
        objetivo: "",
        title: "",
        allday: false,
        responsable: "",
        lineasIntervencion: [],
        tipoEvento: 0
    });

    // objeto global para almacenar la informacion del proyecto
    const [projectInfo, setProjectInfo] = useState({
        listaDeComunidadesAsignadas: [],
        fechaInicio: '',
        fechaFin: '',
        tema: ''
    })

    const [onSite, setOnSite] = useState('')

    const [dateEvent, setDateEvent] = useState({
        start: '',
        end: '',
    })


    // descarga de eventos, pasamos la coleccion como parametro
    // cuando termina la descarga de eventos, pasan a la vista
    const listEventsOnBD = GetEvents('listaEventos');

    const { pending, coleccion } = listEventsOnBD

    if (pending) return false



    return (
        <sessionContext.Provider
            value={{
                sidebar,
                projectInfo,
                errors,
                setErrors,
                setSidebar,
                setProjectInfo,
                showModal,
                setShowModal,
                propsModal,
                setPropsModal,
                generales,
                setGenerales,
                modalConfirm,
                setModalConfirm,
                coleccion,
                setOnSite,
                onSite,
                dateEvent,
                setDateEvent
            }}
        >
            {props.children}
        </sessionContext.Provider>
    );
}

export default GlobalContext;