import { useContext } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import { sessionContext } from '../../provider/contextGlobal';
require('moment/locale/es-mx');
const Localizer = momentLocalizer(moment);



const CalendarComponent = () => {


    const {
        setSidebar,
        sidebar,
        coleccion,
        setResetDropdown,
        setActive,
        setGenerales
    } = useContext(sessionContext)

    const colectionPrepare = coleccion.map(evento => {
        // preparamos los objetos a desplegar en formulario
        // como fechas aceptables por el componente Calendar
        return {
            ...evento,
            start: new Date(evento.start),
            end: new Date(evento.end)
        }
    })


    const handleEditEvent = (id) => {
        const localEvent = coleccion.filter(evento => evento.id === id)
        console.log(localEvent)
        setResetDropdown(false);
        setActive(!moment(localEvent[0].end.split(" ")[0]).isBefore(moment(), 'day'))
        setGenerales({
            ...localEvent[0],
            start: localEvent[0].start.replace(' ', "T"),
            end: localEvent[0].end.replace(' ', "T")
        });
        setSidebar(false);
        setResetDropdown(true);
    }



    return (
        <Container fluid={true} style={{ height: 'auto' }} >
            <div className="d-flex flex-row-reverse pb-4 pt-2">
                <i onClick={() => setSidebar(!sidebar)}
                    style={{ cursor: "pointer" }}
                    title="Nuevo"
                >
                    <FontAwesomeIcon
                        icon={faCalendarPlus}
                        className="iconcolor"
                        size="3x"
                    />
                </i>
            </div>
            <div className="bigCalendar-container">
                <Calendar
                    localizer={Localizer}
                    events={(colectionPrepare === [] || colectionPrepare === undefined) ? ([]) : (colectionPrepare)} //si hay error en la descarga o no encontro eventos, 
                    // colocamos un array en blanco, evitando el bloqueo de la aplicacion
                    onDoubleClickEvent={(event) => handleEditEvent(event.id)}
                    startAccessor="start"
                    endAccessor="end"
                    messages={{
                        next: "Siguiente",
                        previous: "Anterior",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día"
                    }}

                    eventPropGetter={
                        (event) => {
                            let newStyle = {
                                backgroundColor: '#' + event.bgcolor,
                                color: 'white',
                                borderRadius: "0px",
                                border: "none"
                            };

                            if (!event.bgcolor) {
                                newStyle.backgroundColor = "lightgreen"
                            }

                            return {
                                className: "",
                                style: newStyle
                            };
                        }
                    }

                />
            </div>
        </Container>


    );
}

export default CalendarComponent;