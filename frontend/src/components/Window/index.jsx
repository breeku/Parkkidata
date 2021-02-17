import React, { useContext } from "react"

import Draggable from "react-draggable"

import { ParkingDataContext } from "../../context/parking_data"

export default function Window() {
    const { parkingDataState } = useContext(ParkingDataContext)

    console.log(parkingDataState)
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
                    {parkingDataState?.current_parking_count}
                </div>
            </div>
        </Draggable>
    )
}
