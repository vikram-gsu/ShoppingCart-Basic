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

    // ShoppingCartComponentController.$inject = [];

    function ShoppingCartComponentController() {
        /* jshint validthis:true */
        var $ctrl = this;
        console.log('in ShoppingCartComponentController', $ctrl)
        console.log('in ShoppingCartComponentController', $ctrl.items)

    }
})();