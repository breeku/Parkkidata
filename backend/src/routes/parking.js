const express = require('express')
const axios = require('axios')
const router = express.Router()
const { getParkingAreas } = require('../database/queries/parking_area')

const BASEURL = 'https://pubapi.parkkiopas.fi/public/v1'

/**
 * @swagger
 * /api/parking_area/:
 *   get:
 *     summary: Get a list of parking areas
 *     description: Fetch info about parking areas as GeoJSON feature collection.
 *     responses:
 *       200:
 *         description: An array of parking areas with metadata information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parking_Area'
 *
 */
router.get('/parking_area/', async (req, res) => {
    try {
        const data = await getParkingAreas()
        res.send(data)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

router.get('/parking_area/page/:page', async (req, res) => {
    const page = req.params.page
    try {
        const { data } = await axios.get(BASEURL + '/parking_area/?page=' + page)
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

router.get('/parking_area/id/:id', async (req, res) => {
    const id = req.params.id
    try {
        const { data } = await axios.get(BASEURL + '/parking_area/' + id)
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

router.get('/parking_area_statistics', async (req, res) => {
    try {
        const { data } = await axios.get(BASEURL + '/parking_area_statistics/')
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

router.get('/parking_area_statistics/page/:page', async (req, res) => {
    const page = req.params.page
    try {
        const { data } = await axios.get(
            BASEURL + '/parking_area_statistics/?page=' + page,
        )
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

router.get('/parking_area_statistics/id/:id', async (req, res) => {
    const id = req.params.id
    try {
        const { data } = await axios.get(BASEURL + '/parking_area_statistics/' + id)
        res.send(data)
    } catch (e) {
        console.error(e)
    }
})

module.exports = router
