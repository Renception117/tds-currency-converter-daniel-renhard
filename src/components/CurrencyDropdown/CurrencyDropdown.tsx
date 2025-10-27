interface DropdownProps {
    options: {
        id: number;
        name: string;
        short_code: string;
    }[];
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function CurrencyDropdown({options, name, value, onChange}: DropdownProps) {

    const optionMarkup = options.map( option => <option key={option.id} value={option.short_code}>{option.name}</option> )

    return (
        <select name={name} value={value} onChange={onChange}>
            {optionMarkup}
        </select>
    )
}

export default CurrencyDropdown