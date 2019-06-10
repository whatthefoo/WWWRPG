const getBaseUrl = url => {
  var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  return matches && matches[1]; // domain will be null if no match is found
};

module.exports = getBaseUrl;
