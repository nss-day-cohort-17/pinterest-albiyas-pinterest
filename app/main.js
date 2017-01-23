// firebase.initializeApp({
//     apiKey: "AIzaSyAO5rG0bKWbnEVbmupJbGKQXKpMgZ-I8BE",
//     authDomain: "pinterest-d2d81.firebaseapp.com",
//     databaseURL: "https://pinterest-d2d81.firebaseio.com",
//     storageBucket: "pinterest-d2d81.appspot.com",
//     messagingSenderId: "648652355709"
//   });



angular
.module ("groupApp", ["ngRoute"])
.config (($routeProvider,$locationProvider) => {
  $locationProvider.hashPrefix("")
  $routeProvider
    .when ("/register", {
      controller: "LoginCtrl",
      templateUrl: "/partials/register.html"
    })
    .when ("/login", {
      controller: "RegisterCtrl",
      templateUrl: "/partials/login.html"
    })
})


.controller ("RegisterCtrl", function ($http, $scope) {
  $scope.registerHandler = () =>{
    $http.post(`https://pinterest-d2d81.firebaseio.com/.json`)
    firebase.auth().createUserWithEmailAndPassword($scope.email,$scope.password)
  }
})
.controller ("LoginCtrl", function () {
  console.log("im login view")
})



//firebase stuff
