


var pinterestApp = angular
.module ("groupApp", ["ngRoute"])
.config (($routeProvider,$locationProvider) => {
  firebase.initializeApp({
    apiKey: "AIzaSyAO5rG0bKWbnEVbmupJbGKQXKpMgZ-I8BE",
    authDomain: "pinterest-d2d81.firebaseapp.com",
    databaseURL: "https://pinterest-d2d81.firebaseio.com",
    storageBucket: "pinterest-d2d81.appspot.com",
    messagingSenderId: "648652355709"
  })

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
    .when ("/userView", {
      controller: "UserCtrl",
      templateUrl: "/partials/userView.html"
    })
    .when ("/home", {
      controller: "HomeCtrl",
      templateUrl: "/partials/home.html"
    }).when ("/logout", {
      controller: "LogoutCtrl",
      templateUrl: "/partials/logout.html"
    })


})

