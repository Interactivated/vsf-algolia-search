import { Router } from 'express';

const algoliaSearch = require('algoliasearch');
const esClient = require('./es-client');

module.exports = ({ config, db }) => {

  let api = Router();

  api.post('/search', async (req, res) => {
    const cnf = config.extensions.algolia
    const algoliaClient = algoliaSearch(cnf.appId, cnf.apiKey);

    const { params } = req.body;
    const algoliaIndex = algoliaClient.initIndex(cnf.index);

    try {
      const algoliaResults = await algoliaIndex.search(params.query);

      const prepareItem = async objectID => {
         let data = await esClient.search(objectID)
         return (data.length === 1 && data[0].hasOwnProperty('_source')) ? data[0]._source : {}
      }

      const results = {
        items: await Promise.all(algoliaResults.hits.map(async result => {
          return await prepareItem(result.objectID)
        }))
      };

      res.status(200).send(results);

    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  })

  return api
}
