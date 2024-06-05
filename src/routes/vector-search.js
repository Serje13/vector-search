const express = require('express');
const router = express.Router();
const vectorController = require("../controllers/vector-search");


router.get("/vector-search",  vectorController.getList);


module.exports = router;