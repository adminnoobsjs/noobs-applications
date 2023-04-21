/**
 * @fileoverview The following file is used to test the use of the Shnakkydoodle framework
 * It can be used as a model of how to create a consuming application
 */
'use strict';
const events = require('events');

var applications = {};
applications.events = new events.EventEmitter();
applications.parameters = {};
applications.noobly = require('noobly-core')(applications);

// Load the models
applications.models = {};

// Load the controllers
applications.controllers = {};

// Load the API routes exposed by the Shnakkydoodle framework
//applications.routes = ((applications.routes != null) ? applications.routes : require('./routes')(applications));

// Load the views routes exposed by the Shnakkydoodle framework
//applications.views = ((applications.views != null) ? applications.views : require('./views')(applications));

/**
 * Initialise the server
 */
applications.initialise = function () {

   // Add the event listener
   applications.noobly.core.events.addListener('event', function (data) {
    applications.noobly.core.services.logging.debug('Event: type: ' + data.type + ' message: ' + data.message);
   });

   // Indicate that the platform has started up
   applications.noobly.core.services.caching.set('monitor-startup', Date());

   // Schedule the Shnakkydoodle heartbeat
   applications.noobly.core.services.scheduling.schedule('monitor-core-hearbeat', '1 * * * * *', function () {
    applications.noobly.core.services.logging.log('monitor heartbeat');
    applications.noobly.core.services.caching.set('monitor-running', Date());
   });

   // Launch a test server
   applications.noobly.core.services.interface.listen(process.env.PORT || applications.noobly.core.configuration.get('server.port'), function (port) {
    applications.noobly.core.services.logging.warn(applications.noobly.core.configuration.get('application.name') + ': running on ' + port + ' in ' + process.cwd() + '\n');
   });

}();