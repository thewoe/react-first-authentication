function FormSelect({id, name, label, description, errormessage, selectoptions}) {
    return (
        <div className='selectinput'>
            <label htmlFor={id}>{label}</label>
            <p className='inputdescription'>{description}</p>
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
            <p className='errormessage'>{errormessage}</p>
        </div>
    );
}

export default FormSelect;