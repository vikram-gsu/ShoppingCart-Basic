(function(){
    'use strict;'

    //  let ShoppingCartListItemComponentObject = {
    //     templateUrl: 'src/ShoppingCart/ShoppingList.template.html',
    //     controller: ShoppingCartListItemComponentController,
    //     bindings: {
    //         items: '<',
    //         myTitle: '@title',
    //         onRemove: '&removeItem'
    //     }
    // }

    angular.module('ShoppingList')
        .component('listItem', {
        templateUrl: 'src/ShoppingCart/ShoppingList.template.html',
        controller: ShoppingListComponentController,
        bindings: {
            items: '<',
            myTitle: '@title',
            onRemove: '&removeItem'
        }
    })

   
    ShoppingListComponentController.$inject = ['$rootScope', '$q','$element', 'WeightLossFilterService']
    function ShoppingListComponentController($rootScope, $q, $element, WeightLossFilterService){
        var $ctrl = this
        console.log($ctrl.items)
        var totalItems 
        $ctrl.$init = () => {
            totalItems = 0
        }

        $ctrl.$doCheck = () => {
             if(totalItems != $ctrl.items.length){
                 console.log('spinner set is broadcast')
                 $rootScope.$broadcast('loadingNotification:spinner', {isOn: true})
                 totalItems = $ctrl.items.length
                 var checkNamePromises = []
                 for (var index = 0; index < $ctrl.items.length; index++) {
                    var element = $ctrl.items[index];
                    checkNamePromises.push(WeightLossFilterService.checkName(element.itemName))
                }
                $q.all(checkNamePromises)
                .then(message => {
                    var element = $element.find('div.warning')
                    element.slideUp(900)
                })
                .catch(message => {
                    var element = $element.find('div.warning')
                    element.slideDown(900)
                })
                .finally(message => {
                    console.log('third then ran')
                    $rootScope.$broadcast('loadingNotification:spinner', {isOn: false})
                })
             }
        }
        
    }

})()