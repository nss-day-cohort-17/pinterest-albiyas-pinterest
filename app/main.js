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
    .when ("/userView", {
      controller: "UserCtrl",
      templateUrl: "/partials/userView.html"
    })
    .when ("/myBoards", {
      controller: "MyBoardsCtrl",
      templateUrl: "/partials/myBoards.html"
    })

})


.controller ("RegisterCtrl", function ($http, $scope,$location) {
  $scope.registerHandler = () =>{
    firebase.auth().createUserWithEmailAndPassword($scope.user.email,$scope.user.password)
    $scope.UID = firebase.auth().currentUser.uid
    $http.post(`https://pinterest-d2d81.firebaseio.com/Users/.json`,{
      uid: $scope.UID,
      email: $scope.user.email
    })

    $location.path(`/createBoard`)
    $scope.$apply
  }



})
.controller ("LoginCtrl", function ($scope,$location,MainFactory) {
  $scope.user = {}
  $scope.loginHandler = () => {
    MainFactory.getUid()

    alert("Logged in")
    $location.path(`/userView`);
              // $scope.$apply()
  }
})
.controller("CreateBoardCtrl", function($scope,$http) {
  $scope.postToFireBase = () => {
    $scope.UID = firebase.auth().currentUser.uid

    $http.post(`https://pinterest-d2d81.firebaseio.com/Pins/.json`,
          {
            uid:$scope.UID,
            url: $scope.url,
            description: $scope.description,
            image: $scope.imageUrl,
            Title: $scope.title

          }
    )
  }
})

.controller ("UserCtrl", function ($http,$scope){
  // $http.get(`https://pinterest-d2d81.firebaseio.com/Pins.json?orderBy="UID"&equalTo="${$scope.UID}"`)

  // .then(console.log)
})
.controller ("MyBoardsCtrl", function (){
})

//factories
.factory ("MainFactory", function (){
  return {
    getUid : () => {
      return
            firebase.auth().signInWithEmailAndPassword($scope.user.email,$scope.user.password)
            .then (()=>{

              $scope.UID = firebase.auth().currentUser.uid
              return $scope.UID
        })
    }
  }
})
