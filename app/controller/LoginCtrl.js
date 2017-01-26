pinterestApp.controller ("LoginCtrl", function ($scope,$location) {
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
