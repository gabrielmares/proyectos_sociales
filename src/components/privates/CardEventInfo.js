import { useContext, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Row } from 'reactstrap'
import { sessionContext } from '../../provider/contextGlobal'
import moment from 'moment'

const CardComponent = ({ event }) => {
// eslint-disable-next-line 
    const [localEvent, setLocalEvent] = useState(event)

    const { title,
        lugar,
        responsable,
        start,
        end,
        tipoEvento, } = localEvent


    const {
        setGenerales,
        setProjectInfo,
        setOnSite,
        setDateEvent,
        setperiod,
        setSidebar,
        setResetDropdown,
        setVirtualEvent,
        setActive,
        setSelection,
        setImpacto
    } = useContext(sessionContext)

    // formatear la fecha en modo DD/MM/DDDD
    const parseDate = (date1) => {
        const date = new Date(date1)
        const datetime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        return datetime;
    }


    const handleEditEvent = (e) => {
        setActive(!moment(e.end.split(" ")[0]).isBefore(moment(), 'day'))
        const {
            title,
            responsable,
            start,
            end,
            lineasIntervencion,
            impacto,
            objetivo,
            tema,
            tipoEvento,
            listaDeComunidadesAsignadas
        } = e
        setImpacto(impacto);
        setGenerales({
            objetivo,
            title,
            responsable,
            lineasIntervencion,
            tipoEvento,
        })
        setSidebar(false);
        if (parseInt(tipoEvento) === 1) {
            return setProjectInfo({
                listaDeComunidadesAsignadas,
                fechaInicio: start.replace(' ', "T"),
                fechaFin: end.replace(' ', "T"),
                tema
            })
        }
        setResetDropdown(false);
        if (parseInt(tipoEvento) === 2) {
            return updateEvent(localEvent)
        }
        setResetDropdown(true);

    }

    const updateEvent = (evento) => {
        const { period, lugar, invitados, start, end, selection } = evento
        setOnSite(lugar || "");
        setperiod(period || "");
        setSelection(selection || 0);
        setVirtualEvent(invitados || "");
        setDateEvent({
            start: start.replace(' ', 'T'),
            end: end.replace(' ', 'T')
        });
    }


    return (
        <Card onDoubleClick={e => handleEditEvent(localEvent)} style={{ cursor: 'pointer' }}>
            <CardHeader>
                <Row>
                    <span className="text-left mr-auto " style={{ fontSize: '14px' }}><strong>{title}</strong></span>
                    <span style={{ fontSize: '11px', marginRight: '2px', textTransform: 'uppercase' }}>
                        {/* tipo de evento, si es proyecto aparecen COMUNIDADES, si no, lo que se almaceno en la coleccion */}
                        {(parseInt(tipoEvento) === 1) ? ('COMUNIDADES') : (lugar)}
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