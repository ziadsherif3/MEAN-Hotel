angular.module('hotel')
    .controller('RegisterController', registerController);

function registerController($http) {
    const vm = this;
    
    vm.register = function() {
        const user = {
            username: vm.username,
            password: vm.password,
            name: vm.name
        };

        if (vm.password !== vm.repeatpass) {
            vm.error = "Passwords don't match.";
        }
        else {
            $http.post('/api/users/register', user)
                .then((res) => {
                    vm.error = '';
                    vm.message = 'Successful registeration.';
                })
                .catch((err) => {
                    if (err.data === 'duplicate user') {
                        vm.error = "A user with the same username already exists."
                        vm.message = '';
                    }
                    else {
                        console.log(err);
                    }
                });
        }
    };
}