angular.module('hotel')
    .controller('HotelController', hotelControl);

function hotelControl(HotelsFactory, $routeParams) {
    const vm = this;
    const hotelId = $routeParams.id;

    HotelsFactory.getOne(hotelId)
        .then((res) => {
            vm.hotel = res;
            vm.stars = getStars(res.stars);
        })
        .catch(err => console.log(err));
}

function getStars(stars) {
    let starsArr = new Array(stars);

    for (let i = 0; i < starsArr.length; i++){
        starsArr[i] = '*';
    }

    return starsArr;
}