import { useEffect, useState } from 'react';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown'
import './CurrencyConverter.css'

function CurrencyConverter() {

    const [currencies, setCurrencies] = useState([]);

    const [fieldData, setFieldData] = useState({ from: '', to: '', initialValue: '', convertedValue: '' });

    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        let ignore = false;

        async function fetchCurrencies() {
            const response = await fetch('https://api.currencybeacon.com/v1/currencies?type=fiat&api_key=abyKdqZ554VgCfwkKTV9QH9mA7Kvhwyz');
            if (response.ok) {
                const json = await response.json();
                if (!ignore) {
                    setCurrencies(json.response.map((currency: { id: number; name: string; short_code: string; }) => ({ id: currency.id, name: currency.name, short_code: currency.short_code })))
                }
            } else {
                setErrors([...errors, "Error fetching currencies"])
            }

        }

        fetchCurrencies();

        return () => {
            ignore = true;
        };
    }, []);

    function handleFieldChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setFieldData({
            ...fieldData,
            [e.target.name]: e.target.value
        })

    }

    function handleConvertClick() {
        async function fetchConvert() {
            const response = await fetch(`https://api.currencybeacon.com/v1/convert?from=${fieldData.from}&to=${fieldData.to}&amount=${fieldData.initialValue}&api_key=abyKdqZ554VgCfwkKTV9QH9mA7Kvhwyz`);
            if (response.ok) {
                const json = await response.json();
                setFieldData({
                    ...fieldData,
                    convertedValue: json.value
                })
            } else {
                setErrors([...errors, "Error converting, please try again"])
            }
        }
        if (validateFields()) {
            fetchConvert();
        }
    }

    function validateFields() {

        setErrors([]);
        let errors = [];

        if (fieldData.from === '') {
            errors.push("Please select a currency to convert from");
        }
        if (fieldData.to === '') {
            errors.push("Please select a currency to convert to");
        }
        if (fieldData.initialValue === '') {
            errors.push("Please select an amount of currency to convert");
        }

        if (errors.length > 0) {
            setErrors(errors);
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <CurrencyDropdown options={currencies} name='from' value={fieldData.from} onChange={handleFieldChange} />
            <CurrencyDropdown options={currencies} name='to' value={fieldData.to} onChange={handleFieldChange} />
            <label>
                Initial Value:
                <input name="initialValue" type='number' value={fieldData.initialValue} onChange={handleFieldChange} />
            </label>
            <label>
                Converted Value:
                <input name="convertedValue" readOnly value={fieldData.convertedValue} />
            </label>
            <button onClick={handleConvertClick}>Convert</button>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </>
    )
}

export default CurrencyConverter