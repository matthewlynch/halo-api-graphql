const { GraphQLServer } = require('graphql-yoga');

const resolvers = require('./schema/resolvers');

const server = new GraphQLServer({
  resolvers,
  typeDefs: './src/schema/schema.graphql',
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
