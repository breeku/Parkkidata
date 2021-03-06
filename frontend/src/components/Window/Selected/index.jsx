import React, { useState, useEffect } from 'react'

import { getParkingStatistics } from '../../../services/parking'

export default function Selected({ selected }) {
    const [parkingStatistics, setParkingStatistics] = useState(null)

    useEffect(() => {
        ;(async () => {
            if (selected.uid) {
                const { current_parking_count } = await getParkingStatistics(selected.uid)
                setParkingStatistics(current_parking_count)
            }
        })()
    }, [selected])

    return (
        <>
            {selected && (
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
                    capacity estimate: {selected?.capacity_estimate || 'unknown'}
                    <br />
                    current parking count: {parkingStatistics}
                </div>
            )}
        </>
    )
}
