import { gql } from "@apollo/client";

// will expect input from client, 'email', 'username', and 'password'
// next line is the actual call to the 'login' mutation with the provided variables
// after that, the 'token' and 'user' (with its '_id' and 'username') will be returned
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// again, unsure about this dealio
export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        bookId
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String]
    $description: String!
    $bookId: String!
    $image: String
    $link: String
    $title: String!
  ) {
    saveBook(
      authors: $authors
      description: $description
      bookId: $bookId
      image: $image
      link: $link
      title: $title
    ) {
      _id
      username
      email
      savedBooks {
        bookId
        title
        description
        authors
        image
        link
      }
    }
  }
`;
