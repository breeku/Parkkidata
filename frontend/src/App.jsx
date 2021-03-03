import React, { useReducer } from 'react'

import Map from './components/Map/'
import Window from './components/Window/'

import {
    ParkingDataContext,
    parkingDataInitialState,
    parkingDataReducer,
} from './context/parking_data'

import { MapContext, mapInitialState, mapReducer } from './context/map'

export default function App() {
    const [parkingDataState, parkingDataDispatch] = useReducer(
        parkingDataReducer,
        parkingDataInitialState,
    )
    const [mapState, mapDispatch] = useReducer(mapReducer, mapInitialState)

    return (
        <ParkingDataContext.Provider
            value={{
                parkingDataState,
                parkingDataDispatch,
            }}>
            <MapContext.Provider
                value={{
                    mapState,
                    mapDispatch,
                }}>
                <Map />
                <Window />
            </MapContext.Provider>
        </ParkingDataContext.Provider>
    )
}
