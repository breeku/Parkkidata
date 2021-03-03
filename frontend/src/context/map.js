import React from 'react'

export const MapContext = React.createContext()

export const mapInitialState = {
    map: null,
    highlight: null,
    reset: null,
}

export const mapReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MAP':
            return {
                ...state,
                map: action.payload,
            }
        case 'HIGHLIGHT':
            return {
                ...state,
                highlight: action.payload.highlight,
                reset: state.highlight,
            }
        default:
            return state
    }
}
