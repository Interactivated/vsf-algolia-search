const config = require('config');
const request = require('request');
const bodybuilder = require('bodybuilder');

function search(productId) {
    const indexName = config.elasticsearch.indices[0];

    // pass the request to elasticsearch
	let url = config.elasticsearch.host + ':' + config.elasticsearch.port + `/${indexName}/product/_search`

	if (!url.startsWith('http')) {
		url = 'http://' + url
    }

    let auth = null;
    // Only pass auth if configured
    if(config.elasticsearch.user || config.elasticsearch.password) {
        auth = {
            user: config.elasticsearch.user,
            pass: config.elasticsearch.password
        };
    }

    let query = bodybuilder().filter('term', 'id', productId);

    return new Promise((resolve, reject) => {
        request({ // do the elasticsearch request
            uri: url,
            method: 'POST',
            body: query.build(),
            json: true,
            auth: auth,
        }, function (_err, _res, _resBody) { // TODO: add caching layer to speed up SSR? How to invalidate products (checksum on the response BEFORE processing it)
            if (_resBody && _resBody.hits && _resBody.hits.hits) { // we're signing up all objects returned to the client to be able to validate them when (for example order)
                resolve(_resBody.hits.hits);
            } else {
                reject(_resBody);
            }
        });
    });
}

module.exports = { search: search };