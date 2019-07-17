#!/usr/bin/env node

var fs = require("fs");
var path = require("path");
var rootDest = 'platforms/android/app/src/main/res';

var filestocopy = [
  {
    "resources/android/icon/drawable-hdpi-icon.png":
      "platforms/android/app/src/main/res/drawable-hdpi/ic_stat_onesignal_default.png"
  },
  {
    "resources/android/icon/drawable-mdpi-icon.png":
      "platforms/android/app/src/main/res/drawable-mdpi/ic_stat_onesignal_default.png"
  },
  {
    "resources/android/icon/drawable-xhdpi-icon.png":
      "platforms/android/app/src/main/res/drawable-xhdpi/ic_stat_onesignal_default.png"
  },
  {
    "resources/android/icon/drawable-xxhdpi-icon.png":
      "platforms/android/app/src/main/res/drawable-xxhdpi/ic_stat_onesignal_default.png"
  },
  {
    "resources/android/icon/drawable-xxxhdpi-icon.png":
      "platforms/android/app/src/main/res/drawable-xxxhdpi/ic_stat_onesignal_default.png"
  }
];

function createFolder(pathAbsolute) {
  if (!fs.existsSync(pathAbsolute)) {
    fs.mkdirSync(pathAbsolute);
  }

  console.log("Folder ready ", pathAbsolute);
}

module.exports = function(context) {
  // no need to configure below
  var rootdir = context.opts.projectRoot;

  createFolder(path.join(rootdir, rootDest, "drawable-hdpi"));
  createFolder(path.join(rootdir, rootDest, "drawable-mdpi"));
  createFolder(path.join(rootdir, rootDest, "drawable-xhdpi"));
  createFolder(path.join(rootdir, rootDest, "drawable-xxhdpi"));
  createFolder(path.join(rootdir, rootDest, "drawable-xxxhdpi"));

  filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
      var val = obj[key];
      var srcfile = path.join(rootdir, key);
      var destfile = path.join(rootdir, val);
      console.log("copying " + srcfile + " to " + destfile);
      var destdir = path.dirname(destfile);
      if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
        fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
      }
    });
  });
  console.log("Icones de notificação gerados com sucesso !");
};
