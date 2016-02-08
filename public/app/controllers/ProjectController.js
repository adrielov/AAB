app.controller('ProjectController', ['$scope', '$rootScope', '$http', '$service', function ($scope, $rootScope, $http, $service) {
    $scope.projectMenu = $('.heading-elements ul li');
    $service.panels();
    $rootScope.module = {
        title : 'Projetos',
        subtitle : 'lista de projetos',
        menu_header : [
            { label   : 'Novo projeto',  url     : 'projectnew',   icon    : 'icon-plus-circle2' , 'classBtn' :'bg-blue'  },
            { label   : 'Estatísticas', url     : 'statistics', icon    : 'icon-bars-alt' , 'classBtn' :'bg-warning'  },
        ]
    };
    $scope.project = {
        edit : function(obj){
            var projectId = $(obj.target).data('project');
            alert('Editar : '+projectId)
        },

        settings : function(obj){
            var projectId = $(obj.target).data('project');
            alert('Configurar : '+projectId)
        },

        delete : function(obj){
            var projectId = $(obj.target).data('project');
            swal({title: "O Projeto #"+projectId+" foi deletado", text: "Projeto deletado com sucesso!", type: "success", timer: null, confirmButtonColor: "#43ABDB"})
        }
    }


}]);