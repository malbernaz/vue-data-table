import createClient from "@grafoo/core";
import { Variables } from "@grafoo/types";
import { aws_appsync_graphqlEndpoint, aws_appsync_apiKey } from "./aws";

async function request(query: string, variables?: Variables) {
  const init = {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: {
      "content-type": "application/json",
      "x-api-key": aws_appsync_apiKey
    }
  };

  const res = await fetch(aws_appsync_graphqlEndpoint, init);

  return res.json();
}

const client = createClient(request);

if (process.env.NODE_ENV !== "production") {
  window.client = client;
}

export default client;
