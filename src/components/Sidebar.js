import { useState } from 'react'
import { Col, Form, FormGroup, Input, Label } from 'reactstrap'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap"
import ProjectComponentJSX from './ProjectComponent'
import ComponentActivity from './ActivityComponent'

const SidebarComponent = () => {

    const [event, setEvent] = useState({
        nombreProyecto: "",
        responsableProyecto: "",
        objetivo: "",
        beneficiarios: [],
        lineasIntervencion: [],
        tipoEvento: 0
    })

    const { nombreProyecto, responsableProyecto, objetivo, beneficiarios, lineasIntervencion, tipoEvento } = event

    const handleChangeInputs = e => {
        e.preventDefault();
        console.log(e.target.value)
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    }


    const multiSelect = selected => {
        console.log(selected)
    }

    return (
        <Col>
            Nuevo Evento
            <Form style={{ marginTop: '1rem', marginLeft: '1rem' }}>
                <FormGroup>
                    <Label for="nombreProyecto">Nombre</Label>
                    <Input type="text" id="nombreProyecto" name="nombreProyecto" value={nombreProyecto} onChange={e => handleChangeInputs(e)} />
                </FormGroup>
                <FormGroup>
                    <Label for="responsableProyecto">Responsable del Proyecto</Label>
                    <Input type='text' id="responsableProyecto" name="responsableProyecto" value={responsableProyecto} onChange={e => handleChangeInputs(e)} />
                </FormGroup>
                <FormGroup>
                    <Label for="objetivoProyecto">Objetivo</Label>
                    <Input type='text' id="objetivoProyecto" name="objetivo" value={objetivo} onChange={e => handleChangeInputs(e)} />
                </FormGroup>
                <FormGroup row className="mt-4 ml-1">
                    <Label for="beneficiarios" className="mt-2">Beneficiarios</Label>
                    <Col>
                        <Input type='number' id="beneficiarios" name="beneficiarios" value={beneficiarios} onChange={e => handleChangeInputs(e)} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <DropdownMultiselect
                        placeholder="Lineas de Intervencion"
                        options={[
                            "opcion 1",
                            "opcion 2"
                        ]}
                        name="Selection"
                        handleOnChange={(selected) => {
                            multiSelect(selected);
                        }}
                    />
                </FormGroup>
                <FormGroup className="mt-4">
                    <Input type="select" id="tipoEvento" name="tipoEvento" placeholder="Proyecto/Actividad" value={tipoEvento} onChange={e => handleChangeInputs(e)}>
                        <option value="" unselectable>Proyecto/Actividad</option>
                        <option value={1}>Proyecto</option>
                        <option value={2}>Actividad</option>
                    </Input>
                </FormGroup>
                {(parseInt(tipoEvento) === 1) ? (
                    <ProjectComponentJSX />
                ) : (
                        (parseInt(tipoEvento) === 2) && <ComponentActivity />
                    )}
            </Form>
        </Col>
    );
}

export default SidebarComponent;