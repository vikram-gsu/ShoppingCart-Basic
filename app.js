(function(){
	'use strict;'

	var listItemComponentOptions = {
					templateUrl: 'listItem.html',
					controller: ShoppingCartListItemComponentController,
					bindings:{
						items: "<",
						myTitle: "@title",
						onRemove: "&removeItem"
					}
				}
	var spinnerAppComponentOptions = {
		templateUrl: 'loadingImage.html'
	}
	angular.module('ShoppingCartApp', [])
				.controller('ShoppingCartListController', ShoppingCartListController)
				.component('listItem', listItemComponentOptions)
				.component('spinnerApp', spinnerAppComponentOptions)
				// .service('ShoppingCartService', ShoppingCartService)
				.service('weightLossFilterService', WeightLossFilterService)

	ShoppingCartListItemComponentController.$inject = ['$scope', '$element']
	function ShoppingCartListItemComponentController($scope, $element){
		var $ctrl = this

		$ctrl.cookiesInList = function(){
			for (var i = $ctrl.items.length - 1; i >= 0; i--) {
				if($ctrl.items[i].itemName.indexOf('cookie') != -1){
					return true
				}else{
					return false
				}
			}
		}

		$ctrl.$onInit = function(){
			console.log("In onInit")
		}

		$ctrl.$onChanges = function(changeObj){
			console.log('Changes:', changeObj)
		}

		$ctrl.$postLink = function(){
			$scope.$watch('$ctrl.cookiesInList()', function(newValue, oldValue){

				console.log($element)
				if(newValue){
					var element = $element.find('div.warning')
					element.slideDown(900)
				}else{
					var element = $element.find('div.warning')
					element.slideUp(900)
				}
			})
		}
	}

	function ShoppingCartListController(){
		var list = this
		list.items = []
		list.lastRemoved = ''
		list.addItem = function(){
			list.items.push({itemName: list.itemName, itemQuantity: list.itemQuantity})
			list.title = `Shopping Cart(${list.items.length} items)`
		}

		list.removeItem = function(index){
			list.lastRemoved = list.items.splice(index,1)[0].itemName
			list.title = `Shopping Cart(${list.items.length} items)`
		}
	}

	// ShoppingCartService.$inject = ['$q', '$timeout', 'weightLossFilterService']
	// function ShoppingCartService(){
	// 	var service = this


	// }

	WeightLossFilterService.$inject = ['$q', '$timeout']
	function WeightLossFilterService(){
		var service = this

		service.checkChips = function(name){
			var deferred = $q.defer()
			
			$timeout(name => {
				if(name.indexOf('chip') != -1){
					deferred.reject('No more chips available')
				}else{
					deferred.resolve('')
				}
			},1000)
		}
	}
})();