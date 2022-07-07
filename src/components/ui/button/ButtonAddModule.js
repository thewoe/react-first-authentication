import Button from './Button';
import IconAdd from '../icon/IconAdd';

function ButtonAddModule({ onClick, hasTitle=false }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------

    // Context -------------------------------------

    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title='Add Module'>
            <IconAdd />
        </Button>
    );
}

export default ButtonAddModule;