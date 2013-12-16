'use strict';
function LoginCtrl($scope, $http, $rootScope, $location) {
    if ($rootScope.logged_in) $location.url('/');
    $scope.submit = function () {
        $http.post($scope.api_url + '/local_auth?format=json', {username: $scope.username, password: $scope.password}).success(function (data) {
            if (data.error) {
                $scope.error = data.error;
            } else {
                $rootScope.logged_in = true;
                localStorage.setItem('user_account', JSON.stringify(data));
                $location.url('/');
            }
        });
    };

};
