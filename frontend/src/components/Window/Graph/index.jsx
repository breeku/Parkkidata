import React, { useEffect, useState } from 'react'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { getParkingHistory } from '../../../services/parking'

export default function Graph({ uid }) {
    const [parkingHistory, setParkingHistory] = useState(null)
    const [limit, setLimit] = useState(24)
    useEffect(() => {
        ; (async () => {
            if (uid) {
                const current_parking_history = await getParkingHistory(uid, limit)
                setParkingHistory(current_parking_history)
            }
        })()
    }, [uid, limit])

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const date = new Date(label)
            const labelDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
            label = date.getUTCHours() + 2 + ".00"
            return (
                <div style={{ backgroundColor: "white", opacity: "90%", }} className="custom-tooltip">
                    <p className="label">{`date: ${labelDate}`}</p>
                    <p className="label">{`time: ${label}`}</p>
                    <p className="label">{`parking count: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };
    return (
        <div
            style={{
                backgroundColor: "#ceedfd",
                display: "inline-block",
                width: "400px",
                height: "400px",
                marginTop: 3,
                overflow: "auto",
                marginLeft: "0",
            }}>
            <LineChart width={400} height={380} margin={{ right: 15, top: 5 }} data={parkingHistory}>
                <Line type="monotone" dataKey="current_parking_count" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
                <XAxis reversed={true} dataKey="created_at" tickFormatter={(formtime) => new Date(formtime).toLocaleTimeString(["en-US"], { hour: '2-digit' })} />
                <YAxis width={30} dataKey="current_parking_count" />
                <Tooltip content={CustomTooltip} />
            </LineChart>
            <label style={{ paddingLeft: "150px" }}> limit:
            <select defaultValue="24" onChange={e => setLimit(parseInt(e.target.value))}>
                    <option value="12">12h</option>
                    <option value="24">24h</option>
                    <option value="168">7d</option>
                </select>
            </label>
        </div>
    )
}