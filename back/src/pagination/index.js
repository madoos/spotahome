const _calculateStart = (itemsPerPage, page) => {
    switch (page) {
        case 1:
            return 0;
        case 2:
            return itemsPerPage;
        default:
            return page * itemsPerPage - itemsPerPage;
    }
};

const paginate = (data, itemsPerPage, page) => {
    const pages = Math.ceil(data.length / itemsPerPage);
    const start = _calculateStart(itemsPerPage, page);
    const end = start + itemsPerPage;
    const items = data.slice(start, end);

    return {
        data      : items,
        paginator : {
            pageNumber       : page,
            count            : data.length,
            itemCountPerPage : itemsPerPage,
            pages            : pages
        }
    };
};

module.exports = {
    paginate
};
