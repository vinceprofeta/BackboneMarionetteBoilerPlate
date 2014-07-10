/*global define */

define(function (require) {
  'use strict';

  return {
    todoItemView: require('tpl!templates/todoItemView.tmpl'),
    HomeCompositeView: require('tpl!templates/HomeCompositeView.tmpl'),
    header: require('tpl!templates/header.tmpl')
  };
});

