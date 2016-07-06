export function initialize(appInstance) {
  let PhotoFeed = appInstance._lookupFactory('service:photo-feed');

  let photoFeed = PhotoFeed.create();
  photoFeed.connect();
  photoFeed.createChannel('photo');
  photoFeed.setupChannel();
  photoFeed.joinChannel();

  appInstance.register('socket:photo', photoFeed, {instantiate: false});
}

export default {
  name: 'photo-feed',
  initialize
};
