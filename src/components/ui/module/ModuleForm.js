import { useState, useEffect } from "react";
import { apiRequest } from "../../api/apiRequest";

import Form from "../form/Form";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";

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
        onSubmit(moduleForm);
    }
    const handleChange = (event) => {
        setModuleForm({ ...moduleForm, [event.target.name]: event.target.value });
    }
    
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
                    errormessage={errors.ModuleName}
                    placeholder='Games Programming'
                    value={moduleForm.ModuleName}
                    onChange={handleChange}
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
                />
                <FormSelect
                    id='moduleleaderid'
                    name='ModuleLeaderID'
                    label='Module Leader ID'
                    description='Enter the module leader ID'
                    errormessage={errors.ModuleLeaderID}
                    selectoptions={[{value:'0', displaytext: 'Select a module leader'}]}
                    value={moduleForm.ModuleLeaderID}
                    onChange={handleChange}
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
                />
            </Form>
        </>
    );
}

export default ModuleForm;