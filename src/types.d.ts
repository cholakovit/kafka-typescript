
type Message = {
  text: string;
  sender: string;
}

export type KafkaRequest = Omit<Request, 'body'> & {
  body: {
    message: Message[];
  };
};
