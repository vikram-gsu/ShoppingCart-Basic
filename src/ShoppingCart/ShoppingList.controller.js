(function() {
'use strict';

    angular
        .module('ShoppingList')
        .controller('ShoppingCartController', ShoppingCartController);

    ShoppingCartController.$inject = ['$rootScope'];
    function ShoppingCartController($rootScope) {
        var list = this

        list.items = []
        list.itemName = ""
        list.itemQuantity = ""
        
        list.title = 'Shopping Cart(' + list.items.length + ' items)'
        list.addItem = () => {

            list.items.push({itemName: list.itemName, itemQuantity: list.itemQuantity})
            list.title = 'Shopping Cart(' + list.items.length + ' items)'
        }

        list.removeItem = (index) => {
            list.items.splice(index,1)
            list.title = 'Shopping Cart(' + list.items.length + ' items)'
        }
    }
})();