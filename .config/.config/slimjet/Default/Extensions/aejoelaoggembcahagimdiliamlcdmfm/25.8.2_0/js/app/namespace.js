/*
 * Copyright 2010-2017 Restlet S.A.S. All rights reserved.
 * Restlet is registered trademark of Restlet S.A.S.
 */

import _ from 'lodash';
import saveAs from 'file-saver';

const registerBigNumberNotifier = (showWarningMessage) => {
  const bigIntWarning = (key, value) => {
    if (typeof value === 'number' && Math.abs(value) >= Number.MAX_SAFE_INTEGER) { showWarningMessage(); }
    return value;
  };

  const jsonParse = JSON.parse;
  JSON.parse = input => jsonParse(input, bigIntWarning);
};

window.APP = {
  // The object commons is added on window by commons.bundle.js for
  // usage in both the extension and the maven plugin.
  commons: window.commons,
  _,
  saveAs,

  // Called from JSNI to allow using the NotificationService to display
  // a warning when a BigNumber is found at deserialization.
  registerBigNumberNotifier,
};
