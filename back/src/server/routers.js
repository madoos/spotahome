const {
    flow,
    createRouter,
    Joi,
    projection
} = require('express-flow-extensions');
const spotahome = require('@spotahome');

const listing = {
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

module.exports = createRouter([listing]);
