
import { useState } from 'react'

const SelectParticipantsController = ({ inputsForm, rows, fn }) => {
    const [inputSelect, setInputSelect] = useState({
        ageValue: `ageValue-${rows}`,
        genderValue: `genderValue-${rows}`,
        participants: `participants-${rows}`
    })
    
    const objectAges = [
        '0-5',
        '6-10',
        '11-15',
        '16-20',
        '21-30',
        '31-40',
        '41-50',
        '51-60',
        'Mayor 60'
    ];
    const { ageValue, genderValue, participants } = inputsForm
    const inChange = (e) => {
        setInputSelect({ ...inputSelect, ageValue: e.target.value })
        fn(e)
    }

    return (

        <div className="d-flex justify-content-center" style={{ marginTop: (parseInt(rows) === 0) ? '3em' : '0.5em' }}>
            <select
                value={ageValue}
                name='ageValue'
                className="form-control"
                style={{ width: '12em' }}
                data-id={rows}
                onChange={e => inChange(e)}>
                <option value='' defaultValue>Rango de edad</option>
                {objectAges.map((ages, index) => (
                    <option key={index} value={ages}>{ages}</option>
                ))}
            </select>
            <select
                value={genderValue}
                className='mr-3 ml-3 form-control'
                name='genderValue'
                onChange={e => inChange(e)}
                // onChange={e => setInputSelect({ ...inputSelect, genderValue: e.target.value })}
                style={{ width: '9em' }}
                data-id={rows}
            >
                <option value='' defaultValue>Genero</option>
                {['Hombre', 'Mujer'].map((value, index) => (<option key={index} value={value}>{value}</option>))}
            </select>
            <input
                type='number'
                name='participants'
                value={participants}
                placeholder='Participantes'
                min={1}
                className='form-control'
                style={{ width: '8em' }}
                data-id={rows}
                onChange={e => inChange(e)}
            // onChange={e => setInputSelect({ ...inputSelect, participants: e.target.value })}
            />
        </div>
    );
}

export default SelectParticipantsController;