import { gql } from "@apollo/client";

// this will take an input of the 'username' from the client, and from the server, request and return the properties within the curly braces
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`;
