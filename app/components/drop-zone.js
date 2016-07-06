import Ember from 'ember';

const {
  get,
  getOwner,
  computed,
  set
} = Ember;

export default Ember.Component.extend({
  classNameBindings: [':drop-zone','isDragging:dragging'],
  imgSrc: null,
  isDragging: false,

  photoFeed: computed(function() {
    return getOwner(this).lookup('socket:photo');
  }),

  dragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    set(this, 'isDragging', true);
  },

  dragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  dragLeave() {
    set(this, 'isDragging', false);
  },

  drop(e) {
    e.stopPropagation();
    e.preventDefault();

    let droppedFiles = e.dataTransfer.files;

    let load = (reader, file) => {
      get(this, 'photoFeed').channel.push('new-photo', {
        body: {
          data: reader.result,
          filename: file.name
        }
      }, 10000);
      set(this, 'imgSrc', reader.result);
    };

    for (let i = 0; i < droppedFiles.length; i++) {
      let file = droppedFiles[i];
      let reader = new FileReader();
      reader.addEventListener('load', load.apply(this, [reader, file]));
      reader.readAsDataURL(file);
    }

    return false;
  }
});
