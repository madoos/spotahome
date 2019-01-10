import request from 'axios';
import { prop } from 'ramda';
import config from './config';

const { MARKETS, DETAIL } = config.api;

const marketsByCity = city =>
    request.get(`${MARKETS}/${city}`).then(prop('data'));

const detail = id => request.get(`${DETAIL}/${id}`).then(prop('data'));

const api = {
    marketsByCity,
    detail
};

export default api;
