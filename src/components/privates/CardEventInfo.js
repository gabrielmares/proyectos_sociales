import { useContext } from 'react'
import { Card, CardBody, CardFooter, CardTitle } from 'reactstrap'
import { sessionContext } from '../../provider/contextGlobal'


const CardComponent = ({ event }) => {

    const {
        title,
        responsable,
        start,
        end,
        tipoEvento,
        placeEvent,
    } = event


    const {
        handleEditEvent
    } = useContext(sessionContext)

    // formatear la fecha en modo DD/MM/DDDD
    const parseDate = (date1) => {
        const date = new Date(date1)
        const datetime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        return datetime;
    }

    return (
        <Card onDoubleClick={() => handleEditEvent(event)} className="cardEvent">
            <CardTitle tag='h6' className="pt-2 ml-3"><strong>{title}</strong>
                <span className="float-right mt-1 mr-3">
                    {(parseInt(tipoEvento) === 1) ? ('En Campo') : (placeEvent)}
                </span>
            </CardTitle>
            <CardBody>
                <span>{responsable}</span>
            </CardBody>
            <CardFooter className="footerCardCSS" >
                {/* fecha de inicio del evento y fecha final */}
                <span className="float-left">{parseDate(start)}</span>
                <span className="float-right">{parseDate(end)}</span>
            </CardFooter>
        </Card>
    );
}

export default CardComponent;