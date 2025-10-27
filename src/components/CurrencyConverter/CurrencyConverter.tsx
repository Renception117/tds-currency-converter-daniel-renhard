import { useEffect, useState } from 'react';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown'

function CurrencyConverter() {

    const [currencies, setCurrencies] = useState([]);

    const [fieldData, setFieldData] = useState({ from: '', to: '', initialValue: 0, convertedValue: 0 });

    useEffect(() => {
        let ignore = false;

        async function startFetching() {
            const response = await fetch('https://api.currencybeacon.com/v1/currencies?type=fiat&api_key=abyKdqZ554VgCfwkKTV9QH9mA7Kvhwyz');
            const json = await response.json();
            if (!ignore) {
                ;
                setCurrencies(json.response.map((currency: { id: number; name: string; short_code: string; }) => ({ id: currency.id, name: currency.name, short_code: currency.short_code })))
            }
        }

        startFetching();

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
        </>
    )
}

export default CurrencyConverter