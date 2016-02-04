var app = angular.module('atmusagile', ['ui.router','oc.lazyLoad','angularMoment']);
var config = {
    ROOT_AGILE: "app/views/agile/view.",
    API_URL: "http://127.0.0.1:3000"
};
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $ocLazyLoadProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'wizardStep',
            files: ['assets/js/core/libraries/jquery_ui/core.min.js',
                    'assets/js/plugins/forms/wizards/form_wizard/form.min.js',
                    'assets/js/plugins/forms/wizards/form_wizard/form_wizard.min.js',
                    'assets/js/plugins/forms/selects/select2.min.js',
                    'assets/js/plugins/forms/styling/uniform.min.js',
                    'assets/js/core/libraries/jasny_bootstrap.min.js',
                    'assets/js/plugins/forms/validation/validate.min.js',
                    'assets/js/plugins/notifications/sweet_alert.min.js'
                    ]
        },{
            name : 'datapicker',
            files : ['assets/js/plugins/notifications/jgrowl.min.js',
                     'assets/js/plugins/ui/moment/moment.min.js',
                     'assets/js/plugins/pickers/daterangepicker.js',
                     'assets/js/plugins/pickers/anytime.min.js',
                     'assets/js/plugins/pickers/pickadate/picker.js',
                     'assets/js/plugins/pickers/pickadate/picker.date.js',
                     'assets/js/plugins/pickers/pickadate/picker.time.js',
                     'assets/js/plugins/pickers/pickadate/legacy.js'
                    ]
        },{
            name : 'tableList',
            files : ['assets/js/core/libraries/jquery_ui/widgets.min.js',
                     'assets/js/plugins/tables/datatables/datatables.min.js',
                     'assets/js/plugins/tables/datatables/extensions/natural_sort.js',
                     'assets/js/plugins/forms/selects/select2.min.js',
                     'assets/js/pages/tasks_list.js'
                    ]
        },{
            name : 'switchery',
            files : ['assets/js/plugins/forms/styling/switchery.min.js'
                    ]
        }]
    });
    
    $urlRouterProvider.otherwise("home");
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: config.ROOT_AGILE + "home.html",
            controller: function ($scope,$rootScope, $http , $httpParamSerializer,$service) {
                
                $service.panels();
                $rootScope.module = {
                    title : 'Projeto - Nome do projeto',
                    subtitle : 'Tarefas',
                    menu_header : [
                        { label   : 'Nova tarefa',  url     : 'tasknew',   icon    : 'icon-plus-circle2' , 'classBtn' :'bg-blue'  },
                        { label   : 'Estatísticas', url     : 'statistics', icon    : 'icon-bars-alt' , 'classBtn' :'bg-warning'  },
                    ]
                };
            
                /**
                * DRAGULA DRAG DROP
                */
                dragula([
                        document.getElementById('to-do'),document.getElementById('in-progress'),document.getElementById('done')
                 ])
                .on('drag', function (el) {
                    el.className = el.className.replace('ex-moved', '');
                })
                .on('drop', function (element,list) {
                    var code        =   $(element).find('#task').data('code');
                    var newStatus   =   $(list).data("task");
                    var title       =   $(element).find('.text-semibold').text();

                    console.log("A tarefa "+code+" Foi movida para "+newStatus);

                })
                .on('over', function (el, container) {
                    container.className += ' ex-over';
                })
                .on('out', function (el, container) {
                    container.className = container.className.replace('ex-over', '');
                });

                /**
                * SCOPO TASK TASKS
                */
                $scope.todo = [{
                    code    : '184',
                    letter  : 'A',
                    color   : 'green',
                    title   : 'Workaround for OS X selects',
                    description :'Chrome fixed the bug several versions ago, thus...',
                    priority : {
                        label   :'Prioriadade',
                        type    :'danger'
                    }
                },
                {
                    code    : '1806',
                    letter  : 'B',
                    color   : 'primary',
                    title   : 'Workaround for OS X selects',
                    description :'Chrome fixed the bug several versions ago, thus...'
                },
                {
                    code    : '0215',
                    letter  : 'C',
                    color   : 'purple',
                    title   : 'Workaround for OS X selects',
                    description :'Chrome fixed the bug several versions ago, thus...'
                }];

                $scope.inprogress = [{
                    code    : '5487',
                    letter  : 'A',
                    color   : 'teal',
                    title   : 'Workaround for OS X selects',
                    description :'Chrome fixed the bug several versions ago, thus...'
                },{
                    code    : '8494',
                    letter  : 'B',
                    color   : 'slate',
                    title   : 'Workaround for OS X selects',
                    description :'Chrome fixed the bug several versions ago, thus...'
                }];

                $scope.archived = [{
                    code    : '4848',
                    letter  : 'C',
                    color   : 'indigo',
                    title   : 'Workaround for OS X selects',
                    description :'Chrome fixed the bug several versions ago, thus...',
                    priority : {
                        label   :'Prioriadade',
                        type    :'danger'
                    }
                }];
            }
        })
        .state('logout', {
            url : "/logout",
            controller : function(){
                window.location.href ='http://atmusagile.dev'
            }
        })
        .state('statistics', {
            url: "/statistics",
            templateUrl: config.ROOT_AGILE + "statistics.html",
            resolve: {
            app: function($q, $rootScope, $state) {
                var defer = $q.defer();
                if ($rootScope.currentUser == undefined) {
                    $state.go('home');
                };
                    defer.resolve();
                    return defer.promise;
                }
            },
            controller: function ($scope,$rootScope, $http , $httpParamSerializer) {
                $rootScope.module = {
                    title : 'Estatísticas',
                    subtitle : 'Acompanhe as estatísticas do projeto'
                }
            }
        })
        .state('tasks', {
            url: "/task",
            templateUrl: config.ROOT_AGILE + "tasks.html",
            resolve : {
                app : function($ocLazyLoad){
                    return $ocLazyLoad.load('switchery');
                }
            },
            controller : 'TaskController'
        })
        .state('tasklist', {
            url: "/task/list",
            templateUrl: config.ROOT_AGILE + "task-list.html",
            controller: function ($scope,$rootScope, $http , $httpParamSerializer) {
                $rootScope.module = {
                    title : 'Tarefas',
                    subtitle : 'Acompanhe as tarefas em destaque/prioridade'
                }
            }
        })
        .state('tasknew', {
            url: "/task/new",
            templateUrl: config.ROOT_AGILE + "task-new.html",
            resolve : {
                loadMyCtrl : function($ocLazyLoad) {
                    return $ocLazyLoad.load(['wizardStep','datapicker']);
                }
            },
            controller: 'TaskNewController'
        })
        .state('notebook', {
            url: "/notebook",
            templateUrl: config.ROOT_AGILE + "notebook.html",
            resolve : {
                loadMyCtrl : function($ocLazyLoad) {
                    return $ocLazyLoad.load(['tableList']);
                }
            },
            controller: 'NotebookController'
        });
    
}).run(['$rootScope', '$state','$templateCache','amMoment','$service',function($rootScope, $state, $templateCache,amMoment,$service) {
    
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });

    $service.initApp();
    $rootScope.newAnotation = function(){
        alert('as');
    }
    $rootScope.message = {
        text: 'hello world!'
    };
    amMoment.changeLocale('pt');
    window.setInterval(function(){
        $rootScope.$apply(function() {
            $rootScope.message = {
                time: new Date()
            };
        });
    },1000);


   /*
    $rootScope.blockLoader = $('.content-wrapper');
    $rootScope.$on('$stateChangeStart',function(){
      $rootScope.blockLoader.block({
            message: '<i class="icon-spinner9 spinner"></i>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #ddd'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'none'
            }
      });
  });

  $rootScope.$on('$stateChangeSuccess',function(){
      setTimeout(function(){
          $rootScope.blockLoader.unblock();
      },300);  
  });*/
    
}]);