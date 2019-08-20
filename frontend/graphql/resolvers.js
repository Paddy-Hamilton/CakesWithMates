export default {
  Mutation: {
    toggleAddCake: (_, { open }, { cache, getCacheKey }) => {
      const data = { ui_addCakeModal: open, __typename: "ui_addCakeModal" };
      cache.writeData({ data });
      return null;
    }
  }
};
