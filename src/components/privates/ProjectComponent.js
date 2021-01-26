import { FormGroup, Input, Label, Col, ModalHeader, Modal, ModalBody, ModalFooter, Button, Form, Row } from 'reactstrap'
import { useState } from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import ReactDateTime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
import { saveElement } from '../../firebase/firebase'

const ProjectComponentJSX = () => {
    const [generales, setGenerales] = useState({
        descripcion: "",
        actividades: "",
        tema: "",
        addNameComunity: ''
    });
    const [comunity, setComunity] = useState([])
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const { descripcion, actividades, tema, addNameComunity } = generales
    const [showModal, setShowModal] = useState(false)

    const selectCommunity = e => {
        e.preventDefault();
        console.log(e.value)
    }

    const inputPropsStart = {
        placeholder: 'Fecha de Inicio',
        disable: false
    }
    const inputPropsEnd = {
        placeholder: 'Fecha de Cierre',
        disable: false
    }

    const newComunity = addNameComunity => {
        console.log(addNameComunity)
        const comunidades = addNameComunity.trim().split(',');
        console.log(comunidades)
    }

    const handleChange = e => {
        // e.preventDefault();
        setGenerales({
            ...generales,
            [e.target.name]: e.target.value
        })
    }

    if (showModal) {

        return (
            <>
                <Modal isOpen={showModal} className="modal-dialog modal-dialog-centered">
                    <ModalHeader className="justify-content-center">
                        <h3 className="text-center">Agregar Comunidad</h3>
                    </ModalHeader>
                    <ModalBody className="text-center">
                        <span className="mb-4">Para agregar mas de 1 comunidad, separelas por ","</span>
                        <Form>
                            <FormGroup>
                                <Row className="mt-4 ml-4">
                                    <Label for="addNameComunity" className="mt-2">Nombre</Label>
                                    <Col>
                                        <Input
                                            type="text"
                                            placeholder="Nombre de la comunidad"
                                            id="addNameComunity"
                                            name='addNameComunity'
                                            value={addNameComunity}
                                            onChange={e => handleChange(e)}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter className="justify-content-center">
                        <Button
                            color="secondary"
                            onClick={() => (setShowModal(!showModal))}
                        >Cancelar
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => newComunity(addNameComunity)}
                        >agregar
                        </Button>

                    </ModalFooter>
                </Modal>
            </>
        )
    }

    return (
        <>
            <FormGroup>
                <ReactDateTime
                    inputProps={inputPropsStart}
                    value={dateStart}
                    name='fechaInicio'
                    onChange={e => setDateStart(e)}
                />
            </FormGroup>
            <FormGroup>
                <ReactDateTime
                    inputProps={inputPropsEnd}
                    value={dateEnd}
                    name='fechaFin'
                    onChange={e => setDateEnd(e._d)}
                />
            </FormGroup>
            <FormGroup>
                <Label>Tematica</Label>
                <Input
                    type="text"
                    name="tema"
                    value={tema}
                    onChange={e => handleChange(e)}
                />
            </FormGroup>

            <FormGroup row>
                <Col>
                    <DropdownMultiselect
                        placeholder="Comunidades"
                        options={comunity}
                        name="comunity"
                        handleOnChange={e => selectCommunity(e)}
                    />
                </Col>
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    className='iconcolor mt-1'
                    size='2x'
                    onClick={() => setShowModal(!showModal)}
                    title="Agregar comunidades"
                />
            </FormGroup>

        </>
    );
}

export default ProjectComponentJSX;