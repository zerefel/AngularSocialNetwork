/**
 * Created by ZerefeL on 21/05/15.
 */
SocialNetwork.controller('PostsController', function($scope, postsService, $route, $routeParams, notificationService) {

    $scope.getNewsFeed = function () {
        postsService.getNewsFeed(function (serverData) {
            $scope.newsFeed = serverData;
            $scope.contentLoaded = true;
        }, function (error) {
            notificationService.showError('Error loading news feed!');
        });
    };

    $scope.getWallOwnerPosts = function() {
        postsService.getWallPosts($routeParams.username, function(serverData) {
            $scope.wallPosts = serverData;
        }, function(error) {
            //poppy.pop('error', 'Error', 'There was an error loading the wall posts');
        });
    };

    $scope.likePost = function (id) {
        postsService.likePost(id, function (serverData) {
            $route.reload();
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error liking the post');
        });
    };

    $scope.unlikePost = function (id) {
        postsService.unlikePost(id, function (serverData) {
            $route.reload();
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error unliking the post');
        });
    };

    $scope.likeComment = function (postId, commentId) {
        postsService.likeComment(postId, commentId, function (serverData) {
            $route.reload();
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error liking the comment');
        });
    };

    $scope.unlikeComment = function (postId, commentId) {
        postsService.unlikeComment(postId, commentId, function (serverData) {
            $route.reload();
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error unliking the comment');
        });
    };

    $scope.showComments = function(id) {
        var comments = $('#comments-' + id);
        if (comments.css('display') === 'none') {
            comments.css('display', 'block');
        } else {
            comments.css('display', 'none');
        }
    };

    $scope.showUserComment = function(id) {
        var userComment = $('#userComment' + id);
        if (userComment.css('display') === 'none') {
            userComment.css('display', 'block');
        } else {
            userComment.css('display', 'none');
        }
    };

    $scope.cancelComment = function(id) {
        var userComment = $('#userComment' + id);
        var userCommentContent = $('#userCommentContent' + id);

        userCommentContent.val('');
        userComment.css('display', 'none');
    };

    $scope.submitPost = function () {
        var user = $routeParams.username;
        var content = $scope.postContent;

        postsService.newPost(user, content, function (serverData) {
            $route.reload();
            notificationService.showInfo("Posted successfully!");
        }, function (error) {
            notificationService.showError('There was an error submitting this post. ' + error.message)
        });
    };

    $scope.submitComment = function(id) {
        var userComment = $('#userComment' + id);
        var userCommentContent = $('#userCommentContent' + id);
        var content = userCommentContent.val();

        postsService.commentPost(id, content, function (serverData) {
            $route.reload();
            poppy.pop('success', 'Success', 'Post commented successfully.');
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error commenting the post.');
        });

        userCommentContent.val('');
        userComment.css('display', 'none');
    };

    $scope.deletePost = function(id) {
        postsService.deletePost(id, function(serverData) {
            $route.reload();
            notificationService.showInfo("Successfully deleted post.");
        }, function(error) {
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

    $scope.getPostDetails = function() {
        postsService.getPostDetails($routeParams.id, function(serverData) {
            $scope.post = serverData;
        }, function(error) {
            poppy.pop('error', 'Error', 'An error occured when trying to load the post details');
        });
    };

    $scope.isDeletablePost = function(post) {
        if (post.author.username === sessionStorage['username'] ||
            post.wallOwner.username === sessionStorage['username']) {
            return true;
        }
        return false;
    };

    $scope.isDeletableComment = function(commentAuthor, postAuthor) {
        return commentAuthor.username === sessionStorage['username'] ||
            postAuthor.username === sessionStorage['username'];
    };

    $scope.isPostOwnerOrAuthorFriend = function(post) {
        return post.author.isFriend || post.wallOwner.isFriend ||
            (post.author.username === sessionStorage['username']) ||
            (post.wallOwner.username === sessionStorage['username']);
    };

    $scope.exceededCommentsCount = function(length) {
        return length > 3;
    };
});