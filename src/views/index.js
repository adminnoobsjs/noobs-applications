'use strict';
const events = require('events');
const express = require('express');

/**
 * The Shankkydoodle core view manager
 * This view manager is responsible for the administrator views
 * @param {object} moduleManager The parent module
 * @events core-viewmanager-initialise : When the views are initalised
 */
module.exports = function (moduleManager) {

    /** Initiate the object */
    var _viewManager = {};

    // Initialise the event emitter
    _viewManager.events = new events.EventEmitter();

    /**
     * Middleware to replace the navigation text
     */
    _viewManager.replaceNavigation = function (req, res, next){
        //var body = res.body;
        //console.log(res);
        //body = body.replace('{navigation}', 'navigation');
        //res.body = body;
        next();
    }

    // Initialise the view manager    
    _viewManager.initialise = function () {

        // Extract the inverface manager from the parameters and configure
        var _interfaceManager = moduleManager.noobly.core.services.interface ?  moduleManager.noobly.core.services.interface : null;
        _interfaceManager.app().use(express.json())
        _interfaceManager.app().use(_viewManager.replaceNavigation)
  
        // Register the admin views
        _interfaceManager.registerSite('/application',  './src/views/application')
        
    }();

    return _viewManager;
};