import { useState, useContext } from 'react'
import { Input, Label, FormGroup } from 'reactstrap'
import ActivityOnSiteComponent from './OnSiteActivity'
import { sessionContext } from '../../provider/contextGlobal'
import { changeDate } from '../../helpers/helpers'
import ActivityComponent from './VirtualActivity'
// import { parse } from '@fortawesome/fontawesome-svg-core'

const ComponentActivity = () => {


    const { dateEvent, setDateEvent, errors } = useContext(sessionContext)

    const [selection, setSelection] = useState(0)
    const [period, setperiod] = useState('1')

    const { start } = dateEvent
    const handleChange = (e, period) => {
        const newDate = changeDate(e, period)   //llamada  la funcion que formatea la fecha de culminacion del evento
        //  recibe la fecha del input datetime y de las horas del evento
        setperiod(period)
        setDateEvent({
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
                    onChange={e => handleChange(e.target.value, period)}
                    defaultValue={start}
                    className={`col-6 ${errors.dateEvent ? ('border border-danger') : null}`}
                    style={{ fontSize: '12px', height: '4vh' }}
                    name='start'
                    required='true'
                />

                <Input
                    type='number'
                    min={1}
                    value={period}
                    className="ml-auto col-5"
                    onChange={e => handleChange(start, e.target.value)}

                />
                {errors.dateEvent && (<small className="text-center text-danger col-12 mr-auto">{errors.dateEvent}</small>)}
            </FormGroup>
            <FormGroup row>
                <Label className="col-3 mr-auto">Tipo de actividad</Label>
                <Input
                    type="select"
                    value={selection}
                    name="tipoActividad"
                    className="col-8"
                    onChange={e => setSelection(e.target.value)}>
                    <option value={0} unselectable>Formato</option>
                    <option value={1}>Presencial</option>
                    <option value={2}>Virtual</option>
                </Input>
            </FormGroup>
            {(parseInt(selection) === 1) ? (
                <ActivityOnSiteComponent />
            ) : (
                    (parseInt(selection) === 2) && (
                        <ActivityComponent />
                    )
                )}
            
        </>
    );
}

export default ComponentActivity;