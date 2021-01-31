

export function inputsProjectValidator(generales, listaDeComunidadesAsignadas, fechaInicio, fechaFin, tema) {

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
    if (listaDeComunidadesAsignadas.length === 0) errores.listaDeComunidadesAsignadas = 'Es necesario definir al menos una comunidad de intervencion'
    if (fechaInicio === "" || fechaInicio === "") errores.fechaInicio = 'Es necesario definir ambas fechas'
    if (fechaInicio > fechaFin) errores.fechaFin = 'La fecha de inicio no puede ser mayor a la fecha de culminacion'
    if (tema.trim().length < 4) errores.tema = 'Es necesario ser mas descriptivo en la tematica del evento'

    // if (parseInt(tipoEvento) === 2) {
    //     return false
    // if (!listaDeComunidadesAsignadas.length === 0) errores.listaDeComunidadesAsignadas = 'Es necesario definir al menos una comunidad de intervencion'
    // if (fechaInicio === "" || fechaInicio === "") errores.fechaInicio = 'Es necesario definir ambas fechas'
    // if (fechaInicio > fechaFin) errores.fechaFin = 'La fecha de inicio no puede ser mayor a la fecha de culminacion'
    // if (tema.trim().length < 4) errores.tema = 'Es necesario ser mas descriptivo en la tematica del evento'
    // }
    return errores;
}



export function inputsOnSiteValidator(generales, start, onSite) {

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
    if (!onSite || onSite.trim().length < 5) errores.place = 'No se reconoce el lugar del evento, como valido'

    return errores;
}

export const changeDate = (e, hours) => {
    const fecha = String((e).replace('T', " ") + ' UTC')
    const newDate = new Date(fecha)
    newDate.setHours(newDate.getHours() + parseInt(hours))
    return newDate;
}