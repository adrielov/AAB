app.controller('UserController', ['$scope', '$state', '$http', '$httpParamSerializer', function ($scope, $state, $http, $httpParamSerializer) {
    $scope.form = $('#form-auth-login');
    $scope.form.submit(function () {
        var data = {
            email: $scope.email,
            password: $scope.password
        }
        $http.post(config.API_URL + "/auth/login", $httpParamSerializer(data))
        .success(function (response) {
            if(response.error == false) {
                setTimeout(function(){
                    window.location.href  = '/';
                },1000)
            }else {
            $('.btn-loading').button('reset');
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
            $('.btn-loading').button('reset');
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