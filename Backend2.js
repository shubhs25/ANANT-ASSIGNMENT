const OpenSearch = require('opensearch');

exports.handler = async (event, context) => {
  
  const requestBody = JSON.parse(event.body);

  
  const client = new OpenSearch.Client({
    node: 'https://your-opensearch-cluster-endpoint'
  });


  const response = await client.search({
    index: 'your-index-name',
    body: {
      query: {
        match: {
          title: requestBody.searchTerm
        }
      }
    }
  });

  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(response.hits.hits)
  };
};