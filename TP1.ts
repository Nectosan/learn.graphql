const mysql = require('mysql')
const database = mysql.createConnection({
  host:"localhost",
  user:'root',
  password:'',
  database:'graphql'
})

var data=null;

database.connect(function(err){
  if (err) throw err

  database.query("SELECT * from users", function(err,results){
    data=results
  });


  const resolvers = {
    Query: {
      user() { 
        return user;
      }
    },
    Mutation:{
      createUser
    }
  };



  function createUser(event, args){
    const result = database.query('INSERT INTO users (id,email,password,firstName,lastName) VALUES ('+args.id+',"'+args.email+'","'+args.password+'","'+args.firstName+'","'+args.lastName+'")');
  }
  

  const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

});

const { ApolloServer, gql } = require('apollo-server');


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql
`
  type User {
    id: Int 
    email: String
    password: String
    firstName: String
    lastName: String
  }

  type Query {
    user: [User]
  }

  type Mutation{
    createUser(id:Int,email:String,password:String,firstName:String,lastName:String):String
  }
  
`;


const user = [
    {
        id: 0,
        email: "mail",
        password: "pswd",
        firstName: "Rich",
        lastName: "CHEN"
    },
    {
      id: 1,
      email: "Clown@gmail.com",
      password: "12345",
      firstName: "Luca",
      lastName: "Martinolli"
  }

  ];




 
