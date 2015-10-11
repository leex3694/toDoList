/**
 * Created by usuario on 10/2/15.
 */


var app = angular.module('toDoList', []);



    app.controller('doGroups', ['$scope', '$http', function($scope, $http) {


    /* ********Declaring empty array to push input items to *****     */
        $scope.themes= [];
        $scope.categories = [];

    /*  Show/hide original values.  Can't get the   value = !value   to work   */
        $scope.showInput = true;
        $scope.showAcceptButton = true;
        $scope.checkbox= true;
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
                var newCat = new Category();
                newCat.title = $scope.receiveCategory;
                $scope.categories.push(newCat);
            console.log("this is newCat ____" + newCat);



            //This is meant to POST my input for New Categories. However, struggling to get the DATA to be the right format like Json.
            var newCatTitle = {"category":newCat.title};
            console.log("this is newCat.title_____ " + newCatTitle);
            $http({
                method: 'POST',
                url: '/postCategory',
                data: newCatTitle
            }).then(function() {
                console.log("the http call went through i think")
            });
            //}

                console.log(newCatTitle);

                //var a = $scope.receiveCategory;
               // $scope.themes.push({item: $scope.receiveCategory});
                $scope.receiveCategory = '';
                $scope.showAcceptCatButton= false;
                $scope.showCat= false;
                $scope.divShow= true;

             };

        //for(var i = 0; i < $scope.categories; i++){



    /* Clicking to add new task reveals text box and submit button */
        $scope.addSubTask = function(){
            $scope.showInput = true;
            $scope.showAcceptButton = true;
            $scope.hideTasker = true;

        };



     /*Pushing input data into array  */
        $scope.acceptNewTodo = function(category){


            category.themes.push(category.newToDo);
            category.done.push(false);
            category.newToDo = "";

            $http({
                method:"POST",
                url: "/postTheme",
                data:
            }).then(function(){

            })

        };



        $scope.clearCompleted = function (category) {

            for (var i = 0; i < category.themes.length; i++) {
                if (category.done[i]) {
                    category.themes = deleteTask(category.themes, i);

                    category.done = deleteTask(category.done, i);
                }
            }
        };


/*  *******  Delete items from my array  *****/
    function deleteTask (categoryItems, item){
        categoryItems.splice(item, 1);
        return categoryItems;
    }


/*  ********  Creating a new unique category  ******* */
    function Category(){
        this.title = "Task";
        this.themes = [];
        this.done = [];

        this.checkbox = true;
        this.newToDo= '';
        this.hideTasker = false;
        this.showInput = false;
        this.showAcceptButton = false;
    }


    }]);





