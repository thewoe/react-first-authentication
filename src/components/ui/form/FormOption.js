function FormOption({value, displayname}) {
    return (
        <div className='optioninput'>
            <option value={value}>
                {displayname}
            </option>
        </div>
    );
}

export default FormOption;