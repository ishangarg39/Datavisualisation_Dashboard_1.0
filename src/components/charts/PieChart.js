import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

const DoughnutChart = (props) => {
    const { category, chartId } = props;
    const data = useSelector((state) => state.data.value);
    const windowWidth = useRef(window.innerWidth);
    const windowHeight = useRef(window.innerHeight);

    const categoryData = data ? data.reduce((acc, item) => {
        const key = item[category];
        if (!acc[key]) {
            acc[key] = 1;
        } else {
            acc[key] += 1;
        }
        return acc;
    }, {}) : {};

    const categoryDataArray = Object.keys(categoryData).map((key) => ({
        category: key,
        count: categoryData[key],
    }));

    useEffect(() => {
        const width = windowWidth.current - 100;
        const height = windowHeight.current - 100;
        const radius = Math.min(width, height) / 2;
        const innerRadius = radius * 0.4;

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie().value((d) => d.count).sort(null);

        const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);

        const svg = d3
            .select(`#doughnut-chart-container-${chartId}`)
            .selectAll('svg')
            .remove();

        const newSvg = d3
            .select(`#doughnut-chart-container-${chartId}`)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const arcs = newSvg.selectAll('arc').data(pie(categoryDataArray)).enter().append('g').attr('class', 'arc');

        arcs.append('path').attr('d', arc).attr('fill', (_, i) => color(i));

        arcs
            .append('text')
            .attr('transform', (d) => `translate(${arc.centroid(d)})`)
            .attr('dy', '0.35em')
            .attr('fill', (_, i) => color(i));

        const legend = newSvg
            .selectAll('.legend')
            .data(categoryDataArray)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(0,${i * 20})`);

        legend
            .append('rect')
            .attr('x', width / 2 - 230)
            .attr('y', 90 - windowHeight.current / 2)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', (_, i) => color(i));

        legend
            .append('text')
            .attr('x', width / 2 - 241)
            .attr('y', 100 - windowHeight.current / 2)
            .attr('dy', '.35em')
            .style('text-anchor', 'end')
            .text((d) => d.category);
    }, [categoryDataArray, category, chartId]);

    return (
        <div>
            <h1 style={{ textTransform: 'capitalize' }}>{category}</h1>
            <div id={`doughnut-chart-container-${chartId}`}></div>
        </div>
    );
};

export default DoughnutChart;
