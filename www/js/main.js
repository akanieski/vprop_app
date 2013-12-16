/**
 * Created by Andrew on 12/16/13.
 */

var init_angular = function () {

    // Check if the app is already logged in
    app.account_info = localStorage.getItem('account_info');
    app.account_info = app.account_info ? JSON.parse(app.account_info) : {};

    if (account_info.user && account_info.user.id) {
        // Logged In!
        window.location = '/#/dashboard';
    } else {
        // Not Logged In!
        window.location = '/#/login';
    }

    js_loader([
        '/js/controllers/site.js',
    ], function () {
        app.ng = angular.module('VPropApp', []);

        app.ng
            .config(function ($routeProvider) {

                $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl',
                        requiresLogin: true
                    }).when('/login', {
                        templateUrl: 'views/login.html',
                        controller: 'LoginCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
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
                $rootScope.api_url = 'http://127.0.0.1:5000';
                $rootScope.$on('$routeChangeStart', function (evt, next_route, current_route) {

                    // Check the route access in relation to logged in status
                    if (next_route.requiresLogin && !$rootScope.logged_in) {
                        event.preventDefault();
                        window.location = '/#/login';
                    }
                });

            });

    });


}
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