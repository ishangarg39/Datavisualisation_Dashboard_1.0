import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import dat from '../../data.json';
import { useSelector } from 'react-redux';

const BarChart = (props) => {
    const { category, chartId } = props; // category and chart identifier
    const windowWidth = useRef(window.innerWidth);
    const windowHeight = useRef(window.innerHeight);
    const data = useSelector((state) => state.data.value);
    const colorScale = d3.scaleOrdinal()
        .domain(data && Array.isArray(data) ? data.map(d => d.sector) : [])
        .range(['#FF5733', '#FFC300', '#DAF7A6']);

    useEffect(() => {
        if (!data) {
            return
        }
        const margin = { top: 20, right: 30, bottom: 110, left: 50 };
        const width = windowWidth.current - margin.left - margin.right - 100;
        const height = windowHeight.current / 1.5 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .domain(data.map(d => d.sector))
            .range([0, width])
            .padding(0.2);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[category])])
            .nice()
            .range([height, 0]);

        const svg = d3.select(`#bar-chart-container-${chartId}`)
            .selectAll('svg')
            .remove();

        const newSvg = d3.select(`#bar-chart-container-${chartId}`)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        newSvg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.sector))
            .attr('width', x.bandwidth())
            .attr('y', d => y(d[category]))
            .attr('height', d => height - y(d[category]))
            .attr('fill', d => colorScale(d.sector));

        newSvg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickSize(0))
            .selectAll('text')
            .style('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .attr('dy', '0.5em')
            .attr('dx', '-5.5em');

        newSvg.append('g')
            .call(d3.axisLeft(y));
    }, [data, category, chartId]);

    return (
        <div>
            <h1 style={{ textTransform: 'capitalize' }}>{category}</h1>
            <div id={`bar-chart-container-${chartId}`}></div>
            <br />
        </div>
    );
};

export default BarChart;
