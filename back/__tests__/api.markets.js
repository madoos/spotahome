const request = require('promisify-supertest')
const server = require('@server')
const api = request(server)
const {OK, BAD_REQUEST} = require('http-status')
const {prop} = require('ramda')

const urls = {
    markets : '/api/markets'
}

test('Should list markets for city', async () => {
    const url = `${urls.markets}/madrid`

    const response = await api
        .get(url)
        .expect(OK)
        .end()
        .then(prop('body'))

    expect(response).toHaveProperty('data')
    expect(response).toHaveProperty('paginator')
})

test('Should list markets for city with pagination', async () => {
    const url = `${urls.markets}/madrid?itemsPerpage=24&pageNumber=3`

    const response = await api
        .get(url)
        .expect(OK)
        .end()
        .then(prop('body'))

    expect(response).toHaveProperty('data')
    expect(response).toHaveProperty('paginator')
})

test('Should response bad request when the elements per page exceed 100', async () => {
    const url = `${urls.markets}/madrid?itemsPerpage=500&pageNumber=3`

    await api
        .get(url)
        .expect(BAD_REQUEST)
        .end()
})

test('Should response bad request when city includes numbers', async () => {
    const url = `${urls.markets}/4?itemsPerpage=10&pageNumber=3`

    await api
        .get(url)
        .expect(BAD_REQUEST)
        .end()
})
