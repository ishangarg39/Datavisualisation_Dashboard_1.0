import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { countryFilter } from '../../../redux/reducers/CountrySlicer';

export default function CountryFilter() {
    const [selectedCountry, setSelectedCountry] = useState([]); // Start with an empty Country
    const dispatch = useDispatch();
    const handleCityInputChange = (index, value) => {
        const updatedCities = [...selectedCountry];
        updatedCities[index] = value;

        // Update the state with the updatedCities
        setSelectedCountry(updatedCities);
    };

    useEffect(() => {
        // This will run whenever selectedCountry changes
        const items = selectedCountry.filter((Country) => Country.trim() !== '');

        // Log the updated Country at the specified index


        // Log the filtered items
        //  console.log("val2=" + items);

        // Dispatch the filtered items to Redux
        dispatch(countryFilter(items));
    }, [selectedCountry]); // Run this effect whenever selectedCountry changes

    const handleAddCityInput = () => {
        setSelectedCountry([...selectedCountry, '']);
        console.log(selectedCountry)

    };

    const handleRemoveCityInput = (index) => {
        const updatedCities = selectedCountry.filter((Country, i) => i !== index);
        setSelectedCountry(updatedCities);
        console.log(selectedCountry)
        const items = selectedCountry.filter((Country) => Country.trim() !== '');
        dispatch(countryFilter(items));

    };

    return (
        <div>
            <div style={{ display: 'flex', margin: 'auto', padding: '10px', }}>
                <label htmlFor="items">Countries:</label>
                <div style={{ display: 'flex', border: '2px solid black' }}>
                    {selectedCountry.map((Country, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={Country}
                                onChange={(e) => handleCityInputChange(index, e.target.value)}
                            />
                            <button onClick={() => handleRemoveCityInput(index)}>x</button>
                        </div>
                    ))}
                    <button onClick={handleAddCityInput}>Add Country</button>
                </div>
            </div>
        </div>
    )
}
