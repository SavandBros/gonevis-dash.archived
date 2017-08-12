"use strict";

/**
 * @desc Class for any user account to get better data easily.
 *       Instantiate this class via backend data of any user.
 */
function Account() {
  return function (data) {
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
     * @desc Get first part of full name if name is available
     * @type {function}
     * @returns {string|boolean}
     */
    this.getFirstName = function () {
      // Check name
      if (self.get.name) {
        // Get first part of name
        var firstName = self.get.name.split(" ")[0];
        if (firstName) {
          return firstName;
        }
      }
      // Name is not set
      return false;
    };

    /**
     * @desc Get users full name or username if not available
     * @type {function}
     * @returns {string}
     */
    this.getFullName = function () {
      // Full name
      if (self.get.name) {
        return self.get.name;
      }
      // Username
      return self.get.username;
    };

    /**
     * @desc Show a proper name for user
     * @type {function}
     * @returns {string}
     */
    this.getDisplayName = function () {
      // First name
      if (self.getFirstName()) {
        return self.getFirstName();
      }
      // Full name
      return self.getFullName();
    };
  };
}

app.service("Account", Account);
