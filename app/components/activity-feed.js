import Ember from 'ember';

const {
  computed,
  get
} = Ember;

export default Ember.Component.extend({
  sorted: computed('content.@each', function() {
    return get(this, 'content').sortBy('lastModified').reverseObjects();
  })
});
