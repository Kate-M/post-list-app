$(document).ready(function () {
    init();
    
    function init() {
        let urls = ['https://jsonplaceholder.typicode.com/users', 'https://jsonplaceholder.typicode.com/posts'],
            promises = urls.map(url => fetch(url)
                .then(response => response.json())
            ),
            postArea = $("#post-area");
            
        Promise.all(promises).then(
            results => {
                let usersList = results[0],
                    postsList = results[1];

                postsList.forEach(element => {
                    let userName = getUserName(usersList, element.userId);
                    renderPosts(element.title, element.body, userName, element.id, postArea);
                });
                initPagination(postArea);

                $(postArea).on('click', commentsAdapter);
            }
        )
            .catch(function (e) {
                $(postArea).html('Error');
            });
    }

    function renderPosts(title, body, name, id, container) {
        $(container).append(`
                            <li class="post-item">
                                <p class="post-name">${title}</p>
                                <div class="post-message">
                                    <p class="post-body">${body}</p>
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

    function commentsAdapter(event) {
        let target = $(event.target);
        event.preventDefault();
        if (target.hasClass('btn-comment')) {
            let postMessage = $(event.target).parents('.post-item').find('.post-message');
            toggleContainer(postMessage);
            if (!postMessage.find('.comments-list').length) {
                postMessage.append('<ul class="comments-list"></ul>');
                getComments(postMessage, target);
            }
        }
    }

    function getComments(container, targetElement) {
        let messageContainer = container.find('.post-body');
        let postId = targetElement.data('post-id');

        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(function (result) {
                let currentComments = result.filter(element => element.postId === postId);
                if (currentComments.length === 0) {
                    messageContainer.html('No comments yet');
                }
                currentComments.forEach(element =>
                    renderComments(container, element.id, element.name)
                );
            })
            .catch(function (e) {
                messageContainer.html('Error loading comments');
            });
    }

    function toggleContainer(container) {
        container.toggleClass('comments-mode');
    }

    function renderComments(constainer, id, name) {
        constainer.find('.comments-list')
            .append(`<li class="comment-item">
                        <a href="" class="btn btn-open-comment">
                            <span class="comment-text">${name}</span>
                        </a>
                    </li>`);
    }

    function initPagination(postArea) {
        let currentArea = postArea.before('<div class="holder"></div>').attr('id'),
        CURRENT_COUNT = 10;

        $("div.holder").jPages({
            containerID: currentArea,
            first: false,
            previous: false,
            next: false,
            last: false,
            perPage: CURRENT_COUNT,
            midRange: CURRENT_COUNT
        });
    }
});
