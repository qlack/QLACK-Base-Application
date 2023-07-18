import * as _ from "lodash-es";
import {AppConstants} from "../../app.constants";

export class BaseComponent {

  constructor() {}

  // Expose constants and settings to all components extending this class.
  constants = AppConstants;

  /**
   * Checks if the current user is logged in or not.
   * @returns {boolean}
   */
  isLoggedIn(): boolean {
    return localStorage.getItem(AppConstants.JWT_STORAGE_NAME) != null &&
      localStorage.getItem(AppConstants.JWT_STORAGE_NAME) !== undefined;
  }
}
