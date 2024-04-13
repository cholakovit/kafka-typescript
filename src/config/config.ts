import { Kafka, Message } from "kafkajs";

class KafkaConfig {
  kafka
  producer
  consumer

  constructor() {
    this.kafka = new Kafka({
      clientId: 'nodejs-kafka',
      brokers: ['localhost:9093']
    })
    this.producer = this.kafka.producer()
    this.consumer = this.kafka.consumer({ groupId: 'test-group' })
  }

  async produce(topic: string, messages: Message[]) {
    try {
      await this.producer.connect()
      await this.producer.send({
        topic: topic,
        messages: messages
      })
    } catch(err) {
      console.error(err as Error)
    }
  }

  async consume(topic: string, callback: (value: string | undefined) => void) {
    try {
      await this.consumer.connect()
      await this.consumer.subscribe({ topic: topic, fromBeginning: true })
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value?.toString()
          callback(value)
        }
      })
    } catch(err) {
      console.error(err as Error)
    }
  }

}

export default KafkaConfig