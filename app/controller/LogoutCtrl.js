pinterestApp.controller ("LogoutCtrl", function ($location,$scope,MainFactory){
  $scope.logout = () =>
  MainFactory.logout()
  $location.path('/login')
  alert("You are no longer signed in")
  // $scope.$apply()
})
