import axios from "axios"
const API = "http://localhost:3001/api" // todo

export const getParkingLocations = async () => {
    try {
        const { data } = await axios.get(API + "/parking_area")
        return data
    } catch (e) {
        console.error(e)
    }
}
