
pinterestApp.controller ("HomeCtrl", function($scope, $location){

(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$scope.goRegister = function() {
    console.log("go");
    $('#modal1').modal('close');
    $location.path('/register')

  }

})
