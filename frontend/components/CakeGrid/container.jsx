import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { CAKES } from "../../graphql/queries.graphql";
import InfiniteScroll from "react-infinite-scroller";

class GetCakesGridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentfetchedSkip: 0
    };
  }
  loadMoreCakes = (fetchMore, currentCakeCount) => {
    const { currentfetchedSkip } = this.state;
    if (currentfetchedSkip === currentCakeCount) return true;
    this.setState({ currentfetchedSkip: currentCakeCount }, () =>
      fetchMore({
        variables: {
          skip: currentCakeCount,
          first: 20
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const newUnique = fetchMoreResult.getCakes.cakes.filter(
            pm => prev.getCakes.cakes.findIndex(pr => pr.id === pm.id) === -1
          );
          if (newUnique.length === 0) {
            return null;
          }
          const newData = Object.assign({}, prev, {
            ...prev,
            getCakes: {
              ...prev.getCakes,
              cakes: [...prev.getCakes.cakes, ...newUnique]
            }
          });
          return newData;
        }
      })
    );
  };

  render() {
    return (
      <Query
        query={CAKES}
        variables={{
          first: 20,
          skip: 0
        }}
        fetchPolicy="cache-first"
        // notifyOnNetworkStatusChange={true}
      >
        {({
          loading,
          error,
          networkStatus,
          data,
          fetchMore,
          
          ...rest
        }) => {
          if (error) return `Error! ${error.message}`;
          if (!data.getCakes) return <div>no cakes found</div>;

          const {
            getCakes: { cakes, count }
          } = data;
          return (
            <InfiniteScroll
              pageStart={0}
              loadMore={() =>
                networkStatus === 7
                  ? this.loadMoreCakes(fetchMore, cakes.length)
                  : null
              }
              hasMore={count > cakes.length}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              {this.props.render(cakes)}
            </InfiniteScroll>
          );
        }}
      </Query>
    );
  }
}

export default GetCakesGridContainer;
