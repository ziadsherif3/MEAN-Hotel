angular.module('hotel').directive('hotelRating', hotelRating);

function hotelRating() {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            stars: '='
        },
        controller: 'HotelController',
        controllerAs: 'vm',
        template: '<span ng-repeat="star in vm.stars track by $index">{{ star }}</span>'
    }
}