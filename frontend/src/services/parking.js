import axios from 'axios'
const API = 'http://localhost:3001/api' // todo

export const getParkingLocations = async () => {
    try {
        const { data } = await axios.get(API + '/parking_area')
        return data
    } catch (e) {
        console.error(e)
    }
}

export const getParkingStatistics = async uid => {
    try {
        const { data } = await axios.get(API + '/parking_area_statistics/uid/' + uid)
        return data
    } catch (e) {
        console.error(e)
    }
}

export const getParkingHistory = async (uid, limit) => {
    try {
        const { data } = await axios.get(API + "/parking_history/uid/" + uid + "/" + limit)
        return data
    } catch (e) {
        console.error(e)
    }
}
