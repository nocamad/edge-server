(function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state ) {
        var vm = this;
        var citymap = {
            chicago: {
              center: {lat: 41.878, lng: -87.629},
              population: 2714856
          },
          newyork: {
              center: {lat: 40.714, lng: -74.005},
              population: 8405837
          },
          losangeles: {
              center: {lat: 34.052, lng: -118.243},
              population: 3857799
          },
          vancouver: {
              center: {lat: 49.25, lng: -123.1},
              population: 603502
          }
      };
      initMap();
      vm.account = null;
      vm.isAuthenticated = null;
      vm.login = LoginService.open;
      vm.register = register;
      $scope.$on('authenticationSuccess', function() {
        getAccount();
    });

      getAccount();

      function getAccount() {
        Principal.identity().then(function(account) {
            vm.account = account;
            vm.isAuthenticated = Principal.isAuthenticated;
        });
    }

    function register () {
        $state.go('register');
    }



    function initMap() {
        // Create the map.
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: 37.090, lng: -95.712},
          mapTypeId: google.maps.MapTypeId.TERRAIN
      });

        // Construct the circle for each value in citymap.
        // Note: We scale the area of the circle based on the population.
        for (var city in citymap) {
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: citymap[city].center,
            radius: Math.sqrt(citymap[city].population) * 100
        });
      }
  }


}
})();
