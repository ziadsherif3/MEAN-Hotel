angular.module('hotel')
    .controller('HotelController', hotelControl);

function hotelControl(HotelsFactory, $routeParams) {
    const vm = this;
    const hotelId = $routeParams.id;

    HotelsFactory.getOne(hotelId).then(res => vm.hotel = res).catch(err => console.log(err));
}