define(function(require) {

  	"use strict";

  	// Vendor
  	var $ = require('jquery');
  	var Backbone = require('backbone');

  	// Libs
  	var stateEvents = require('libs/stateEvents');

  	// Elements
  	var $content = $(".content");

  	// Other
  	var currentView;

  	// Adds Close to Backbone Views
	Backbone.View.prototype.close = function(){
		this.remove();
		this.unbind();
		if (this.onClose){
		  this.onClose();
		}
	};

	// Maybe setup to remove if no transitions needed
	Backbone.View.prototype.onEnter = function() {

	};

	Backbone.View.prototype.onExit = function() {
		// this.pageTransition.out
	};

	Backbone.View.prototype.pageTransition = {
      'in': '',
      'out': '',
      'inReverse': '',
      'outReverse': ''
    };

    // Child Views
    // http://stackoverflow.com/questions/7379263/disposing-of-view-and-model-objects-in-backbone-js
  	var ViewHandler = {
		//http://stackoverflow.com/questions/17634769/page-transitions-with-requirejs-and-backbone-js
  		// Maybe use above for transitions to childviews only
  		// then its all based on triggers and no need to update url and remove parentview since will be returning
  		// Only handles one level deep still causes url update for link within
  		setCurrent: function(view, title) {
  			if(title) {
  				stateEvents.trigger("update:title", title);
  			}

  			// Call property on view for in/out
  			// currentView.onExit then on complete close
  			// view.onEnter
  			// Look into watching css animation start/stop
  			// Maybe test velocityjs for transitions

  			// Check if next view is same as previous view and use inReverse & outReverse?
			if (currentView){
				currentView.close();
			}

		  	currentView = view;

		  	$content.html(currentView.$el);

		  	// Maybe pass in event.target and check if has data-attr="back"

		  	// Need to check back vs forward?

		  	// WORKFLOW
		  	// add class to position offscreen
		  	// insert into dom
		  	// use velocityjs to transition
		  	// On complete for currentView call close
		  	// then make view the currentView
		}
	}

	return ViewHandler;

});

/* Notes:
 * - History management is currently done using window.location.hash.  This could easily be changed to use Push State instead.
 * - jQuery dependency for now. This could also be easily removed.
 */
// https://github.com/ccoenraets/directory-backbone-ratchet/blob/master/js/routers/AppRouter.js
// function PageSlider(container) {

//     var container = container,
//         currentPage,
//         stateHistory = [];

//     // Use this function if you want PageSlider to automatically determine the sliding direction based on the state history
//     this.slidePage = function(page) {

//         var l = stateHistory.length,
//             state = window.location.hash;

//         if (l === 0) {
//             stateHistory.push(state);
//             this.slidePageFrom(page);
//             return;
//         }
//         if (state === stateHistory[l-2]) {
//             stateHistory.pop();
//             this.slidePageFrom(page, 'left');
//         } else {
//             stateHistory.push(state);
//             this.slidePageFrom(page, 'right');
//         }

//     };

//     // Use this function directly if you want to control the sliding direction outside PageSlider
//     this.slidePageFrom = function(page, from) {

//         container.append(page);

//         if (!currentPage || !from) {
//             page.attr("class", "page center");
//             currentPage = page;
//             return;
//         }

//         // Position the page at the starting position of the animation
//         page.attr("class", "page " + from);

//         currentPage.one('webkitTransitionEnd', function(e) {
//             $(e.target).remove();
//         });

//         // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
//         container[0].offsetWidth;

//         // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
//         page.attr("class", "page transition center");
//         currentPage.attr("class", "page transition " + (from === "left" ? "right" : "left"));
//         currentPage = page;
//     };

// }