import { useContext, useState } from 'react'
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, Form, Row, FormGroup, Label, Col, Input } from 'reactstrap'
import { saveElement } from '../../firebase/firebase'
import { sessionContext } from '../../provider/contextGlobal'


const ModalComponentJSX = () => {

    // estado que almacena el valor en la entrada del campo
    // y pasa a la funcion que almacena en BD
    const [item, setItem] = useState('');

    const { setShowModal, showModal, propsModal, setResetDropdown } = useContext(sessionContext)
    const { modelo, titulo, cuerpoMsg, placeholder } = propsModal //recibe las  props desde el componente que lo llamo a ejecucion
    if (!showModal) setShowModal(false) //escondemos la ventana modal

    // funcion que agrega los nuevos elementos en BDD
    // limpia espacios al inicio y final para despues
    // separar los valores que se agregaran por comas y se almacenen 
    // como un solo documento en la coleccion de firestore
    const newElement = () => {
        const elements = item.trim().split(',');
        elements.map(
            elemento => saveElement(modelo, elemento.trim())
                .then(() => {
                    setResetDropdown(true);
                    setTimeout(() => {
                        setResetDropdown(false)
                    }, 40);
                    setItem('');
                    setShowModal(false) //escondemos el modal despues de almacenar datos
                    return console.log('elemento almacenado')
                })
                .catch(err => console.log(err))
        )

    }

    return (
        <>
            <Modal isOpen={showModal} className="modal-dialog modal-dialog-centered">
                <ModalHeader className="justify-content-center">
                    <h3 className="text-center ">{titulo}</h3>
                </ModalHeader>
                <ModalBody className="text-center">
                    <span className="mb-4">Para agregar mas de 1 {cuerpoMsg}, sepárelas por ","</span>
                    <Form>
                        <FormGroup>
                            <Row className="mt-4 ml-4">
                                <Label for="addNameComunity" className="mt-2">Nombre</Label>
                                <Col>
                                    <Input
                                        type="text"
                                        placeholder={`nombre de ${placeholder}`}
                                        id="item"
                                        name='item'
                                        value={item}
                                        onChange={e => setItem(e.target.value)}
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
                    >
                        Cancelar
                        </Button>
                    <Button
                        color="primary"
                        onClick={() => newElement()}
                    >
                        agregar
                        </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalComponentJSX;