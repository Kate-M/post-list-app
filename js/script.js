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
                let usersList = results[0],
                    postsList = results[1];
                postsList.forEach(element => {
                    let userName = getUserName(usersList, element.userId);
                    getPostsView(element.title, element.body, userName, element.id);
                });
                $('#post-area').on('click', getComments);
            }
        )
            .catch(function (e) {
                $("#post-area").html('Error');
                console.log(e);
            });
    }

    function getPostsView(title, body, name, id) {
        $("#post-area").append(`
                            <li class="post-item">
                                <p class="post-name">${title}</p>
                                <div class="post-message">
                                    <p>${body}</p>
                                </div>
                                <div class="post-content">
                                    <p class="user">${name}</p>
                                    <a href="" class="btn btn-comment" data-post-id="${id}">Comments</a>
                                </div>
                            </li>
                        `);
    }

    function getUserName(usersList, userID) {
        let currentUser = usersList.find(element => element.id === userID);
        return currentUser.name;
    }

    function getComments(event) {
        event.preventDefault();
        let target = $(event.target),
            postMessage = $(event.target).parents('.post-item').find('.post-message'),
            messageContainer = postMessage.find('p');

        if (target.hasClass('btn-comment')) {
            let postId = $(event.target).data('post-id');
            fetch('https://jsonplaceholder.typicode.com/comments')
                .catch(e => e)
                .then(response => response.json())
                .then(function (result) {
                    let currentComments = result.filter(element => element.postId === postId);
                    if (currentComments.length === 0) {
                        messageContainer.html('No comments yet');
                    }
                    postMessage.empty().html('<ul class="comments-list"></ul>');

                    currentComments.forEach(element =>
                        getCommentsView(postMessage, element.id, element.name)
                    );
                })
                .catch(function (e) {
                    messageContainer.html('Error loading comments');
                });
        }
    }
    function getCommentsView(constainer, id, name) {
        constainer.find('.comments-list')
            .append(`<li class="comment-item">
                        <a href="" class="btn btn-open-comment">
                            <span class="comment-number">${id}.</span>
                            <span class="comment-text">${name}</span>
                        </a>
                    </li>`);
    }

});


