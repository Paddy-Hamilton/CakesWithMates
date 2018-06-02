import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { EDIT_CAKE_MODAL_OPEN, CAKES, CAKE } from '../../graphql/queries.graphql';
import { TOGGLE_CAKE_MODAL_OPEN, EDIT_CAKE, ADD_CAKE } from '../../graphql/mutations.graphql';
import { adopt } from 'react-adopt';

export const EditCakeModalContainer = adopt({
  isOpen: <Query query={EDIT_CAKE_MODAL_OPEN}>{() => {}}</Query>,
  editCake: (
    <Mutation mutation={EDIT_CAKE} refetchQueries={res => [{ query: CAKES }, { query: CAKES }]}>
      {() => {}}
    </Mutation>
  ),
  addCake: (
    <Mutation mutation={ADD_CAKE} refetchQueries={res => [{ query: CAKES }, { query: CAKES }]}>
      {() => {}}
    </Mutation>
  ),
  toggle: <Mutation mutation={TOGGLE_CAKE_MODAL_OPEN}>{() => {}}</Mutation>
});
