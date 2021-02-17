import React, { useEffect, useState } from "react"

import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet"

import { getParkingLocations } from "../../services/parking"

export default function Map() {
    const [parkingLocations, setParkingLocations] = useState(null)
    useEffect(() => {
        ;(async () => {
            setParkingLocations(await getParkingLocations())
        })()
    }, [])

    return (
        <MapContainer center={[60.1699, 24.9384]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {parkingLocations &&
                parkingLocations.features.map((feature) => (
                    <GeoJSON
                        pathOptions={{ color: "red" }}
                        data={feature.geometry}
                    >
                        <Popup>
                            Capacity:{" "}
                            {feature.properties.capacity_estimate || "unknown"}
                        </Popup>
                    </GeoJSON>
                ))}
        </MapContainer>
    )
}
