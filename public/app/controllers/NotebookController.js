app.controller('NotebookController', ['$scope','$rootScope', '$state', '$http','$service', '$httpParamSerializer', function ($scope,$rootScope, $state, $http,$service, $httpParamSerializer) {
    $rootScope.module = {
        title : 'Anotações',
        subtitle : 'Anotações rápidas'
    }
    $scope.form = $('#form-notebook');
    $scope.form.submit(function () {
        var data = {
            title: $scope.title,
            annotation: $scope.annotation
        }
     });


    /* $scope.annotations = [];

    var httpRequest = $http({
        method: 'GET',
        url: config.API_URL + '/annotation/all'
    }).success(function (data, status) {
        //$scope.annotations = data;
            $service.initTableList({data: data});
            console.log({data: data});
    });*/
     $service.initTableList(config.API_URL + '/annotation/all');
/*
$('.tasks-list').DataTable( {
        "ajax": config.API_URL + '/annotation/all',
        "columns": [
            { "data": "objectId" },
            { "data": "title" },
            { "data": "annotation" },
            { "data": "createdAt" },
            { "data": "objectId" },
            { "data": "objectId" },
        ],lengthMenu: [ 5, 25, 50, 75, 100 ],
            displayLength: 5,
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({page:'current'}).nodes();
                var last=null;
     


                // Datepicker
                $(".datepicker").datepicker({
                    showOtherMonths: true,
                    dateFormat: "d MM, y"
                });

                // Select2
                $('.select').select2({
                    width: '150px',
                    minimumResultsForSearch: Infinity
                });

                // Reverse last 3 dropdowns orientation
                $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
            },
            preDrawCallback: function(settings) {

                // Reverse last 3 dropdowns orientation
                $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');

                // Destroy Select2
                $('.select').select2().select2('destroy');
            }
    } );

 // External table additions
        // ------------------------------

        // Add placeholder to the datatable filter option
        $('.dataTables_filter input[type=search]').attr('placeholder','Filtro...');*/
}]);