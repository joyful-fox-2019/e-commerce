function toName(url) {
    let temp = url.split("/");
    let filename = temp[temp.length - 1];
    return filename;
  }
  module.exports = toName;