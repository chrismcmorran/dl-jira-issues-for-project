exports.download = function(serverAddress, sessionCookie, projectName, localPath) {
  var request = require('request');
  var fs = require('fs');
  request({url: serverAddress + "/rest/api/2/search?jql=project=" + projectName + "&maxResults=0", headers: {Cookie: sessionCookie}}, (error, response, body)=> {
    // First, get the total number of issues in the project.
    var total = body.total;
    if (total !== 0) {
      for (var i = 1; i < total +1; i++) {
        request({url: serverAddress + "/rest/api/2/issue/" + projectName + "-" + i, headers: {Cookie: sessionCookie}}, (err, resp, bdy) => {
          fs.writeFile(localPath + "/" + projectName + i + ".json", bdy);
        });
      }
    }
  });
};
