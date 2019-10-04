angular.module('app.controllers', [])

    .controller('homeCtrl', ['$scope', '$stateParams', '$http', '$ionicLoading', '$rootScope','$state','$cordovaToast', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $http, $ionicLoading, $rootScope,$state,$cordovaToast) {
            $scope.showContent = function (content) {

                $rootScope.content = content;
                $rootScope.state = 'tabs.home';
                $state.go('content')

            }
             $ionicLoading.show({
                template: `<ion-spinner name="crescent"></ion-spinner>`
            });
            $http.get("https://tjkonnect.herokuapp.com/api/public/competition").then(function (res) {
                console.log(res.data[0]);
                $scope.competitions = res.data[0];
                $ionicLoading.hide();
            }, function(){
                $ionicLoading.hide();
                window.plugins.toast.showShortTop('Failed to Load!', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
            });
            $http.get("https://tjkonnect.herokuapp.com/api/public/promoted_videos").then(function (res) {
                console.log('res',res.data[0]);
                $scope.promoVideos = res.data[0];
            });
            $http.get("https://tjkonnect.herokuapp.com/api/public/promoted_soundclips").then(function (res) {
                console.log(res.data[0]);
                $scope.promoAudios = res.data[0];
            });
            $http.get("https://tjkonnect.herokuapp.com/api/public/recent_upload").then(function (res) {
                console.log("ru",res.data[0]);
                $scope.trends = res.data[0];
            });

        }])

    .controller('trendingCtrl', ['$scope', '$stateParams', '$http', '$state', '$rootScope', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $http, $state, $rootScope, $ionicLoading) {
            $scope.showContent = function (content) {

                $rootScope.content = content;
                $rootScope.state = 'tabs.trending';
            $state.go('content')
              
            }
            console.log(moment);
            var page = 1;
            $scope.doRefresh = function () {
                page = 1;
                $http.get("https://tjkonnect.herokuapp.com/api/public/trending/" + page).then(function (res) {
                    var data = res.data[0];
                    $scope.trends = data;
                    $scope.$broadcast('scroll.refreshComplete');
                }, function (err) {
                    $scope.$broadcast('scroll.refreshComplete');
                    console.log(err);
                });
                //Stop the ion-refresher from spinning



            };
            $http.get("https://tjkonnect.herokuapp.com/api/public/trending/" + page).then(function (res) {
                var data = res.data[0];
                $scope.trends = data;

            });
            $scope.loadMore = function () {
                page = page + 1;
                $http.get("https://tjkonnect.herokuapp.com/api/public/trending/" + page).then(function (res) {
                    var data = res.data[0];
                    if (data.length == 0) {
                        $scope.noMoreItemsAvailable = true;
                    }
                    for (var i = 0; i < data.length; i++) {
                        $scope.trends.push(data[i]);
                    }


                });


                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

        }])

    .controller('mySubscriptionsCtrl', ['$scope', '$stateParams', '$ionicLoading', '$http','$state','$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicLoading, $http, $state, $rootScope) {
            $scope.navAll = function () {
                $state.go('tabs.allSubscriptions');
            }
            $scope.showContent = function (content) {

                $rootScope.content = content;
                $rootScope.state = 'tabs.mySubscriptions';
                $state.go('content')

            }
            $scope.loadMoreSubContents = function () {
                page = page + 1;
                $http.get("https://tjkonnect.herokuapp.com/api/public/trending/" + page).then(function (res) {
                    var data = res.data[0];
                    if (data.length == 0) {
                        $scope.noMoreItemsAvailable = true;
                    }
                    for (var i = 0; i < data.length; i++) {
                        $scope.subContents.push(data[i]);
                    }


                });


                $scope.$broadcast('scroll.infiniteScrollComplete');
            };
            var page = 1;
            $ionicLoading.show({
                template: `<ion-spinner name="crescent"></ion-spinner>`
            });
            let config = {
                headers: {
                    'token': localStorage.getItem('token')
                }
            }

            $http({
                method: 'GET',
                headers: {
                    'token': localStorage.getItem('token')
                },
                url: 'https://tjkonnect.herokuapp.com/api/private/subscriptions'
            }).then(function successCallback(res) {
                $ionicLoading.hide();
                console.log(res);
                let data = res.data[0];
                $rootScope.subscriptions = data;
                $http({
                    method: 'GET',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/getsubcontent/' + page
                }).then(function successCallback(resd) {

                    console.log('sub' , resd);
                    let data = resd.data[0];
                    $scope.subContents = data;

                }, function errorCallback(err) {

                });


            }, function errorCallback(err) {
                $ionicLoading.hide();
            });

        }])

    .controller('myAccountsCtrl', ['$scope', '$stateParams', '$ionicPopup', '$ionicLoading', '$http', '$rootScope','$ionicPopover','Camera',
        function ($scope, $stateParams, $ionicPopup, $ionicLoading, $http, $rootScope, $ionicPopover, Camera) {
            $scope.upload = function () {
                let opt = {
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                    destinationType: navigator.camera.DestinationType.FILE_URI,
                    MediaType: Camera.MediaType.ALLMEDIA
                };
                Camera.getPicture(options).then(function (imageData) {
                  //  $scope.picture = imageData;;
                }, function (err) {
                    console.log(err);
                });
            }
            var template = `
 <ion-popover-view style='height:calc(100vw/5); margin-top:10px; width:20%' class=" dropdown-menu padding">
<li class='menu_item' ng-click='upload()'><a>ok</a></li>
<li ng-click='removePop();logout()' class='menu_item'><a>Log Out</a></li>
        </ion-popover-view>
`;
            $scope.removePop = function () {
                $scope.popover.hide();
            }
            $scope.popover = $ionicPopover.fromTemplate(template, {
                scope: $scope
            });
            $scope.openPopover = function ($event) {
                $scope.popover.show($event);
            };
            $scope.refreshContent = function () {
                $http({
                    method: 'GET',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/user_content/1'
                }).
                    then(
                        function (res) {
                            $scope.$broadcast('scroll.refreshComplete');
                            $scope.userContent = res.data[0];
                            console.log($scope.userContent);
                    },
                    function (err) {
                            $ionicLoading.hide();
                            $scope.userContent = [];
                            console.log($scope.userContent);
                            console.log(err);
                            if (err.data == "you are not logged in") {
                                $rootScope.logout();
                                $scope.$broadcast('scroll.refreshComplete');
                            }
                        })
            }
            $ionicLoading.show({
                template: `<ion-spinner name="crescent"></ion-spinner>`
            });
            $http({
                method: 'GET',
                headers: {
                    'token': localStorage.getItem('token')
                },
                url: 'https://tjkonnect.herokuapp.com/api/private/user_content/1'
            }).
                then(
                    function (res) {
                        $ionicLoading.hide();
                        $scope.userContent = res.data[0];
                        console.log($scope.userContent);
                }, function (err) {
                    $ionicLoading.hide();
                    $scope.userContent = [];
                    console.log($scope.userContent);
                    console.log(err);
                    if (err.data == "you are not logged in") {
                        $ionicLoading.hide();
                        $rootScope.logout();
                    }
                    })
            $scope.contents = true;
            $scope.content = false;
            $scope.competition = false;
            $scope.nav = function (ele) {
                document.getElementById("Acontent").classList.remove("mactive");
                document.getElementById("Acontents").classList.remove("mactive");
                document.getElementById("Acompetition").classList.remove("mactive");
                document.getElementById(ele).classList.add("mactive");
                if (ele == 'Acontent') {
                    $scope.contents = false;
                    $scope.content = true;
                    $scope.competition = false;
                }
                if (ele == 'Acontents') {
                    $scope.contents = true;
                    $scope.content = false;
                    $scope.competition = false;
                }
                if (ele == 'Acompetition') {
                    $scope.contents = false;
                    $scope.content = false;
                    $scope.competition = true;
                }

            }
          
            console.log(navigator);
          
        }])

    .controller('myLibraryCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('signupCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http', '$ionicLoading', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicPopup, $http, $ionicLoading, $state) {
            $first = document.getElementById("first").children;
            $first[2].style.display = 'none';
            $pass = document.getElementById("pass").children;
            $pass[2].style.display = 'none';
            $confirm = document.getElementById("confirm").children;
            $email = document.getElementById("email").children;
            $email[2].style.display = 'none';
            $last = document.getElementById("last").children;
            $last[2].style.display = 'none';
            $user = document.getElementById("user").children;
            $user[2].style.display = 'none';
            $user[3].style.display = 'none';
            validate = function () {
                console.log($pass[1].value);
                console.log($confirm[1].value);
                if ($first[1].value) {

                    $first[2].style.display = 'block';
                    $first[3].style.display = 'none';
                }
                else {
                    $first[2].style.display = 'none';
                    $first[3].style.display = 'block';
                }
                if ($last[1].value) {

                    $last[2].style.display = 'block';
                    $last[3].style.display = 'none';
                }
                else {
                    $last[2].style.display = 'none';
                    $last[3].style.display = 'block';
                }
                if ($email[1].value) {

                    $email[2].style.display = 'block';
                    $email[3].style.display = 'none';
                }
                else {
                    $email[2].style.display = 'none';
                    $email[3].style.display = 'block';
                }
                if ($pass[1].value != '' && $pass[1].value == $confirm[1].value) {

                    $pass[2].style.display = 'block';
                    $pass[3].style.display = 'none';
                }
                else {
                    $pass[2].style.display = 'none';
                    $pass[3].style.display = 'block';
                }


            }
            $http.get('https://tjkonnect.herokuapp.com/api/public/countries').then(function (res) {
                $scope.countries = res.data;
                console.log(res.data);
            });
            checkUser = function () {
                var username = $user[1].value;
                $user[2].style.display = 'block';
                $user[4].style.display = 'none';
                console.log(username);
                $http.get('https://tjkonnect.herokuapp.com/api/public/checkusername/' + username).then(function (res) {
                    var exist = res.data;
                    if (exist.status == true) {
                        $user[2].style.display = 'none';
                        $user[4].style.display = 'block';
                        return;
                    }
                    $user[2].style.display = 'none';
                    $user[3].style.display = 'block';
                    console.log(res.data);
                });
            }
            getStates = function () {
                var countryId = document.getElementById("countryId").value;
                console.log(countryId);
                console.log($scope.test);
                $http.get('https://tjkonnect.herokuapp.com/api/public/states/' + countryId).then(function (res) {
                    $scope.states = res.data;
                    console.log(res.data);
                });
            }
            getCities = function () {
                var stateId = document.getElementById("stateId").value;
                console.log(stateId);
                console.log($scope.test2);
                $http.get('https://tjkonnect.herokuapp.com/api/public/cities/' + stateId).then(function (res) {
                    $scope.cities = res.data;
                    console.log(res.data);
                });
            }

            form = document.getElementById("myForm");
            form.addEventListener('submit', function (e) {
                $ionicLoading.show({
                    template: `<ion-spinner name="crescent"></ion-spinner>`
                });
                e.preventDefault();
                console.log('working');
                var user = {
                    firstname: $first[1].value,
                    lastname: $last[1].value,
                    username: $user[1].value,
                    password: $pass[1].value,
                    email: $email[1].value,
                    phone: document.getElementById("phone").value,
                    city: document.getElementById('cityId').value
                };
                console.log(user);
                $http.post('https://tjkonnect.herokuapp.com/api/public/register', user).then(function (res) {
                    $ionicLoading.hide();
                    $scope.cities = res.data;
                    $ionicPopup.alert({
                        title: "Success!!",
                        template: "Your Account have been Created. Pls Login"
                    })
                    $state.go('tabs.login');
                    console.log(res.data);
                },
                    function (err) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: "Error!!",
                            template: "A server side Error Occured"
                        });
                        console.log(err)
                    });

            })

        }])

    .controller('loginCtrl', ['$scope', '$stateParams', '$http', '$state', '$ionicLoading', '$rootScope', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $http, $state, $ionicLoading, $rootScope, $ionicPopup) {
            $scope.login = function () {
                $ionicLoading.show({
                    template: `<ion-spinner name="crescent"></ion-spinner>`
                });
                let data = {
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value
                }
                //alert(JSON.stringify(data));
                $http.post('https://tjkonnect.herokuapp.com/api/public/login', data).then(function (res) {
                    $ionicLoading.hide();
                    if (res.data.user) {
                        $rootScope.user = res.data.user;
                        localStorage.setItem("user", JSON.stringify(res.data.user));
                        localStorage.setItem("token", res.data.session);
                        // $http.defaults.headers.common.token = res.data.session;
                        $rootScope.logged = true;

                        $state.go('tabs.myAccounts');
                    }
                    else {
                        $ionicPopup.alert({
                            title: "Error!!",
                            template: res.data.response
                        })
                    }

                }, function (err) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: "Error!!",
                        template: "something went wrong! Pls try again."
                    })
                })
            }


        }])

    .controller('subscriberCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {
            alert("working");


        }]).controller('allSubCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {
            alert("working");


        }])
    .controller('contentCtrl', ['$scope', '$stateParams', '$ionicLoading', '$http', '$rootScope','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $ionicLoading, $http, $rootScope, $state) {
            $scope.saved = false;
            $http({
                method: 'GET',
                headers: {
                    'token': localStorage.getItem('token')
                },
                url: 'https://tjkonnect.herokuapp.com/api/private/issaved/' + $rootScope.content.id
            }).
                then(
                    function (res) {
                        console.log("saved", res);
                        try {
                            if (res.data.length == 1) {
                                $scope.saved = true;
                            }

                        } catch (e) {

                        }
                    }, function (err) {
                       
                    })
            $scope.save = function (content) {
                let mdata = {
                    id : content
                }
                $http({
                    method: 'POST',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/saved',
                    data: mdata
                }).then(
                    function (res) {
                        $scope.saved = true;
                        alert("content added successfully");

                    },
                    function (err) {
                        console.log(err);
                        alert("the content was not added, try later.");
                    })
            }
            
            $scope.navItem = function (similar) {
                $rootScope.content = similar;
                console.log($rootScope.content);
                $scope.liked = false;
                $scope.disliked = false;
                $ionicLoading.show({
                    template: `<ion-spinner name="crescent"></ion-spinner>`
                });
                $http({
                    method: 'GET',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/iliked/' + $rootScope.content.id
                }).
                    then(
                        function (res) {
                            let data = res.data;
                            try {
                                if (data.length < 1) { return }
                                data = data[0];

                                if (data.liked == 1) {
                                    $rootScope.liked = true;
                                    $rootScope.disliked = false;
                                }
                                else if (data.liked == 0) {
                                    $rootScope.liked = false;
                                    $rootScope.disliked = false;
                                }

                            } catch (e) {
                                console.log(e)
                            }
                    }, function (err) {
                        $ionicLoading.hide();
                        })
                console.log($scope.content);
                $http.get('https://tjkonnect.herokuapp.com/api/public/comments/' + $rootScope.content.id).then(function (res) {
                    $scope.comments = res.data;
                    $scope.commentLoader = false;
                })
                $http.get("https://tjkonnect.herokuapp.com/api/public/content/" + $rootScope.content.id).then(function (res) {
                    $ionicLoading.hide();
                    console.log("con",res.data[0]);
                    var data = res.data[0];
                   
                    $rootScope.con = res.data[0][0];
                    $http({
                        method: 'GET',
                        headers: {
                            'token': localStorage.getItem('token')
                        },
                        url: 'https://tjkonnect.herokuapp.com/api/private/issubscribed/' + $rootScope.con.uploaderId

                    }).then(
                        function (res) {
                            let data = res.data[0][0];
                            console.log(data);
                            $scope.sub = data;


                        }, function (err) {
                            $ionicLoading.hide();
                        })
                    $http.get('https://tjkonnect.herokuapp.com/api/public/similar/' + $rootScope.content.name).then(function (res) {
                        $scope.similars = res.data[0];

                    })

                });

                $state.go('content');
            }
            $scope.showDescription = function () {
                $scope.description = false;
            }
            $scope.hideDescription = function () {
                $scope.description = true;
            }
            $scope.subscribe = function () {
                let prev = $scope.sub;
                $scope.sub = {
                    "present": 1,
                    "notified": 0
                }
                let mdata = {
                    subscribee: $rootScope.con.uploaderId,
                    notification: 0
                }
                $http({
                    method: 'POST',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/subscription',
                    data: mdata
                }).then(
                    function (res) {
                        $http({
                            method: 'GET',
                            headers: {
                                'token': localStorage.getItem('token')
                            },
                            url: 'https://tjkonnect.herokuapp.com/api/private/issubscribed/' + $rootScope.con.uploaderId

                        }).then(
                            function (res) {
                                let data = res.data[0][0];
                                console.log(data);
                                $scope.sub = data;


                            }, function (err) {
                            })
                      
                    }, function (err) {
                        $scope.sub = prev;
                        console.log(err);
                    })
            }

            $scope.RemoveSubscription = function () {
                let prev = $scope.sub;
                $scope.sub = {
                    "present": 0,
                    "notified": 0
                }
               $http({
                    method: 'GET',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                   url: 'https://tjkonnect.herokuapp.com/api/private/remove_subscription/' + $rootScope.con.uploaderId
                    
                }).then(
                    function (res) {
                        $http({
                            method: 'GET',
                            headers: {
                                'token': localStorage.getItem('token')
                            },
                            url: 'https://tjkonnect.herokuapp.com/api/private/issubscribed/' + $rootScope.con.uploaderId

                        }).then(
                            function (res) {
                                let data = res.data[0][0];
                                console.log(data);
                                $scope.sub = data;


                            }, function (err) {
                            })

                    }, function (err) {
                        $scope.sub = prev;
                        console.log(err);
                    })
            }
            $scope.removeNotification = function () {
                let prev = $scope.sub;
                $scope.sub = {
                    "present": 1,
                    "notified": 0
                }
                $http({
                    method: 'GET',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/togglenotification/' + $rootScope.con.uploaderId

                }).then(
                    function (res) {
                        $http({
                            method: 'GET',
                            headers: {
                                'token': localStorage.getItem('token')
                            },
                            url: 'https://tjkonnect.herokuapp.com/api/private/issubscribed/' + $rootScope.con.uploaderId

                        }).then(
                            function (res) {
                                let data = res.data[0][0];
                                console.log(data);
                                $scope.sub = data;


                            }, function (err) {
                            })

                    }, function (err) {
                        $scope.sub = prev;
                        console.log(err);
                    })
            }
            $scope.addNotification = function () {
                let prev = $scope.sub;
                $scope.sub = {
                    "present": 1,
                    "notified": 1
                }
                $http({
                    method: 'GET',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/togglenotification/' + $rootScope.con.uploaderId

                }).then(
                    function (res) {
                        $http({
                            method: 'GET',
                            headers: {
                                'token': localStorage.getItem('token')
                            },
                            url: 'https://tjkonnect.herokuapp.com/api/private/issubscribed/' + $rootScope.con.uploaderId

                        }).then(
                            function (res) {
                                let data = res.data[0][0];
                                console.log(data);
                                $scope.sub = data;


                            }, function (err) {
                            })

                    }, function (err) {
                        $scope.sub = prev;
                        console.log(err);
                    })
            }
            $scope.flipCommentReply = function (comment, reply) {
                for (var i = 0; i < $scope.comments.length; i++) {
                    if ($scope.comments[i].id == comment.id) {
                        for (var j = 0; j < $scope.comments[i].replies.length; j++) {
                            if ($scope.comments[i].replies[j].created == reply.created) {
                                if ($scope.comments[i].replies[j].replied == undefined || $scope.comments[i].replies[j].replied == false) {
                                    $scope.comments[i].replies[j].replied = true;
                                }
                                else {
                                    $scope.comments[i].replies[j].replied = false;
                                }
                            }
                        }


                    }
                }
            }
            $scope.submitReply = function (replying, comment, id) {
                let mdata = {
                    comment: comment,
                    commentId: id,
                    replying: replying
                }
                console.log(mdata);
                $scope.commentLoader = true;
                $http({
                    method: 'POST',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/reply',
                    data: mdata
                }).then(
                    function (res) {
                        $scope.commentLoader = false;
                        if (res.data == "comment added")
                            console.log("comment added");
                        document.getElementById("myComment").value = '';
                        $http.get('https://tjkonnect.herokuapp.com/api/public/comments/' + $rootScope.content.id).then(function (res) {
                            $scope.comments = res.data;
                        })
                    }, function (err) {
                        $scope.commentLoader = false;
                        console.log(err);
                    })
            }
            $scope.reply = false;
            $scope.flipReply = function (comment) {
                for (var i = 0; i < $scope.comments.length; i++) {
                    if ($scope.comments[i].id == comment.id) {
                        if ($scope.comments[i].reply == undefined || $scope.comments[i].reply == false) {
                            $scope.comments[i].reply = true;
                        }
                        else {
                            $scope.comments[i].reply = false;
                        }
                       
                    }
                }
            }
            $scope.flipComment = function (comment) {
                for (var i = 0; i < $scope.comments.length; i++) {
                    if ($scope.comments[i].id == comment.id) {
                        if ($scope.comments[i].replied == undefined || $scope.comments[i].replied == false) {
                            $scope.comments[i].replied = true;
                        }
                        else {
                            $scope.comments[i].replied = false;
                        }

                    }
                }
            }
            $scope.openReply = function () {
                $scope.reply = true;
            }
            $scope.commentLoader = true;
            $scope.sendComment = function () {
                $scope.commentLoader = true;
                let comment = document.getElementById("myComment").value;
                if (comment == '') {
                    $scope.commentLoader = false;
                    return;
                }
                console.log(comment);
                var mdata = {
                    comment: comment,
                    content: $rootScope.content.id
                }
                $http({
                    method: 'POST',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/comments',
                    data: mdata
                }).then(
                    function (res) {
                        if (res.data == "comment added")
                            console.log("comment added");
                        document.getElementById("myComment").value = '';
                        $http.get('https://tjkonnect.herokuapp.com/api/public/comments/' + $rootScope.content.id).then(function (res) {
                            $scope.comments = res.data;
                        })
                    }, function (err) {
                    })
                
               
            }
            $scope.like = function (content,liked) {
                let mdata = {
                    contentId: content,
                    mliked: liked
                }
                console.log(mdata);
                $http({
                    method: 'POST',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/likes',
                    data : mdata
                }).then(
                    function (res) {
                        let data = res.data[0][0];
                        console.log(data);
                        $rootScope.liked = false;
                        $rootScope.disliked = false;
                        if (data.status == 1) {
                            $rootScope.liked = true;
                            $rootScope.disliked = false;
                            $rootScope.con.likes = $rootScope.con.likes + 1;
                        }
                        else if (data.status == 0) {
                            $rootScope.liked = false;
                            $rootScope.disliked = true;
                            $rootScope.con.dislikes = $rootScope.con.dislikes + 1;
                        }
                        else if (data.status == null) {
                            if (liked == 1) {
                                $rootScope.con.likes = $rootScope.con.likes - 1;
                            } else {
                                $rootScope.con.dislikes = $rootScope.con.dislikes - 1;
                            }
                        }
                        console.log($rootScope.liked, $rootScope.disliked)
                       
                    }, function (err) {
                    })

            }
            $scope.nav = function () {
                $state.go($rootScope.state);
            }
            console.log($rootScope.content);
            $scope.liked = false;
            $scope.disliked = false;
            $ionicLoading.show({
                template: `<ion-spinner name="crescent"></ion-spinner>`
            });
            $http({
                method: 'GET',
                headers: {
                    'token': localStorage.getItem('token')
                },
                url: 'https://tjkonnect.herokuapp.com/api/private/iliked/' + $rootScope.content.id
            }).
                then(
                function (res) {
                let data = res.data;
                try {
                    if (data.length < 1) {return}
                    data = data[0];

                    if (data.liked == 1) {
                        $rootScope.liked = true;
                        $rootScope.disliked = false;
                    }
                    else if (data.liked == 0) {
                        $rootScope.liked = false;
                        $rootScope.disliked = false;
                    }

                } catch (e) {
                    console.log(e)
                }
                }, function (err) {
                })
            console.log($scope.content);
            $http.get('https://tjkonnect.herokuapp.com/api/public/comments/' + $rootScope.content.id).then(function (res) {
                $scope.comments = res.data;
                $scope.commentLoader = false;
            })
            $http.get("https://tjkonnect.herokuapp.com/api/public/content/" + $rootScope.content.id).then(function (res) {
                $ionicLoading.hide();
                console.log(res.data[0]);
                var data = res.data[0];
               
                $rootScope.con = res.data[0][0];
                $http({
                    method: 'GET',
                    headers: {
                        'token': localStorage.getItem('token')
                    },
                    url: 'https://tjkonnect.herokuapp.com/api/private/issubscribed/' + $rootScope.con.uploaderId
                   
                }).then(
                    function (res) {
                        let data = res.data[0][0];
                        console.log(data);
                        $scope.sub = data;
                        

                    }, function (err) {
                    })
                $http.get('https://tjkonnect.herokuapp.com/api/public/similar/' + $rootScope.content.name).then(function (res) {
                    $scope.similars = res.data[ 0 ];
                  
                })
               
            });


        }])
   