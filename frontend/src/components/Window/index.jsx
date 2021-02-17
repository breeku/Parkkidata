import React, { useContext, useEffect, useState } from 'react'

import Draggable from 'react-draggable'

import { ParkingDataContext } from '../../context/parking_data'

import { getParkingStatistics } from '../../services/parking'

export default function Window() {
    const [parkingStatistics, setParkingStatistics] = useState(null)
    const {
        parkingDataState: { selected },
    } = useContext(ParkingDataContext)

    useEffect(() => {
        ;(async () => {
            if (selected.uid) {
                const { current_parking_count } = await getParkingStatistics(selected.uid)
                setParkingStatistics(current_parking_count)
            }
        })()
    }, [selected])

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
                        backgroundColor: 'white',
                        display: 'inline-block',
                        width: '100px',
                        padding: 10,
                        marginBottom: 3,
                        textAlign: 'center',
                    }}>
                    Filters
                    <br />
                    --
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        display: 'inline-block',
                        width: '300px',
                        padding: 10,
                        textAlign: 'center',
                    }}>
                    uid: {selected?.uid}
                    <br />
                    capacity estimate: {selected?.capacity_estimate}
                    <br />
                    current parking count: {parkingStatistics}
                </div>
            </div>
        </Draggable>
    )
}
