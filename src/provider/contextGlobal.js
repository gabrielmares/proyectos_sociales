import { createContext, useState } from 'react';
import { GetEvents, DeleteDocument } from '../firebase/firebase'
import moment from 'moment'

export const sessionContext = createContext();

const GlobalContext = (props) => {


    const [sidebar, setSidebar] = useState(true)  // state que muestra el formulario sidebar para registro de eventos
    const [showModal, setShowModal] = useState(false) // I/O del modal que agrega nuevos valores a las listas desplegables
    const [propsModal, setPropsModal] = useState({}); //cuando se llama al modal de agregar comunidades o lineas de interes, se pasan las props por este objeto
    const [active, setActive] = useState(true) //activa y desactiva el formulario cuando el evento ya se ha cerrado
    const [modalConfirm, setModalConfirm] = useState(false) //manejo de entrada y salida del modal de confirmacion
    const [errors, setErrors] = useState({}) //manejo de errores del formulario
    const [resetDropdown, setResetDropdown] = useState(false) // estado que vacia los dropdown multiselect cuando se guarda la informacion en la coleccion
    const [resetForm, setResetForm] = useState(false); //estado que limpia los valores del formulario
    const [addParticipants, setAddParticipants] = useState(false); //estado para el manejo del modal que agregara los participantes en los eventos
    const [editEvent, setEditEvent] = useState(false) //estado para rellenar los campos del formulario


    // objeto global que almacena la informacion del formulario, contiene todo los campos del evento
    const [generales, setGenerales] = useState({
        id: '',
        objective: "",
        title: "",
        allday: false,
        responsable: "",
        lineasIntervencion: [],
        tipoEvento: 0,
        listaDeComunidadesAsignadas: [],
        tema: '',
        impactPeople: [],
        period: '1',
        start: '',
        end: '',
        eventSelection: '',
        placeEvent: '',
        bgcolor: '',
        emailAsistentes: '',
        sucursal: '',
        municipioSelect: '',
        municipioDisplay: ''
    });

    const handleChange = e => {
        setGenerales({
            ...generales,
            [e.target.name]: e.target.value
        })
    }
    // funcion que pasa al formulario al objeto a editar o cerrar evento
    const handleEditEvent = (localEvent) => {
        if (localEvent.impactPeople.length > 0) return alert('este evento ya cerro, para modificarlo, notifique al area de sistemas')
        // revisamos si el evento esta vencido, para reenviar al usuario a la captura de asistentes
        if (moment(localEvent.end).isBefore(Date.now(), '[]') || moment(localEvent.start).isBefore(Date.now(), '[]')) {
            setGenerales(localEvent)
            return setAddParticipants(true);
        }
        setResetDropdown(false);
        // el evento aun no se vencio, pasamos las fechas a formatter para presentarse en los inputs date-time
        setGenerales({
            ...localEvent,
            start: localEvent.start.replace(' ', "T"),
            end: localEvent.end.replace(' ', "T")
        });
        setSidebar(false);
        setActive(true);
        setResetDropdown(true);
        setEditEvent(true);
    }

    const handleDeleteDocuments = (id) => {
        DeleteDocument(id)
            .then(() => {
                alert('Evento eliminado')
                return resetFormFunction()
            })
            .catch(err => console.log(err))
    }


    // descarga de eventos, pasamos la coleccion como parametro

    const listEventsOnBD = GetEvents('listaEventos');

    const { pending, coleccion } = listEventsOnBD
    // cuando termina la descarga de eventos, pasan a la vista
    if (pending) return false
    const resetFormFunction = () => {
        setGenerales({
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
            emailAsistentes: '',
            sucursal: '',
            municipioSelect: '',
            municipioDisplay: ''
        })
        setErrors({});
        setActive(true);
        setResetForm(false);
        setEditEvent(false);
    }




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
                setResetForm,
                addParticipants,
                setAddParticipants,
                handleEditEvent,
                setEditEvent,
                editEvent,
                resetFormFunction,
                handleDeleteDocuments,
                listaDeEventos: coleccion
            }}
        >
            {props.children}
        </sessionContext.Provider>
    );
}

export default GlobalContext;