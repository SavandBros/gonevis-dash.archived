export default class UserSiteRole {
  constructor() {
    this.OWNER = 0;
    this.ADMINISTRATOR = 1;
    this.EDITOR = 2;
  }

  restrict(site) {
    if (site.role === this.EDITOR) {
      return true;
    }

    return false;
  }
}
