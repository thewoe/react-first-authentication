import './FormInput.css';

function FormSelect({id, name, label, description=null, errormessage=null, selectoptions=null}) {
    return (
        <div className='selectinput'>
            <label htmlFor={id}>{label}</label>
            {
                description &&
                    <p className='inputdescription'>{description}</p>
            }
            <select id={id} name={name}>
                {selectoptions.map(selectoption => {
                    return (
                        <option 
                            key={selectoption.value} 
                            value={selectoption.value}
                        >
                            {selectoption.displaytext}
                        </option>
                    );
                })}
            </select>
            {
                errormessage &&
                    <p className='errormessage'>{errormessage}</p>
            }
        </div>
    );
}

export default FormSelect;