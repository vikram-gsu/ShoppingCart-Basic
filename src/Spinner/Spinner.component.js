(function(){
    'use strict';
    
    let SpinnerComponent = {
        templateUrl: 'src/Spinner/loadingImage.html',
        controller: SpinnerController
    }
    angular.module('Spinner')
        .component('spinnerApp', SpinnerComponent)

    SpinnerController.$inject = ['$rootScope']
    function SpinnerController($rootScope){
        var $ctrl = this

        var cancelListener = $rootScope.$on('shoppingCart:processing', function(e, data){
            console.log(data)
            // $ctrl.showSpinner = data.isOn
              if (data.isOn) {
                $ctrl.showSpinner = true;
                }
                else {
                $ctrl.showSpinner = false;
                }
        })

        $ctrl.$onDestroy = function(){
            cancelListener()
        }
    }
  


    
})()
