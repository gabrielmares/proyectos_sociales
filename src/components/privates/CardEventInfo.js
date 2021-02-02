import { useContext, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Row } from 'reactstrap'
import { sessionContext } from '../../provider/contextGlobal'
import moment from 'moment'

const CardComponent = ({ event }) => {
    // eslint-disable-next-line 
    const [localEvent, setLocalEvent] = useState(event)

    const {
        title,
        responsable,
        start,
        end,
        tipoEvento,
        placeEvent,
    } = localEvent


    const {
        setSidebar,
        setResetDropdown,
        setActive,
        setGenerales,
    } = useContext(sessionContext)

    // formatear la fecha en modo DD/MM/DDDD
    const parseDate = (date1) => {
        const date = new Date(date1)
        const datetime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        return datetime;
    }



    // funcion que pasa al formulario al objeto a editar o cerrar
    const handleEditEvent = (localEvent) => {
        setResetDropdown(false);
        setActive(!moment(localEvent.end.split(" ")[0]).isBefore(moment(), 'day'))
        setGenerales({
            ...localEvent,
            start: localEvent.start.replace(' ', "T"),
            end: localEvent.end.replace(' ', "T")
        });
        setSidebar(false);
        setResetDropdown(true);
    }



    return (
        <Card onDoubleClick={e => handleEditEvent(localEvent)} style={{ cursor: 'pointer' }}>
            <CardHeader>
                <Row>
                    <span className="text-left mr-auto " style={{ fontSize: '14px' }}><strong>{title}</strong></span>
                    <span style={{ fontSize: '11px', marginRight: '2px', textTransform: 'uppercase' }}>
                        {/* tipo de evento, si es proyecto aparecen "En Campo", si no, lo que se almaceno en la coleccion */}
                        {(parseInt(tipoEvento) === 1) ? ('En Campo') : (placeEvent)}
                    </span>
                </Row>
            </CardHeader>
            <CardBody>
                <span>{responsable}</span>
            </CardBody>
            <CardFooter style={{ fontSize: '11px' }}>
                <Row>
                    {/* fecha de inicio del evento y fecha final */}
                    <span className="text-left mr-auto">{parseDate(start)}</span>
                    <span className="text-right">{parseDate(end)}</span>
                </Row>
            </CardFooter>
        </Card>
    );
}

export default CardComponent;