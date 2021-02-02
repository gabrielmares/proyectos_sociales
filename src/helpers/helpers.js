

export function inputsProjectValidator(generales) {

    let errores = {}
    const {
        title,
        responsable,
        objective,
        lineasIntervencion,
        listaDeComunidadesAsignadas, start,
        end,
        tema
    } = generales;




    if (!title || title.trim().length < 6) errores.nombre = 'La longitud del nombre del proyecto debe ser mayor a 6 caracteres'
    if (!responsable || responsable.trim().length < 4) errores.responsable = 'El nombre del responsable debe ser mayor a 4 caracteres'
    if (!objective || objective.trim().length < 10) errores.objetivo = 'El objetivo del programa debe ser mayor a 10 caracteres'
    if (lineasIntervencion.length === 0) errores.lineasIntervencion = 'Es necesario definir al menos una linea de intervencion'
    if (listaDeComunidadesAsignadas.length === 0) errores.listaDeComunidadesAsignadas = 'Es necesario definir al menos una comunidad de intervencion'
    if (start === "" || start === "") errores.fechaInicio = 'Es necesario definir ambas fechas'
    if (start > end) errores.fechaFin = 'La fecha de inicio no puede ser mayor a la fecha de culminacion'
    if (tema.trim().length < 4) errores.tema = 'Es necesario ser mas descriptivo en la tematica del evento'


    return errores;
}



export function inputsOnSiteValidator(generales, start, placeEvent) {

    let errores = {}
    const {
        title,
        responsable,
        objetivo,
        lineasIntervencion
    } = generales;

    if (!title || title.trim().length < 6) errores.nombre = 'La longitud del nombre del proyecto debe ser mayor a 6 caracteres'
    if (!responsable || responsable.trim().length < 4) errores.responsable = 'El nombre del responsable debe ser mayor a 4 caracteres'
    if (!objetivo || objetivo.trim().length < 10) errores.objetivo = 'El objetivo del programa debe ser mayor a 10 caracteres'
    if (lineasIntervencion.length === 0) errores.lineasIntervencion = 'Es necesario definir al menos una linea de intervencion'
    if (!start === "" || start <= Date.now()) errores.dateEvent = 'La fecha ingresada no es valida'
    if (!placeEvent || placeEvent.trim().length < 5) errores.place = 'No se reconoce el lugar del evento, como valido'

    return errores;
}

export function inputsVirtualEventValidator(generales) {

    let errores = {}
    const {
        title,
        responsable,
        objetivo,
        lineasIntervencion,
        start,
        emailAsistentes
    } = generales;

    const virtualEventEmails = (emailAsistentes) => {
        if (emailAsistentes.length === 0) return errores.virtualEvent = 'Debe agregar las direcciones de los participantes'
        emailAsistentes.split(',').map(email => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) return errores.virtualEvent = `El email ${email}, no es valido `
            return errores
        })
    }

    if (!title || title.trim().length < 6) errores.nombre = 'La longitud del nombre del proyecto debe ser mayor a 6 caracteres'
    if (!responsable || responsable.trim().length < 4) errores.responsable = 'El nombre del responsable debe ser mayor a 4 caracteres'
    if (!objetivo || objetivo.trim().length < 10) errores.objetivo = 'El objetivo del programa debe ser mayor a 10 caracteres'
    if (lineasIntervencion.length === 0) errores.lineasIntervencion = 'Es necesario definir al menos una linea de intervencion'
    if (!start === "" || start <= Date.now()) errores.dateEvent = 'La fecha ingresada no es valida'
    virtualEventEmails(emailAsistentes);

    return errores;
}

export const changeDate = (e, hours) => {
    const fecha = String((e).replace('T', " ") + ' UTC')
    const newDate = new Date(fecha)
    newDate.setHours(newDate.getHours() + parseInt(hours))
    return newDate;
}