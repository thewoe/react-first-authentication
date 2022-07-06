function FormInput({type, id, name, label, description, errormessage, placeholder}) {
    return (
        <div className={type+'input'}>
            <label htmlFor={id}>{label}</label>
            <p className='inputdescription'>{description}</p>
            <input type={type} id={id} name={name} placeholder={placeholder}/>
            <p className='errormessage'>{errormessage}</p>
        </div>
    );
}

export default FormInput;