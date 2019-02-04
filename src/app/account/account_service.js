"use strict";
import avatar from "../../public/img/avatar.png";
import app from "../app";

/**
 * @desc Class for any user account to get better data easily.
 *       Instantiate this class via backend data of any user.
 */
function Account() {
  return function(data) {
    /**
     * @private
     */
    var self = this;

    /**
     * @desc Backend data
     * @type {object}
     */
    this.get = data;

    /**
     * @desc GoNevis profile address of user
     * @type {string}
     */
    this.url = self.get.get_absolute_uri;

    /**
     * @type {object}
     */
    this.media = {
      full: self.get.media.picture,
      medium: self.get.media.thumbnail_256x256,
      small: self.get.media.thumbnail_128x128,
      tiny: self.get.media.thumbnail_48x48
    };

    /**
     * @type {boolean}
     */
    this.hasMedia = !!self.media.full;

    /**
     * @desc Get media or default picture
     * @type {function}
     *
     * @param {string} size
     *
     * @returns {string} URL of the image
     */
    this.getMedia = function(size) {
      if (self.media[size]) {
        return self.media[size];
      }
      return avatar;
    };

    /**
     * @desc Get first part of full name if name is available
     * @type {function}
     * @returns {string}
     */
    this.getFirstName = function() {
      // Check name
      if (self.get.name) {
        // Get first part of name
        var firstName = self.get.name.split(" ")[0];
        if (firstName) {
          return firstName;
        }
      }
      // Name is not set
      return self.get.username;
    };

    /**
     * @desc Get users full name or username if not available
     * @type {function}
     * @returns {string}
     */
    this.getFullName = function() {
      return self.get.name || self.get.username;
    };

    /**
     * @desc Show a proper name for user
     * @type {function}
     * @returns {string}
     */
    this.getDisplayName = function() {
      // First name
      if (self.getFirstName()) {
        return self.getFirstName();
      }
      // Full name
      return self.getFullName();
    };

    /**
     * @desc Get user sites
     * @returns {array}
     */
    this.getSites = function() {
      if (self.get.sites.length > 0) {
        return self.get.sites;
      }
      return [];
    };

    /**
     * @desc Check whether the profile information is complete or not (name, about, etc.)
     *
     * @param {boolean} minimal Check profile for minimal user data (like data of /refresh endpoint)
     *
     * @returns {boolean}
     */
    this.isProfileComplete = function(minimal) {
      // Check for media and name
      if (self.hasMedia && self.get.name) {
        // If not checking for minimal data, check for about and location
        if (!minimal && self.get.about && self.get.location) {
          return true;
        }
        // Checking minimal data
        if (minimal) {
          return true;
        }
      }
      // Missing info
      return false;
    };
  };
}

app.service("Account", Account);
export default Account;
