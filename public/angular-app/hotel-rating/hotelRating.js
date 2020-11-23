// angular.module('hotel').directive('hotelRating', hotelRating);

// function hotelRating() {
//     return {
//         restrict: 'E',
//         scope: {},
//         bindToController: {
//             stars: '='
//         },
//         controller: 'HotelController',
//         controllerAs: 'vm',
//         template: '<span ng-repeat="star in vm.stars track by $index">{{ star }}</span>'
//     }
// }

angular.module('hotel').component('hotelRating', {
    bindings: {
        stars: '='
    },
    template: '<span ng-repeat="star in vm.stars track by $index" class="fa fa-star checked""></span>',
    controller: 'HotelController',
    controllerAs: 'vm'
});