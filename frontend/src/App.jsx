import React, { useReducer } from "react"

import Map from "./components/Map/"
import Window from "./components/Window/"

import {
    ParkingDataContext,
    parkingDataInitialState,
    parkingDataReducer,
} from "./context/parking_data"

export default function App() {
    const [parkingDataState, parkingDataDispatch] = React.useReducer(
        parkingDataReducer,
        parkingDataInitialState
    )

    return (
        <ParkingDataContext.Provider
            value={{
                parkingDataState,
                parkingDataDispatch,
            }}
        >
            <Map />
            <Window />
        </ParkingDataContext.Provider>
    )
}
