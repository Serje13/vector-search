'use strict';

const fs = require('node:fs/promises');

const extractFileData = () => {
    try {
        return new Promise(async (resolve)  => {
            const data = await fs.readFile('./przykladowy_wektor.txt', { encoding: 'utf8' });
            resolve(JSON.parse(data));
        }) 
    }
    catch (err) {
        console.log('Error extracting file data', err);
    }
}

async function composeQuery() {
    return new Promise(async (resolve)  => {
        const vector = await extractFileData();
        if(!vector) {
            resolve(false);
        }
        const aggregations = [
            {
                '$vectorSearch': {
                    'index': 'vector_index', 
                    'path': 'plot_embedding', 
                    'filter': {
                        '$and': [
                            {
                                'year': {
                                    '$lt': 1950
                                }
                            }
                        ]
                    }, 
                    'queryVector': vector, 
                    'numCandidates': 10, 
                    'limit': 10
                }
            }, 
          {
            '$project': {
                '_id': 0, 
                'title': 1, 
                'year': 1, 
                'score': {
                    '$meta': 'vectorSearchScore'
                }
            }
          }
        ];
        resolve(aggregations);
    }   
)};

module.exports = composeQuery;