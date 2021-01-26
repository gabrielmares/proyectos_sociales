import { useState } from 'react'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap"
import ProjectComponentJSX from './ProjectComponent'
import ComponentActivity from './ActivityComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const SidebarComponent = () => {

    const [event, setEvent] = useState({
        nombreProyecto: "",
        responsableProyecto: "",
        objetivo: "",
        tipoEvento: ''
    })

    const { nombreProyecto, responsableProyecto, objetivo, tipoEvento } = event

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

    const handleSubmit = e => {
        e.preventDefault();
        console.log('submit')
    }

    return (
        <Col>
            <Row className="justify-content-center">
                <Label className="ml-4 mt-4 h4 ">Registro</Label>
            </Row>
            <hr />
            <Form style={{ marginTop: '1rem', marginLeft: '1rem' }} onSubmit={e => handleSubmit(e)}>
                <FormGroup>
                    <Label for="nombreProyecto">Nombre de la actividad</Label>
                    <Input type="text" id="nombreProyecto" name="nombreProyecto" value={nombreProyecto} onChange={e => handleChangeInputs(e)} />
                </FormGroup>
                <FormGroup>
                    <Label for="responsableProyecto">Responsable</Label>
                    <Input type='text' id="responsableProyecto" name="responsableProyecto" value={responsableProyecto} onChange={e => handleChangeInputs(e)} />
                </FormGroup>
                <FormGroup>
                    <Label for="objetivoProyecto">Objetivo</Label>
                    <Input type='text' id="objetivoProyecto" name="objetivo" value={objetivo} onChange={e => handleChangeInputs(e)} />
                </FormGroup>

                <FormGroup row >
                    <Col>
                        <DropdownMultiselect
                            placeholder="Lineas de Intervencion"
                            style={{ backgroundColor: '' }}
                            options={[
                                "opcion 1",
                                "opcion 2"
                            ]}
                            handleOnChange={(selected) => {
                                multiSelect(selected);
                            }}
                        />
                    </Col>
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className='iconcolor mt-1'
                        size='2x'
                        onClick={console.log('lista de usuarios')}
                        title="Agregar comunidades"
                    />
                </FormGroup>
                <FormGroup className="mt-4">
                    <Input type="select" id="tipoEvento" name="tipoEvento" placeholder="Proyecto/Actividad" value={tipoEvento} onChange={e => handleChangeInputs(e)}>
                        <option value={null}>Proyecto/Actividad</option>
                        <option value={1}>Proyecto</option>
                        <option value={2}>Actividad</option>
                    </Input>
                </FormGroup>
                {(parseInt(tipoEvento) === 1) ? (
                    <ProjectComponentJSX />
                ) : (
                        (parseInt(tipoEvento) === 2) ? (<ComponentActivity />) : undefined
                    )}
            </Form>
        </Col>
    );
}

export default SidebarComponent;