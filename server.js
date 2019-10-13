const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');

const port = process.env.PORT || 9000;
const app = express();

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')

const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors(), bodyParser.json());

const { ApolloServer, gql } = require('apollo-server-express')
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);