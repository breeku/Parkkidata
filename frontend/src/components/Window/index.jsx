import React, { useContext, useEffect, useState } from "react"

import Draggable from "react-draggable"

import { ParkingDataContext } from "../../context/parking_data"

import {getParkingStatistics} from "../../services/parking"

export default function Window() {
    const [parkingStatistics, setParkingStatistics] = useState(null)
    const { parkingDataState } = useContext(ParkingDataContext)

    useEffect(() => {
        ;(async () => {
            if(parkingDataState.uid){
                const {current_parking_count} = await getParkingStatistics(parkingDataState.uid)
                setParkingStatistics(current_parking_count)
            }
        })()
    }, [parkingDataState])

    return (
        <Draggable defaultPosition={{ x: 0, y: 0 }} position={null} scale={1}>
            <div
                style={{
                    backgroundColor: "white",
                    display: "inline-block",
                    width: "300px",
                    height: "300px",
                }}
            >
                <div>
                    uid: {parkingDataState?.uid}
                    <br />
                    capacity estimate: {parkingDataState?.capacity_estimate}
                    <br />
                    current parking count: {parkingStatistics}
                </div>
            </div>
        </Draggable>
    )
}
