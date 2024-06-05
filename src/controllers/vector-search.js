'use strict'
const vectorSearch = require('../../db/db');
// const fs = require('node:fs/promises');
// const path = require('path');
const getList = async (req, res)  => {
    try {
        const data = await vectorSearch();
        // await fs.writeFile(path.join(__dirname, 'results.json'), JSON.stringify(data, null, 4));
        res.status(200).send(JSON.stringify(data));
    }catch (err) {
        console.log(err);
    }
};

module.exports = {
    getList
};