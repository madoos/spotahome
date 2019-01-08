const config = require('@config')
const Cache = require('@cache')
const {wait} = require('@utils')
const cacheClient = Cache.create({})

beforeAll(async () => {
    await cacheClient.connect(config.cache.url)
})

afterAll(async () => {
    await cacheClient.close()
})

beforeEach(async () => {
    await cacheClient.clear()
})

test('Should set and get data from cache', async () => {
    const response = await cacheClient.set('1:foo', 'baz')
    const data = await cacheClient.get('1:foo')
    expect(response).toEqual('OK')
    expect(data).toEqual('baz')
})

test('Should set and get data from cache with TTL', async () => {
    expect(await cacheClient.set('foo', 'baz', 'EX', 1)).toEqual('OK')
    expect(await cacheClient.get('foo')).toEqual('baz')
    await wait(1500)
    expect(await cacheClient.get('foo')).toEqual(null)
})

test('.useWith should apply memoize pattern with', async () => {
    let called = 0
    const id = 2345
    const data = [1, 2, 3, {a : 'foo', b : 'baz'}]

    const target = id => {
        called++
        return Promise.resolve(data)
    }
    const TTL = 1
    const targetWithCache = cacheClient.useWith(target, TTL)

    expect(targetWithCache).toBeInstanceOf(Function)
    expect(await targetWithCache(id)).toEqual(data)
    expect(await targetWithCache(id)).toEqual(data)
    expect(await targetWithCache(id)).toEqual(data)
    expect(called).toEqual(1)
})

test('.useWith should apply memoize pattern with key handler', async () => {
    let called = 0
    const src = {a : 'some', b : 'super', c : 'key'}

    const keyHandler = ({a, b, c}) => `${a}:${b}:${c}`
    const target = data => {
        called++
        return Promise.resolve(data)
    }
    const TTL = 1
    const targetWithCache = cacheClient.useWith(target, TTL, keyHandler)

    expect(targetWithCache).toBeInstanceOf(Function)
    expect(await targetWithCache(src)).toEqual(src)
    expect(await targetWithCache(src)).toEqual(src)
    expect(await targetWithCache(src)).toEqual(src)
    expect(called).toEqual(1)
})
