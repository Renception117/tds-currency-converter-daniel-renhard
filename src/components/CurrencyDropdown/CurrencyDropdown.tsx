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

function CurrencyDropdown({ options, name, value, onChange }: DropdownProps) {

    const optionMarkup = options.map(option => <option key={option.id} value={option.short_code}>{option.name}</option>)

    return (
        <label>
            {name}:
            <select name={name} value={value} onChange={onChange}>
                {options.length === 0 && <option>Loading...</option>}
                {options.length > 0 && <option value=''>Please select a currency</option>}
                {optionMarkup}
            </select>
        </label>
    )
}

export default CurrencyDropdown