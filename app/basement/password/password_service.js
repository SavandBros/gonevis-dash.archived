"use strict";

/**
 * @class Password
 */
function Password() {
  return function () {
    /**
     * @name minLength
     * @type {number}
     *
     * @private
     */
    var minLength = 6;

    /**
     * @name strengthWords
     * @type {object}
     *
     * @private
     */
    var strengthWords = [
      null, "Short", "Weak", "Good", "Strong", "Excellent"
    ];

    /**
     * @name strengthColors
     * @type {object}
     *
     * @private
     */
    var strengthColors = [
      "danger", "danger", "warning", null, "info", "success"
    ];

    /**
     * @name password
     * @type {string}
     */
    this.password = "";

    /**
     * @name strength
     * @type {number} 
     */
    this.strength = 0;

    /**
     * @method updateStrength
     * @desc Update strength based on password
     */
    this.updateStrength = function () {

      var strongness = 0;

      // Check password
      if (!this.password) {
        this.password = "";
      }

      // Is it long enough
      if (this.password.length >= 8) {
        strongness += 1;
      }

      // Contains atleast 1 number
      if (this.password.search(/\d/) !== -1) {
        strongness += 1;
      }

      // Contains atleast 1 letter
      if (this.password.search(/[a-zA-Z]/) !== -1) {
        strongness += 1;
      }

      // Contains atleast 1 uppercase letter
      if (this.password.search(/[A-Z]/) !== -1) {
        strongness += 1;
      }

      // Contains atleast 1 special character
      if (this.password.search(/[^\w\s]/gi) !== -1) {
        strongness += 1;
      }

      this.strength = strongness;
    };

    /**
     * @method getStrength
     * @desc Get strength word based on strength
     *
     * @returns {string}
     */
    this.getStrength = function () {
      this.updateStrength();
      return strengthWords[this.strength];
    };

    /**
     * @method getPercentage
     * @desc Get strength percentage
     *
     * @returns {number}
     */
    this.getPercentage = function () {
      return (this.strength / (strengthWords.length - 1)) * 100;
    };

    /**
     * @method getColor
     * @desc Get strength color
     *
     * @returns {string}
     */
    this.getColor = function () {
      return strengthColors[this.strength];
    };

    /**
     * @method isValid
     * @desc Validity of password
     *
     * @returns {Boolean}
     */
    this.isValid = function () {
      return this.password.length >= minLength;
    };
  };
}

app.service("Password", Password);
