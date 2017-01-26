pinterestApp.controller ("LogoutCtrl", function ($location,$scope,MainFactory){
  $scope.logout = () =>
  MainFactory.logout()
  $location.path('/login')
  // alert("You are no longer signed in")
  Materialize.toast("Logged out",1000)
  // $scope.$apply()
})
