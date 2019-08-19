import withApollo from "next-with-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { withClientState } from "apollo-link-state";
import { ApolloLink, Observable } from "apollo-link";
import { EDIT_CAKE_MODAL_OPEN } from "../graphql/queries.graphql";
// can also be a function that accepts a `headers` object (SSR only) and returns a config

function createClient({ ctx, headers, initialState }) {
  const cache = new InMemoryCache();

  const request = async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: "include"
      },
      headers
    });
  };

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.error(graphQLErrors);
        }
      }),
      requestLink,
      withClientState({
        defaults: {
          editCakeModalOpen: false
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
 \
      }),
      new HttpLink({
        uri:
          process.env.NODE_ENV === "development"
            ? "http://localhost:8000/graphql"
            : "https://ph-cake-api.now.sh/graphql",
        credentials: "include"
      })
    ]),
    connectToDevTools: true,
    ssrForceFetchDelay: 200
  });
  return client;
}

export default withApollo(createClient);
