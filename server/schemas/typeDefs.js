const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }
    
    type Book {
        authors: [String]
        description: String!
        bookId: ID!
        image: String
        link: String,
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!): User
        deleteBook(bookId: String!): User
        login(email: String!, password: String!): Auth
    }

`;

module.exports = typeDefs;
