import { load } from 'ts-dotenv';
import express from 'express';
import axios from 'axios';

import Provider from '../src/scripts/RandomQuoteProvider';
import Dao from '../src/scripts/JSONFileQuoteDAO';
import Factory from '../src/scripts/QuoteFactory';
import data from '../src/scripts/data/data.json';
import QuoteProvider from '../src/scripts/interfaces/QuoteProvider';

const { DISCORD_WEBHOOK_URL: webhook_url, WEBHOOK_SERVER_PORT: port } = load({
  DISCORD_WEBHOOK_URL: String,
  WEBHOOK_SERVER_PORT: Number
});

const app = express();
app.use(express.json());
app.use(express.static('dist'));

function startServer(): void {
  // set up random quote provider

  // set up routine to send random quote
  const provider = new Provider({
    dao: new Dao(data),
    factory: new Factory()
  });
  setInterval(() => setRandomQuote(provider), 60 * 1000);
}

async function setRandomQuote(provider: QuoteProvider): Promise<void> {
  const quote = await provider.getRandomQuote();
  const avatarUrl = 'https://i.imgur.com/1iae7Mt.jpg';
  axios
    .post(webhook_url, {
      content: quote.getContent(),
      embeds: [
        {
          image: {
            url: avatarUrl
          }
        }
      ]
    })
    // eslint-disable-next-line no-console
    .catch((err): void => console.error(`Error sending to Discord: ${err}`));
}

app.listen(port, (): void => {
  startServer();
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
