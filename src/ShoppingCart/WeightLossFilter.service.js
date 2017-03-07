(function(){
    'use strict';

    angular
        .module('ShoppingCart')
        .service('WeightLossFilterService', WeightLossFilterService)

    WeightLossFilterService.$inject = ['$q', '$timeout'];

    function WeightLossFilterService($q, $timeout) {
        var service = this

        this.checkName = (name) => {
            var deferred = $q.defer()
                let result = {message: ''}
                $timeout(() => {
                    if(name.toLowerCase().indexOf('cookie') != -1){
                        result.message = 'No more cookies for you' 
                        deferred.reject(result)
                    }else{
                        deferred.resolve(result)
                    }
                }, 900)
            
            
            return deferred.promise
        }
    }
})();