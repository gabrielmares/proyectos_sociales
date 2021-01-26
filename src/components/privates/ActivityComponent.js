import { useState } from 'react'
import { Input, Label, FormGroup } from 'reactstrap'
import DateTime from 'react-datetime'
import "react-datetime/css/react-datetime.css";


const ComponentActivity = () => {
    const [fecha, setFecha] = useState(null)
    const [selection, setSelection] = useState({
        tipoActividad: null,
        actividad: "",
    })

    const { tipoActividad, actividad } = selection

    const handleChange = e => {
        console.log(e)
        setSelection({
            ...selection,
            [e.target.name]: e.target.value
        })
    }


    const inputProps = {
        placeholder: 'Fecha',
        disable: false
    }
    return (
        <>

            <FormGroup>
                
                <DateTime
                    inputProps={inputProps}
                    value={fecha}
                    onChange={e => setFecha(e._d)}
                />

            </FormGroup>
            <FormGroup>
                <Input type="select" value={tipoActividad} name="tipoActividad" onChange={e => handleChange(e)}>
                    <option value={null} unselectable>Formato</option>
                    <option value={1}>Presencial</option>
                    <option value={2}>Virtual</option>
                </Input>
            </FormGroup>
            {(parseInt(tipoActividad) === 1) ? (
                <FormGroup>
                    <Label>Generales de la reunion</Label>
                </FormGroup>
            ) : (
                    (parseInt(tipoActividad) === 2) && (
                        <FormGroup>
                            <Label>Reunion Virtual</Label>
                        </FormGroup>
                    )
                )}
        </>
    );
}

export default ComponentActivity;