// import { useState } from 'react';
import { Col, Form, Card, CardHeader, Row, Input, InputGroup, CardBody, CardFooter, Button } from 'reactstrap'
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom'
import iosLockedOutline from '@iconify-icons/ion/ios-locked-outline';
import { loginUser } from '../firebase/firebase'; //funcion de inicio de sesion
import useValidator from '../hooks/useValidator'; //hook de validacion para inicio de sesion
import userValidation from '../rules/loginValidation'; //reglas de validacion de inicio de sesion
import PrivateUser from '../components/privates';
import Main from './Main'

const initialState = {
    email: "",
    password: ""
}

const LoginComponent = () => {
    const history = useHistory();


    const { valuesForm,
        errors,
        submit,
        handleSubmit,
        handleChange,
        setErrors } = useValidator(initialState, userValidation, loginfn);

    const { email, password } = valuesForm;

    function loginfn(valuesForm) {

        const { email, password } = valuesForm;
        try {
            loginUser(email, password)
                .then(res => {
                    // console.log(res)
                    if (res.code === "auth/user-not-found") {
                        setErrors({
                            ...errors,
                            email: "El correo que ingreso no es valido"
                        })
                    }
                    if (res.code === "auth/wrong-password") {
                        setErrors({
                            ...errors,
                            password: "La contraseña no es valida"
                        })
                    }
                    if (res.claims.user_id) {
                        history.push('/main')
                        return <PrivateUser exact path="/main" component={Main} />
                    }

                  
                })
                .catch(error => {
                    console.error('Hubo un error al ingresar', error);
                    if (error.message === "auth/wrong-password") {
                        setErrors({
                            ...errors,
                            password: "La contraseña no es valida"
                        })
                    }
                    if (error.message === "EMAIL_NOT_FOUND") {
                        setErrors({
                            ...errors,
                            email: "El correo que ingreso no es valido"
                        })
                    }
                    if (error.message === "auth/too-many-requests") {
                        setErrors({
                            ...errors,
                            intentos: "has excedido el maximo de intentos fallidos, espera 15 minutos"
                        })
                    }
                })

        } catch (error) {
            console.error('Hubo un error al registrar al usuario', error);
            if (error.message === "auth/wrong-password") {
                setErrors({
                    ...errors,
                    password: "La contraseña no es valida"
                })
            }
            if (error.message === "EMAIL_NOT_FOUND") {
                setErrors({
                    ...errors,
                    email: "El correo que ingreso no es valido"
                })
            }
            if (error.message === "auth/too-many-requests") {
                setErrors({
                    ...errors,
                    intentos: "has excedido el maximo de intentos fallidos, espera 15 minutos"
                })
            }
        }


    }


    return (
        <Col className="LoginComponent">
            <Row>
                <Col className="grameenSlogan" md="6" xs="6" lg="9">
                    <span className="primer_parrafo">Unidos</span>
                    <span className="segundo_parrafo"> Transformando</span>
                    <span className="tercer_parrafo"> Comunidades</span>
                </Col>
                <Col md="4" xs="4" lg="2">
                    <Card className="formLogin text-center">
                        <CardHeader>
                            <h2 className="text-center">Bienvenido</h2>

                            <Col className="text-center" >
                                <Icon
                                    className="padlock"
                                    icon={iosLockedOutline}

                                />
                            </Col>

                        </CardHeader>
                        <CardBody className="justify-content-center">
                            <Form className="col-12" onSubmit={handleSubmit}>
                                <InputGroup>
                                    <Input
                                        placeholder="Email"
                                        className={`col-12 ${errors.email && ('border border-danger text-danger')} `}

                                        name="email"
                                        type="text"
                                        value={email}
                                        onChange={e => handleChange(e)}
                                    />
                                </InputGroup>
                                <div className="d-flex justify-content-center">
                                    {errors.email && <small className="bg-danger text-white" ><strong>{errors.email}</strong></small>}
                                </div>
                                <InputGroup>
                                    <Input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        className={`col-12 ${errors.password && ('border border-danger text-danger')} mt-4`}
                                        onChange={e => handleChange(e)}
                                    />
                                </InputGroup>
                                <div className="d-flex justify-content-center">
                                    {errors.password && <small className="bg-danger text-white"><strong>{errors.password}</strong></small>}
                                </div>
                                <Button
                                    type='submit'
                                    color='primary'
                                    className="col-9 p-2 submitButton"
                                    disabled={submit}
                                >Iniciar sesion</Button>
                                <Button
                                    type="button"
                                    color='link'
                                    className="resetPassword"
                                    onChange={e => handleSubmit(e)}
                                >¿Olvido su contraseña?
                                 </Button>
                            </Form>

                        </CardBody>
                        <CardFooter>
                            <Row>
                                <h6 className="text-center">¿Aun no esta registrado?, solicite sus credenciales al <a href='gabriel.mares@grameen.mx' target="_blank">administrador</a></h6>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Col>
    );
}

export default LoginComponent;