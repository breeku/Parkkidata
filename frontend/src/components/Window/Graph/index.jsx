import React from 'react'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function Graph(props) {
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
                backgroundColor: "white",
                display: "inline-block",
                width: "400px",
                height: "400px",
                marginTop: 3,
                overflow: "auto",
                marginLeft: "0",
            }}>
            <LineChart width={400} height={380} margin={{ right: 15, top: 5 }} data={props.history}>
                <Line type="monotone" dataKey="current_parking_count" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
                <XAxis dataKey="created_at" tickFormatter={(formtime) => new Date(formtime).toLocaleTimeString(["en-US"], { hour: '2-digit' })} />
                <YAxis width={30} dataKey="current_parking_count" />
                <Tooltip content={CustomTooltip} />
            </LineChart>
        </div>
    )
}