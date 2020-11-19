angular.module('hotel').factory('HotelsFactory', hotelsFactory);

function hotelsFactory($http) {
    return {getAll, getOne, postReview};

    function getAll() {
        return $http.get('/api/hotels?count=10').then(res => res.data).catch(err => err);
    }

    function getOne(hotelId) {
        return $http.get(`/api/hotels/${hotelId}`).then(res => res.data).catch(err => err);
    }

    function postReview(hotelId, review) {
        return $http.post(`/api/hotels/${hotelId}/reviews`, review).then(res => res).catch(err => err);
    }
}