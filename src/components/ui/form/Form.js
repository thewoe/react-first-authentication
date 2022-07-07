import ButtonBar from '../button/ButtonBar';
import ButtonCancel from '../button/ButtonCancel';
import ButtonSubmit from '../button/ButtonSubmit';

import './Form.css';

function Form({children, onCancel, onSubmit}) {
    return (
        <form className='reusableform'>
            <div className='formcontents'>
                {children}
            </div>
            <div className='formbuttons'>
                <ButtonBar>
                    <ButtonCancel hasTitle onClick={onCancel} />
                    <ButtonSubmit hasTitle onClick={onSubmit} />
                </ButtonBar>
            </div>
        </form>
    );
}

export default Form;