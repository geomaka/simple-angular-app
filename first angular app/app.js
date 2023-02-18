
 var myNinjaAPP = angular.module('myNinjaAPP',['ngRoute']);

 myNinjaAPP.config(['$routeProvider' ,'$locationProvider',function($routeProvider,$locationProvider){
     

    // $locationProvider.html5Mode(true)

    $routeProvider
    .when('/home', {
        templateUrl : 'views/home.html',
        controller : 'ninjaController'
      })
      $routeProvider
    .when('/contact', {
        templateUrl : 'views/contact.html',
        controller : 'contactController'

      })
      .when('/contact-success', {
        templateUrl : 'views/contact-success.html',
        controller : 'contactController'

      })
    .when('/directory',{
        templateUrl:'views/directory.html',
        controller: 'ninjaController'
    })
    .otherwise({
        redirectTo: '/home'
    })
 }])

    myNinjaAPP.directive('randomNinja', [function(){

        return{
            restrict :'E',
            scope : {
                title : '=',
                ninjas : '='
            },
            templateUrl : 'views/random.html',
            transclude : true,
            replace :true,
            controller : function($scope){
                $scope.random = Math.floor(Math.random()*4);
            }
        
        }

    }])
 




  myNinjaAPP.controller('ninjaController',['$scope', '$http', function($scope, $http){
    $scope.addNinja = function(){
        $scope.ninjas.push({
            name: $scope.newNinja.name,
            belt :$scope.newNinja.belt,
            rate: parseInt($scope.newNinja.rate),
            available: true
        });
        $scope.newNinja.name="";
        $scope.newNinja.belt="";
        $scope.newNinja.rate="";
    };

    $scope.removeNinja = function(ninja){
        var removedNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja,1);
    }

    $scope.removeAll = function(){
        $scope.ninjas = [];
    }

    $http.get('data/ninjas.json').then(function(response){
        $scope.ninjas = response.data;
        console.log(data);
    })


    // console.log(angular.toJson($scope.ninjas));

}]);

myNinjaAPP.controller('contactController',['$scope','$location', function($scope, $location){

    $scope.sendMessage = function(){
        $location.path('/contact-success')
    }

}])
