pinterestApp.controller ("LogoutCtrl", function ($location,$scope){
  $scope.logout = () => {
    firebase.auth().signOut()
    console.log(firebase.auth().currentUser)
    $location.path('/login')
    Materialize.toast("Logged out",1000)}
})
