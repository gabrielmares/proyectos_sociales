import { Comunidades } from "./Comunidades";


export function inputsProjectValidator(generales) {

    let errores = {}
    const {
        title,
        responsable,
        objective,
        lineasIntervencion,
        listaDeComunidadesAsignadas,
        start,
        end,
        sucursal,
        tema,
        municipioSelect
    } = generales;




    if (!title || title.trim().length < 6) errores.title = 'El nombre del proyecto debe ser mayor a 6 caracteres'
    if (!responsable || responsable.trim().length < 4) errores.responsable = 'El nombre del responsable debe ser mayor a 4 caracteres'
    if (!objective || objective.trim().length < 10) errores.objetivo = 'El objetivo del programa debe ser mayor a 10 caracteres'
    if (lineasIntervencion.length === 0) errores.lineasIntervencion = 'Es necesario definir al menos una linea de intervencion'
    if (municipioSelect === "") errores.municipio = 'Se requiere el municipio de trabajo'
    if (listaDeComunidadesAsignadas.length === 0) errores.listaDeComunidadesAsignadas = 'Es necesario definir al menos una comunidad de intervencion'
    if (sucursal === "") errores.sucursal = 'Debe definir la sucursal responsable'
    if (start === "" || start === "") errores.fechaInicio = 'Es necesario definir ambas fechas'
    if (start > end) errores.fechaFin = 'La fecha de inicio no puede ser mayor a la fecha de culminacion'
    if (Comunidades)
        if (tema.trim().length < 4) errores.tema = 'Es necesario ser mas descriptivo en la tematica del evento'


    return errores;
}



export function inputsOnSiteValidator(generales, start) {

    let errores = {}
    const {
        title,
        responsable,
        objective,
        sucursal,
        municipioSelect,
        end,
        lineasIntervencion
    } = generales;

    if (!title || title.trim().length < 6) errores.title = 'El nombre del proyecto debe ser mayor a 6 caracteres'
    if (!responsable || responsable.trim().length < 4) errores.responsable = 'El nombre del responsable debe ser mayor a 4 caracteres'
    if (!objective || objective.trim().length < 10) errores.objetivo = 'El objetivo del programa debe ser mayor a 10 caracteres'
    if (sucursal === "") errores.sucursal = 'Debe definir la sucursal responsable'
    if (municipioSelect === "") errores.municipio = 'Se requiere el municipio de trabajo'
    if (lineasIntervencion.length === 0) errores.lineasIntervencion = 'Es necesario definir al menos una linea de intervencion'
    if (start >= end) errores.fechaEvento = 'Es necesario definir la fecha del evento'
    if (!start === "" || start <= Date.now()) errores.dateEvent = 'La fecha ingresada no es valida'

    return errores;
}

export function inputsVirtualEventValidator(generales) {

    let errores = {}
    const {
        title,
        responsable,
        objetive,
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

    if (!title || title.trim().length < 6) errores.nombre = 'El nombre del proyecto debe ser mayor a 6 caracteres'
    if (!responsable || responsable.trim().length < 4) errores.responsable = 'El nombre del responsable debe ser mayor a 4 caracteres'
    if (!objetive || objetive.trim().length < 10) errores.objetivo = 'El objetivo del programa debe ser mayor a 10 caracteres'
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