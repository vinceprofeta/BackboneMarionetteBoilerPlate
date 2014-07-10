/*global define */

define([
  'marionette',
  'collections/Messages',
  'views/Header',
  'views/HomeCompositeView',
], function (Marionette, Messages, Header, HomeCompositeView, Footer) {
  'use strict';

  var app = new Marionette.Application();
  var messages = new Messages();

  var viewOptions = {
    collection: messages
  };

  var header = new Header(viewOptions);
  var main = new HomeCompositeView(viewOptions);

  app.addRegions({
    header: '#header',
    main: '#main'
  });

  app.addInitializer(function () {
    app.header.show(header);
    app.main.show(main);
    //messages.fetch();
  });

  app.listenTo(messages, 'all', function () {
    //app.main.$el.toggle(messages.length > 0);
  });

  app.vent.on('messages:filter', function (filter) {
  });

  app.vent.on('messages:clear:completed', function () {
    // messages.getCompleted().forEach(function (todo) {
    //   todo.destroy();
    // });
  });

  return window.app = app;
});
