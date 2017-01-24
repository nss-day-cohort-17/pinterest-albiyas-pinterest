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
    .when ("/userView", {
      controller: "UserCtrl",
      templateUrl: "/partials/userView.html"
    })


})


.controller ("RegisterCtrl", function ($http, $scope,$location) {
  $scope.registerHandler = () =>{
    firebase.auth().createUserWithEmailAndPassword($scope.user.email,$scope.user.password)
      .then ((data)=>{
        console.log(data.uid)
        $scope.UID = data.uid
        $http.post(`https://pinterest-d2d81.firebaseio.com/Users/.json`,{
            uid: $scope.UID,
            email: $scope.user.email
          })
      })


    $location.path(`/userView`)
    $scope.$apply
  }
$scope.logout = ()=> {
      firebase.auth().signOut()

    }

})
.controller ("LoginCtrl", function ($scope,$location,MainFactory) {
  $scope.user = {}
  $scope.loginHandler = () => {
    MainFactory.getUid()

    alert("Logged in")
    // $location.path(`/userView`);
              // $scope.$apply()
  }
})

.controller ("UserCtrl", function ($scope,$http,$location){
    $scope.logout = ()=> {
      firebase.auth().signOut()
    }
  $scope.postToFireBase = () => {

    // MainFactory.getUid()

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

  $scope.boardToFireBase = () => {
      $scope.UID = firebase.auth().currentUser.uid
      $http.post(`https://pinterest-d2d81.firebaseio.com/Boards/.json`,
          {
            uid:$scope.UID,
            Title: $scope.boardName
          }
      )
  }
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




//
