function FormTextArea({id, name, label, description, errormessage, placeholder}) {
    return (
        <div className='textareainput'>
            <label htmlFor={id}>{label}</label>
            <p className='inputdescription'>{description}</p>
            <textarea id={id} name={name} placeholder={placeholder}>
            </textarea>
            <p className='errormessage'>{errormessage}</p>
        </div>
    );
}

export default FormTextArea;