/**
 * Created by usuario on 10/2/15.
 */


var app = angular.module('toDoList', []);



    app.controller('doGroups', ['$scope', function($scope) {


    /* ********Declaring empty array to push input items to *****     */
        $scope.themes= [];
        $scope.categories = [];

    /*  Show/hide original values.  Can't get the   value = !value   to work   */
        $scope.showInput = false;
        $scope.showAcceptButton = false;
        $scope.checkbox= false;
        $scope.showCat= false;
        $scope.showAcceptCatButton= false;
        $scope.divShow= false;


    /* When add item is clicked, input and add button SHOW on screen  */
        $scope.getInput = function() {
            $scope.showCat= true;
            $scope.showAcceptCatButton= true;
        };

    /* Click the submit new category */
        $scope.acceptNewCategory = function(){
            $scope.categories.push({"category": $scope.receiveCategory});
            $scope.receiveCategory = '';
            $scope.showAcceptCatButton= false;
            $scope.showCat= false;
            $scope.divShow= true;

        };

    /* Clicking to add new task reveals text box and submit button */
        $scope.addSubTask = function(){
            $scope.showInput = true;
            $scope.showAcceptButton = true;
            $scope.hideTasker = true;
        };


    /* When add new item is clicked, it gets pushed to an array and displays on screen
     * The text input and submit button are currently not placed where I want them,
      but putting it next to the add new task button, where I want it doesn't work...so it is where it
      is for now

      * Also, List items are currently not unique to their category. They should be. However, they are
       currently all being pulled from the same array.
     */
        $scope.acceptNewTodo = function(){
            //$scope.category.push({"themes": $scope.newToDo});
            $scope.themes.push(
                {category: $scope.newToDo, done:false}
                //{task: $scope.newToDo, done:false}
                 );
            $scope.checkbox = true;
            $scope.newToDo= '';
            $scope.hideTasker = false;
            $scope.showInput = false;
            $scope.showAcceptButton = false;

        };



    }]);





