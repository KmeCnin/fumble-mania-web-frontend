'use strict';

angular.module('fumbleMania')
    .factory('flashBag', function ()
    {
        var flashBag = {};

        var push = function(message, type)
        {
            type = type || 'alert';
            Materialize.toast(message, 4000, type);
        };

        flashBag.error = function(message)
        {
            push(message, 'error');
        };

        flashBag.success = function(message)
        {
            push(message, 'success');
        };

        flashBag.alert = function(message)
        {
            push(message, 'alert');
        };

        flashBag.warning = function(message)
        {
            push(message, 'warning');
        };

        return flashBag;
    });
