const express = require("express")
const axios = require("axios")
const router = express.Router()
const { getParkingAreas } = require("../database/queries/parking_area")
const { getParkingHistoryByUid } = require ("../database/queries/parking_area")

const BASEURL = "https://pubapi.parkkiopas.fi/public/v1"

router.get("/parking_area/", async (req, res) => {
    try {
        const data = await getParkingAreas()
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

router.get("/parking_history/uid/:uid", async (req, res) => {
    const uid = req.params.uid
    try {
        const data = await getParkingHistoryByUid(uid)
        res.send(data)
    } catch (e) {
        console.error(e)
    }
}) 

router.get("/parking_area/page/:page", async (req, res) => {
    const page = req.params.page
    try {
        const { data } = await axios.get(
            BASEURL + "/parking_area/?page=" + page
        )
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

router.get("/parking_area/id/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { data } = await axios.get(BASEURL + "/parking_area/" + id)
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

router.get("/parking_area_statistics", async (req, res) => {
    try {
        const { data } = await axios.get(BASEURL + "/parking_area_statistics/")
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

router.get("/parking_area_statistics/page/:page", async (req, res) => {
    const page = req.params.page
    try {
        const { data } = await axios.get(
            BASEURL + "/parking_area_statistics/?page=" + page
        )
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

router.get("/parking_area_statistics/id/:id", async (req, res) => {
    const id = req.params.id
    try {
        const { data } = await axios.get(
            BASEURL + "/parking_area_statistics/" + id
        )
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

module.exports = router
