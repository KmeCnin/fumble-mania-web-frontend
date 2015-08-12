'use strict';

angular.module('fumbleMania')
    .factory('parametersLoader', function ($q, $timeout, $http)
    {
        // Location of the parameters.json file.
        var path = 'parameters.json';

        var parametersLoader = {
            load: function(callback) {

                var deferred = $q.defer();

                $timeout(function() {
                    $http.get(path).success(function(data) {
                        deferred.resolve(data);
                    });
                }, 30);

                return deferred.promise;
            }
        };

        /**
         * Get the value of the given parameter from the parameters.json file of the application.
         *
         * @param parameter
         *
         * @return Promise
         */
        parametersLoader.get = function(parameter)
        {
            parametersLoader.load().then(function(data) {
                return data.data[parameter];
            });
        };

        return parametersLoader;
    });
