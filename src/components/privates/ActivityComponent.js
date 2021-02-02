import { useContext } from 'react'
import { Input, Label, FormGroup } from 'reactstrap'
import ActivityOnSiteComponent from './OnSiteActivity'
import { sessionContext } from '../../provider/contextGlobal'
import { changeDate } from '../../helpers/helpers'
import ActivityComponent from './VirtualActivity'
// import { parse } from '@fortawesome/fontawesome-svg-core'

const ComponentActivity = () => {


    const {
        errors,
        generales,
        setGenerales,
        handleChange,
        active
    } = useContext(sessionContext)




    const { start, period, eventSelection } = generales
    const handleChangeDate = (e, period) => {
        const newDate = changeDate(e, period)   //llamada  la funcion que formatea la fecha de culminacion del evento
        //  recibe la fecha del input datetime y de las horas del evento
        setGenerales({
            ...generales,
            start: (e).replace('T', " "),
            end: newDate.toJSON().replace('T', " ").replace('UTC', "")
        })
    }


    return (
        <>

            <FormGroup row>
                <Label className="col-6 text-center">Fecha y hora</Label>
                <Label className="col-6 text-right">Horas de duracion</Label>

            </FormGroup>
            <FormGroup row>
                <Input
                    type='datetime-local'
                    onChange={e => handleChangeDate(e.target.value, period)}
                    defaultValue={start}
                    disabled={!active}
                    className={`col-6 ${errors.dateEvent ? ('border border-danger') : null}`}
                    style={{ fontSize: '12px', height: '4vh' }}
                    name='start'
                    required={true}
                />

                <Input
                    type='number'
                    required={true}
                    min={1}
                    disabled={!active}
                    value={period}
                    name='period'
                    className="ml-auto col-5"
                    onChange={e => handleChangeDate(start, e.target.value)}

                />
                {errors.dateEvent && (<small className="text-center text-danger col-12 mr-auto">{errors.dateEvent}</small>)}
            </FormGroup>
            <FormGroup row>
                <Label className="col-3 mr-auto">Tipo de actividad</Label>
                <Input
                    type="select"
                    value={eventSelection}
                    name="eventSelection"
                    required={true}
                    disabled={!active}
                    className="col-8"
                    onChange={e => handleChange(e)}>
                    <option value={0} unselectable>Formato</option>
                    <option value={1}>Presencial</option>
                    <option value={2}>Virtual</option>
                </Input>
            </FormGroup>
            {(parseInt(eventSelection) === 1) ? (
                <ActivityOnSiteComponent />
            ) : (
                    (parseInt(eventSelection) === 2) && (
                        <ActivityComponent />
                    )
                )}

        </>
    );
}

export default ComponentActivity;