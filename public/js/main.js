require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery.min',
    'backbone': 'vendor/backbone/backbone',
    'marionette': 'vendor/marionette/lib/backbone.marionette',
    'localStorage': 'vendor/Backbone.localStorage/backbone.localStorage',
    'underscore': 'vendor/underscore/underscore',
    'hammerjs': 'vendor/jquery-hammerjs/jquery.hammer-full.min',
    'text' : 'vendor/requirejs-text/text',
    'socketio': 'vendor/socket.io-client/socket.io',
    'socketMessages': 'libs/socketMessages',
    'app': 'app',
    'libs': 'libs',
    'tpl': 'libs/tpl'
    },
  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },

    marionette: {
      exports: 'Backbone.Marionette',
      deps: ['backbone']
    }
  },

  deps: ['jquery', 'underscore']
});

require([
  'app',
  'backbone',
  'routers/index',
  'controllers/index'
], function (app, Backbone, Router, Controller) {
  'use strict';

  app.start();

  new Router({ controller: Controller });

  Backbone.history.start();
});