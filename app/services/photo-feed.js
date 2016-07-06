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
    this.channel.on('feed', this._load.bind(this));
    this.channel.on('new-photo', this._push.bind(this));
  },
  joinChannel() {
    this.channel.join();
  },
  _load(obj) {
    let urls = JSON.parse(obj.body);
    let owner = getOwner(this);
    let store = owner.lookup('service:store');

    urls.forEach((url) => store.createRecord('photo', { id: url }));
  },
  _push(obj) {
    let owner = getOwner(this);
    let store = owner.lookup('service:store');

    store.createRecord('photo', { id: obj.body });
  }
});
