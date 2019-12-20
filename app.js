const express = require('express');
const parser = require('body-parser');
const graphqlHandler = require('express-graphql');
const { buildSchema } = require('graphql');


const app = express();

app.use(parser.json());
app.use('/query', graphqlHandler({
  schema: buildSchema(`
    type RootQuery {
      events: [String!]!
    }

    type RootMutation {
      createEvent(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return ['a', 'b', 'c']
    },
    createEvent: (args) => {
      const eventName = args.name;
      return eventName;
    }
  },
  graphiql: true
}))

app.get('/', (req, res, next) => {
  res.send('Thats Works');
})

app.listen(3000);