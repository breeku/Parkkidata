import React, { useContext, useEffect, useState } from "react"

import Draggable from "react-draggable"

import { ParkingDataContext } from "../../context/parking_data"

import { getParkingStatistics } from "../../services/parking"

import { getParkingHistory } from "../../services/parking"

import { LineChart, Line } from 'recharts';

export default function Window() {
    const [parkingStatistics, setParkingStatistics] = useState(null)
    const [parkingHistory, setParkingHistory] = useState(null)
    const { parkingDataState } = useContext(ParkingDataContext)

    useEffect(() => {
        ; (async () => {
            if (parkingDataState.uid) {
                const { current_parking_count } = await getParkingStatistics(parkingDataState.uid)
                const current_parking_history = await getParkingHistory(parkingDataState.uid)
                setParkingStatistics(current_parking_count)
                setParkingHistory(current_parking_history)
            }
        })()
    }, [parkingDataState])
    return (
        <Draggable defaultPosition={{ x: 0, y: 0 }} position={null} scale={1}>
            <div
                style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
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
                {parkingHistory &&
                <div 
                    style={{
                        backgroundColor: "white",
                        display: "inline-block",
                        width: "400px",
                        height: "400px",
                        marginTop: 3,
                    }}>
                     <LineChart width={400} height={400} data={parkingHistory}>
                        <Line type="monotone" dataKey="current_parking_count" stroke="#8884d8" />
                    </LineChart>
                </div>}
            </div>
        </Draggable>
    )
}
