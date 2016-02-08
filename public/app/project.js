var app = angular.module('atmusagile', ['ui.router','oc.lazyLoad','angularMoment']);
var config = {
    ROOT_PROJECTS: "/app/views/projects/view.",
    API_URL: "http://127.0.0.1:3000"
};
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $ocLazyLoadProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'wizardStep',
            files: ['/assets/js/core/libraries/jquery_ui/core.min.js',
                    '/assets/js/plugins/forms/wizards/form_wizard/form.min.js',
                    '/assets/js/plugins/forms/wizards/form_wizard/form_wizard.min.js',
                    '/assets/js/plugins/forms/selects/select2.min.js',
                    '/assets/js/plugins/forms/styling/uniform.min.js',
                    '/assets/js/core/libraries/jasny_bootstrap.min.js',
                    '/assets/js/plugins/forms/validation/validate.min.js',
                    '/assets/js/plugins/notifications/sweet_alert.min.js'
                    ]
        },{
            name : 'datapicker',
            files : ['/assets/js/plugins/notifications/jgrowl.min.js',
                     '/assets/js/plugins/ui/moment/moment.min.js',
                     '/assets/js/plugins/pickers/daterangepicker.js',
                     '/assets/js/plugins/pickers/anytime.min.js',
                     '/assets/js/plugins/pickers/pickadate/picker.js',
                     '/assets/js/plugins/pickers/pickadate/picker.date.js',
                     '/assets/js/plugins/pickers/pickadate/picker.time.js',
                     '/assets/js/plugins/pickers/pickadate/legacy.js'
                    ]
        },{
            name : 'tableList',
            files : ['/assets/js/core/libraries/jquery_ui/widgets.min.js',
                     '/assets/js/plugins/tables/datatables/datatables.min.js',
                     '/assets/js/plugins/tables/datatables/extensions/natural_sort.js',
                     '/assets/js/plugins/forms/selects/select2.min.js',
                     '/assets/js/pages/tasks_list.js'
                    ]
        },{
            name : 'switchery',
            files : ['/assets/js/plugins/forms/styling/switchery.min.js'
                    ]
        }]
    });
    
    $urlRouterProvider.otherwise("home");
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: config.ROOT_PROJECTS + "projects.html",
            controller:'ProjectController'
        })
        .state('projectnew', {
            url: "/home",
            templateUrl: config.ROOT_PROJECTS + "new.html",
                   controller: function ($scope,$rootScope, $http , $httpParamSerializer,$service) {
                
                $service.panels();
                $rootScope.module = {
                    title : 'Projetos',
                    subtitle : 'novo projeto'
                };
            }
        });
    
}).run(['$rootScope', '$state','$templateCache','amMoment','$service',function($rootScope, $state, $templateCache,amMoment,$service) {
    
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });

    $service.initApp();
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
    
}]);