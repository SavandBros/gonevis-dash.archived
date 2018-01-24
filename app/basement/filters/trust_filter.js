"use strict";

function TrustFilter() {
  return function($sce) {
    return $sce.trustAsHtml;
  };
}

app.filter("trust", TrustFilter);
