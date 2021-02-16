import React, { useEffect, useState } from "react"

import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet"

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
                parkingLocations.features.map((feature) =>
                    feature.geometry.coordinates.map((coordinates) => {
                        const correctedCoordinates = []
                        for (const coord of coordinates[0]) {
                            // the coordinates are the wrong way around. This should be done server side
                            correctedCoordinates.push([coord[1], coord[0]])
                        }
                        return (
                            <Polyline
                                pathOptions={{ color: "red" }}
                                positions={correctedCoordinates}
                            >
                                <Popup>
                                    Capacity:{" "}
                                    {feature.properties.capacity_estimate ||
                                        "unknown"}
                                </Popup>
                            </Polyline>
                        )
                    })
                )}
        </MapContainer>
    )
}
