import React from "react";
import { render } from "@testing-library/react";
import initApollo from "./initApollo";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import { ApolloProvider } from "@apollo/react-hooks";

const initialState = {};

const fakeCake = id => ({
  __typename: "Cake",
  id,
  imageUrl:
    "https://happy-wishes.net/wp-content/uploads/2017/05/HAPPYBIRTHDAYCAKEIMAGES5.jpg",
  name: "Cakes are yum",
  comment: "Cakes make the world go round",
  yumFactor: 4
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  toggleEditCakeModal(key) {
    return this.store[key] || null;
  }
}

export function renderWithProviders(
  ui,
  { initialState, apolloClient = initApollo() } = {}
) {
  return {
    ...render(
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider theme={theme}>{ui}</MuiThemeProvider>
      </ApolloProvider>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    apolloClient
  };
}

export { LocalStorageMock, fakeCake };
