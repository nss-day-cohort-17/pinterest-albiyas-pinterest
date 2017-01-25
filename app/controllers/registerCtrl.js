pinterestApp.controller ("RegisterCtrl", function ($http, $scope, $location) {


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
    $location.path(`/home`)
    $scope.$apply();
  };
  




});