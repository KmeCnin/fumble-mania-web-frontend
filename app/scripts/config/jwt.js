'use strict';

angular.module('fumbleMania')
    .config(function($httpProvider, jwtInterceptorProvider, parametersLoaderProvider) {
        console.log(parametersLoaderProvider.$get().get('send_jwt_in_header'));
        if (!parametersLoaderProvider.$get().get('send_jwt_in_header')) {
            // Send token via url parameters instead of header
            jwtInterceptorProvider.urlParam = 'bearer';
        }
        jwtInterceptorProvider.tokenGetter = function() {
            return localStorage.getItem('jwtToken');
        };

        $httpProvider.interceptors.push('jwtInterceptor');
    });
