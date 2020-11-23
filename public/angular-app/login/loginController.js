angular.module('hotel')
    .controller('LoginController', loginController);

function loginController($http, $location, $window, AuthFactory, jwtHelper) {
    const vm = this;

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        }
        else {
            return false;
        }
    };

    vm.login = function() {
        const user = {
            username: vm.username,
            password: vm.password
        };

        $http.post('/api/users/login', user).then(res => {
            if (res.data.success) {
                $window.sessionStorage.token = res.data.token;
                AuthFactory.isLoggedIn = true;
                vm.loggedInUser = jwtHelper.decodeToken($window.sessionStorage.token).username;
            }
        }).catch(err => console.log(err));
    };

    vm.logout = function() {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
    }

    vm.isActiveTab = function(url) {
        const currentPath = $location.path().split('/')[1];

        return (url === currentPath ? 'active-tab' : '');
    }
}