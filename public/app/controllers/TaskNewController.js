app.controller('TaskNewController', ['$rootScope', '$scope', '$http', '$httpParamSerializer','$service','$ocLazyLoad', function ($rootScope, $scope, $http, $httpParamSerializer,$service,$ocLazyLoad) {
    $rootScope.module = {
        title : 'Tarefas',
        subtitle : 'Criar nova tarefa'
    }
    $service.initWizard();
    $service.initDataPicker();
	
	 var array_data = [
        {id: 0, text: 'Nova'},
        {id: 1, text: 'Em progresso'},
        {id: 2, text: 'Testes'},
        {id: 3, text: 'Finalizada'}
    ];	
	var dependencies = [
        {id: 0, text: 'Tarefa 1'},
        {id: 1, text: 'Tarefa 5'},
        {id: 2, text: 'Tarefa 3'},
        {id: 3, text: 'Tarefa 4'},
        {id: 3, text: 'Tarefa 5'},
        {id: 3, text: 'Tarefa 6'},
        {id: 3, text: 'Tarefa 7'},
        {id: 3, text: 'Tarefa 8'}
    ];

	$(".selectStatus").select2({
        minimumResultsForSearch: Infinity,
        data: array_data
    });

	$(".dependencies").select2({
        data: dependencies
    });

	$(".assigneds").select2();


    /*
 $(".assigneds").select2({
        ajax: {
            url: "http://127.0.0.1:3000/user",
            dataType: 'json',
            cache: false,
            type: 'GET',
            results: function (data, page) {
                    return { results: data.items}; // notice we return the value of more so Select2 knows if more results can be loaded
               }
        },
        formatResult: FormatResult,
            formatSelection: FormatSelection,
            escapeMarkup: function (m) { return m; }
        });

    function FormatResult(item) {
        var markup = "";
        if (item.email !== undefined) {
            markup += "<option value='" + item.objectId + "'>" + item.email + "</option>";
        }
        return markup;
    }

    function FormatSelection(item) {
        return item.email;
    }
*/


    $scope.form = $('#form-task-new');
    $scope.form.submit(function () {
        var data = {
            title: 		$scope.title,
            status: 	$scope.status,
            description:$scope.description,
            duedate: 	$scope.duedate,
            priority: 	$scope.priority,
            assigneds: 	$scope.assigneds
        }
        console.log(data);
        swal({title: "Nova tarefa adicionada!", text: "Seu projeto possui uma nova tarefa a ser concluida!", type: "success", timer: 2000, confirmButtonColor: "#43ABDB"})
    });


}]);