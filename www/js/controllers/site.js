function SiteCtrl($scope, $http) {
    $scope.open_sidr = function () {
        $('#side-menu').animate({width: '220px'}, 350, 'swing');
    }
    $scope.toggle_sidr = function () {
        if ($('#side-menu').css('width') === '220px')
            $('#side-menu').animate({width: '0px'}, 350, 'swing');
        if ($('#side-menu').css('width') === '0px')
            $('#side-menu').animate({width: '220px'}, 350, 'swing');
    }
    $scope.close_sidr = function () {
        $('#side-menu').animate({width: '0px'}, 350, 'swing');
    }
    $scope.logout = function() {
        $http.get('/logout');
        $scope.logged_in = false;
        localStorage.setItem('logged_in', JSON.stringify(false));
        localStorage.setItem('account_info', JSON.stringify(null));
        window.location.reload();
    }
}