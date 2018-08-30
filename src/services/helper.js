/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| methodsHelper
|--------------------------------------------------------------------------
|
*/
let methodsHelper = {
  // Number
  isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  // decimal
  toDecimal (n) {
    if (n === undefined || n === null) return '';
    return parseFloat(Math.round(n * 100) / 100).toFixed(2);
  },
  toCurrency (number) {
    /*
     * @param integer n: length of decimal
     * @param integer x: length of whole part
     * @param mixed   s: sections delimiter
     * @param mixed   c: decimal delimiter
     */
    const n = 2
    const x = 3
    const s = '.'
    const c = ','
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')'
    var num = number.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  },
  // Parse ID
  getID (ID) {
    // Is number
    if (this.isNumber(ID)) {
      return parseInt(ID)
    } else {
      return ID
    }
  },
  // Search
  pregQuote ( str ) {
    // eslint-disable-next-line
    return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
  },
  search ( haystack, needle ) {
    return haystack.toString().replace(
      new RegExp('(' + this.pregQuote(needle) + ')', 'ig'),
      '<span class="highlight">$1</span>'
    )
  },
  print () {
    window.print()
  }
}

/*
|--------------------------------------------------------------------------
| $helper
|--------------------------------------------------------------------------
|
*/
let helper = new Vue({
  methods: methodsHelper
})

export default {
  install: function(Vue) {
    Vue.prototype.$helper = helper
  },
  $: methodsHelper
}
