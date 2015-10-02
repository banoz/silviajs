export default {
  roundPrec: function (value, precision) {
    var pow = Math.pow(10, precision);

    return Math.round(value * pow) / pow;
  }
};
