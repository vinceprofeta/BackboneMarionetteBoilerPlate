/*global define */

define([
	'marionette',
	'templates',
	'views/TodoItemView',
	'socketio'
], function (Marionette, templates, ItemView, io) {
	'use strict';

	var socket = io();

	return Marionette.CompositeView.extend({
		template: templates.HomeCompositeView,
		itemView: ItemView,
		itemViewContainer: '#messages',
		className: 'home',
		ui: {
			userss: '.username'
		},
		events: {
			'keydown input': 'keyDown',
	    'submit form': 'submit',
	    'tap .username-submit': 'submitUsername'
		},

		initialize: function() {
			//this.listenTo(this.collection, 'all', this.updateToggleCheckbox, this);
			this.user = localStorage.getItem('userName');
			this.render();
			this.collection.initMessages();
			if (this.user) {
				setTimeout(function(){
					console.log(this.user);
					socket.emit('username', this.user);
				}.bind(this), 0);
			} else {
				this.$el.find('.username').show();
			}
		},
		keyDown:function() {
			socket.emit('user typing', 'user is typing');
		},
		submit:function() {
			//this.collection.add($('#m').val(''));
			socket.emit('chat message', $('#m').val(), this.user);
      $('#m').val('');
      return false;
		},
		submitUsername:function(){
			this.user = this.$el.find('.input input').val();
			localStorage.setItem('userName', this.user);
			socket.emit('username', this.user);
			this.$el.find('.username').hide();
		}
	});
});
