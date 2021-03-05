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
    it('should fetch parking_area_statistics with fake uid and give status code 404', async () => {
        let testUid = "test"
        const res = await request(app).get(`/api/parking_history/uid/` + testUid);
        expect(res.statusCode).toEqual(404);
    });
})
