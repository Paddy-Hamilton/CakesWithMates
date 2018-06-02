import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CAKE } from '../../graphql/queries.graphql';

class SingleCakeContainer extends Component {
  render() {
    console.log(this.props);

    const { id, render } = this.props;
    return (
      <Query query={CAKE} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <p>loading</p>;
          if (error) return null;
          if (!data.cake) return null;
          return render({ ...data.cake, id });
        }}
      </Query>
    );
  }
}

export default SingleCakeContainer;
