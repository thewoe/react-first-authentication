import './FormInput.css';

function FormTextArea({id, name, label, description=null, errormessage=null, placeholder=null}) {
    return (
        <div className='textareainput'>
            <label htmlFor={id}>{label}</label>
            {
                description &&
                    <p className='inputdescription'>{description}</p>
            }
            <textarea id={id} name={name} placeholder={placeholder}>
            </textarea>
            {
                errormessage &&
                    <p className='errormessage'>{errormessage}</p>
            }
        </div>
    );
}

export default FormTextArea;