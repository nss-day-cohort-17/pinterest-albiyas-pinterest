pinterestApp.controller ("LogoutCtrl", function ($location,$scope){

    $('#logoutModal').modal({
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
    });
    $scope.logout = () => {
    firebase.auth().signOut()
    // $location.path('#/Home')
    Materialize.toast("Logged out",1000)}
})
