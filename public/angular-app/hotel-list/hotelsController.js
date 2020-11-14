angular.module('hotel')
    .controller('HotelsController', hotelsControl);

function hotelsControl(HotelsFactory) {
    const vm = this;

    HotelsFactory.getAll().then(res => vm.hotels = res).catch(err => console.log(err));
}