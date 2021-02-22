import { useState } from 'react';
import { Col, Form, Card, CardHeader, Row, Input, InputGroup, CardBody, CardFooter, Button } from 'reactstrap'
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom'
import iosLockedOutline from '@iconify-icons/ion/ios-locked-outline';
import { loginUser } from '../../firebase/firebase'; //funcion de inicio de sesion
import useValidator from '../../hooks/useValidator'; //hook de validacion para inicio de sesion
import userValidation from '../../rules/loginValidation'; //reglas de validacion de inicio de sesion
import PrivateUser from '../privates';
import Main from '../../pages/Main';
import ModalResetPassword from './ModalResetPassword'

const initialState = {
    email: "",
    password: ""
}

const LoginComponent = () => {
    const history = useHistory();
    const [resetPassword, setModalResetPassword] = useState(false)


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
            <span className="grameenSlogan">Unidos Transformando Comunidades</span>
                {/* <Col className="" > */}
                    
                    {/* <span className="segundo_parrafo"> </span>
                    <span className="tercer_parrafo"> </span> */}
                {/* </Col> */}
                <Col className="w-25 h-100">
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
                            <Form onSubmit={handleSubmit} autoComplete="off">
                                <InputGroup>
                                    <Input
                                        placeholder="Email"
                                        className={`${errors.email && ('border border-danger text-danger')}`}
                                        id="email"
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
                                        id="passsword"
                                        type="password"
                                        value={password}
                                        className={`${errors.password && ('border border-danger text-danger')}`}
                                        onChange={e => handleChange(e)}
                                        autoComplete='false'
                                    />
                                </InputGroup>
                                <div className="d-flex justify-content-center">
                                    {errors.password && <small className="bg-danger text-white"><strong>{errors.password}</strong></small>}
                                </div>
                                <Button
                                    type='submit'
                                    id="submitButton"
                                    color='primary'
                                    className="submitButton"

                                    disabled={submit}
                                >Iniciar sesión</Button>
                                <Button
                                    type="button"
                                    color='link'
                                    className="resetPassword"
                                    onClick={() => setModalResetPassword(!resetPassword)}
                                >¿Olvido su contraseña?
                                 </Button>
                            </Form>

                        </CardBody>
                        <CardFooter>
                            <Row>
                                <h6 className="text-center footerLoginModal">
                                    ¿Aun no esta registrado?, solicite sus credenciales al &nbsp;
                                    <a href="mailto: sistemas@grameendelafrontera.org.mx" rel="noreferrer" target="_blank">Administrador</a>
                                </h6>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            {resetPassword && (<ModalResetPassword />)}
        </Col>
    );
}

export default LoginComponent;