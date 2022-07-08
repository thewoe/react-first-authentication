import './FormInput.scss';

function FormTextArea({ id, name, label, description=null, errormessage=null, placeholder=null }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------
    
    // View ----------------------------------------
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