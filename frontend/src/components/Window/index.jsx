import React, { useContext, useEffect, useState } from 'react'

import Draggable from 'react-draggable'

import { ParkingDataContext } from '../../context/parking_data'

import { getParkingStatistics } from '../../services/parking'

import Graph from '../Window/Graph/index'

import Filter from './Filter'

export default function Window() {
    const [parkingStatistics, setParkingStatistics] = useState(null)
    const [dragging, setDragging] = useState(false)

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
        <Draggable
            defaultPosition={{ x: 45, y: 0 }}
            position={null}
            scale={1}
            cancel='.disable'
            onDrag={() => setDragging(true)}
            onStop={() => setDragging(false)}>
            <div
                style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'absolute',
                    opacity: dragging ? '0.5' : '1.0',
                }}>
                <div
                    style={{
                        backgroundColor: 'green',
                        display: 'inline-block',
                        width: '300px',
                        padding: 10,
                        marginBottom: 3,
                        textAlign: 'center',
                    }}>
                    <Filter />
                </div>
                <div
                    style={{
                        backgroundColor: 'green',
                        display: 'inline-block',
                        width: '200px',
                        padding: 10,
                        textAlign: 'center',
                    }}>
                    uid: {selected?.uid}
                    <br />
                    capacity estimate: {selected?.capacity_estimate || 'unknown'}
                    <br />
                    current parking count: {parkingStatistics}
                </div>
                {selected.uid && <Graph uid={selected.uid} />}
            </div>
        </Draggable>
    )
}
