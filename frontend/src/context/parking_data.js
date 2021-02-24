import React from 'react'

export const ParkingDataContext = React.createContext()

export const parkingDataInitialState = {
    selected: {
        uid: null,
        capacity_estimate: null,
    },
    locations: [],
    filtered: [],
}

export const parkingDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PARKING_DATA':
            return {
                ...state,
                selected: { ...action.payload },
            }
        case 'SET_PARKING_LOCATIONS':
            return {
                ...state,
                locations: [...action.payload],
                filtered: [...action.payload],
            }
        case 'SET_FILTERED_LOCATIONS':
            return {
                ...state,
                filtered: [...action.payload],
            }
        default:
            return state
    }
}
