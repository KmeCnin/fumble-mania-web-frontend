'use strict';

angular.module('fumbleMania')
    .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost/fumble-mania-rest-backend/web/app_dev.php/api/');
        RestangularProvider.setRestangularFields({
            id: '_id.$oid'
        });
        RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

            if (operation === 'put') {
                elem._id = undefined;
                return elem;
            }
            return elem;
        });
    });
