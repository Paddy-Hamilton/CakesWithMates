const fakeCake = id => ({
  __typename: 'Cake',
  id,
  imageUrl: 'https://happy-wishes.net/wp-content/uploads/2017/05/HAPPYBIRTHDAYCAKEIMAGES5.jpg',
  name: 'Cakes are yum',
  comment: 'Cakes make the world go round',
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

export { LocalStorageMock, fakeCake };
