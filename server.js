var http = require('http');
var path = require('path');
var express = require('express');
var moment = require('moment');

var router = express();
router.use(express.static('public'));
var server = http.createServer(router);

router.get("/:time", function(req, res) {
  var inputTime = req.params.time;
  if (parseInt(inputTime)) {
    var mTime = moment(parseInt(inputTime), "X");
    res.json({ "unix": inputTime, "natural": mTime.format("MMMM DD, YYYY") });
  } else if (moment(inputTime, "MMMM DD, YYYY").isValid()) {
    var mTime = moment(inputTime, "MMMM DD, YYYY");
    res.json({ "unix": mTime.format('X'), "natural": inputTime });
  } else {
    res.json({ "unix": null, "natural": null });
  }
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
