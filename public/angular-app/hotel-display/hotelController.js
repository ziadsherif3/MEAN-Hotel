angular.module('hotel')
    .controller('HotelController', hotelControl);

function hotelControl(HotelsFactory, $routeParams, $route, $window, jwtHelper, AuthFactory) {
    const vm = this;
    const hotelId = $routeParams.id;
    vm.isSubmitted = false;

    HotelsFactory.getOne(hotelId)
        .then((res) => {
            vm.hotel = res;
            vm.stars = getStars(res.stars);
        })
        .catch(err => console.log(err));
    
    vm.addReview = function() {
        const name = jwtHelper.decodeToken($window.sessionStorage.token).username;

        const data = {
            name: name,
            rating: vm.rating,
            review: vm.review
        };
        
        if (vm.reviewForm.$valid) {
            HotelsFactory.postReview(hotelId, data)
                .then((res) =>{
                  if (res.status === 201) {
                      $route.reload();
                  }  
                })
                .catch(err => console.log(err));
        }
        else {
            vm.isSubmitted = true;
        }
    };

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        }
        else {
            return false;
        }
    };
}

function getStars(stars) {
    let starsArr = new Array(stars);

    for (let i = 0; i < starsArr.length; i++){
        starsArr[i] = '*';
    }

    return starsArr;
}