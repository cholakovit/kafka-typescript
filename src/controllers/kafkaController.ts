import { NextFunction, Response } from 'express';
import KafkaConfig from "../config/config";
import { KafkaRequest } from '../types';

const sendMessageToKafka = async (req: KafkaRequest, res: Response, next: NextFunction) => {
  try {
      const payload = JSON.stringify(req.body.message);

      const kafkaConfig = new KafkaConfig();
      const messages = {
        key: 'batchMessages', // A generic key for the batch of messages
        value: payload  // The entire message array as a single string
      };
      kafkaConfig.produce('my-topic', [messages]);

      res.status(200).json({
          status: 'ok!',
          message: 'Message successfully sent!'
      });
  } catch (err) {
      console.error(err as Error);
      next(err as Error);
  }
};

const controllers = { sendMessageToKafka }

export default controllers
