module.exports = {
    server : {
        port    : process.env.SERVER_PORT || 3000,
        baseURL : '/api/homes',
        apiDocs : '/docs'
    },
    api : {
        base      : 'https://www.spotahome.com/api/public/listings/search',
        markers   : process.env.API_MARKERS || '/markers',
        homecards : process.env.API_HOMECARD || '/homecards_ids'
    }
};
