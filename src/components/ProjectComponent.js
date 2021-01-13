import { FormGroup, Input, Label } from 'reactstrap'
import { useState } from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap"

const ProjectComponentJSX = () => {
    const [generales, setGenerales] = useState({
        fechaInicio: "",
        fechaFin: "",
        comunidades: [],
        descripcion: "",
        actividades: "",
        tema: ""
    });

    const { fechaFin, fechaInicio, comunidades, descripcion, actividades, tema } = generales

    const selectCommunity = e => {
        e.preventDefault();
        console.log(e.value)
    }
    return (
        <>
            <FormGroup>
                <Label>Tema de la reunion</Label>
                <Input
                    type="text"
                    name="tema"
                    value={tema}
                />
            </FormGroup>
            <FormGroup>
                <DropdownMultiselect
                    placeholder="Comunidades"
                    options={[
                        "Comunidad 1",
                        "Comunidad 2"
                    ]}
                    name="comunidades"
                    handleOnChange={e => selectCommunity(e)}
                />
            </FormGroup>
            <FormGroup>
                <Label>Descripcion</Label>
                <Input
                    type="textarea"
                    name="description"
                    value={descripcion}
                />
            </FormGroup>
        </>
    );
}

export default ProjectComponentJSX;