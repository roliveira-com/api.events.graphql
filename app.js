const express = require('express');
const parser = require('body-parser');

const app = express();

app.use(parser.json());

app.get('/', (req, res, next) => {
  res.send('Thats Works');
})

app.listen(3000);