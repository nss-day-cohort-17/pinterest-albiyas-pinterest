pinterestApp.controller ("UserCtrl", function ($scope,$http,$location,MainFactory){

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
$scope.getThePins = () => {

    $http.get(`https://pinterest-d2d81.firebaseio.com/Pins/.json?orderBy="uid"&equalTo="${$scope.UID}"`)
    .then((firePins) => {
      console.log(firePins.data)
      return  $scope.domPin = firePins.data
    })
    $scope.addPin = () => {
    $http.get (`https://pinterest-d2d81.firebaseio.com/Boards/.json?orderBy="uid"&equalTo="${$scope.UID}"`)
    .then ((data)=>{
      $scope.boards = data.data
      console.log($scope.boards)
    })
  }


  $scope.addBoardId = (pin) => {
        for (var key in pin ) {
          console.log(key)
        }
         $http.patch(`https://pinterest-d2d81.firebaseio.com/Pins/${key}.json`,

        {

          boardId: $scope.keyFromBoard
        })

  }
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

//Materialize


})
