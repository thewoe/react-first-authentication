import { useRef } from "react";

import Form from "../form/Form";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";

function ModuleForm({ onSubmit, onCancel }) {
    // Properties ----------------------------------

    // Hooks ---------------------------------------
    const moduleNameInputRef = useRef();
    const moduleCodeInputRef = useRef();
    const moduleLevelInputRef = useRef();
    const moduleLeaderIdInputRef = useRef();
    const moduleImageInputRef = useRef();

    // Context -------------------------------------

    // Methods -------------------------------------
    const handleSubmit = (event) => {
        event.preventDefault();
        const enteredModuleName = moduleNameInputRef.current.value;
        const enteredModuleCode = moduleCodeInputRef.current.value;
        const enteredModuleLevel = moduleLevelInputRef.current.value;
        const enteredModuleLeaderId = moduleLeaderIdInputRef.current.value;
        const enteredModuleImage = moduleImageInputRef.current.value;

        const newModule = {
            ModuleName: enteredModuleName,
            ModuleCode: enteredModuleCode,
            ModuleLevel: enteredModuleLevel,
            ModuleLeaderID: enteredModuleLeaderId,
            ModuleImage: enteredModuleImage
        };

        onSubmit(newModule);
    }

    const handleChange = (event) => {
        console.log(event.target.name);
    }
    
    // const handleChange = (event) => {
    //     const modifiedModule = {...module, [event.target.name]: event.target.value};
    //     setModule(modifiedModule);
    
    // View ----------------------------------------
    return (
        <>
            <Form onSubmit={handleSubmit} onCancel={onCancel}>
                <FormInput 
                    type='text'
                    id='modulename'
                    name='ModuleName'
                    label='Module Name'
                    description='Enter the title of the module'
                    errormessage=''
                    placeholder='Games Programming'
                    ref={moduleNameInputRef}
                    onChange={handleChange}
                />
                <FormInput 
                    type='text'
                    id='modulecode'
                    name='ModuleCode'
                    label='Module Code'
                    description='Enter the code of the module'
                    errormessage=''
                    placeholder='CI0380'
                    ref={moduleCodeInputRef}
                    onChange={handleChange}
                />
                <FormSelect
                    id='modulelevel'
                    name='ModuleLevel'
                    label='Module Level'
                    description='Enter the level of the module'
                    errormessage=''
                    selectoptions = {[
                        {value: '3', displaytext: '3'},
                        {value: '4', displaytext: '4'},
                        {value: '5', displaytext: '5'},
                        {value: '6', displaytext: '6'},
                        {value: '7', displaytext: '7'}
                    ]}
                    ref={moduleLevelInputRef}
                    onChange={handleChange}
                />
                <FormInput 
                    type='text'
                    id='moduleleaderid'
                    name='ModuleLeaderID'
                    label='Module Leader ID'
                    description='Enter the module leader ID'
                    errormessage=''
                    placeholder='37'
                    ref={moduleLeaderIdInputRef}
                    onChange={handleChange}
                />
                <FormInput 
                    type='text'
                    id='moduleimage'
                    name='ModuleImage'
                    label='Module Image'
                    description='Enter the image url of the module'
                    errormessage=''
                    placeholder='https://images.freeimages.com/images/small-previews/64b/vla-1-1315506.jpg'
                    ref={moduleImageInputRef}
                    onChange={handleChange}
                />
            </Form>
        </>
    );
}

export default ModuleForm;