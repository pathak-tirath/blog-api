import express from 'express';
import { config } from '@/config';

const app = express();

// first-route
app.get("/", (req,res) => {
    console.log('this is test route')
})

app.listen(config.PORT, () => {
  console.log(`Listening on PORT:- ${config.PORT}`);
});
