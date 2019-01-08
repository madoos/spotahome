const {
    flow,
    createRouter,
    Joi,
    projection,
    withStatus
} = require('express-flow-extensions');
const spotahome = require('@spotahome');
const { path, isNil, complement } = require('ramda');
const { OK, NO_CONTENT } = require('http-status');
const hasData = complement(isNil);

const homesByCity = {
    method     : 'GET',
    path       : '/markets/:city',
    validation : {
        params : {
            city : Joi.string()
                .regex(/^[a-zA-Z]+$/)
                .required()
        },
        query : {
            itemsPerpage : Joi.number()
                .min(5)
                .max(100)
                .default(10),
            pageNumber : Joi.number().default(1)
        }
    },
    handler : flow(
        projection({
            city  : 'params.city',
            items : 'query.itemsPerpage',
            page  : 'query.pageNumber'
        }),
        spotahome.homecardsByCity
    )
};

const homeDetail = {
    method     : 'GET',
    path       : '/detail/:id',
    validation : {
        params : {
            id : Joi.number().required()
        }
    },
    handler : flow(
        path(['params', 'id']),
        spotahome.homeDetail,
        withStatus({
            [OK]         : hasData,
            [NO_CONTENT] : isNil
        })
    )
};

module.exports = createRouter([homesByCity, homeDetail]);
