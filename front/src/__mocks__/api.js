import detail from './detail.json';
import markets from './markets.json';

const api = {
    marketsByCity : () => Promise.resolve(markets),
    detail        : () => Promise.resolve(detail)
};

export default api;
