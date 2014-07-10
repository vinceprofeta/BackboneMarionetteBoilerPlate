/*global define */

define([
	'backbone',
	'models/SingleMessage',
	'localStorage',
	'socketio'
], function (Backbone, SingleMessage,localStorage,io) {
	'use strict';
	var socket = io();

	function isCompleted(todo) {
		return todo.get('completed');
	}

	return Backbone.Collection.extend({
		model: SingleMessage,
		localStorage: new Backbone.LocalStorage('todos-backbone'),

		getCompleted: function () {
			return this.filter(isCompleted);
		},

		getActive: function () {
			return this.reject(isCompleted);
		},

		comparator: function (todo) {
			return todo.get('created');
		},
		initMessages: function() {
			socket.on('user typing', function(msg){
       console.log('user is typing');
      });
      socket.on('newUser', function(msg){
       //this.add()
      }.bind(this));

      socket.on('chat message', function(msg){
      	var obj = {
      		'message':msg
      	};
      	this.add(obj);
      }.bind(this));
		}
	});
});
