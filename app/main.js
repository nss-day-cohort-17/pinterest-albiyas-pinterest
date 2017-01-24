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
    .when ("/home", {
      controller: "HomeCtrl",
      templateUrl: "/partials/home.html"
    })


})
.controller ("HomeCtrl", function(){})

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
    // console.log(data)


    // subFactory.getUid()


    $location.path(`/userView`)
    $scope.$apply
  }

})
.controller ("LoginCtrl", function ($scope,$location) {
  $scope.user = {}
  $scope.loginHandler = () => {
     firebase.auth().signInWithEmailAndPassword($scope.user.email,$scope.user.password)
     .then((data)=>{
      console.log(data)
      if (data.message) {

      }
      $scope.UID = data.uid;

     console.log($scope.UID)
    // MainFactory.getUid()
    // console.log(MainFactory.getUid())
    alert("Logged in")
    $location.path(`/userView`);
              // $scope.$apply()

   })
     .catch ((data)=>{alert(data.message)
        return})
   }
 })
.controller ("UserCtrl", function ($scope,$http,$location){
   // $scope.UID = firebase.auth().currentUser.uid
   if (!firebase.auth().currentUser) {
    $location.path (`/login`)
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

             UID = firebase.auth().currentUser.uid
              return UID
        })
    }
  }
})

// window.onload(
// firebase.auth().onAuthStateChanged(function(user){
//   if(user) {alert("logged in")}
// }))

//
