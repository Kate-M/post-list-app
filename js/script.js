$(document).ready(function () {
    $.when($.ajax("https://jsonplaceholder.typicode.com/users"),
        $.ajax("https://jsonplaceholder.typicode.com/posts"))

        .done(function (usersList, postsList) {
            var usersList = usersList[0],
                postsList = postsList[0];

            postsList.forEach(element => {
                var userName = getUserName(element.userId);
                getView(element.title, element.body, userName);

            });
            function getView(title, body, name) {
                $("#post-area").append(`
                            <li class="post-item">
                                <p class="post-name">${title}</p>
                                <div class="post-message">
                                    <p>${body}</p>
                                </div>
                                <div class="post-content">
                                    <p class="user">${name}</p>
                                    <a href="" class="btn-comment commets">Comments</a>
                                </div>
                            </li>
                        `);
            }
            function getUserName(userID) {
                var currentUser = usersList.find((element, index) => {
                    return element.id == userID;
                });
                return currentUser.name;
            }

        })
        .fail(function () {
            $("#post-area").html('Error');
        });
});


