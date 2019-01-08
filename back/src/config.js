module.exports = {
    api : {
        base      : 'https://www.spotahome.com/api/public/listings/search',
        markers   : process.env.API_MARKERS || '/markers',
        homecards : process.env.API_HOMECARD || '/homecards_ids'
    },
    server : {
        port : process.env.SERVER_PORT || 3000
    }
};
