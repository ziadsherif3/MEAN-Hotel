angular.module('hotel')
    .controller('HotelsController', hotelsControl);

function hotelsControl($http) {
    const vm = this;
    $http.get('/api/hotels').then((res) => {
        vm.hotels = res.data;
    });
}