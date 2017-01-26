pinterestApp.controller ("UserCtrl", function ($scope,$http,$location,MainFactory){

   // if (!firebase.auth().currentUser) {
   //  $location.path (`/login`)
   // }
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
$scope.getThePins = () => {

    $http.get(`https://pinterest-d2d81.firebaseio.com/Pins/.json?orderBy="uid"&equalTo="${$scope.UID}"`)
    .then((firePins) => {
      console.log(firePins.data)
      return  $scope.domPin = firePins.data
    })
    $scope.addPin = (key,value) => {
    $http.get (`https://pinterest-d2d81.firebaseio.com/Boards/.json?orderBy="uid"&equalTo="${$scope.UID}"`)
    .then ((data)=>{
      $scope.boards = data.data
      console.log($scope.boards)
    })
      $scope.key = key//key from pin
    }



}
$scope.addBoardId = (key) => {
          $scope.keyFromBoard = key
          $http.patch(`https://pinterest-d2d81.firebaseio.com/Pins/${$scope.key}.json`,
            {
              boardId : $scope.keyFromBoard//key from board
            })

        }


   $scope.boardToFireBase = () => {
      $http.post(`https://pinterest-d2d81.firebaseio.com/Boards/.json`,
          {
            uid:$scope.UID,
            Title: $scope.boardName
          }
      )
  }

//Materialize
  //modal logic

  $('#modalPin').modal({
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
    })

  $('#boardModal').modal({
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
    })

})
