function Dropdown({options}: {options: string[]}) {

    const optionMarkup = options.map( option => <option value={option}>{option}</option> )

    return (
        <select>
            {optionMarkup}
        </select>
    )
}

export default Dropdown