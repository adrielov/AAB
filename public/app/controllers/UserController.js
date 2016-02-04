app.controller('UserController', ['$scope', '$state', '$http', '$httpParamSerializer', function ($scope, $state, $http, $httpParamSerializer) {
    $scope.form = $('#form-auth-login');
    $scope.form.submit(function () {
        var data = {
            email: $scope.email,
            password: $scope.password
        }
        $http.post(config.API_URL + "/auth/login", $httpParamSerializer(data))
        .success(function (response) {
                console.log(response)
            if(response.error == false) {
                window.location.href  = '/app';
            }else {
                new PNotify({
                    title: 'Algum erro ocorreu!',
                    text: response.message,
                    icon: 'icon-blocked',
                    addclass: 'bg-danger',
                    hide: true,
                    buttons: {
                        closer: true,
                        sticker: false
                    }
                });
            }
        }).error(function (response) {
             new PNotify({
                    title: 'Algum erro ocorreu!',
                    text: (response == null)?"Não foi possivel conectar com o servidor!" : response.message,
                    icon: 'icon-blocked',
                    addclass: 'bg-danger',
                    hide: true,
                    buttons: {
                        closer: true,
                        sticker: false
                    }
                });
        }); 
    });
}]);