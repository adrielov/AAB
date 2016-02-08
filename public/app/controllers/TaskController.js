app.controller('TaskController', ['$rootScope', '$scope', '$http', '$httpParamSerializer','$service','$ocLazyLoad', function ($rootScope, $scope, $http, $httpParamSerializer,$service,$ocLazyLoad) {
    $rootScope.module = {
        title : 'Tarefas',
        subtitle : 'Criar nova tarefa'
    }

    // Reverse last 3 dropdowns orientation
    $('.content > .row').slice(-1).find('.dropdown, .btn-group').addClass('dropup');


    // Multiple switchery toggles
    if (Array.prototype.forEach) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.switch-mode'));

        elems.forEach(function(html) {
            var switchery = new Switchery(html);
        });
    }
    else {
        var elems = document.querySelectorAll('.switch-mode');

        for (var i = 0; i < elems.length; i++) {
            var switchery = new Switchery(elems[i]);
        }
    }
}]);