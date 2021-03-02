import React, { useState, useEffect } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { getPopularParkingAreas } from '../../../services/parking'

import Graph from '../Graph'

export default function Statistics() {
    const [statistics, setStatistics] = useState([])
    const [fromDate, setFromDate] = useState(
        new Date(new Date().setDate(new Date().getDate() - 1)),
    )
    const [toDate, setToDate] = useState(new Date())
    const [limit, setLimit] = useState(5) // TODO
    const [offset, setOffset] = useState(0) // TODO
    const [history, setHistory] = useState(null)

    useEffect(() => {
        ;(async () => {
            setStatistics(await getPopularParkingAreas(fromDate, toDate, limit, offset))
        })()
    }, [fromDate, toDate, limit, offset])

    return (
        <div>
            <DatePicker selected={fromDate} onChange={date => setFromDate(date)} />
            <DatePicker selected={toDate} onChange={date => setToDate(date)} />
            {statistics.map(item => (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: 'auto',
                        flexDirection: 'column',
                    }}>
                    <div
                        style={{
                            backgroundColor: 'grey',
                            width: '100%',
                            cursor: 'pointer',
                            marginBottom: 5,
                            marginTop: 5,
                            height: 40,
                        }}
                        onClick={() =>
                            item.uid === history?.uid
                                ? setHistory(null)
                                : setHistory({
                                      uid: item.uid,
                                      list: item.history,
                                  })
                        }>
                        total: {item.parking_sum}
                    </div>
                </div>
            ))}
            {history?.list && <Graph propsParkingHistory={history.list} />}
        </div>
    )
}
