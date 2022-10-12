import { gql } from '@apollo/client';



export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($messageText: String!, $messageUser: String!) {
    addMessage(messageText: $messageText, $messageUser: $messageUser) {
      _id
      messageText
      messageUser
      createdAt
      message {
        _id
        messageText
      }
    }
  }
`;


















