import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import fetch from "isomorphic-unfetch";
import { EDIT_CAKE_MODAL_OPEN } from "../graphql/queries.graphql";
let apolloClient = null;

function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== "undefined";
  const cache = new InMemoryCache().restore(initialState || {});
  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/graphql"
          : "https://ph-cake-api.now.sh/graphql", // Server URL (must be absolute)
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
      // Use fetch() polyfill on the server
      fetch: !isBrowser && fetch
    }),
    cache,
    request: async operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },

    resolvers: {
      Mutation: {
        toggleEditCakeModal(_, variables, { cache }) {
          const { editCakeModalOpen } = cache.readQuery({
            query: EDIT_CAKE_MODAL_OPEN
          });
          const data = { data: { editCakeModalOpen: !editCakeModalOpen } };
          cache.writeData(data);
          return data;
        }
      }
    },
    defaults: {
      editCakeModalOpen: false
    }
  });
  cache.writeData({
    data: {
      editCakeModalOpen: false
    }
  });
  return client;
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
