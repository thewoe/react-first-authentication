import './FormInput.scss';

function FormInput({ type, id, name, label, description=null, errormessage=null, placeholder=null }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------
    
    // View ----------------------------------------
    return (
        <div className={type+'input'}>
            <label htmlFor={id}>{label}</label>
            {
                description && 
                    <p className='inputdescription'>{description}</p>
            }
            <input type={type} id={id} name={name} placeholder={placeholder}/>
            {
                errormessage &&
                    <p className='errormessage'>{errormessage}</p>
            }
        </div>
    );
}

export default FormInput;