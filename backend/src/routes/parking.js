const express = require('express')
const axios = require('axios')
const router = express.Router()
const { getParkingAreas } = require('../database/queries/parking_area')
const { getParkingHistoryByUid } = require('../database/queries/parking_area')
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
 *       500:
 *         description: Internal server error
 *
 */
router.get('/parking_area/', async (req, res) => {
    try {
        const data = await getParkingAreas()
        const result = data.map(item => ({
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        ...item.geometry,
                    },
                    properties: {
                        capacity_estimate: item.capacity_estimate,
                        uid: item.uid,
                    },
                },
            ],
        }))
        res.send(result)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

/**
 * @swagger
 * /api/parking_history/uid/{uid}/{limit}:
 *   get:
 *     summary: Get a list of parking areas' history
 *     description: Fetch history of the parking area.
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: integer
 *         required: true
 *         description: uid of the parking area
 *       - in: path
 *         name: limit
 *         schema:
 *           type: integer
 *         required: true
 *         description: number of items to return
 *     responses:
 *       200:
 *         description: An array of parking areas with metadata information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Parking_Area_Statistics'
 *                   - type: object
 *                     properties:
 *                       createdAt:
 *                         type: date-time
 *                         example: "2017-07-21T17:32:28Z"
 *       404:
 *         description: Parking history with uid not found
 *       500:
 *         description: Internal server error
 *
 */
router.get('/parking_history/uid/:uid/:limit', async (req, res) => {
    const uid = req.params.uid
    const limit = req.params.limit
    try {
        const data = await getParkingHistoryByUid(uid, limit)
        if (data.length === 0) throw 'Not Found'
        res.send(data)
    } catch (e) {
        console.error(e)
        if (e === 'Not found') res.sendStatus(404)
        res.sendStatus(500)
    }
})

/**
 * @swagger
 * /api/parking_area_statistics/uid/{uid}/:
 *   get:
 *     summary: Get parking area statistics by parking area UID
 *     description: Fetch statistics of a single parking area.
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: integer
 *         required: true
 *         description: uid of the parking area
 *     responses:
 *       200:
 *         description: The requested parking area statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parking_Area_Statistics'
 *       404:
 *         description: The requested parking area statistics not found
 *       304:
 *         description: The requested parking area statistics not modified
 *       500:
 *         description: Internal Server Error
 *
 */
router.get('/parking_area_statistics/uid/:uid', async (req, res) => {
    const uid = req.params.uid

    try {
        const { data } = await axios.get(BASEURL + '/parking_area_statistics/' + uid)
        const result = { uid: data.id, current_parking_count: data.current_parking_count }
        res.send(result)
    } catch (e) {
        console.error(e)
        if (e.response) {
            res.status(e.response.status)
        }
    }
})

module.exports = router
