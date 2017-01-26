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








})
