import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { cityFilter } from '../../../redux/reducers/CitySlicer';

export default function CityFilter() {
    const [selectedCities, setSelectedCities] = useState([]); // Start with an empty city
    const dispatch = useDispatch();

    const handleCityInputChange = (index, value) => {
        const updatedCities = [...selectedCities];
        updatedCities[index] = value;

        // Update the state with the updatedCities
        setSelectedCities(updatedCities);
    };

    useEffect(() => {
        // This will run whenever selectedCities changes
        const cities = selectedCities.filter((city) => city.trim() !== '');

        // Log the updated city at the specified index


        // Log the filtered cities
        //console.log("val2=" + cities);

        // Dispatch the filtered cities to Redux
        dispatch(cityFilter(cities));
    }, [selectedCities]); // Run this effect whenever selectedCities changes

    const handleAddCityInput = () => {
        setSelectedCities([...selectedCities, '']);
        console.log(selectedCities)

    };

    const handleRemoveCityInput = (index) => {
        const updatedCities = selectedCities.filter((city, i) => i !== index);
        setSelectedCities(updatedCities);
        console.log(selectedCities)
        const cities = selectedCities.filter((city) => city.trim() !== '');
        dispatch(cityFilter(cities));

    };
    return (
        <div>
            <div style={{ display: 'flex', margin: 'auto', padding: '10px', }}>
                <label htmlFor="cities">Cities:</label>
                <div style={{ display: 'flex', border: '2px solid black' }}>
                    {selectedCities.map((city, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => handleCityInputChange(index, e.target.value)}
                            />
                            <button onClick={() => handleRemoveCityInput(index)}>x</button>
                        </div>
                    ))}
                    <button onClick={handleAddCityInput}>Add City</button>
                </div>
            </div>
        </div>
    )
}
