import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { EDIT_CAKE_MODAL_OPEN } from "../graphql/queries.graphql";
// can also be a function that accepts a `headers` object (SSR only) and returns a config

function createClient({ ctx, headers, initialState }) {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000/graphql"
        : "https://ph-cake-api.now.sh/graphql",
    // cache: new InMemoryCache().restore(initialState || {}),
    request: async operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    clientState: {
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
    }
  });
}

export default withApollo(createClient);
