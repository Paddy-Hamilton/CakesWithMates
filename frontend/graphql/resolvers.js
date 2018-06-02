export default {
  Mutation: {
    toggleAddCake: (_, { open }, { cache, getCacheKey }) => {
      console.log({ cache });
      const data = { ui_addCakeModal: open, __typename: 'ui_addCakeModal' };
      cache.writeData({ data });
      return null;
    }
  }
};
