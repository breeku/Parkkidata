import React, { useContext, useEffect, useState } from 'react'

import Draggable from 'react-draggable'

import { ParkingDataContext } from '../../context/parking_data'

import { getParkingStatistics } from '../../services/parking'

import Graph from '../Window/Graph/index'

import Filter from './Filter'
import Statistics from './Statistics'

export default function Window() {
    const [parkingStatistics, setParkingStatistics] = useState(null)
    const [current, setCurrent] = useState(true)
    const [statistics, setStatistics] = useState(false)

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
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            scale={1}
            cancel='.disable'>
            <div
                style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'absolute',
                    cursor: 'grab',
                }}>
                <div style={{ marginBottom: 3 }}>
                    <button onClick={() => (setCurrent(true), setStatistics(false))}>
                        Current
                    </button>
                    <button onClick={() => (setCurrent(false), setStatistics(true))}>
                        Statistics
                    </button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                    {current && (
                        <>
                            <Filter />

                            {selected.uid && (
                                <>
                                    <div
                                        style={{
                                            backgroundColor: 'white',
                                            display: 'inline-block',
                                            width: '200px',
                                            padding: 10,
                                            marginTop: 3,
                                            marginBottom: 3,
                                            textAlign: 'center',
                                        }}>
                                        uid: {selected?.uid}
                                        <br />
                                        capacity estimate:{' '}
                                        {selected?.capacity_estimate || 'unknown'}
                                        <br />
                                        current parking count: {parkingStatistics}
                                    </div>
                                    <Graph uid={selected.uid} />
                                </>
                            )}
                        </>
                    )}
                    {statistics && <Statistics />}
                </div>
            </div>
        </Draggable>
    )
}
