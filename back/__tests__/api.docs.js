const request = require('promisify-supertest')
const server = require('@server')
const api = request(server)
const {OK} = require('http-status')
const {prop} = require('ramda')
const config = require('@config')

const urls = {
    docs : `${config.server.apiDocs}`
}

test('Should render the html documentation', async () => {
    const url = `${urls.markets}/madrid`
    const response = await api.get(urls.docs).end()
    expect(response.type).toEqual('text/html')
})
