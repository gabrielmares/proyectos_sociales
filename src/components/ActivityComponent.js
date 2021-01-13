import { useState } from 'react'
import { Input, Label, FormGroup, CustomInput, Form } from 'reactstrap'


const ComponentActivity = () => {
    const [selection, setSelection] = useState({
        tipoActividad: "",
        actividad: "",
        fecha: "",
    })

    const { tipoActividad, actividad, fecha } = selection

    return (
        <>
            <FormGroup>
                <Label for="inputActividad">Actividad</Label>
                <Input id="inputActividad" value={actividad} />
            </FormGroup>
            <FormGroup>
                <Label for="inputFecha">Fecha</Label>
                <Input type="datetime" id="inputFecha" value={fecha} />
            </FormGroup>
            <FormGroup>
                <Input type="select" value={tipoActividad}>
                    <option value={""} unselectable>Formato de la actividad</option>
                    <option value={1}>Presencial</option>
                    <option value={2}>Virtual</option>
                </Input>
            </FormGroup>
            {(tipoActividad === 1) ? (
                <FormGroup>
                    <Label>Generales de la reunion</Label>
                </FormGroup>
            ) : (
                    (tipoActividad === 2) && (
                        <FormGroup>
                            <Label>Reunion Virtual</Label>
                        </FormGroup>
                    )
                )}
        </>
    );
}

export default ComponentActivity;