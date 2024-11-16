export const SUBGRAPH_URL =
  "https://api.studio.thegraph.com/query/95008/matesraffle/version/latest";

export const pythReceivedsQuery = `
query {
  pythReceiveds(first: 10) {
    transactionHash
    requestId
    randomValue
  }
}
`;
