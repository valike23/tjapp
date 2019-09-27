angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider


            .state('tabs.home', {
                url: '/home',
                views: {
                    'home': {
                        templateUrl: 'templates/home.html',
                        controller: 'homeCtrl'
                    }
                }
            }).state('content', {
                url: '/content',
                cache: false,

                templateUrl: 'templates/content.htm',
                controller: 'contentCtrl'

            })

            .state('tabs.trending', {
                url: '/trend',
                views: {
                    'trend': {
                        templateUrl: 'templates/trending.html',
                        controller: 'trendingCtrl'
                    }
                }
            })

            .state('tabs.mySubscriptions', {
                url: '/subs',
                views: {
                    'sub': {
                        templateUrl: 'templates/mySubscriptions.html',
                        controller: 'mySubscriptionsCtrl'
                    }
                }
            })

            .state('tabs.myAccounts', {
                url: '/accounts',
                views: {
                    'accounts': {
                        templateUrl: 'templates/myAccounts.html',
                        controller: 'myAccountsCtrl'
                    }
                }
            })

            .state('tabs.myLibrary', {
                url: '/library',
                views: {
                    'lib': {
                        templateUrl: 'templates/myLibrary.html',
                        controller: 'myLibraryCtrl'
                    }
                }
            })

            .state('tabs', {
                url: '/tabs',
                templateUrl: 'templates/tabsController.html',
                abstract: true
            })
            .state('tabs.signup', {
                url: '/signup',
                views: {
                    'accounts': {
                        templateUrl: 'templates/signup.html',
                        controller: 'signupCtrl'
                    }
                }
            })

            .state('tabs.login', {
                url: '/login',
                views: {
                    'accounts': {
                        templateUrl: 'templates/login.html',
                        controller: 'loginCtrl'
                    }
                }
            })

            .state('subscriber', {
                url: '/subs/subscriber',
                templateUrl: 'templates/subscriber.html',
                controller: 'subscriberCtrl'
            })

        $urlRouterProvider.otherwise('/tabs/home')


    });
