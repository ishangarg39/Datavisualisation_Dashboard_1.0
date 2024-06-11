import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import data from "../../data.json";

const DoughnutChart = () => {
    const [selectedCountries, setSelectedCountries] = useState({});
    const [countryDataArray, setCountryDataArray] = useState([]);

    useEffect(() => {
        const countryData = data.reduce((acc, item) => {
            if (!acc[item.country]) {
                acc[item.country] = 1;
            } else {
                acc[item.country] += 1;
            }
            return acc;
        }, {});

        const dataArray = Object.keys(countryData).map(country => ({
            country,
            count: countryData[country],
            visible: true // Initially all slices and labels are visible
        }));

        setCountryDataArray(dataArray);
    }, []);

    useEffect(() => {
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;
        const innerRadius = radius * 0.6;

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie()
            .value(d => d.count)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(radius);

        const svg = d3.select('#doughnut-chart-container')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const arcs = svg.selectAll('arc')
            .data(pie(countryDataArray))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .style('opacity', d => (selectedCountries[d.data.country] ? 1 : 0.2));

        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '0.35em')
            .text(d => d.data.country)
            .attr('fill', (d, i) => color(i))
            .style('visibility', d => (selectedCountries[d.data.country] ? 'visible' : 'hidden'));

    }, [countryDataArray, selectedCountries]);

    const handleCheckboxChange = (country) => {
        setSelectedCountries(prevSelected => ({
            ...prevSelected,
            [country]: !prevSelected[country]
        }));
    };

    return (
        <div>
            <div id="doughnut-chart-container"></div>
            <div>
                {countryDataArray.map((country, index) => (
                    <label key={index} style={{ marginRight: '10px' }}>
                        <input
                            type="checkbox"
                            checked={selectedCountries[country.country]}
                            onChange={() => handleCheckboxChange(country.country)}
                        />
                        {country.country}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default DoughnutChart;
