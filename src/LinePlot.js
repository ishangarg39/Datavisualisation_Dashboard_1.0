// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import dat from './data.json'
// const BarChart = () => {
//     const data = dat;
//     const windowWidth = useRef(window.innerWidth);
//     const windowHeight = useRef(window.innerHeight);
//     // console.log(windowWidth)
//     useEffect(() => {

//         const margin = { top: 30, right: 30, bottom: 40, left: 40 };
//         const width = windowWidth.current - margin.left - margin.right;
//         const height = windowHeight / 2 - margin.top - margin.bottom;

//         const x = d3.scaleBand()
//             .domain(data.map(d => d.topic))
//             .range([0, width])
//             .padding(0.2);

//         const y = d3.scaleLinear()
//             .domain([0, d3.max(data, d => d.intensity)])
//             .nice()
//             .range([height, 0]);

//         const svg = d3.select('#bar-chart-container')
//             .append('svg')
//             .attr('width', width + margin.left + margin.right)
//             .attr('height', height + margin.top + margin.bottom)
//             .append('g')
//             .attr('transform', `translate(${margin.left},${margin.top})`);

//         svg.selectAll('.bar')
//             .data(data)
//             .enter().append('rect')
//             .attr('class', 'bar')
//             .attr('x', d => x(d.topic))
//             .attr('width', x.bandwidth())
//             .attr('y', d => y(d.intensity))
//             .attr('height', d => height - y(d.intensity));

//         svg.append('g')
//             .attr('transform', `translate(0,${height})`)
//             .call(d3.axisBottom(x)
//                 .tickSize(0))
//             .selectAll("text")
//             .style("text-anchor", "middle")
//             .attr("transform", "rotate(-90)")
//             .attr("dy", "0.5em")
//             .attr("dx", "-0.8em");

//         svg.append('g')
//             .call(d3.axisLeft(y));

//     }, [data]);

//     return (
//         <div id="bar-chart-container"></div>
//     );
// };

// export default BarChart;
