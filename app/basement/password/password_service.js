"use strict";

function Password() {
  return function() {

    /**
     * @private
     */
    var self = this;

    /**
     * @type {number}
     * @private
     * @type {number}
     */
    var minLength = 6;

    /**
     * @type {object}
     * @private
     * @type {object}
     */
    var strengthWords = [
      null, "Short", "Weak", "Good", "Strong", "Excellent"
    ];

    /**
     * @type {object}
     * @private
     * @type {object}
     */
    var strengthColors = [
      "danger", "danger", "warning", null, "info", "success"
    ];

    /**
     * @type {string}
     */
    this.password = "";

    /**
     * @type {number} 
     */
    this.strength = 0;

    /**
     * @desc Update strength based on password
     */
    this.updateStrength = function() {

      var strongness = 0;

      // Check password
      if (!self.password) {
        self.password = "";
      }

      // Is it long enough
      if (self.password.length >= minLength) {
        strongness += 1;
      }

      // Contains atleast 1 number
      if (self.password.search(/\d/) !== -1) {
        strongness += 1;
      }

      // Contains atleast 1 letter
      if (self.password.search(/[a-zA-Z]/) !== -1) {
        strongness += 1;
      }

      // Contains atleast 1 uppercase letter
      if (self.password.search(/[A-Z]/) !== -1) {
        strongness += 1;
      }

      // Contains atleast 1 special character
      if (self.password.search(/[^\w\s]/gi) !== -1) {
        strongness += 1;
      }

      self.strength = strongness;
    };

    /**
     * @desc Get strength word based on strength
     *
     * @returns {string}
     */
    this.getStrength = function() {
      self.updateStrength();
      return strengthWords[self.strength];
    };

    /**
     * @desc Get strength percentage
     *
     * @returns {number}
     */
    this.getPercentage = function() {
      self.updateStrength();
      return (self.strength / (strengthWords.length - 1)) * 100;
    };

    /**
     * @desc Get strength color
     *
     * @returns {string}
     */
    this.getColor = function() {
      return strengthColors[self.strength];
    };

    /**
     * @desc Validity of password
     *
     * @returns {boolean}
     */
    this.isValid = function() {
      if (!self.password) {
        return false;
      }
      return self.password.length >= minLength;
    };
  };
}

app.service("Password", Password);

module.exports = Password;
