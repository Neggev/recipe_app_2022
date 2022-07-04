const axios = require("axios");
var params = ""

const spoonConnect = async () => {

    const options = {
        method: 'GET',
        url: `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&number=4`,

        headers: {
            'X-RapidAPI-Key': 'beaa7a193emshbf6b523b65df6a7p1e85c4jsnc0d8994645e2',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    const getPop = await axios.request(options)
    console.log(getPop.data);
    return getPop.data;
}

const spoonSearch = async (param) => {

    const options = {
        method: 'GET',
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}${param}`,

        headers: {
            'X-RapidAPI-Key': 'beaa7a193emshbf6b523b65df6a7p1e85c4jsnc0d8994645e2',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }

    };

    const getPop = await axios.request(options)
    console.log(getPop.data);
    return getPop.data;
}
const spoonSearchByID = async (id) => {
    console.log(id);
    const options = {
        method: 'GET',
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`,

        headers: {
            'X-RapidAPI-Key': 'beaa7a193emshbf6b523b65df6a7p1e85c4jsnc0d8994645e2',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }

    };

    const getPop = await axios.request(options)
    console.log(getPop.data);
    return getPop.data;
}

module.exports = { spoonConnect, spoonSearch, spoonSearchByID };