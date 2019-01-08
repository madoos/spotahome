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
const cache = require('@cache-client');

const { concatProps } = require('@utils');
const ONE_HOUR = 3600;

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
        cache.useWith(
            spotahome.homesByCity,
            ONE_HOUR,
            concatProps(['city', 'items', 'page'], ':')
        )
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
        cache.useWith(spotahome.homeDetail, ONE_HOUR),
        withStatus({
            [OK]         : hasData,
            [NO_CONTENT] : isNil
        })
    )
};

module.exports = createRouter([homesByCity, homeDetail]);
