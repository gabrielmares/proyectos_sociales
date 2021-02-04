import { useContext, useState } from 'react'
import { sessionContext } from '../../provider/contextGlobal'
import CardComponent from './CardEventInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { faBell } from '@fortawesome/free-solid-svg-icons'


const SidebarEventsComponent = () => {

    const { coleccion } = useContext(sessionContext)
    const [toggle, setToggle] = useState(false)
    let newArray = [], outDatePending = [];
    // mapeo de eventos del dia que se desplegaran en el sidebarEvents
    coleccion.map(event => {
        // cuando el evento es actividad de un dia, se valida que el evento sea solo de este dia
        if (moment(event.start).isSame(Date.now(), '[]') && parseInt(event.tipoEvento) === 2) {
            newArray.push(event)
        }
        if (moment(event.start).isSame(Date.now(), '[]') && parseInt(event.tipoEvento) === 1) {
            newArray.push(event)
        }
        if (parseInt(event.tipoEvento) === 1 && (moment(event.start).isSame(Date.now(), '[]') || (moment().isBetween(event.start, event.end, '[]')))) {
            newArray.push(event)
        }
        return newArray
    })

    // revision de objetos fuera de fecha que aun no tienen el numero de personas impactadas
    outDatePending = coleccion.filter(event => (moment(event.end).isBefore(moment(), '[]') && parseInt(event.impactPeople) === 0))
    console.log(outDatePending, coleccion, newArray)

    return (
        <>
            <div className="row pt-4 pb-2">
                {(!toggle || outDatePending.length === 0) ? ((newArray.length > 0) ? (<h4 className="ml-auto" >Actividades para hoy</h4>)
                    : (<h4 className="ml-auto">Sin programacion para hoy</h4>))
                    : (<h4 className="ml-auto">Eventos pendientes de cierre</h4>)
                }
                <i
                    title={` ${(outDatePending.length > 0) ? ('Hay eventos pendientes de cerrar') : ('Sin cierres pendientes')}`}
                    className="ml-auto"
                    onClick={() => (outDatePending.length > 0) && setToggle(!toggle)}
                >
                    <FontAwesomeIcon
                        icon={faBell}
                        className={`${(outDatePending.length > 0) && ('iconBell')}  ml-auto mr-4`}
                        // size='2x'
                    />
                </i>
            </div>

            {((!toggle && newArray.length > 0) || outDatePending.length === 0) && (newArray.map((thisEvent, index) => (<CardComponent key={index} event={thisEvent} />)))}
            {(toggle && outDatePending.length > 0) && (outDatePending.map((outdate, index) => (<CardComponent key={index} event={outdate} />)))}


        </>
    );
}

export default SidebarEventsComponent;