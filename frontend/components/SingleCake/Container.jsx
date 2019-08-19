import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CAKE } from "../../graphql/queries.graphql";

const SingleCakeContainer = ({ id, children}) => {
  const { loading, error, data } = useQuery(CAKE, { variables: { id } });
  if (loading) return <p>Loading</p>;
  if (error) return <p>error {console.error(error)}</p>;
  return children({ cake: data.cake });
};

export default SingleCakeContainer;
