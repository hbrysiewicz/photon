import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activity-feed', 'Integration | Component | activity feed', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{activity-feed}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#activity-feed}}
      template block text
    {{/activity-feed}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
