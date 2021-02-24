import React, { useContext, useEffect, useState } from 'react'

import Draggable from 'react-draggable'

import { ParkingDataContext } from '../../context/parking_data'

import { getParkingStatistics } from '../../services/parking'

import { getParkingHistory } from '../../services/parking'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

import Filter from './Filter'

export default function Window() {
    const [parkingStatistics, setParkingStatistics] = useState(null)
    const [parkingHistory, setParkingHistory] = useState(null)
    const {
        parkingDataState: { selected },
    } = useContext(ParkingDataContext)

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const date = new Date(label)
            const labelDate =
                date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
            label = date.getUTCHours() + 2 + '.00'
            return (
                <div
                    style={{ backgroundColor: 'white', opacity: '90%' }}
                    className='custom-tooltip'>
                    <p className='label'>{`date: ${labelDate}`}</p>
                    <p className='label'>{`time: ${label}`}</p>
                    <p className='label'>{`parking count: ${payload[0].value}`}</p>
                </div>
            )
        }

        return null
    }

    useEffect(() => {
        ;(async () => {
            if (selected.uid) {
                const { current_parking_count } = await getParkingStatistics(selected.uid)
                const current_parking_history = await getParkingHistory(selected.uid)
                setParkingStatistics(current_parking_count)
                setParkingHistory(current_parking_history)
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
                }}>
                <div
                    style={{
                        backgroundColor: 'white',
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
                        backgroundColor: 'white',
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

                {parkingHistory && (
                    <div
                        style={{
                            backgroundColor: 'white',
                            display: 'inline-block',
                            width: '400px',
                            height: '400px',
                            marginTop: 3,
                        }}>
                        <LineChart width={400} height={400} data={parkingHistory}>
                            <Line
                                type='monotone'
                                dataKey='current_parking_count'
                                stroke='#8884d8'
                            />
                            <CartesianGrid stroke='#ccc' strokeDasharray='1 1' />
                            <XAxis
                                dataKey='created_at'
                                tickFormatter={formtime =>
                                    new Date(formtime).toLocaleTimeString(['en-US'], {
                                        hour: '2-digit',
                                    })
                                }
                            />
                            <YAxis dataKey='current_parking_count' />
                            <Tooltip content={CustomTooltip} />
                        </LineChart>
                    </div>
                )}
            </div>
        </Draggable>
    )
}
