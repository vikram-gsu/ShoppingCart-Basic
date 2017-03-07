(function(){
    'use strict';

    angular
        .module('ShoppingCart')
        .controller('shoppingCartComponentController', ShoppingCartComponentController)
        .component('shoppingCart', {
            templateUrl: 'src/ShoppingCart/shoppingCart.template.html',
            controller: ShoppingCartComponentController,
            bindings: {
                myTitle: '@title',
                items: '<',
                onRemove: '&removeItem'
            }
        })

    ShoppingCartComponentController.$inject = ['$rootScope', '$q', '$element',  'WeightLossFilterService'];

    function ShoppingCartComponentController($rootScope,$q,  $element,  WeightLossFilterService) {
        /* jshint validthis:true */
        var $ctrl = this;
        var totalItems

        $ctrl.$onInit = () => {
            totalItems = 0
        }

        $ctrl.$doCheck = () => {
            if($ctrl.items.length != totalItems){
                totalItems = $ctrl.items.length
                $rootScope.$broadcast('shoppingCart:processing', {isOn: true})

                var promises = []
                for (var index = 0; index < $ctrl.items.length; index++) {
                    var element = $ctrl.items[index];
                    promises.push(WeightLossFilterService.checkName(element.itemName))
                }
                $q.all(promises)
                .then(message => {
                    var element = $element.find('div.warning')
                    element.slideUp(900)
                })
                .catch(message => {
                    var element = $element.find('div.warning')
                    element.slideDown(900)
                })
                .finally(message => {
                    $rootScope.$broadcast('shoppingCart:processing', {isOn: false})
                })

            }
        }
       

    }
})();