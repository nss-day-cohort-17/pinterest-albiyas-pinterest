pinterestApp.controller ("RegisterCtrl", function ($http, $scope,$location,MainFactory) {
  $scope.goRegister = () => {
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






})
