'use strict';
const events = require('events');
const express = require('express'), swaggerUi = require('swagger-ui-express')

/**
 * Shopping Module route manager
 * 
 * @param {object} moduleManager The parent module
 */
module.exports = function (moduleManager) {

    /** Initiate the object */
    var _routeManager = {};

    // Initialise the event emitter
    _routeManager.events = new events.EventEmitter();

    // Initialise the view manager    
    _routeManager.initialise = function () {

        // Extract the app from the parameters and configure
        var _interfaceManager = moduleManager.noobly.core.services.interface ?  moduleManager.noobly.core.services.interface : null;
        _interfaceManager.app().use(express.json())

        // The server ping
        _interfaceManager.app().route('/api/status').get(function (req, res) {
            res.status(200).send('success');
        });

    }();

    return _routeManager;
};