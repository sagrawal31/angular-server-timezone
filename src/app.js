/* global jstz */

'use strict';

/**
 * @ngdoc service
 * @name ncTimeZone
 * @requires $httpProvider
 * @description
 * A simple Angular module which when included to the Angular app passes the timezone of user's browser in every
 * $http request header (by default, can modify it to pass as parameter). This module sends timezone
 * in the request header under the key 'User-Time-Zone' by default.
 *
 * Including it in your main module:
 * <code>
 *      angular.module('myApp', ['serverTimeZone'])
 * </code>
 */
var userTimeZone = jstz.determine().name();

angular.module('serverTimeZone', [])
    .config(['$httpProvider', function ($httpProvider) {

        // Add an HTTP service interceptor
        var interceptor = ['serverTimeZoneConfig', function (serverTimeZoneConfig) {
            return {
                'request': function (config) {
                    if (serverTimeZoneConfig.sendAsParameter) {
                        config.params = config.params || {};
                        config.params[serverTimeZoneConfig.parameterName] = userTimeZone;
                    }

                    if (serverTimeZoneConfig.sendAsHeader) {
                        config.headers = config.headers || {};
                        config.headers[serverTimeZoneConfig.headerName] = userTimeZone;
                    }

                    return config;
                }
            };
        }];

        $httpProvider.interceptors.push(interceptor);
    }])

    .provider('serverTimeZoneConfig', function () {
        this.sendAsHeader = true;
        this.headerName = 'User-Time-Zone';

        this.sendAsParameter = false;
        this.parameterName = 'userTimeZone';

        this.$get = [function () {
            return {
                sendAsHeader: this.sendAsHeader,
                headerName: this.headerName,
                sendAsParameter: this.sendAsParameter,
                parameterName: this.parameterName
            };
        }];
    });