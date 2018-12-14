import graphql from "@grafoo/core/tag";
import { Row } from "./components/DataTable";

export interface ListPayments {
  listPayments: { items: Row[] };
}

export const LIST_PAYMENTS = graphql`
  query {
    listPayments {
      items {
        id
        name
        description
        date
        amount
      }
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
