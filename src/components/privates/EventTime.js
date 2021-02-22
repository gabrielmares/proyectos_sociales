import { useContext } from 'react'
import { sessionContext } from '../../provider/contextGlobal'
import { changeDate } from '../../helpers/helpers'

const EventTime = () => {
    const {
        errors,
        generales,
        setGenerales,
        active
    } = useContext(sessionContext)




    const { start, period } = generales
    const handleChangeDate = (e, period) => {
        const newDate = changeDate(e, period)   //llamada  la funcion que formatea la fecha de culminacion del evento
        //  recibe la fecha del input datetime y de las horas del evento
        setGenerales({
            ...generales,
            period,
            start: (e).replace('T', " "),
            end: newDate.toJSON().replace('T', " ").replace('.000Z', "")
        })
    }

    return (
        <>
            <div className="row" >
                <label id="dateToMeeting">Fecha</label>
                <input
                    type='datetime-local'
                    onChange={e => handleChangeDate(e.target.value, period)}
                    defaultValue={start}
                    disabled={!active}
                    className={` ${errors.fechaEvento ? ('border border-danger') : null}`}
                    name='start'
                    id="start"
                    required={true}
                />
                {errors.fechaEvento && (<small className="text-center text-danger col-12 mr-auto">{errors.fechaEvento}</small>)}
            </div>
            <div className="row">
                <label id="timeforMeeting" >Horas</label>
                <input
                    type='number'
                    required={true}
                    min={1}
                    id="period"
                    disabled={(!active || start === "") && true}
                    value={period}
                    name='period'
                    onChange={e => handleChangeDate(start, e.target.value)}

                />
                {errors.dateEvent && (<small className="text-center text-danger col-12 mr-auto">{errors.dateEvent}</small>)}
            </div>
        </>
    );
}

export default EventTime;