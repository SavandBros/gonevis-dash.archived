"use strict";

import app from '../app';

function ReaderService(API) {

	/**
   * @desc A method to vote on posts.
   *
   * @param {object} post
   *
   * @returns {Promise}
   */
  function vote(post) {
		return API.EntryVote.save({ entryId: post.id }, null, data => {
      if (data.created) {
        post.vote_count++;
      } else {
        post.vote_count--;
      }
      // `created` means that Vote objects has been created for this post, 
      // if the vote has been created, then it means user has voted for the object.
      // If it says "created" is a`false` or `undefined` then the vote has been removed
      // In such case, user has not voted for the object
      post.is_voted = data.created;
    });
  }

  /**
   * @desc A method to bookmark posts.
   *
   * @param {object} post
   *
   * @returns {Promise}
   */
  function bookmark(post) {
    return API.Bookmark.save({entry_id: post.id}, null, () => {
      // `created` means that Bookmark objects has been created for this post,
      // if the bookmark has been created, then it means user has bookmarked the object.
      // If it says "created" is a`false` or `undefined` then the bookmark has been removed
      // In such case, user has not bookmark the object
      // @todo Remember to change this once backend has updated.
      // post.is_bookmarked = data.created;
    });
  }

  return {
    vote: vote,
    bookmark: bookmark,
  };
}

app.factory("ReaderService", ReaderService);
