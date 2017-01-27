pinterestApp.controller ("LoginCtrl", function ($scope,$location) {
$(".button-collapse").sideNav();
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
    Materialize.toast('Logged in ', 1000)
   })
     .catch ((data)=>{alert(data.message)
        return})
   }
 })
