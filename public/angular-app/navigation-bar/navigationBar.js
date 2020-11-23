angular.module('hotel').directive('navigationBar', navigationBar);

function navigationBar() {
    return {
        restrict: 'E',
        templateUrl: 'angular-app/navigation-bar/navigation-bar.html'
    };
}