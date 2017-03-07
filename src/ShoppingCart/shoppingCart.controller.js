(function(){
    'use strict';

    angular
        .module('ShoppingCart')
        .controller('ShoppingCartController', ShoppingCartController)

    ShoppingCartController.$inject = ['$location'];

    function ShoppingCartController($location) {
        /* jshint validthis:true */
        var list = this;
        list.items = []
        list.title = 'Shopping Cart(' + list.items.length + ' items)'
        list.addItem = () => {
            list.items.push({itemName: list.itemName, itemQuantity: list.itemQuantity})
            list.title = 'Shopping Cart(' + list.items.length + ' items)'
            console.log(list.items)
        }

        list.removeItem = (index) => {
            list.items.splice(index, 1)
            list.title = 'Shopping Cart(' + list.items.length + ' items)'
        }

    }
})();