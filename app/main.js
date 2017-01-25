firebase.initializeApp({
    apiKey: "AIzaSyAO5rG0bKWbnEVbmupJbGKQXKpMgZ-I8BE",
    authDomain: "pinterest-d2d81.firebaseapp.com",
    databaseURL: "https://pinterest-d2d81.firebaseio.com",
    storageBucket: "pinterest-d2d81.appspot.com",
    messagingSenderId: "648652355709"
  });



var pinterestApp = angular
.module ("groupApp", ["ngRoute"]);


// New file
pinterestApp.config (function($routeProvider,$locationProvider) {
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
    .otherwise('/login');

});


// New file
pinterestApp.controller ("HomeCtrl", function($scope){
  $scope.words = "Hello world"

 




});




pinterestApp.controller ("LoginCtrl", function ($scope,$location) {
  $scope.goRegister = function() {
    console.log("go");
    $('#modal1').modal('close');
    $location.path('/register')

  }
  //modal logic
  $('#modal1').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      // opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        console.log(modal, trigger);
      },
      complete: function() { 
        console.log('close');

      } // Callback for Modal close
    }
  );


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
 });
pinterestApp.controller ("UserCtrl", function ($scope,$http,$location){
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
