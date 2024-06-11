import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CityFilter from './filters/CityFilter';
import CountryFilter from './filters/CountryFilter'
import TopicFilter from './filters/TopicFilter'
import EndYearFilter from './filters/EndYearFilter';
import RegionFilter from './filters/RegionFilter';
import SectorFilter from './filters/SectorFilter';
import SourceFilter from './filters/SourceFilter';

import axios from 'axios'
import { dataFilter } from '../../redux/reducers/DataSlicer';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';

const DashboardFilters = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const city = useSelector((state) => state.city.value)
    const country = useSelector((state) => state.country.value)
    const topic = useSelector((state) => state.topic.value)
    const endYear = useSelector((state) => state.endYear.value)
    const region = useSelector((state) => state.region.value)
    const sector = useSelector((state) => state.sector.value)
    const source = useSelector((state) => state.source.value)

    // console.log(region)
    const dispacth = useDispatch();

    const handleFilterChange = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api', { params: { countryData: country, topicData: topic, endYearData: endYear, regionData: region, sectorData: sector, sourceData: source } });
            console.log("data", endYear);
            //console.log("Dashboard= ", data.data);
            if (data) {
                setData(data);

                dispacth(dataFilter(data.data))
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleFilterChange();
    }, [])
    return (
        <div>
            <div style={{ backgroundColor: "rgb(152 219 219)", padding: "5px" }}>
                <h1>Visualization Dashboard        </h1>

                <CityFilter />
                <CountryFilter />
                <TopicFilter />
                <EndYearFilter />
                <RegionFilter />
                <SectorFilter />
                <SourceFilter />
                <button disabled={loading} onClick={handleFilterChange}>Apply Filters</button>

            </div>
            {loading && <h1>Loading Data...</h1>}
            {!loading && <div style={{ margin: "auto ", padding: "2px" }}>
                <div style={{ padding: "10px" }}>
                    <h1>Bar Chart  </h1>
                    <BarChart category="intensity" chartId="chart1" />
                    <br />
                    <BarChart category="likelihood" chartId="chart2" />
                    <BarChart category="relevance" chartId="chart3" />
                </div>
                <div style={{ padding: "10px" }}>
                    <h1>Pie Chart  </h1>
                    <PieChart category="country" chartId="chart1" />
                    <PieChart category="topic" chartId="chart2" />
                    <PieChart category="region" chartId="chart3" />
                </div>
                <div style={{ padding: "10px" }}> <h1>Line Chart  </h1>
                    <LineChart />
                </div>
            </div>}
        </div>
    );
};

export default DashboardFilters;
