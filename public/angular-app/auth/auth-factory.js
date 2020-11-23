angular.module('hotel').factory('AuthFactory', authFactory);

function authFactory() {
    return {
        isLoggedIn: false
    };
}