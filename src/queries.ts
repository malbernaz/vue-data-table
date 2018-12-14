import graphql from "@grafoo/core/tag";

export const LIST_PAYMENTS = graphql`
  query {
    listPayments {
      items {
        name
        description
        date
        amount
      }
      nextToken
    }
  }
`;

export const UPDATE_PAYMENT = graphql`
  mutation($input: UpdatePaymentInput!) {
    updatePayment(input: $input) {
      id
      name
      description
      date
      amount
    }
  }
`;
