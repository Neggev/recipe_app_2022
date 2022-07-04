const router = require("express").Router();

const { getPopular, getSearch, getByID } = require("../controllers/recipeSearch.controller")

router.get("/", async (req, res) => {
    const data = await getPopular();
    // console.log(data);
    res.status(200).json(data);
});

router.get("/complexsearch/:query", async (req, res) => {

    // console.log(req.params.query);
    const data = await getSearch(req.params.query);
    // console.log(data);
    res.status(200).json(data);
});
router.get("/idsearch/:id", async (req, res) => {

    // console.log(req.params.id);
    const data = await getByID(req.params.id);
    // console.log(data);
    res.status(200).json(data);
});

module.exports = router;