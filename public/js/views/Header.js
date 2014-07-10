/*global define */

define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.header,
		className: 'bar bar-nav',

		 events: {
        'tap .navbtn': 'navSlide',
        'tap .list a': 'navSlide'
      },

      initialize: function() {
        // Trigger for updating title
        this.render();
      },
      navSlide: function() {
        $body.toggleClass('open');
      }
	});
});
