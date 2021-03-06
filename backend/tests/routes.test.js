const request = require('supertest');
const app = require('../src/index')

const db = require("../src/database/config")

beforeAll(async () => {
    let parkingAreas = await db.from("parking_area").select()
    console.log(parkingAreas.length)

    if (parkingAreas.lenght === 0) {
        await db.seed.run()
    }
})

describe('route tests', () => {
    it('should fetch parking_area table and give status code 200', async () => {
        const res = await request(app).get(`/api/parking_area/`);
        expect(res.statusCode).toEqual(200);
    });
    it('should fail fetching parking_history with fake uid and give status code 404', async () => {
        let testUid = "test"
        const res = await request(app).get(`/api/parking_history/uid/` + testUid);
        expect(res.statusCode).toEqual(404);
    });
    it('should fail fetching parking_area_statistics with fake uid and give status code 404', async () => {
        let testUid = "test"
        const res = await request(app).get(`/api/parking_statistics/uid/` + testUid);
        expect(res.statusCode).toEqual(404);
    });
    it('should fetch popular parking areas between 01-01-2021 -- 31.12.2021 and give status code 200', async () => {
        const res = await request(app).get('/api/parking_area_statistics/popular/2021-01-01T10:52:05.000Z/2021-12-31T10:52:05.000Z/1/5')
        expect(res.statusCode).toEqual(200)
    });
    it('should fail fetch popular parking areas without parameters and give status code 404', async () => {
        const res = await request(app).get('/api/parking_area_statistics/popular/')
        expect(res.statusCode).toEqual(404)
    });
})
