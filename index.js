// Generated by LiveScript 1.2.0
(function(){
  var toString$ = {}.toString, slice$ = [].slice;
  module.exports = signature;
  function signature(sig, options){
    options == null && (options = {});
    options.failure || (options.failure = function(req, res, next){
      return next({
        status: 400
      });
    });
    return function(req, res, next){
      if (validate(sig, req)) {
        return next();
      } else {
        return options.failure(req, res, next);
      }
    };
  }
  function validate(cond, o, key){
    var val, $key, i$, len$, $cond;
    val = key ? o[key] : o;
    switch (toString$.call(cond).slice(8, -1)) {
    case 'Object':
      for ($key in cond) {
        if (!validate(cond[$key], val, $key)) {
          return false;
        }
      }
      break;
    case 'Array':
      for (i$ = 0, len$ = cond.length; i$ < len$; ++i$) {
        $cond = cond[i$];
        if (!validate($cond, o, key)) {
          return false;
        }
      }
      break;
    case 'RegExp':
      if (!(val && val.match(cond))) {
        return false;
      }
      break;
    case 'Function':
      if (!cond(val, o, key)) {
        return false;
      }
      break;
    case 'String':
      /* built-in types */
      switch (cond) {
      case 'double':
      case 'float':
        if (!val) {
          return false;
        }
        o[key] = parseFloat(val);
        break;
      case 'int':
      case 'integer':
        if (!val) {
          return false;
        }
        o[key] = parseInt(val);
        break;
      case 'bool':
      case 'boolean':
        o[key] = (val && val !== 'false') || false;
        break;
      case 'object':
        if ('Object' !== toString$.call(val).slice(8, -1)) {
          return false;
        }
        break;
      case 'array':
        if (!Array.isArray(val)) {
          return false;
        }
        break;
      case 'string':
        if (!val) {
          return false;
        }
        o[key] = o[key].toString();
      }
    }
    return true;
  }
  signature.validate = validate;
  /* other built-ins */
  signature.email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  signature['enum'] = function(){
    var arr;
    arr = Array.isArray(arguments[0])
      ? arguments[0]
      : Array.prototype.slice.call(arguments);
    return partialize$.apply(this, [contains, [arr, void 8], [1]]);
  };
  /* utility functions */
  function contains(arr, val){
    return -1 !== arr.indexOf(val);
  }
  function partialize$(f, args, where){
    var context = this;
    return function(){
      var params = slice$.call(arguments), i,
          len = params.length, wlen = where.length,
          ta = args ? args.concat() : [], tw = where ? where.concat() : [];
      for(i = 0; i < len; ++i) { ta[tw[0]] = params[i]; tw.shift(); }
      return len < wlen && len ?
        partialize$.apply(context, [f, ta, tw]) : f.apply(context, ta);
    };
  }
}).call(this);
