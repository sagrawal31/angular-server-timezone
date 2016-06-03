/* global jstz */

'use strict';

/**
 * @ngdoc service
 * @name ncTimeZone
 * @requires $httpProvider
 *
 * @description
 * An Angular module which when included to the main app passes the user's current timezone in every request header
 * done by $http. This module sends timezone in the request header under the key 'User-Time-Zone'
 *
 * Including it in your main module:
 * <code>
 *      angular.module('myApp', ['ncTimezone'])
 * </code>
 */

var userTimeZone = jstz.determine().name();

angular.module('serverTimeZone', [])
    .config(['$httpProvider', function ($httpProvider) {

        // Add an HTTP service interceptor
        var interceptor = ['serverTimeZoneConfig', function (serverTimeZoneConfig) {
            var headerName = serverTimeZoneConfig.headerName;

            return {
                'request': function (config) {
                    if (config.headers) {
                        config.headers[headerName] = userTimeZone;
                    }

                    return config;
                }
            };
        }];

        $httpProvider.interceptors.push(interceptor);
    }])

    .provider('serverTimeZoneConfig', function () {
        this.headerName = 'User-Time-Zone';
        
        this.$get = [function () {
            return {
                headerName: this.headerName
            };
        }];
    });