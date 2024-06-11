import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

const LineChart = () => {
    const windowWidth = useRef(window.innerWidth);
    const windowHeight = useRef(window.innerHeight);
    const data = useSelector((state) => state.data.value);

    useEffect(() => {
        // Set up the dimensions for the SVG
        const width = windowWidth.current - 100;
        const height = windowHeight.current - 100;
        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Extract years and corresponding counts
        const yearCounts = data ? data.reduce((acc, item) => {
            const year = item.start_year || 'Unknown';
            acc[year] = acc[year] ? acc[year] + 1 : 1;
            return acc;
        }, {}) : {};

        const yearDataArray = Object.keys(yearCounts).map(year => ({
            year,
            count: yearCounts[year]
        }));

        const newSvg = d3.select(`#line-chart-container`)
            .selectAll('svg')
            .remove();

        // Create SVG element
        const svg = d3.select('#line-chart-container')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // Create scales
        const xScale = d3.scaleBand()
            .domain(yearDataArray.map(d => d.year))
            .range([0, innerWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(yearDataArray, d => d.count)])
            .nice()
            .range([innerHeight, 0]);

        // Create line generator
        const line = d3.line()
            .x(d => xScale(d.year) + xScale.bandwidth() / 2)
            .y(d => yScale(d.count));

        // Append group for chart
        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Draw line
        chart.append('path')
            .datum(yearDataArray)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line);

        // Draw x-axis
        chart.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));

        // Draw y-axis
        chart.append('g')
            .call(d3.axisLeft(yScale));

    }, []);

    return (
        <div>
            <h1>Yearly Counts</h1>
            <div id="line-chart-container"></div>
        </div>
    );
};

export default LineChart;