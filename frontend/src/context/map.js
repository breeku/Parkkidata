import React from 'react'

export const MapContext = React.createContext()

export const mapInitialState = {
    map: null,
}

export const mapReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MAP':
            return {
                ...state,
                map: action.payload,
            }
        default:
            return state
    }
}
