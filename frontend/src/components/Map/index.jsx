import React, { useEffect, useContext } from 'react'

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'

import { getParkingLocations } from '../../services/parking'

import { ParkingDataContext } from '../../context/parking_data'

export default function Map() {
    const {
        parkingDataState: { filtered },
        parkingDataDispatch,
    } = useContext(ParkingDataContext)

    useEffect(() => {
        ;(async () => {
            parkingDataDispatch({
                type: 'SET_PARKING_LOCATIONS',
                payload: await getParkingLocations(),
            })
        })()
    }, [parkingDataDispatch])

    return (
        <MapContainer center={[60.1699, 24.9384]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {filtered &&
                filtered.map(feature => (
                    <GeoJSON
                        pathOptions={{ color: 'red' }}
                        data={feature.geometry}
                        eventHandlers={{
                            click: () => {
                                parkingDataDispatch({
                                    type: 'SET_PARKING_DATA',
                                    payload: {
                                        capacity_estimate: feature.capacity_estimate,
                                        uid: feature.uid,
                                    },
                                })
                            },
                        }}></GeoJSON>
                ))}
        </MapContainer>
    )
}
