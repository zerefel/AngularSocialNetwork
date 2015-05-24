/**
 * Created by ZerefeL on 21/05/15.
 */
SocialNetwork.controller('PostsController', function ($scope, postsService, $route, $routeParams, notificationService, authenticationService) {

    $scope.newsFeedPostId = {newsFeedPostId: 0};
    $scope.wallPostId = {wallPostId: 0};

    $scope.getNewsFeed = function () {
        postsService.getNewsFeed(function (serverData) {
            $scope.newsFeed = serverData;
            $scope.contentLoaded = true;
        }, function (error) {
            notificationService.showError('Error loading news feed!' + error.message);
        });
    };

    $scope.getMorePosts = function() {
        if(newsFeedPostId != $scope.newsFeedPostId.newsFeedPostId) {
            var newsFeedPostId = $scope.newsFeedPostId.newsFeedPostId;
            postsService.getMoreFromNewsFeed(newsFeedPostId, function(serverData) {
                $scope.newsFeed = serverData;
            }, function(error) {
                notificationService.showError('Error loading more content for the news feed!' + error.message);
            });
        }
    };

    // TODO: Finish user wall pagination
    //$scope.getMoreProfilePosts = function() {
    //    if(profilePostsPostId != $scope.wallPostId.wallPostId) {
    //        console.log($scope.wallPostId.wallPostId);
    //        var profilePostsPostId = $scope.wallPostId.wallPostId;
    //        postsService.getMoreFromWallPosts($routeParams.username, profilePostsPostId, function(serverData) {
    //            $scope.wallPosts = serverData;
    //        }, function(error) {
    //            notificationService.showError('Error loading more content for the news feed!' + error.message);
    //        });
    //    }
    //};

    $scope.getWallOwnerPosts = function () {
        postsService.getWallPosts($routeParams.username, function (serverData) {
            $scope.wallPosts = serverData;
        }, function (error) {
            notificationService.showError('Error loading wall owner posts.' + error.message);

        });
    };

    $scope.likePost = function (id) {
        postsService.likePost(id, function (serverData) {
            $route.reload();
            notificationService.showInfo('Post liked.');
        }, function (error) {
            notificationService.showError('Error liking post.' + error.message);
        });
    };

    $scope.unlikePost = function (id) {
        postsService.unlikePost(id, function (serverData) {
            $route.reload();
            notificationService.showInfo('Post unliked.');
        }, function (error) {
            notificationService.showError('Error unliking post.' + error.message);
        });
    };

    $scope.likeComment = function (postId, commentId) {
        postsService.likeComment(postId, commentId, function (serverData) {
            $route.reload();
            notificationService.showInfo('Post comment liked.');
        }, function (error) {
            notificationService.showError('Error liking comment.' + error.message);
        });
    };

    $scope.unlikeComment = function (postId, commentId) {
        postsService.unlikeComment(postId, commentId, function (serverData) {
            $route.reload();
            notificationService.showInfo('Post comment unliked.');
        }, function (error) {
            notificationService.showError('Error unliking comment.' + error.message);
        });
    };

    $scope.showComments = function (id) {
        var comments = $('#comments-' + id);
        if (comments.css('display') === 'none') {
            comments.css('display', 'block');
        } else {
            comments.css('display', 'none');
        }
    };

    $scope.showUserComment = function (id) {
        var userComment = $('#user-comment' + id);
        if (userComment.css('display') === 'none') {
            userComment.css('display', 'block');
            $('#user-comment').child('textarea').css('width', '600px');
        } else {
            userComment.css('display', 'none');
        }
    };

    $scope.cancelComment = function (id) {
        var userComment = $('#user-comment' + id);
        var userCommentContent = $('#user-comment-content' + id);

        userCommentContent.val('');
        userComment.css('display', 'none');
    };

    $scope.submitPost = function () {
        var user = $routeParams.username;
        var postContent = $('#post-text-area').val();
        if (postContent.length > 1) {
            postsService.newPost(user, postContent, function (serverData) {
                $route.reload();
                notificationService.showInfo("Post submitted successfully!");
            }, function (error) {
                notificationService.showError('There was an error submitting this post. ' + error.message)
            });
        }
    };

    $scope.submitComment = function (id) {
        var userCommentContent = $('#user-comment-content' + id);
        var content = userCommentContent.val();

        postsService.commentPost(id, content, function (serverData) {
            $route.reload();
            notificationService.showInfo('Post commented successfully.');
        }, function (error) {
            notificationService.showError('Error commenting post.');
        });
    };

    $scope.deletePost = function (id) {
        postsService.deletePost(id, function (serverData) {
            $route.reload();
            notificationService.showInfo("Successfully deleted post.");
        }, function (error) {
            notificationService.showError("Error deleting post. " + error.message);
        });
    };

    $scope.editPost = function (postId, commentId) {
        postsService.editPost(postId, commentId, function (serverData) {
            $route.reload();
            notificationService.showInfo("Successfully edited post.");
        }, function (error) {
            notificationService.showError("Error editing post. " + error.message);
        });
    };

    $scope.deleteComment = function (postId, commentId) {
        postsService.deleteComment(postId, commentId, function (serverData) {
            $route.reload();
            notificationService.showInfo("Successfully deleted comment.");
        }, function (error) {
            notificationService.showError("Error deleting comment. " + error.message);
        });
    };

    $scope.getPostDetails = function () {
        postsService.getPostDetails($routeParams.username, function (serverData) {
            $scope.post = serverData;
        }, function (error) {
            notificationService.showError('Error ferching post.' + error.message);
        });
    };

    $scope.isDeletablePost = function (post) {
        if (post.author.username === authenticationService.GetUsername() ||
            post.wallOwner.username === authenticationService.GetUsername()) {
            return true;
        }
        return false;
    };

    $scope.isDeletableComment = function (commentAuthor, postAuthor) {
        return commentAuthor.username === authenticationService.GetUsername() ||
            postAuthor.username === authenticationService.GetUsername();
    };

    $scope.isPostOwnerOrAuthorFriend = function (post) {
        return post.author.isFriend ||
            post.wallOwner.isFriend ||
            (post.author.username === authenticationService.GetUsername()) ||
            (post.wallOwner.username === authenticationService.GetUsername());
    };

    $scope.isWallOwnerMe = function() {
        return $routeParams.username === authenticationService.GetUsername();
    };
});