import React, { useContext, useEffect, useState } from 'react'

import Draggable from 'react-draggable'

import { ParkingDataContext } from '../../context/parking_data'

import Graph from '../Window/Graph/index'

import Filter from './Filter'
import Statistics from './Statistics'
import Selected from './Selected'

export default function Window() {
    const [filters, setFilters] = useState(true)
    const [statistics, setStatistics] = useState(false)

    const {
        parkingDataState: { selected },
    } = useContext(ParkingDataContext)

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
                    <button onClick={() => (setFilters(true), setStatistics(false))}>
                        Filters
                    </button>
                    <button onClick={() => (setFilters(false), setStatistics(true))}>
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
                    {filters && (
                        <>
                            <Filter />
                            {selected.uid && (
                                <>
                                    <Selected selected={selected} />
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
