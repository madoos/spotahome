const request = require('promisify-supertest')
const server = require('@server')
const api = request(server)
const {OK, BAD_REQUEST, NO_CONTENT} = require('http-status')
const {prop} = require('ramda')
const config = require('@config')

const urls = {
    detail : `${config.server.baseURL}/detail`
}

test('Should get a detail by id', async () => {
    await api
        .get(`${urls.detail}/85349`)
        .expect(OK)
        .end()
})

test('Should response invalid request when id to be a string', async () => {
    await api
        .get(`${urls.detail}/foo`)
        .expect(BAD_REQUEST)
        .end()
})

test('Should response no content for details that do not exist', async () => {
    const data = await api
        .get(`${urls.detail}/123456`)
        .expect(NO_CONTENT)
        .end()
})
