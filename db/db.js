'use strict';

const { MongoClient, ServerApiVersion } = require("mongodb");
const composeQuery = require('./compose-query');
require('dotenv').config();

const uri = process.env.MONGO_URL;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true,
    }
});

async function vectorSearch() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        const database = client.db("sample_mflix");
        const coll = database.collection("embedded_movies");
        // define pipeline
        const aggregations = await composeQuery();

        const result = coll.aggregate(aggregations);
        // print results
        const data = [];
        await result.forEach((doc) => {
            data.push(doc);
        });

        return data;
    } 
    catch (err) {
        console.error('Error during vectorSearch execution',err);
    }  
    finally {
        await client.close();
    }
}

module.exports = vectorSearch;