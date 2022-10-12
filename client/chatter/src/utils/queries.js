import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      messageHistory {
        _id
        messageText
        createdAt
      }
    }
  }
`;
export const QUERY_MESSAGES = gql`
  query getMessages {
    messages {
      _id
      messageText
      createdAt
    }
  }
`;