/* global Phoenix */
import Ember from 'ember';

const {
  getOwner
} = Ember;

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.socket = new Phoenix.Socket('/socket');
  },

  connect() {
    this.socket.connect();
  },

  createChannel(topic) {
    this.channel = this.socket.channel(topic);
  },

  setupChannel() {
    this.channel.on('feed', this._feed.bind(this));
    this.channel.on('new-photo', this._newPhoto.bind(this));
  },

  joinChannel() {
    this.channel.join();
  },

  _feed(serializedPayload) {
    let payload = JSON.parse(serializedPayload.body);
    let owner = getOwner(this);
    let store = owner.lookup('service:store');

    payload.forEach((item) => store.createRecord('photo', {
      id: item.url,
      lastModified: item.last_modified
    }));
  },

  _newPhoto(serializedPayload) {
    let payload = JSON.parse(serializedPayload.body);
    let owner = getOwner(this);
    let store = owner.lookup('service:store');

    store.createRecord('photo', {
      id: payload.url,
      lastModified: payload.last_modified
    });
  }
});
