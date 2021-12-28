/*
 * Copyright 2010-2017 Restlet S.A.S. All rights reserved.
 * Restlet is registered trademark of Restlet S.A.S.
 */

import merge from 'lodash/merge';

/* eslint-disable */

const loadPendo = (PENDO_API_KEY) => {

  (function (p, e, n, d, o) {
    var v,
      w,
      x,
      y,
      z;
    o = p[ d ] = p[ d ] || {};
    o._q = [];

    v = [ 'initialize', 'identify', 'updateOptions', 'pageLoad' ];
    for (w = 0, x = v.length; w < x; ++w) {
      (function (m) {
        o[ m ] = o[ m ] || function () {
          o._q[ m === v[ 0 ] ? 'unshift' : 'push' ]([ m ].concat([].slice.call(arguments, 0)));
        };
      })(v[ w ]);
    }

    y = e.createElement(n);
    y.async = !0;
    y.src = `https://cdn.pendo.io/agent/static/${PENDO_API_KEY}/pendo.js`;

    z = e.getElementsByTagName(n)[ 0 ];
    z.parentNode.insertBefore(y, z);
  })(window, document, 'script', 'pendo');

};

function getPendoData (talendPortalUrl, accessToken) {
  return fetch(talendPortalUrl, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(response =>
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      response.json());
}

function getClientPendoDataOverwrite (PENDO_API_KEY) {
  return {
    apiKey: PENDO_API_KEY,
    visitor: {
      browserResolution: `${window.screen.width}x${window.screen.height}`,
    },
  };
}

/* eslint-enable */

const initPendo = (accessToken, PENDO_API_KEY, talendPortalUrl) => {

  if (!accessToken || !window.pendo) {
    return Promise.resolve();
  }


  return getPendoData(talendPortalUrl, accessToken)
    .then((data) => {
      const pendoDataStructure = { // default structure to send to Pendo in case back-end data is malformed
        visitor: {},
        account: {},
      };
      const clientPendoDataOverwrite = getClientPendoDataOverwrite(PENDO_API_KEY);
      const pendoData = merge(
        pendoDataStructure,
        data,
        clientPendoDataOverwrite,
      );

      return window.pendo.initialize(pendoData);
    });
};

window.APP.pendoService = {
  loadPendo,
  initPendo,
};
