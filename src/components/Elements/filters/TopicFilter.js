import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { topicFilter } from '../../../redux/reducers/TopicSlicer';

export default function SourceFilter() {
    const [data, setData] = useState([]); // Start with an empty Country
    const dispatch = useDispatch();
    const handleCityInputChange = (index, value) => {
        const updatedData = [...data];
        updatedData[index] = value;

        // Update the state with the updatedData
        setData(updatedData);
    };

    useEffect(() => {
        // This will run whenever data changes
        const items = data.filter((Country) => Country.trim() !== '');

        // Log the updated Country at the specified index


        // Log the filtered items
        //console.log("val2=", items);

        // Dispatch the filtered items to Redux
        dispatch(topicFilter(items));
    }, [data]); // Run this effect whenever data changes

    const handleAddCityInput = () => {
        setData([...data, '']);
        console.log(data)

    };

    const handleRemoveCityInput = (index) => {
        const updatedData = data.filter((Country, i) => i !== index);
        setData(updatedData);
        console.log(data)
        const items = data.filter((Country) => Country.trim() !== '');
        dispatch(topicFilter(items));

    };

    return (
        <div>
            <div style={{ display: 'flex', margin: 'auto', padding: '10px', }}>
                <label htmlFor="items">Topic:</label>
                <div style={{ display: 'flex', border: '2px solid black' }}>
                    {data.map((Country, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={Country}
                                onChange={(e) => handleCityInputChange(index, e.target.value)}
                            />
                            <button onClick={() => handleRemoveCityInput(index)}>x</button>
                        </div>
                    ))}
                    <button onClick={handleAddCityInput}>Add More</button>
                </div>
            </div>
        </div>
    )
}
