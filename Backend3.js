const OpenSearch = require('opensearch');
const AWS = require('aws-sdk');
const uuid = require('uuid');


const opensearchClient = new OpenSearch.Client({
  node: 'https://your-opensearch-cluster-endpoint'
});


const kinesis = new AWS.Kinesis();

exports.handler = async (event, context) => {
  
  const requestBody = JSON.parse(event.body);

  
  const dataId = uuid.v4();

  
  const esData = {
    index: 'your-index-name',
    id: dataId,
    body: {
      title: requestBody.title,
      content: requestBody.content
    }
  };

  
  await opensearchClient.index(esData);

  
  const kinesisData = {
    Data: JSON.stringify(requestBody),
    PartitionKey: dataId
  };

  
  await kinesis.putRecord({
    StreamName: 'your-kinesis-stream-name',
    Data: kinesisData.Data,
    PartitionKey: kinesisData.PartitionKey
  }).promise();

  
  return {
    statusCode: 200,
    body: 'Data successfully dumped to OpenSearch and Kinesis'
  };
};