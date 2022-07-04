const { spoonConnect, spoonSearch, spoonSearchByID } = require('../config/spoonacular.config')



const getSearch = async (req) => {
    // console.log(req);
    try {
        const items = await spoonSearch(req);
        // console.log(items);
        return items;
    } catch (err) {
        console.log(err);
    }
}



const getPopular = async (req) => {
    try {
        const items = await spoonConnect(req);
        // console.log(items);
        return items;
    } catch (err) {
        console.log(err);
    }
}

const getByID = async (req, res) => {
    console.log(req);
    try {
        const items = await spoonSearchByID(req);
        // console.log(items);
        return items;
    } catch (err) {
        console.log(err);
    }
}


module.exports = { getPopular, getSearch, getByID };