import App, { Container } from "next/app";
import PageLayout from "../components/PageLayout";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../lib/theme";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import withApolloClient from "../lib/with-apollo-client";

class MyApp extends App {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // if (typeof window !== "undefined" && !window.__CLIENTLOADED__) {
    //   window.__CLIENTLOADED__ = true;
    // }
    //* Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <Head>
          <title>Cakes with mates</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <MuiThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </MuiThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
