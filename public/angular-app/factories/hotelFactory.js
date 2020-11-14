angular.module('hotel').factory('HotelsFactory', hotelsFactory);

function hotelsFactory($http) {
    return {
        getAll: getAll,
        getOne: getOne
    };

    function getAll() {
        return $http.get('/api/hotels?count=10').then(res => res.data).catch(err => err);
    }

    function getOne(hotelId) {
        return $http.get(`/api/hotels/${hotelId}`).then(res => res.data).catch(err => err);
    }
}