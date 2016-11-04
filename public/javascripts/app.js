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

//getCategories();

        $scope.getCategories = function(){
            $scope.divShow= true;

            $http({
                method: "GET",
                url: "/getCategories"
            }).then(function(res){
                var gettingTaskData = res.data;

                console.log(gettingTaskData);

                for (var i = 0; i < gettingTaskData.length; i++){
                    $scope.categories.push(gettingTaskData[i]);
                }
            });
        };



    /* When add item is clicked, input and add button SHOW on screen  */
        $scope.getInput = function() {
            $scope.showCat= true;
            $scope.showAcceptCatButton= true;
        };


    /* Click the submit new category */
        $scope.acceptNewCategory = function(){
                var newCat = new Category();
                newCat.category = $scope.receiveCategory;
                //$scope.categories.push(newCat);        Commented out since things are coming in from the database now

    //********This is meant to POST my input for New Categories
            var newCatTitle = {"category":newCat.category};

            $http({
                method: 'POST',
                url: '/postCategory',
                data: newCatTitle
            }).then(function() {
                $scope.getCategories();
            });


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



     /*Pushing input data into array  */
        $scope.acceptNewTodo = function(category){
            category.themes.push({name: category.newToDo});

            var taskInput = category.themes;

            updateCategoryList(category);
            category.newToDo = "";

        };

    function updateCategoryList(category){
        var taskSend = {themes:category.themes};
        $http({
            method:"PUT",
            url: "/postTheme/" + category.category,
            data: taskSend
        }).then(function(){
            console.log("task send went through")

        });
    }

        $scope.clearCompleted = function (category) {

            for (var i = 0; i < category.themes.length; i++) {
                if (category.themes[i].done) {

                    $http({
                        method:"PUT",
                        url: "/completeTheme/" + category.category + '/' + category.themes[i].name
                    }).then(function(){
                        console.log("task send went through");
                        $scope.getCategories();
                    });

                    //category.themes = deleteTask(category.themes, i);
                    //
                    //category.done = deleteTask(category.done, i);
                }
            }
        };


/*  *******  Delete items from my array  *****/
    function deleteTask (categoryItems, item){
        //categoryItems.splice(item, 1);
        //
        //return categoryItems;
    }


/*  ********  Creating a new unique category  ******* */
    function Category(){
        this.category = "Task";
        this.themes = [];
        this.done = [];

        this.checkbox = true;
        this.newToDo= '';
        this.hideTasker = false;
        this.showInput = false;
        this.showAcceptButton = false;
    }
        $scope.getCategories();


    }]);





