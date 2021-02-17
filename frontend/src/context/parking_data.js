import React from "react"

export const ParkingDataContext = React.createContext()

export const parkingDataInitialState = {
    uid: null,
    capacity_estimate: null,
    current_parking_count: null,
}

export const parkingDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_PARKING_DATA":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
