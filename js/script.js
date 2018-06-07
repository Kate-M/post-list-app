$(document).ready(function () {
    init();

    function init() {
        let urls = ['https://jsonplaceholder.typicode.com/users', 'https://jsonplaceholder.typicode.com/posts'],
            promises = urls.map(url => fetch(url)
                .catch(e => e)
                .then(response => response.json())
            );
        Promise.all(promises).then(
            results => {
                var usersList = results[0],
                    postsList = results[1];
                postsList.forEach(element => {
                    var userName = getUserName(usersList, element.userId);
                    getView(element.title, element.body, userName, element.id);
                });
            }
        )
            .catch(function (e) {
                $("#post-area").html('Error');
                console.log(e);
            });
    }

    function getView(title, body, name, id) {
        $("#post-area").append(`
                            <li class="post-item">
                                <p class="post-name">${title}</p>
                                <div class="post-message">
                                    <p>${body}</p>
                                </div>
                                <div class="post-content">
                                    <p class="user">${name}</p>
                                    <a href="" class="btn-comment commets" data-post-id="${id}">Comments</a>
                                </div>
                            </li>
                        `);
    }

    function getUserName(usersList, userID) {
        let currentUser = usersList.find(element => element.id === userID);
        return currentUser.name;
    }
});


