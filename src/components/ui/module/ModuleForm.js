import { useState, useEffect } from "react";
import { apiRequest } from "../../api/apiRequest";

import Form from "../form/Form";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";

import '../form/FormInput.scss';

function ModuleForm({ onSubmit, onCancel, existingModule=null }) {
    // Properties ----------------------------------
    const API_URL = 'https://my.api.mockaroo.com/';
    const API_KEY = '?key=bb6adbc0';

    if (!existingModule) {
        existingModule = {
          ModuleName: "",
          ModuleCode: "",
          ModuleLevel: 3,
          ModuleLeaderID: 0,
          ModuleImage: ""
        }
    }

    // Hooks ---------------------------------------
    const [loadingMessage, setLoadingMessage] = useState("Loading Users...");
    const [users, setUsers] = useState(null);
    const [moduleForm, setModuleForm] = useState(existingModule);
    const [errors, setErrors] = useState(Object.keys(existingModule).reduce((accum, key) => ({ ...accum, [key]: null }), {}));
    const [noFormInput, setNoFormInput] = useState(false);

    // Context -------------------------------------
    useEffect(() => { fetchUsers() }, []);

    // Methods -------------------------------------
    const fetchUsers = async () => {
        const outcome = await apiRequest(API_URL, 'Users', API_KEY);
        if (outcome.success) setUsers (outcome.response);
        else setLoadingMessage(`Error ${outcome.response.status}: Users could not be found.`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        moduleForm.ModuleLevel = parseInt(moduleForm.ModuleLevel);
        moduleForm.ModuleLeaderID = parseInt(moduleForm.ModuleLeaderID);

        if (moduleForm.ModuleName !== "" || moduleForm.ModuleCode !== "" || moduleForm.ModuleLevel !== 3 || moduleForm.ModuleLeaderID !== 0 || moduleForm.ModuleImage !== "") {
            setNoFormInput(false);
            const moduleNameErrors = validateModuleName();
            const moduleCodeErrors = validateModuleCode();
            const moduleLevelErrors = validateModuleLevel();
            const moduleLeaderErrors = validateModuleLeader();
            const moduleImageErrors = validateModuleImage();

            setErrors({
                ModuleName: moduleNameErrors,
                ModuleCode: moduleCodeErrors,
                ModuleLevel: moduleLevelErrors,
                ModuleLeaderID: moduleLeaderErrors,
                ModuleImage: moduleImageErrors
            });

            if (!moduleNameErrors && !moduleCodeErrors && !moduleLevelErrors && !moduleLeaderErrors && !moduleImageErrors) {
                onSubmit(moduleForm);
            }
        }
        else {
            setNoFormInput(true);
        }
    }

    const handleChange = (event) => {
        setNoFormInput(false);
        setModuleForm({ ...moduleForm, [event.target.name]: event.target.value });
    }

    const handleKeyUp = (event) => {
        realtimeValidator(event);
    }

    const realtimeValidator = (event) => {
        switch (event.target.name) {
            case 'ModuleName':
                var moduleNameValidation = validateModuleName();
                break;
            case 'ModuleCode':
                var moduleCodeValidation = validateModuleCode();
                break;
            case 'ModuleLevel':
                var moduleLevelValidation = validateModuleLevel();
                break;
            case 'ModuleLeaderID':
                var moduleLeaderValidation = validateModuleLeader();
                break;
            case 'ModuleImage':
                var moduleImageValidation = validateModuleImage();
                break;
            default:
                break;
        }
        
        setErrors({
            ModuleName: moduleNameValidation,
            ModuleCode: moduleCodeValidation,
            ModuleLevel: moduleLevelValidation,
            ModuleLeaderID: moduleLeaderValidation,
            ModuleImage: moduleImageValidation
        });
    }

    const validateModuleNameLength = () => moduleForm.ModuleName.length < 8 && "Module name must be more than 8 characters. ";

    const validateModuleName = () => {
        return validateModuleNameLength();
    }

    const validateModuleCodeFormat = () => !(/^\D{2}\d{4}$/.test(moduleForm.ModuleCode)) && "Module code must be in format CI5250. ";

    const validateModuleCode = () => {
        return validateModuleCodeFormat();
    }

    const validateModuleLevelNumber = () => ((moduleForm.ModuleLevel < 2) && (moduleForm.ModuleLevel > 8)) && "Module level must be between 3 and 7. ";

    const validateModuleLevel = () => {
        return validateModuleLevelNumber();
    }

    const validateModuleLeaderIntType = () => !parseInt(moduleForm.ModuleLeaderID) && "Module Leader ID must be an integer. ";

    const validateModuleLeader = () => {
        return validateModuleLeaderIntType();
    }

    const validateModuleImageFormat = () => !(/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(moduleForm.ModuleImage)) && "Module image must be in a valid URL format. ";
    
    const validateModuleImage = () => {
        return validateModuleImageFormat();
    }

    // View ----------------------------------------
    return (
        <>
            <Form onSubmit={handleSubmit} onCancel={onCancel}>
                {
                    noFormInput && <p className='errormessage'>Please complete the form before submitting.</p>
                }
                <FormInput 
                    type='text'
                    id='modulename'
                    name='ModuleName'
                    label='Module Name'
                    description='Enter the title of the module'
                    errormessage={errors.ModuleName}
                    placeholder='Games Programming'
                    value={moduleForm.ModuleName}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormInput 
                    type='text'
                    id='modulecode'
                    name='ModuleCode'
                    label='Module Code'
                    description='Enter the code of the module'
                    errormessage={errors.ModuleCode}
                    placeholder='CI0380'
                    value={moduleForm.ModuleCode}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormSelect
                    id='modulelevel'
                    name='ModuleLevel'
                    label='Module Level'
                    description='Enter the level of the module'
                    errormessage={errors.ModuleLevel}
                    selectoptions = {[
                        {value: '3', displaytext: '3'},
                        {value: '4', displaytext: '4'},
                        {value: '5', displaytext: '5'},
                        {value: '6', displaytext: '6'},
                        {value: '7', displaytext: '7'}
                    ]}
                    value={moduleForm.ModuleLevel}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
                <FormSelect
                    id='moduleleaderid'
                    name='ModuleLeaderID'
                    label='Module Leader'
                    description='Select a module leader from the list'
                    errormessage={errors.ModuleLeaderID}
                    selectoptions={[{value:'0', displaytext: 'Select a module leader'}]}
                    value={moduleForm.ModuleLeaderID}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                >
                    {
                        !users
                            ? <p>{loadingMessage}</p>
                            : users.length === 0
                                ? <p>No users found</p>
                                : users.map((user) => 
                                    <option 
                                        key={user.UserID} 
                                        value={user.UserID}
                                    >
                                        {user.UserLastname}
                                        {', '}
                                        {user.UserFirstname}
                                    </option>
                                  )
                    }
                </FormSelect>
                <FormInput 
                    type='text'
                    id='moduleimage'
                    name='ModuleImage'
                    label='Module Image'
                    description='Enter the image url of the module'
                    errormessage={errors.ModuleImage}
                    placeholder='https://images.freeimages.com/images/small-previews/64b/vla-1-1315506.jpg'
                    value={moduleForm.ModuleImage}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
            </Form>
        </>
    );
}

export default ModuleForm;