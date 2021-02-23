import React, { useContext, useEffect, useState } from 'react'

import Draggable from 'react-draggable'

import { ParkingDataContext } from '../../context/parking_data'

import { getParkingStatistics } from '../../services/parking'

export default function Window() {
    const [parkingStatistics, setParkingStatistics] = useState(null)
    const {
        parkingDataState: { selected, locations },
        parkingDataDispatch,
    } = useContext(ParkingDataContext)
    const maxCapacity = Math.max.apply(
        Math,
        locations.map(parking_space => {
            return parking_space.capacity_estimate
        }),
    )
    const [slider, setSlider] = useState(maxCapacity)
    const [checkbox, setCheckbox] = useState(false)
    const [operator, setOperator] = useState('more than')

    useEffect(() => {
        ;(async () => {
            if (selected.uid) {
                const { current_parking_count } = await getParkingStatistics(selected.uid)
                setParkingStatistics(current_parking_count)
            }
        })()
    }, [selected])

    useEffect(() => {
        ;(() => {
            let filtered
            if (operator === 'more than') {
                filtered = locations.filter(
                    item =>
                        (checkbox && !item.capacity_estimate) ||
                        item.capacity_estimate > slider,
                )
            } else if (operator === 'less than') {
                filtered = locations.filter(
                    item =>
                        (checkbox && !item.capacity_estimate) ||
                        item.capacity_estimate < slider,
                )
            } else if (operator === 'equal') {
                filtered = locations.filter(
                    item =>
                        (checkbox && !item.capacity_estimate) ||
                        parseInt(item.capacity_estimate) === parseInt(slider),
                )
            }

            parkingDataDispatch({
                type: 'SET_FILTERED_LOCATIONS',
                payload: filtered,
            })
        })()
    }, [checkbox, locations, operator, parkingDataDispatch, slider])

    return (
        <Draggable
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            scale={1}
            handle='.handle'>
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
                        width: '300px',
                        padding: 10,
                        marginBottom: 3,
                        textAlign: 'center',
                    }}>
                    Filters:
                    <br />
                    Parking capacity (estimate):
                    <br />
                    <div>
                        <select onChange={e => setOperator(e.target.value)}>
                            <option value='more than'>More than</option>
                            <option value='less than'>Less than</option>
                            <option value='equal'>Equal</option>
                        </select>
                        <input
                            type='range'
                            min='0'
                            max={maxCapacity}
                            value={slider}
                            class='slider'
                            onChange={event => setSlider(event.target.value)}
                        />
                        <br />
                        {slider}
                        <br />
                        Show unknown capacity estimate:{' '}
                        <input
                            type='checkbox'
                            checked={checkbox}
                            onChange={event => setCheckbox(event.target.checked)}
                        />
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        display: 'inline-block',
                        width: '200px',
                        padding: 10,
                        textAlign: 'center',
                    }}
                    className='handle'>
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
