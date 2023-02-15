const OpenSearch = require('opensearch');

exports.handler = async (event, context) => {
  
  const client = new OpenSearch.Client({
    node: 'https://your-opensearch-cluster-endpoint'
  });

  
  const response = await client.search({
    index: 'your-index-name',
    body: {
      query: {
        match: {
          title: 'your-search-term'
        }
      }
    }
  });

  
  console.log(response.hits.hits);

  
  return {
    statusCode: 200,
    body: 'Search successful'
  };
};