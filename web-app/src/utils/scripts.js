exports.decodeEntities = (encodedString) => {
  var translate_re = /&(nbsp|amp|quot|lt|gt|lsquo|rsquo|Eacute|eacute|deg);/g;
  var translate = {
    nbsp: " ",
    amp: "&",
    quot: '"',
    lt: "<",
    gt: ">",
    lsquo: "‘",
    rsquo: "’",
    Eacute: "É",
    eacute: "é",
    deg: "°",
  };
  return encodedString
    .replace(translate_re, function (match, entity) {
      return translate[entity];
    })
    .replace(/&#(\d+);/gi, function (match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
};
