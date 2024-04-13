import bodyParser from 'body-parser';
import express from 'express';
import controllers from './controllers/kafkaController';
import KafkaConfig from './config/config';

const app = express();
const jsonParser = bodyParser.json()
const port = 3000; // Default port to listen

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/send', jsonParser, controllers.sendMessageToKafka as any);

const kafkaConfig = new KafkaConfig()
kafkaConfig.consume('my-topic', (value) => {
  console.log(value)
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});