import React from 'react';

const useValidator = (InitialState, errorsValidation, fnToEject) => {

    const [valuesForm, setValuesForm] = React.useState(InitialState);
    const [errors, setErrors] = React.useState({});
    const [submit, setSubmit] = React.useState(false);



    React.useEffect(() => {
        if (submit) {
            if (Object.keys(errors).length === 0) {
                fnToEject(valuesForm);
            }
        }
        setSubmit(false);
    }, [errors, submit, fnToEject, valuesForm])


    // funcion que revisa lo que el usuario agrego al formulario
    // y sera validada en la siguiente funcion

    const handleChange = e => {
        setValuesForm({
            ...valuesForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {

        e.preventDefault();
        const errorsUser = errorsValidation(valuesForm);
        setErrors(errorsUser);
        if (Object.keys(errorsUser).length === 0) {
            return setSubmit(true);
        }
        return false;
    }

    return {
        valuesForm,
        errors,
        submit,
        handleSubmit,
        handleChange,
        setValuesForm,
        setErrors
    }
}

export default useValidator;