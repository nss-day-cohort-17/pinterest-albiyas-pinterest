firebase.initializeApp({
    apiKey: "AIzaSyAO5rG0bKWbnEVbmupJbGKQXKpMgZ-I8BE",
    authDomain: "pinterest-d2d81.firebaseapp.com",
    databaseURL: "https://pinterest-d2d81.firebaseio.com",
    storageBucket: "pinterest-d2d81.appspot.com",
    messagingSenderId: "648652355709"
  });



angular
.module ("groupApp", ["ngRoute"])
.config (($routeProvider,$locationProvider) => {
  $locationProvider.hashPrefix("")
  $routeProvider
    .when ("/register", {
      controller: "RegisterCtrl",
      templateUrl: "/partials/register.html"
    })
    .when ("/login", {
      controller: "LoginCtrl",
      templateUrl: "/partials/login.html"
    })
    .when ("/createBoard", {
      controller: "CreateBoardCtrl",
      templateUrl: "/partials/createBoard.html"
    })
})


.controller ("RegisterCtrl", function ($http, $scope,$location) {
  $scope.registerHandler = () =>{
    $http.post(`https://pinterest-d2d81.firebaseio.com/.json`)
    firebase.auth().createUserWithEmailAndPassword($scope.email,$scope.password)
    $location.path(`/createBoard`)
    $scope.$apply
  }



})
.controller ("LoginCtrl", function () {
  console.log("im login view")
})
.controller("CreateBoardCtrl", function($scope,$http,$location) {
  $scope.postToFireBase = () => {
    $http.post(`https://pinterest-d2d81.firebaseio.com/.json`,
          {
            // uid:$scope.uid,
            url: $scope.url,
            description: $scope.description,
            image: $scope.imageUrl
          }
    )
  }
})



//firebase stuff
