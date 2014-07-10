define(function(require) {

  "use strict";

  var Parse = require('parse');
  Parse.initialize("", "");

  var onboard = {
  	signup: function(username, password, callback, errorCallback) {		 
		Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
        success: function(user) {
          callback(user);
        },

        error: function(user, error) {
        	errorCallback(user, error);
        }
      });
  	},

  	login: function(username, password, callback) {
  		Parse.User.logIn(username,password, {
		  success: function(user) {
		    // Do stuff after successful login.
		    callback();
		  },
		  error: function(user, error) {
		    // The login failed. Check error to see why.
		    console.log("Error: " + error.code + " " + error.message);
		  }
		});
  	},

  	signupFacebook: function() {

  	},

  	loginFacebook: function() {

  	},

  	getCurrentUser: function() {

  	},

  	logOut: function() {
  		Parse.User.logOut();
  	}
  };

  return onboard;

});