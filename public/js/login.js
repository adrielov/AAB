'use strict';
var app = angular.module('atmusagile', ['ui.router','oc.lazyLoad']);
var config = {
    ROOT_AUTH: "/app/views/auth/",
    API_URL: "http://atmus.dev:3000"
};
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,$ocLazyLoadProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $urlRouterProvider.otherwise("app/login");
    $ocLazyLoadProvider.config({
        modules: [
            { name: 'app',          files: ['/assets/js/core/app.js']},
            { name: 'pnotify',      files: ['/assets/js/plugins/notifications/pnotify.min.js']}
        ]
    });

    $stateProvider
        .state('auth', {
            url: "/auth",
            abstract: true,
            templateUrl: config.ROOT_AUTH+"index.html",
            controller : function($ocLazyLoad) {
                $ocLazyLoad.load(
                    ['app','pnotify'],{
                        cache: false
                    }
                );
            }
        })
        .state('auth.login', {
            url: "/login",
            templateUrl: config.ROOT_AUTH + "login.html",
            controller: 'UserController'
        })
        .state('auth.recover', {
            url: "/recover",
            templateUrl: config.ROOT_AUTH + "passwordRecover.html",
            controller: 'UserController'
        });
});