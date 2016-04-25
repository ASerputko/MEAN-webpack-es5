'use strict';

var angular = require('angular');
var config = require('./config');

angular
    .module("app", [])
    .value('config', config)
    .value('service', {
        getData: function() {
            return 1111;
        }
    })
    .run(['config', function(config) {
        console.log('App is started!');
        console.log('My secret is ' + config.secret);
        console.log('v' + config.getVersion());
    }]);

// angular.element(document).ready(function() {
//     angular.bootstrap(document, ['app']);
// });
