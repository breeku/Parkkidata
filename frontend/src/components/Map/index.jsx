import React, { useState, useEffect, useContext, useRef } from 'react'

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'

import { getParkingLocations } from '../../services/parking'

import { ParkingDataContext } from '../../context/parking_data'

import { MapContext } from '../../context/map'

export default function Map() {
    const {
        parkingDataState: { filtered },
        parkingDataDispatch,
    } = useContext(ParkingDataContext)
    const {
        mapState: { highlight, reset },
        mapDispatch,
    } = useContext(MapContext)
    const geoJsonLayer = useRef(null)

    useEffect(() => {
        ;(async () => {
            parkingDataDispatch({
                type: 'SET_PARKING_LOCATIONS',
                payload: await getParkingLocations(),
            })
        })()
    }, [parkingDataDispatch])

    useEffect(() => {
        geoJsonLayer.current?.clearLayers().addData(filtered)
    }, [filtered])

    useEffect(() => {
        highlight?.setStyle({ color: 'red' })
    }, [highlight])

    useEffect(() => {
        geoJsonLayer.current?.resetStyle(reset)
    }, [reset])

    const onEachFeature = (feature, layer) => {
        layer.on({
            click: () => {
                const properties = layer.feature.properties

                parkingDataDispatch({
                    type: 'SET_PARKING_DATA',
                    payload: {
                        capacity_estimate: properties.capacity_estimate,
                        uid: properties.uid,
                        statistics: false,
                    },
                })

                mapDispatch({ type: 'HIGHLIGHT', payload: { highlight: layer } })
            },
        })
    }

    return (
        <MapContainer
            center={[60.1699, 24.9384]}
            zoom={13}
            whenCreated={map => mapDispatch({ type: 'SET_MAP', payload: map })}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {filtered && (
                <GeoJSON
                    ref={geoJsonLayer}
                    data={filtered}
                    onEachFeature={(feature, layer) => onEachFeature(feature, layer)}
                />
            )}
        </MapContainer>
    )
}
