$(document).ready(function () {

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
    }).done(function (result) {
        var usersList = JSON.stringify(result);
        localStorage.setItem('usersDB', usersList)

    }).fail(function () {
        console.log('user fail');
    });

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
    }).done(function (result) {
        var posts = [];

        Array.isArray(result)?posts = result : posts.push(result);

        if (typeof (Storage) !== 'undefined') {
            if (localStorage.getItem('usersDB')) {
                var usersList = JSON.parse(localStorage.getItem('usersDB'));
                
            }
        } else {
            console.log('Sorry! No Web Storage support');
        }
        
        posts.forEach(element => {
            var userName = getUserName(element.userId);

            $("#post-area").append(`
                    <li class="post-item">
                        <p class="post-name">${element.title}</p>
                        <div class="post-message">
                            <p>${element.body}</p>
                        </div>
                        <div class="post-content">
                            <p class="user">${userName}</p>
                            <a href="" class="btn-comment commets">Comments</a>
                        </div>
                    </li>
                `);
        });
        function getUserName(userID) {
            var currentUser = usersList.filter((element, index) => {
                if(element.id == userID) 
                return element.name;
            });
            return currentUser[0].name;
        }

    }).fail(function () {
        $("#post-area").html('error');
    });

});


