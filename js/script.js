$(document).ready(function () {
    var usersList;
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
    }).done(function (result) {
        usersList = result;
    }).fail(function () {
        console.log('user fail');
    });

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
    }).done(function (result) {
        
        result.forEach(element => {
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
            var currentUser = usersList.find((element, index) => {
                return element.id == userID;
            });
            return currentUser.name;
        }

    }).fail(function () {
        $("#post-area").html('error');
    });

});


