import { createContext, useState } from 'react';
import { GetEvents } from '../firebase/firebase'

export const sessionContext = createContext();

const GlobalContext = (props) => {


    const [sidebar, setSidebar] = useState(true)  // state que muestra el formulario sidebar para registro de eventos
    const [showModal, setShowModal] = useState(false) // I/O del modal que agrega nuevos valores a las listas desplegables
    const [propsModal, setPropsModal] = useState({}); //cuando se llama al modal de agregar comunidades o lineas de interes, se pasan las props por este objeto
    const [active, setActive] = useState(true) //activa y desactiva el formulario cuando el evento ya se ha cerrado
    const [modalConfirm, setModalConfirm] = useState(false) //manejo de entrada y salida del modal de confirmacion
    const [errors, setErrors] = useState({}) //manejo de errores del formulario
    const [resetDropdown, setResetDropdown] = useState(false) // estado que vacia los dropdown multiselect cuando se guarda la informacion en la coleccion
    const [resetForm, setResetForm] = useState(false)


    // objeto global que almacena la informacion del formulario, contiene todo los campos del evento
    const [generales, setGenerales] = useState({
        id:'',
        objective: "",
        title: "",
        allday: false,
        responsable: "",
        lineasIntervencion: [],
        tipoEvento: 0,
        listaDeComunidadesAsignadas: [],
        tema: '',
        impactPeople: '0',
        period: '1',
        start: '',
        end: '',
        eventSelection: '',
        placeEvent: '',
        bgcolor: '',
        emailAsistentes: ''
    });

    const handleChange = e => {
        setGenerales({
            ...generales,
            [e.target.name]: e.target.value
        })
    }


    // descarga de eventos, pasamos la coleccion como parametro
    // cuando termina la descarga de eventos, pasan a la vista
    const listEventsOnBD = GetEvents('listaEventos');

    const { pending, coleccion } = listEventsOnBD

    if (pending) return false



    return (
        <sessionContext.Provider
            value={{
                sidebar,
                errors,
                setErrors,
                setSidebar,
                showModal,
                setShowModal,
                propsModal,
                setPropsModal,
                generales,
                setGenerales,
                modalConfirm,
                setModalConfirm,
                coleccion,
                setResetDropdown,
                resetDropdown,
                active,
                setActive,
                handleChange,
                resetForm,
                setResetForm
            }}
        >
            {props.children}
        </sessionContext.Provider>
    );
}

export default GlobalContext;