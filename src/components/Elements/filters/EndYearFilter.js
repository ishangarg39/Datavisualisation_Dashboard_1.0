import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { endYearFilter } from '../../../redux/reducers/EndYear';

export default function EndYearFilter() {
    const [data, setData] = useState([]); // Start with an empty array of end years
    const dispatch = useDispatch();

    const handleCityInputChange = (index, value) => {
        const updatedData = [...data];
        updatedData[index] = parseInt(value, 10); // Parse the input as an integer
        setData(updatedData);

    };

    useEffect(() => {
        // Remove NaN and duplicates
        const items = data.filter(year => !isNaN(year)).filter((year, index, arr) => arr.indexOf(year) === index);
        // console.log(items   , "Endyear")
        dispatch(endYearFilter(items));

    }, [data, dispatch]);

    const handleAddCityInput = () => {
        setData([...data, '']);
    };

    const handleRemoveCityInput = (index) => {
        const updatedData = [...data];
        updatedData.splice(index, 1);
        setData(updatedData);
        const items = data.filter(year => !isNaN(year)).filter((year, index, arr) => arr.indexOf(year) === index);
        dispatch(endYearFilter(items));

    };

    return (
        <div>
            <div style={{ display: 'flex', margin: 'auto', padding: '10px' }}>
                <label htmlFor="items">End of Year:</label>
                <div style={{ display: 'flex', border: '2px solid black' }}>
                    {data.map((year, index) => (
                        <div key={index}>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => handleCityInputChange(index, e.target.value)}
                            />
                            <button onClick={() => handleRemoveCityInput(index)}>x</button>
                        </div>
                    ))}
                    <button onClick={handleAddCityInput}>Add More</button>
                </div>
            </div>
        </div>
    );
}
