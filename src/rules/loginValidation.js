/* Reglas de validacion para el inicio de sesion de usuarios */


export default function userValidation(values) {

    let errors = {};
    if (!values.email) {
        errors.email = "El Correo es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Correo no Valido";
    }
    if (!values.password) {
        errors.password = "El password es obligatorio";
    } else if (values.password.length < 6) {
        errors.password = "La longitud de la contraseña debe ser de 10 caracteres";
    }
    return errors;

}