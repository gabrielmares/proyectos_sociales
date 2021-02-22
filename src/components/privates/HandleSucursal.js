import { useState, useContext } from 'react'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap"
import { Municipios } from '../../helpers/Municipios'
import { Comunidades } from '../../helpers/Comunidades'
import { sessionContext } from '../../provider/contextGlobal'

const HandleSucursal = () => {

    const [citySelection, setCitySelection] = useState([])
    const [comunityToDisplay, setComunityToDisplay] = useState([])
    const [resetComunity, setResetComunity] = useState(false)

    const { active, setActive, generales, errors, setGenerales, editEvent } = useContext(sessionContext)
    const { municipioDisplay, sucursal } = generales


    const selectCommunity = e => {
        setGenerales({
            ...generales,
            listaDeComunidadesAsignadas: e
        })
    }

    const handleSucursal = e => {
        setGenerales({
            ...generales,
            sucursal: e.target.value,
            municipioDisplay: "",
        })
        if (e.target.value === "") { //cuando se deja el campo en blanco("") bloquea el resto de componentes
            setActive(true)
            setResetComunity(false);
            setGenerales({ ...generales, tipoEvento: "", sucursal: "", municipioDisplay: "" })
            return setCitySelection([])
        }
        setCitySelection(Municipios.filter(municipio => municipio.sucursal === e.target.value))
    }


    const displayComunitys = async e => {

        setComunityToDisplay(Comunidades.filter(comunidad => comunidad.key === e.target.value)) //se filtran las comunidades en base al municipio seleccionado
        setGenerales({
            ...generales,
            listaDeComunidadesAsignadas: '', //limpiamos el objeto de comunidades asignadas
            municipioSelect: e.target.selectedOptions[0].text, //se asigna el municipio al objeto global
            municipioDisplay: e.target.value // se coloca el valor en pantalla
        });
        if (e.target.value === "") return setGenerales({ ...generales, tipoEvento: "", municipioDisplay: "" }) //si el valor es "" aborta la funcion y se queda el control bloqueado
        setResetComunity(true);
        setTimeout(() => {
            setResetComunity(false) // se reactiva el control para que muestre la lista que se filtro
        }, 50);
    };



    return (
        <>
            <div className="row">
                <label id="labelSucursal">Sucursal</label>
                <select
                    id="sucursal"
                    name="sucursal"
                    value={sucursal}
                    onChange={e => handleSucursal(e)}
                    required={true}
                    disabled={!active}
                >
                    <option value="" defaultValue>Sucursal de operacion</option>
                    <option value="Obregon">Obregon</option>
                    <option value="Navojoa">Navojoa</option>
                    <option value="Huatabampo">Huatabampo</option>
                </select>
                {errors.sucursal && (<small className="text-center text-danger col-12 mr-auto">{errors.sucursal}</small>)}
            </div>
            <div className="row">
                <label id="labelMunicipio">Municipio</label>
                <select
                    id="municipios"
                    value={municipioDisplay || Municipios.filter(municipio => municipio.sucursal === sucursal)}
                    className={` ${errors.municipio ? ('border border-danger') : null}`}
                    disabled={(sucursal === '' || !active) ? true : false}
                    onChange={e => displayComunitys(e)}
                >
                    {(!editEvent) && (<option value="" defaultValue>Municipio</option>)}
                    {(!editEvent) ? (citySelection.map((municipio, index) => (
                        <option key={index} value={municipio.key}>{municipio.label}</option>
                    ))) : (
                            <option value={municipioDisplay} key={municipioDisplay}>{generales.municipioSelect}</option>
                        )}
                </select>
                {errors.municipio && (<small className="text-center text-danger col-12 mr-auto">{errors.municipio}</small>)}
            </div>
            <div className="row mt-1">
                <label id="labelcomunidades">Comunidades</label>
                {(!resetComunity) && (
                    <DropdownMultiselect
                        placeholder="Lista de comunidades"
                        buttonClass={`comunidades ${(municipioDisplay === '' || !active) ? 'disableControl' : null}`}
                        className={` ${errors.comunity ? ('border border-danger') : null}`}
                        options={comunityToDisplay}
                        required={true}
                        optionKey='label'
                        handleOnChange={e => selectCommunity(e)}
                    />
                )}
                {errors.comunity && (<small className="text-center text-danger col-12 mr-auto">{errors.comunity}</small>)}
            </div>
        </>
    );
}

export default HandleSucursal;