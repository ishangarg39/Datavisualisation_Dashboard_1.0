import { configureStore } from '@reduxjs/toolkit'
import CitySlicer from './reducers/CitySlicer'
import CountrySlicer from './reducers/CountrySlicer'
import EndYearSlicer from './reducers/EndYear'
import SourceSlicer from './reducers/SourceSlicer'
import TopicSlicer from './reducers/TopicSlicer'
import RegionSlicer from './reducers/RegionSlicer'
import SectorSlicer from './reducers/SectorSlicer'
import DataSlicer from './reducers/DataSlicer'
export const store = configureStore({
    reducer: {
        city: CitySlicer,
        country: CountrySlicer,
        endYear: EndYearSlicer,
        source: SourceSlicer,
        topic: TopicSlicer,
        region: RegionSlicer,
        sector: SectorSlicer,
        data: DataSlicer
    },
})