/**
 * This class stores site roles, values of these roles blongs to backend.
 *
 * @class UserSiteRole
 */
export default class UserSiteRole {

  /**
   * Define and store user site roles.
   */
  constructor() {
    /**
     * The owner role
     * @name UserSiteRole#OWNER
     * @type {number}
     */
    this.OWNER = 0;

    /**
     * The administrator role
     * @name UserSiteRole#ADMINISTRATOR
     * @type {number}
     */
    this.ADMINISTRATOR = 1;

    /**
     * The editor role
     * @name UserSiteRole#EDITOR
     * @type {number}
     */
    this.EDITOR = 2;
  }

  /**
   * Check role permission
   *
   * @param {object} site
   * @return {boolean}
   */
  restrict(site) {
    if (site.role === this.EDITOR) {
      return true;
    }

    return false;
  }
}
