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
    }).when ("/logout", {
      controller: "LogoutCtrl",
      templateUrl: "/partials/logout.html"
    })


})
.controller ("HomeCtrl", function(){})

.controller ("RegisterCtrl", function ($http, $scope,$location,MainFactory) {
  $scope.registerHandler = () =>{
    MainFactory.getter($scope.user.email,$scope.user.password)
    .then ((data)=> {
        console.log(data)
        $scope.UID = data
       $http.post(`https://pinterest-d2d81.firebaseio.com/Users/.json`,{
            uid: $scope.UID,
            email: $scope.user.email
          })
        $location.path(`/userView`)
        $scope.$apply()



})
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
    alert("Logged in")
   })
     .catch ((data)=>{alert(data.message)
        return})
   }
 })
.controller ("LogoutCtrl", function ($location,$scope,MainFactory){
  $scope.logout = () =>
  MainFactory.logout()
  $location.path('/login')
  // $scope.$apply()
})
.controller ("UserCtrl", function ($scope,$http,$location,MainFactory){

   if (!firebase.auth().currentUser) {
    $location.path (`/login`)
   }
   $scope.UID = MainFactory.getUid()
   console.log($scope.UID)
//send pin to firebase
  $scope.postToFireBase = () => {
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
//get the pins
$scope.getThePins= () => {

    $http.get(`https://pinterest-d2d81.firebaseio.com/Pins/.json?orderBy="uid"&equalTo="${$scope.UID}"`)
    .then((firePins) => {
      console.log(firePins.data)
      return  $scope.domPin = firePins.data
    })

  $scope.boardToFireBase = () => {
      // $scope.UID = firebase.auth().currentUser.uid
      $http.post(`https://pinterest-d2d81.firebaseio.com/Boards/.json`,
          {
            uid:$scope.UID,
            Title: $scope.boardName
          }
      )
  }



  }
})

//factories
.factory ("MainFactory", function (){
  return {getter :(user_email,user_password) => {
    console.log(user_email,user_password)
    return firebase.auth().createUserWithEmailAndPassword(user_email,user_password)
      .then ((data)=>{
        console.log(data.uid)
        return UID = data.uid

      })
    },
    logout : ()=> {
      firebase.auth().signOut()
    },

    getUid:()=> {
      return UID = firebase.auth().currentUser.uid
    }
  }
})

// window.onload(
// firebase.auth().onAuthStateChanged(function(user){
//   if(user) {alert("logged in")}
// }))

//
