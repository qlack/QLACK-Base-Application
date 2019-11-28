import * as _ from 'lodash';
import {AppConstants} from '../../app.constants';
import {AppSettings} from '../../app.settings';

export class BaseComponent {

  constructor() {
  }

  // Expose constants and settings to all components extending this class.
  constants = AppConstants;
  settings = AppSettings;

  /**
   * Checks if the current user is logged in or not.
   * @returns {boolean}
   */
  isLoggedIn(): boolean {
    return localStorage.getItem(AppConstants.JWT_STORAGE_NAME) != null &&
      localStorage.getItem(AppConstants.JWT_STORAGE_NAME) !== undefined;
  }

  /**
   * Utility method to lookup within an object by the value of its keys and return the key name.
   * This is particularly useful when looking up constants.
   * @param obj The object to search on.
   * @param val The value to search for.
   */
  lookupByValue(obj: any, val: any): any {
    return _.startCase((_.invert(obj))[val].replace('_', ' ').toLowerCase());
  }

  /**
   * A helper to compare two values by their text representation. Useful in <mat-select> via
   * compareWith.
   * @param o1 The first value to compare.
   * @param o2 The second value to compare.
   */
  compareByStringValue(o1, o2): boolean {
    return String(o1) == String(o2);
  }

  isArrayEmpty(array: any[]): boolean {
    return array === undefined || array.length == 0
  }
}
