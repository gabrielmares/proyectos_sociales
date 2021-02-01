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


    const { setSidebar, sidebar, coleccion } = useContext(sessionContext)

    const colectionPrepare = coleccion.map(evento => {
        return {
            ...evento,
            start: new Date(evento.start),
            end: new Date(evento.end)
        }
    })



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
                    onDoubleClickEvent={(event) => console.log(event)}
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