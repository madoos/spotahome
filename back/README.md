# Development context

The backed is developed with layer pattern and functional approach (functional programing) because it favors the composition and reuse.

To require modules with aliases use [module-alias](https://www.npmjs.com/package/module-alias). Every module with prefix `@` is local.

```javascript
const config = require('@config') // is a local module
```

## Services

Expose an api to consume data, real-time monitoring and data caching using Redis.

## Components

- [server](#server)
- [cache](#cache)
- [monitor](#monitor)
- [spotahome-client](#spotahome-client)

## server

Use as a fundamental tools express and [express-flow-extensions](https://github.com/madoos/express-flow-extensions)
(library created by me) to develop declaratively.

## cache

Use Redis as cache store implemented with HOF similar to the memoize pattern but distributed.

Why use memoize pattern?
`Allows caching any data producer declaratively`

```javascript
const spotahome = require('@spotahome')
const cache = require('@cache-client')
const ONE_HOUR = 3600;

const homeDetailCached = cache.useWith(spotahome.homeDetail, ONE_HOUR),

const detail = await homeDetailCached(2468) // now the request are cached

```

## monitor

Use socket.io and rxjs to handle connections in real time.
Every time a user observes a property (home) a note is made in Redis to keep the user count observing houses.

Why use rxjs?
`Makes easy handle asynchronous event sequences.`

Why store state in Redis?
`Allows scale horizontally.` (socket.io-redis not implemented).

```javascript
const config = require('@config')
const server = require('@server')
const monitor = require('@monitor-client')
const io = require('socket.io')
const socket = io.listen(server, {origin: '*:*'})

const usersConnected$ = await monitor.connect(socket)
usersConnected$.subscribe(notify('** USER MONITOR **'))
await server.listen(conf.server.port)
```

## Spotahome-client

Get data from api `https://www.spotahome.com/api/<PATH>` with pagination and data format

```javascript
const spotahome = require('@spotahome')

const detail = await spotahome.homeDetail(129227)
/*
{
  "id": 129227,
  "photo": "https://d1052pu3rm1xk9.cloudfront.net/smww_768_verified_ur_6_50/bec1c493d2a4904fbe6ed6b1feea6c5dc4ed43b7f5f5f99c3c3c4a4a.jpg",
  "title": "Bright 2-bedroom apartment for rent in La Latina, Madrid",
  "price": 1750
}

*/
const madridHomes = await spotahome.homesByCity('madrid', {page: 3, items: 5})
/*
{
  "data": [
    {
      "id": 161389,
      "photo": "https://d1052pu3rm1xk9.cloudfront.net/smww_768_verified_ur_6_50/e01a09209308fd279a0943c1075aef32786024b1a36b37202c7bae59.jpg",
      "title": "Ensuite room in 5-bedroom apartment in Prosperidad, Madrid",
      "price": 550
    },
    {
      "id": 200252,
      "photo": "https://d1052pu3rm1xk9.cloudfront.net/smww_768_verified_ur_6_50/e623bcf04d397851cb90d6ee2a02591a721541440f2e15e80d5ffe5e.jpg",
      "title": "Cosy 1-bedroom apartment for rent in Nueva España, Madrid",
      "price": 1350
    },
    {
      "id": 280119,
      "photo": "https://d1052pu3rm1xk9.cloudfront.net/smww_768_verified_ur_6_50/9b0b54f2663b6d85097851a71448b8a083ab6cff8c4ea4dbf450891e.jpg",
      "title": "Sunny room in 3-bedroom apartment in Hortaleza, Madrid",
      "price": 600
    },
    {
      "id": 280997,
      "photo": "https://d1052pu3rm1xk9.cloudfront.net/smww_768_verified_ur_6_50/603210b5079221e9687b6c0278a3888719774f73944bfacc6f079043.jpg",
      "title": "Sunny room in 3-bedroom apartment,Puente de Vallecas, Madrid",
      "price": 450
    },
    {
      "id": 282242,
      "photo": "https://d1052pu3rm1xk9.cloudfront.net/smww_768_verified_ur_6_50/4fe45c5cbe8536a3c7b184a059aefd5a21e0f327988de67339f6386b.jpg",
      "title": "Amazing 2-bedroom apartment for rent in Centro, Madrid",
      "price": 1500
    }
  ],
  "paginator": {
    "pageNumber": 3,
    "count": 7106,
    "itemCountPerPage": 5,
    "pages": 1422
  }
}
*/
```
