/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';


	return Marionette.CompositeView.extend({
		tagName: 'li',

		template: templates.todoItemView,
		value: '',

		ui: {
		},

		events: {
			
		},

		initialize: function () {
			this.value = this.model.get('title');
			this.listenTo(this.model, 'change', this.render, this);
		}
	});
});
