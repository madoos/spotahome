import request from 'axios';
import { prop } from 'ramda';

const MARKETS_URL = 'http://localhost:3000/api/homes/markets';

const marketsByCity = city =>
    request.get(`${MARKETS_URL}/${city}`).then(prop('data'));

const api = {
    marketsByCity
};

export default api;
