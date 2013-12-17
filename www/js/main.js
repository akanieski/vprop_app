/**
 * Created by Andrew on 12/16/13.
 */

var init_angular = function () {

    // Check if the app is already logged in
    app.logged_in = JSON.parse(localStorage.getItem('logged_in'));
    app.account_info = localStorage.getItem('account_info');
    app.account_info = app.account_info ? JSON.parse(app.account_info) : {};


    app.ng = angular.module('VPropApp', ['ngRoute']);

    app.ng
        .config(function ($routeProvider) {

            $routeProvider
                .when('/dashboard', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl',
                    requiresLogin: true
                }).when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl',
                    requiresLogin: true
                }).when('/clients', {
                    templateUrl: 'views/clients.html',
                    controller: 'ClientsCtrl',
                    requiresLogin: true
                })
                .otherwise({
                    redirectTo: '/dashboard'
                });

        })
        .config(function ($httpProvider) {
            //Enable cross domain calls
            $httpProvider.defaults.useXDomain = true;

            //Remove the header containing XMLHttpRequest used to identify ajax call
            //that would prevent CORS from working
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        })
        .run(function ($rootScope, $http) {
            $rootScope.page_title = 'Virtual Properties';
            $rootScope.api_url = 'http://dev.virtualproperti.es';
            $rootScope.$on('$routeChangeStart', function (evt, next_route, current_route) {

                // Check the route access in relation to logged in status
                if (next_route.requiresLogin && !$rootScope.logged_in && next_route.$$route.originalPath !== '/login') {
                    if (app.logged_in) {
                        // Logged In!
                        $rootScope.logged_in = true;
                        window.location = '#dashboard';
                    } else {
                        // Not Logged In!
                        event.preventDefault();
                        window.location = '#login';
                    }
                }
            });

        });



};
function js_loader(srces, fn) {
    if (typeof srces == 'string') {
        load(srces, fn);
        return;
    }
    var src = srces.shift();
    load(src, function () {
        if (srces.length) {
            window.js_loader(srces, fn);
        } else {
            fn && fn();
        }
    });
};