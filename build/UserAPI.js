/**
 * URL encode
 */
function urlencode(e){e=(e+"").toString();return encodeURIComponent(e).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")};

/**
 * HTTP build query
 */
function http_build_query(e,t,n){var r,i,s=[],o=this;var u=function(e,t,n){var r,i=[];if(t===true){t="1"}else if(t===false){t="0"}if(t!=null){if(typeof t==="object"){for(r in t){if(t[r]!=null){i.push(u(e+"["+r+"]",t[r],n))}}return i.join(n)}else if(typeof t!=="function"){return o.urlencode(e)+"="+o.urlencode(t)}else{throw new Error("There was an error processing for http_build_query().")}}else{return""}};if(!n){n="&"}for(i in e){r=e[i];if(t&&!isNaN(i)){i=String(t)+i}var a=u(i,r,n);if(a!==""){s.push(a)}}return s.join(n)};
 /**
 * CryptoJS v3.1.2
 * code.google.com/p/crypto-js
 * (c) 2009-2013 by Jeff Mott. All rights reserved.
 * code.google.com/p/crypto-js/wiki/License
 */
var CryptoJS=CryptoJS||function(a,j){var c={},b=c.lib={},f=function(){},l=b.Base={extend:function(a){f.prototype=this;var d=new f;a&&d.mixIn(a);d.hasOwnProperty("init")||(d.init=function(){d.$super.init.apply(this,arguments)});d.init.prototype=d;d.$super=this;return d},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var d in a)a.hasOwnProperty(d)&&(this[d]=a[d]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
u=b.WordArray=l.extend({init:function(a,d){a=this.words=a||[];this.sigBytes=d!=j?d:4*a.length},toString:function(a){return(a||m).stringify(this)},concat:function(a){var d=this.words,M=a.words,e=this.sigBytes;a=a.sigBytes;this.clamp();if(e%4)for(var b=0;b<a;b++)d[e+b>>>2]|=(M[b>>>2]>>>24-8*(b%4)&255)<<24-8*((e+b)%4);else if(65535<M.length)for(b=0;b<a;b+=4)d[e+b>>>2]=M[b>>>2];else d.push.apply(d,M);this.sigBytes+=a;return this},clamp:function(){var D=this.words,d=this.sigBytes;D[d>>>2]&=4294967295<<
32-8*(d%4);D.length=a.ceil(d/4)},clone:function(){var a=l.clone.call(this);a.words=this.words.slice(0);return a},random:function(D){for(var d=[],b=0;b<D;b+=4)d.push(4294967296*a.random()|0);return new u.init(d,D)}}),k=c.enc={},m=k.Hex={stringify:function(a){var d=a.words;a=a.sigBytes;for(var b=[],e=0;e<a;e++){var c=d[e>>>2]>>>24-8*(e%4)&255;b.push((c>>>4).toString(16));b.push((c&15).toString(16))}return b.join("")},parse:function(a){for(var d=a.length,b=[],e=0;e<d;e+=2)b[e>>>3]|=parseInt(a.substr(e,
2),16)<<24-4*(e%8);return new u.init(b,d/2)}},y=k.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],e=0;e<a;e++)c.push(String.fromCharCode(b[e>>>2]>>>24-8*(e%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],e=0;e<b;e++)c[e>>>2]|=(a.charCodeAt(e)&255)<<24-8*(e%4);return new u.init(c,b)}},z=k.Utf8={stringify:function(a){try{return decodeURIComponent(escape(y.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return y.parse(unescape(encodeURIComponent(a)))}},
x=b.BufferedBlockAlgorithm=l.extend({reset:function(){this._data=new u.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=z.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(b){var d=this._data,c=d.words,e=d.sigBytes,l=this.blockSize,k=e/(4*l),k=b?a.ceil(k):a.max((k|0)-this._minBufferSize,0);b=k*l;e=a.min(4*b,e);if(b){for(var x=0;x<b;x+=l)this._doProcessBlock(c,x);x=c.splice(0,b);d.sigBytes-=e}return new u.init(x,e)},clone:function(){var a=l.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});b.Hasher=x.extend({cfg:l.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){x.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,c){return(new a.init(c)).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return(new ja.HMAC.init(a,
c)).finalize(b)}}});var ja=c.algo={};return c}(Math);
(function(a){var j=CryptoJS,c=j.lib,b=c.Base,f=c.WordArray,j=j.x64={};j.Word=b.extend({init:function(a,b){this.high=a;this.low=b}});j.WordArray=b.extend({init:function(b,c){b=this.words=b||[];this.sigBytes=c!=a?c:8*b.length},toX32:function(){for(var a=this.words,b=a.length,c=[],m=0;m<b;m++){var y=a[m];c.push(y.high);c.push(y.low)}return f.create(c,this.sigBytes)},clone:function(){for(var a=b.clone.call(this),c=a.words=this.words.slice(0),k=c.length,f=0;f<k;f++)c[f]=c[f].clone();return a}})})();
(function(){function a(){return f.create.apply(f,arguments)}for(var j=CryptoJS,c=j.lib.Hasher,b=j.x64,f=b.Word,l=b.WordArray,b=j.algo,u=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),
a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,
2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),
a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,
3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],k=[],m=0;80>m;m++)k[m]=a();b=b.SHA512=c.extend({_doReset:function(){this._hash=new l.init([new f.init(1779033703,4089235720),new f.init(3144134277,2227873595),new f.init(1013904242,4271175723),new f.init(2773480762,1595750129),new f.init(1359893119,2917565137),new f.init(2600822924,725511199),new f.init(528734635,4215389547),new f.init(1541459225,327033209)])},_doProcessBlock:function(a,b){for(var c=this._hash.words,
f=c[0],j=c[1],d=c[2],l=c[3],e=c[4],m=c[5],N=c[6],c=c[7],aa=f.high,O=f.low,ba=j.high,P=j.low,ca=d.high,Q=d.low,da=l.high,R=l.low,ea=e.high,S=e.low,fa=m.high,T=m.low,ga=N.high,U=N.low,ha=c.high,V=c.low,r=aa,n=O,G=ba,E=P,H=ca,F=Q,Y=da,I=R,s=ea,p=S,W=fa,J=T,X=ga,K=U,Z=ha,L=V,t=0;80>t;t++){var A=k[t];if(16>t)var q=A.high=a[b+2*t]|0,g=A.low=a[b+2*t+1]|0;else{var q=k[t-15],g=q.high,v=q.low,q=(g>>>1|v<<31)^(g>>>8|v<<24)^g>>>7,v=(v>>>1|g<<31)^(v>>>8|g<<24)^(v>>>7|g<<25),C=k[t-2],g=C.high,h=C.low,C=(g>>>19|
h<<13)^(g<<3|h>>>29)^g>>>6,h=(h>>>19|g<<13)^(h<<3|g>>>29)^(h>>>6|g<<26),g=k[t-7],$=g.high,B=k[t-16],w=B.high,B=B.low,g=v+g.low,q=q+$+(g>>>0<v>>>0?1:0),g=g+h,q=q+C+(g>>>0<h>>>0?1:0),g=g+B,q=q+w+(g>>>0<B>>>0?1:0);A.high=q;A.low=g}var $=s&W^~s&X,B=p&J^~p&K,A=r&G^r&H^G&H,ka=n&E^n&F^E&F,v=(r>>>28|n<<4)^(r<<30|n>>>2)^(r<<25|n>>>7),C=(n>>>28|r<<4)^(n<<30|r>>>2)^(n<<25|r>>>7),h=u[t],la=h.high,ia=h.low,h=L+((p>>>14|s<<18)^(p>>>18|s<<14)^(p<<23|s>>>9)),w=Z+((s>>>14|p<<18)^(s>>>18|p<<14)^(s<<23|p>>>9))+(h>>>
0<L>>>0?1:0),h=h+B,w=w+$+(h>>>0<B>>>0?1:0),h=h+ia,w=w+la+(h>>>0<ia>>>0?1:0),h=h+g,w=w+q+(h>>>0<g>>>0?1:0),g=C+ka,A=v+A+(g>>>0<C>>>0?1:0),Z=X,L=K,X=W,K=J,W=s,J=p,p=I+h|0,s=Y+w+(p>>>0<I>>>0?1:0)|0,Y=H,I=F,H=G,F=E,G=r,E=n,n=h+g|0,r=w+A+(n>>>0<h>>>0?1:0)|0}O=f.low=O+n;f.high=aa+r+(O>>>0<n>>>0?1:0);P=j.low=P+E;j.high=ba+G+(P>>>0<E>>>0?1:0);Q=d.low=Q+F;d.high=ca+H+(Q>>>0<F>>>0?1:0);R=l.low=R+I;l.high=da+Y+(R>>>0<I>>>0?1:0);S=e.low=S+p;e.high=ea+s+(S>>>0<p>>>0?1:0);T=m.low=T+J;m.high=fa+W+(T>>>0<J>>>0?1:
0);U=N.low=U+K;N.high=ga+X+(U>>>0<K>>>0?1:0);V=c.low=V+L;c.high=ha+Z+(V>>>0<L>>>0?1:0)},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,f=8*a.sigBytes;b[f>>>5]|=128<<24-f%32;b[(f+128>>>10<<5)+30]=Math.floor(c/4294967296);b[(f+128>>>10<<5)+31]=c;a.sigBytes=4*b.length;this._process();return this._hash.toX32()},clone:function(){var a=c.clone.call(this);a._hash=this._hash.clone();return a},blockSize:32});j.SHA512=c._createHelper(b);j.HmacSHA512=c._createHmacHelper(b)})();
(function(){var a=CryptoJS,j=a.enc.Utf8;a.algo.HMAC=a.lib.Base.extend({init:function(a,b){a=this._hasher=new a.init;"string"==typeof b&&(b=j.parse(b));var f=a.blockSize,l=4*f;b.sigBytes>l&&(b=a.finalize(b));b.clamp();for(var u=this._oKey=b.clone(),k=this._iKey=b.clone(),m=u.words,y=k.words,z=0;z<f;z++)m[z]^=1549556828,y[z]^=909522486;u.sigBytes=k.sigBytes=l;this.reset()},reset:function(){var a=this._hasher;a.reset();a.update(this._iKey)},update:function(a){this._hasher.update(a);return this},finalize:function(a){var b=
this._hasher;a=b.finalize(a);b.reset();return b.finalize(this._oKey.clone().concat(a))}})})();/* ----------------------------------------------------------------------
 * Copyright (c) 2012 Yves-Marie K. Rinquin
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * ----------------------------------------------------------------------
 *
 * ISAAC is a cryptographically secure pseudo-random number generator
 * (or CSPRNG for short) designed by Robert J. Jenkins Jr. in 1996 and
 * based on RC4. It is designed for speed and security.
 *
 * ISAAC's informations & analysis:
 *   http://burtleburtle.net/bob/rand/isaac.html
 * ISAAC's implementation details:
 *   http://burtleburtle.net/bob/rand/isaacafa.html
 *
 * ISAAC succesfully passed TestU01
 *
 * ----------------------------------------------------------------------
 *
 * Usage:
 *   <script src="isaac.js"></script>
 *   var random_number = isaac.random();
 *
 * Output: [ 0x00000000; 0xffffffff]
 *         [-2147483648; 2147483647]
 *
 */


/* js string (ucs-2/utf16) to a 32-bit integer (utf-8 chars, little-endian) array */
String.prototype.toIntArray = function() {
  var w1, w2, u, r4 = [], r = [], i = 0;
  var s = this + '\0\0\0'; // pad string to avoid discarding last chars
  var l = s.length - 1;

  while(i < l) {
    w1 = s.charCodeAt(i++);
    w2 = s.charCodeAt(i+1);
    if       (w1 < 0x0080) {
      // 0x0000 - 0x007f code point: basic ascii
      r4.push(w1);
    } else if(w1 < 0x0800) {
      // 0x0080 - 0x07ff code point
      r4.push(((w1 >>>  6) & 0x1f) | 0xc0);
      r4.push(((w1 >>>  0) & 0x3f) | 0x80);
    } else if((w1 & 0xf800) != 0xd800) {
      // 0x0800 - 0xd7ff / 0xe000 - 0xffff code point
      r4.push(((w1 >>> 12) & 0x0f) | 0xe0);
      r4.push(((w1 >>>  6) & 0x3f) | 0x80);
      r4.push(((w1 >>>  0) & 0x3f) | 0x80);
    } else if(((w1 & 0xfc00) == 0xd800)
           && ((w2 & 0xfc00) == 0xdc00)) {
      // 0xd800 - 0xdfff surrogate / 0x10ffff - 0x10000 code point
      u = ((w2 & 0x3f) | ((w1 & 0x3f) << 10)) + 0x10000;
      r4.push(((u >>> 18) & 0x07) | 0xf0);
      r4.push(((u >>> 12) & 0x3f) | 0x80);
      r4.push(((u >>>  6) & 0x3f) | 0x80);
      r4.push(((u >>>  0) & 0x3f) | 0x80);
      i++;
    } else {
      // invalid char
    }
    /* add integer (four utf-8 value) to array */
    if(r4.length > 3) {
      // little endian
      r.push((r4.shift() <<  0) | (r4.shift() <<  8) |
             (r4.shift() << 16) | (r4.shift() << 24));
    }
  }

  return r;
}

/* isaac module pattern */
var isaac = (function(){

  /* private: internal states */
  var m = Array(256), // internal memory
      acc = 0,        // accumulator
      brs = 0,        // last result
      cnt = 0,        // counter
      r = Array(256), // result array
      gnt = 0;        // generation counter

  seed(Math.random() * 0xffffffff);

  /* private: 32-bit integer safe adder */
  function add(x, y) {
    var lsb = (x & 0xffff) + (y & 0xffff);
    var msb = (x >>>   16) + (y >>>   16) + (lsb >>> 16);
    return (msb << 16) | (lsb & 0xffff);
  }

  /* public: initialisation */
  function reset() {
    acc = brs = cnt = 0;
    for(var i = 0; i < 256; ++i)
      m[i] = r[i] = 0;
    gnt = 0;
  }

  /* public: seeding function */
  function seed(s) {
    var a, b, c, d, e, f, g, h, i;

    /* seeding the seeds of love */
    a = b = c = d =
    e = f = g = h = 0x9e3779b9; /* the golden ratio */

    if(s && typeof(s) === 'string')
      s = s.toIntArray();

    if(s && typeof(s) === 'number') {
      s = [s];
    }

    if(s instanceof Array) {
      reset();
      for(i = 0; i < s.length; i++)
        r[i & 0xff] += (typeof(s[i]) === 'number') ? s[i] : 0;
    }

    /* private: seed mixer */
    function seed_mix() {
      a ^= b <<  11; d = add(d, a); b = add(b, c);
      b ^= c >>>  2; e = add(e, b); c = add(c, d);
      c ^= d <<   8; f = add(f, c); d = add(d, e);
      d ^= e >>> 16; g = add(g, d); e = add(e, f);
      e ^= f <<  10; h = add(h, e); f = add(f, g);
      f ^= g >>>  4; a = add(a, f); g = add(g, h);
      g ^= h <<   8; b = add(b, g); h = add(h, a);
      h ^= a >>>  9; c = add(c, h); a = add(a, b);
    }

    for(i = 0; i < 4; i++) /* scramble it */
      seed_mix();

    for(i = 0; i < 256; i += 8) {
      if(s) { /* use all the information in the seed */
        a = add(a, r[i + 0]); b = add(b, r[i + 1]);
        c = add(c, r[i + 2]); d = add(d, r[i + 3]);
        e = add(e, r[i + 4]); f = add(f, r[i + 5]);
        g = add(g, r[i + 6]); h = add(h, r[i + 7]);
      }
      seed_mix();
      /* fill in m[] with messy stuff */
      m[i + 0] = a; m[i + 1] = b; m[i + 2] = c; m[i + 3] = d;
      m[i + 4] = e; m[i + 5] = f; m[i + 6] = g; m[i + 7] = h;
    }
    if(s) {
      /* do a second pass to make all of the seed affect all of m[] */
      for(i = 0; i < 256; i += 8) {
        a = add(a, m[i + 0]); b = add(b, m[i + 1]);
        c = add(c, m[i + 2]); d = add(d, m[i + 3]);
        e = add(e, m[i + 4]); f = add(f, m[i + 5]);
        g = add(g, m[i + 6]); h = add(h, m[i + 7]);
        seed_mix();
        /* fill in m[] with messy stuff (again) */
        m[i + 0] = a; m[i + 1] = b; m[i + 2] = c; m[i + 3] = d;
        m[i + 4] = e; m[i + 5] = f; m[i + 6] = g; m[i + 7] = h;
      }
    }

    prng(); /* fill in the first set of results */
    gnt = 256;  /* prepare to use the first set of results */;
  }

  /* public: isaac generator, n = number of run */
  function prng(n){
    var i, x, y;

    n = (n && typeof(n) === 'number')
      ? Math.abs(Math.floor(n)) : 1;

    while(n--) {
      cnt = add(cnt,   1);
      brs = add(brs, cnt);

      for(i = 0; i < 256; i++) {
        switch(i & 3) {
          case 0: acc ^= acc <<  13; break;
          case 1: acc ^= acc >>>  6; break;
          case 2: acc ^= acc <<   2; break;
          case 3: acc ^= acc >>> 16; break;
        }
        acc        = add(m[(i +  128) & 0xff], acc); x = m[i];
        m[i] =   y = add(m[(x >>>  2) & 0xff], add(acc, brs));
        r[i] = brs = add(m[(y >>> 10) & 0xff], x);
      }
    }
  }

  /* public: return a random number between */
  function rand() {
    if(!gnt--) {
      prng(); gnt = 255;
    }
    return r[gnt];
  }

  /* public: return internals in an object*/
  function internals(){
    return {a: acc, b: brs, c: cnt, m: m, r: r};
  }

  /* return class object */
  return {
    'reset': reset,
    'seed':  seed,
    'prng':  prng,
    'rand':  rand,
    'internals': internals
  };
})(); /* declare and execute */

/* public: output*/
isaac.random = function() {
  return 0.5 + this.rand() * 2.3283064365386963e-10; // 2^-32
}
function bCrypt() {
	this.GENSALT_DEFAULT_LOG2_ROUNDS = 10;
	this.BCRYPT_SALT_LEN = 16;
	this.BLOWFISH_NUM_ROUNDS = 16;
	this.MAX_EXECUTION_TIME = 100;
	this.P_orig = [0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344, 0xa4093822,
			0x299f31d0, 0x082efa98, 0xec4e6c89, 0x452821e6, 0x38d01377,
			0xbe5466cf, 0x34e90c6c, 0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5,
			0xb5470917, 0x9216d5d9, 0x8979fb1b];
	this.S_orig = [0xd1310ba6, 0x98dfb5ac, 0x2ffd72db, 0xd01adfb7, 0xb8e1afed,
			0x6a267e96, 0xba7c9045, 0xf12c7f99, 0x24a19947, 0xb3916cf7,
			0x0801f2e2, 0x858efc16, 0x636920d8, 0x71574e69, 0xa458fea3,
			0xf4933d7e, 0x0d95748f, 0x728eb658, 0x718bcd58, 0x82154aee,
			0x7b54a41d, 0xc25a59b5, 0x9c30d539, 0x2af26013, 0xc5d1b023,
			0x286085f0, 0xca417918, 0xb8db38ef, 0x8e79dcb0, 0x603a180e,
			0x6c9e0e8b, 0xb01e8a3e, 0xd71577c1, 0xbd314b27, 0x78af2fda,
			0x55605c60, 0xe65525f3, 0xaa55ab94, 0x57489862, 0x63e81440,
			0x55ca396a, 0x2aab10b6, 0xb4cc5c34, 0x1141e8ce, 0xa15486af,
			0x7c72e993, 0xb3ee1411, 0x636fbc2a, 0x2ba9c55d, 0x741831f6,
			0xce5c3e16, 0x9b87931e, 0xafd6ba33, 0x6c24cf5c, 0x7a325381,
			0x28958677, 0x3b8f4898, 0x6b4bb9af, 0xc4bfe81b, 0x66282193,
			0x61d809cc, 0xfb21a991, 0x487cac60, 0x5dec8032, 0xef845d5d,
			0xe98575b1, 0xdc262302, 0xeb651b88, 0x23893e81, 0xd396acc5,
			0x0f6d6ff3, 0x83f44239, 0x2e0b4482, 0xa4842004, 0x69c8f04a,
			0x9e1f9b5e, 0x21c66842, 0xf6e96c9a, 0x670c9c61, 0xabd388f0,
			0x6a51a0d2, 0xd8542f68, 0x960fa728, 0xab5133a3, 0x6eef0b6c,
			0x137a3be4, 0xba3bf050, 0x7efb2a98, 0xa1f1651d, 0x39af0176,
			0x66ca593e, 0x82430e88, 0x8cee8619, 0x456f9fb4, 0x7d84a5c3,
			0x3b8b5ebe, 0xe06f75d8, 0x85c12073, 0x401a449f, 0x56c16aa6,
			0x4ed3aa62, 0x363f7706, 0x1bfedf72, 0x429b023d, 0x37d0d724,
			0xd00a1248, 0xdb0fead3, 0x49f1c09b, 0x075372c9, 0x80991b7b,
			0x25d479d8, 0xf6e8def7, 0xe3fe501a, 0xb6794c3b, 0x976ce0bd,
			0x04c006ba, 0xc1a94fb6, 0x409f60c4, 0x5e5c9ec2, 0x196a2463,
			0x68fb6faf, 0x3e6c53b5, 0x1339b2eb, 0x3b52ec6f, 0x6dfc511f,
			0x9b30952c, 0xcc814544, 0xaf5ebd09, 0xbee3d004, 0xde334afd,
			0x660f2807, 0x192e4bb3, 0xc0cba857, 0x45c8740f, 0xd20b5f39,
			0xb9d3fbdb, 0x5579c0bd, 0x1a60320a, 0xd6a100c6, 0x402c7279,
			0x679f25fe, 0xfb1fa3cc, 0x8ea5e9f8, 0xdb3222f8, 0x3c7516df,
			0xfd616b15, 0x2f501ec8, 0xad0552ab, 0x323db5fa, 0xfd238760,
			0x53317b48, 0x3e00df82, 0x9e5c57bb, 0xca6f8ca0, 0x1a87562e,
			0xdf1769db, 0xd542a8f6, 0x287effc3, 0xac6732c6, 0x8c4f5573,
			0x695b27b0, 0xbbca58c8, 0xe1ffa35d, 0xb8f011a0, 0x10fa3d98,
			0xfd2183b8, 0x4afcb56c, 0x2dd1d35b, 0x9a53e479, 0xb6f84565,
			0xd28e49bc, 0x4bfb9790, 0xe1ddf2da, 0xa4cb7e33, 0x62fb1341,
			0xcee4c6e8, 0xef20cada, 0x36774c01, 0xd07e9efe, 0x2bf11fb4,
			0x95dbda4d, 0xae909198, 0xeaad8e71, 0x6b93d5a0, 0xd08ed1d0,
			0xafc725e0, 0x8e3c5b2f, 0x8e7594b7, 0x8ff6e2fb, 0xf2122b64,
			0x8888b812, 0x900df01c, 0x4fad5ea0, 0x688fc31c, 0xd1cff191,
			0xb3a8c1ad, 0x2f2f2218, 0xbe0e1777, 0xea752dfe, 0x8b021fa1,
			0xe5a0cc0f, 0xb56f74e8, 0x18acf3d6, 0xce89e299, 0xb4a84fe0,
			0xfd13e0b7, 0x7cc43b81, 0xd2ada8d9, 0x165fa266, 0x80957705,
			0x93cc7314, 0x211a1477, 0xe6ad2065, 0x77b5fa86, 0xc75442f5,
			0xfb9d35cf, 0xebcdaf0c, 0x7b3e89a0, 0xd6411bd3, 0xae1e7e49,
			0x00250e2d, 0x2071b35e, 0x226800bb, 0x57b8e0af, 0x2464369b,
			0xf009b91e, 0x5563911d, 0x59dfa6aa, 0x78c14389, 0xd95a537f,
			0x207d5ba2, 0x02e5b9c5, 0x83260376, 0x6295cfa9, 0x11c81968,
			0x4e734a41, 0xb3472dca, 0x7b14a94a, 0x1b510052, 0x9a532915,
			0xd60f573f, 0xbc9bc6e4, 0x2b60a476, 0x81e67400, 0x08ba6fb5,
			0x571be91f, 0xf296ec6b, 0x2a0dd915, 0xb6636521, 0xe7b9f9b6,
			0xff34052e, 0xc5855664, 0x53b02d5d, 0xa99f8fa1, 0x08ba4799,
			0x6e85076a, 0x4b7a70e9, 0xb5b32944, 0xdb75092e, 0xc4192623,
			0xad6ea6b0, 0x49a7df7d, 0x9cee60b8, 0x8fedb266, 0xecaa8c71,
			0x699a17ff, 0x5664526c, 0xc2b19ee1, 0x193602a5, 0x75094c29,
			0xa0591340, 0xe4183a3e, 0x3f54989a, 0x5b429d65, 0x6b8fe4d6,
			0x99f73fd6, 0xa1d29c07, 0xefe830f5, 0x4d2d38e6, 0xf0255dc1,
			0x4cdd2086, 0x8470eb26, 0x6382e9c6, 0x021ecc5e, 0x09686b3f,
			0x3ebaefc9, 0x3c971814, 0x6b6a70a1, 0x687f3584, 0x52a0e286,
			0xb79c5305, 0xaa500737, 0x3e07841c, 0x7fdeae5c, 0x8e7d44ec,
			0x5716f2b8, 0xb03ada37, 0xf0500c0d, 0xf01c1f04, 0x0200b3ff,
			0xae0cf51a, 0x3cb574b2, 0x25837a58, 0xdc0921bd, 0xd19113f9,
			0x7ca92ff6, 0x94324773, 0x22f54701, 0x3ae5e581, 0x37c2dadc,
			0xc8b57634, 0x9af3dda7, 0xa9446146, 0x0fd0030e, 0xecc8c73e,
			0xa4751e41, 0xe238cd99, 0x3bea0e2f, 0x3280bba1, 0x183eb331,
			0x4e548b38, 0x4f6db908, 0x6f420d03, 0xf60a04bf, 0x2cb81290,
			0x24977c79, 0x5679b072, 0xbcaf89af, 0xde9a771f, 0xd9930810,
			0xb38bae12, 0xdccf3f2e, 0x5512721f, 0x2e6b7124, 0x501adde6,
			0x9f84cd87, 0x7a584718, 0x7408da17, 0xbc9f9abc, 0xe94b7d8c,
			0xec7aec3a, 0xdb851dfa, 0x63094366, 0xc464c3d2, 0xef1c1847,
			0x3215d908, 0xdd433b37, 0x24c2ba16, 0x12a14d43, 0x2a65c451,
			0x50940002, 0x133ae4dd, 0x71dff89e, 0x10314e55, 0x81ac77d6,
			0x5f11199b, 0x043556f1, 0xd7a3c76b, 0x3c11183b, 0x5924a509,
			0xf28fe6ed, 0x97f1fbfa, 0x9ebabf2c, 0x1e153c6e, 0x86e34570,
			0xeae96fb1, 0x860e5e0a, 0x5a3e2ab3, 0x771fe71c, 0x4e3d06fa,
			0x2965dcb9, 0x99e71d0f, 0x803e89d6, 0x5266c825, 0x2e4cc978,
			0x9c10b36a, 0xc6150eba, 0x94e2ea78, 0xa5fc3c53, 0x1e0a2df4,
			0xf2f74ea7, 0x361d2b3d, 0x1939260f, 0x19c27960, 0x5223a708,
			0xf71312b6, 0xebadfe6e, 0xeac31f66, 0xe3bc4595, 0xa67bc883,
			0xb17f37d1, 0x018cff28, 0xc332ddef, 0xbe6c5aa5, 0x65582185,
			0x68ab9802, 0xeecea50f, 0xdb2f953b, 0x2aef7dad, 0x5b6e2f84,
			0x1521b628, 0x29076170, 0xecdd4775, 0x619f1510, 0x13cca830,
			0xeb61bd96, 0x0334fe1e, 0xaa0363cf, 0xb5735c90, 0x4c70a239,
			0xd59e9e0b, 0xcbaade14, 0xeecc86bc, 0x60622ca7, 0x9cab5cab,
			0xb2f3846e, 0x648b1eaf, 0x19bdf0ca, 0xa02369b9, 0x655abb50,
			0x40685a32, 0x3c2ab4b3, 0x319ee9d5, 0xc021b8f7, 0x9b540b19,
			0x875fa099, 0x95f7997e, 0x623d7da8, 0xf837889a, 0x97e32d77,
			0x11ed935f, 0x16681281, 0x0e358829, 0xc7e61fd6, 0x96dedfa1,
			0x7858ba99, 0x57f584a5, 0x1b227263, 0x9b83c3ff, 0x1ac24696,
			0xcdb30aeb, 0x532e3054, 0x8fd948e4, 0x6dbc3128, 0x58ebf2ef,
			0x34c6ffea, 0xfe28ed61, 0xee7c3c73, 0x5d4a14d9, 0xe864b7e3,
			0x42105d14, 0x203e13e0, 0x45eee2b6, 0xa3aaabea, 0xdb6c4f15,
			0xfacb4fd0, 0xc742f442, 0xef6abbb5, 0x654f3b1d, 0x41cd2105,
			0xd81e799e, 0x86854dc7, 0xe44b476a, 0x3d816250, 0xcf62a1f2,
			0x5b8d2646, 0xfc8883a0, 0xc1c7b6a3, 0x7f1524c3, 0x69cb7492,
			0x47848a0b, 0x5692b285, 0x095bbf00, 0xad19489d, 0x1462b174,
			0x23820e00, 0x58428d2a, 0x0c55f5ea, 0x1dadf43e, 0x233f7061,
			0x3372f092, 0x8d937e41, 0xd65fecf1, 0x6c223bdb, 0x7cde3759,
			0xcbee7460, 0x4085f2a7, 0xce77326e, 0xa6078084, 0x19f8509e,
			0xe8efd855, 0x61d99735, 0xa969a7aa, 0xc50c06c2, 0x5a04abfc,
			0x800bcadc, 0x9e447a2e, 0xc3453484, 0xfdd56705, 0x0e1e9ec9,
			0xdb73dbd3, 0x105588cd, 0x675fda79, 0xe3674340, 0xc5c43465,
			0x713e38d8, 0x3d28f89e, 0xf16dff20, 0x153e21e7, 0x8fb03d4a,
			0xe6e39f2b, 0xdb83adf7, 0xe93d5a68, 0x948140f7, 0xf64c261c,
			0x94692934, 0x411520f7, 0x7602d4f7, 0xbcf46b2e, 0xd4a20068,
			0xd4082471, 0x3320f46a, 0x43b7d4b7, 0x500061af, 0x1e39f62e,
			0x97244546, 0x14214f74, 0xbf8b8840, 0x4d95fc1d, 0x96b591af,
			0x70f4ddd3, 0x66a02f45, 0xbfbc09ec, 0x03bd9785, 0x7fac6dd0,
			0x31cb8504, 0x96eb27b3, 0x55fd3941, 0xda2547e6, 0xabca0a9a,
			0x28507825, 0x530429f4, 0x0a2c86da, 0xe9b66dfb, 0x68dc1462,
			0xd7486900, 0x680ec0a4, 0x27a18dee, 0x4f3ffea2, 0xe887ad8c,
			0xb58ce006, 0x7af4d6b6, 0xaace1e7c, 0xd3375fec, 0xce78a399,
			0x406b2a42, 0x20fe9e35, 0xd9f385b9, 0xee39d7ab, 0x3b124e8b,
			0x1dc9faf7, 0x4b6d1856, 0x26a36631, 0xeae397b2, 0x3a6efa74,
			0xdd5b4332, 0x6841e7f7, 0xca7820fb, 0xfb0af54e, 0xd8feb397,
			0x454056ac, 0xba489527, 0x55533a3a, 0x20838d87, 0xfe6ba9b7,
			0xd096954b, 0x55a867bc, 0xa1159a58, 0xcca92963, 0x99e1db33,
			0xa62a4a56, 0x3f3125f9, 0x5ef47e1c, 0x9029317c, 0xfdf8e802,
			0x04272f70, 0x80bb155c, 0x05282ce3, 0x95c11548, 0xe4c66d22,
			0x48c1133f, 0xc70f86dc, 0x07f9c9ee, 0x41041f0f, 0x404779a4,
			0x5d886e17, 0x325f51eb, 0xd59bc0d1, 0xf2bcc18f, 0x41113564,
			0x257b7834, 0x602a9c60, 0xdff8e8a3, 0x1f636c1b, 0x0e12b4c2,
			0x02e1329e, 0xaf664fd1, 0xcad18115, 0x6b2395e0, 0x333e92e1,
			0x3b240b62, 0xeebeb922, 0x85b2a20e, 0xe6ba0d99, 0xde720c8c,
			0x2da2f728, 0xd0127845, 0x95b794fd, 0x647d0862, 0xe7ccf5f0,
			0x5449a36f, 0x877d48fa, 0xc39dfd27, 0xf33e8d1e, 0x0a476341,
			0x992eff74, 0x3a6f6eab, 0xf4f8fd37, 0xa812dc60, 0xa1ebddf8,
			0x991be14c, 0xdb6e6b0d, 0xc67b5510, 0x6d672c37, 0x2765d43b,
			0xdcd0e804, 0xf1290dc7, 0xcc00ffa3, 0xb5390f92, 0x690fed0b,
			0x667b9ffb, 0xcedb7d9c, 0xa091cf0b, 0xd9155ea3, 0xbb132f88,
			0x515bad24, 0x7b9479bf, 0x763bd6eb, 0x37392eb3, 0xcc115979,
			0x8026e297, 0xf42e312d, 0x6842ada7, 0xc66a2b3b, 0x12754ccc,
			0x782ef11c, 0x6a124237, 0xb79251e7, 0x06a1bbe6, 0x4bfb6350,
			0x1a6b1018, 0x11caedfa, 0x3d25bdd8, 0xe2e1c3c9, 0x44421659,
			0x0a121386, 0xd90cec6e, 0xd5abea2a, 0x64af674e, 0xda86a85f,
			0xbebfe988, 0x64e4c3fe, 0x9dbc8057, 0xf0f7c086, 0x60787bf8,
			0x6003604d, 0xd1fd8346, 0xf6381fb0, 0x7745ae04, 0xd736fccc,
			0x83426b33, 0xf01eab71, 0xb0804187, 0x3c005e5f, 0x77a057be,
			0xbde8ae24, 0x55464299, 0xbf582e61, 0x4e58f48f, 0xf2ddfda2,
			0xf474ef38, 0x8789bdc2, 0x5366f9c3, 0xc8b38e74, 0xb475f255,
			0x46fcd9b9, 0x7aeb2661, 0x8b1ddf84, 0x846a0e79, 0x915f95e2,
			0x466e598e, 0x20b45770, 0x8cd55591, 0xc902de4c, 0xb90bace1,
			0xbb8205d0, 0x11a86248, 0x7574a99e, 0xb77f19b6, 0xe0a9dc09,
			0x662d09a1, 0xc4324633, 0xe85a1f02, 0x09f0be8c, 0x4a99a025,
			0x1d6efe10, 0x1ab93d1d, 0x0ba5a4df, 0xa186f20f, 0x2868f169,
			0xdcb7da83, 0x573906fe, 0xa1e2ce9b, 0x4fcd7f52, 0x50115e01,
			0xa70683fa, 0xa002b5c4, 0x0de6d027, 0x9af88c27, 0x773f8641,
			0xc3604c06, 0x61a806b5, 0xf0177a28, 0xc0f586e0, 0x006058aa,
			0x30dc7d62, 0x11e69ed7, 0x2338ea63, 0x53c2dd94, 0xc2c21634,
			0xbbcbee56, 0x90bcb6de, 0xebfc7da1, 0xce591d76, 0x6f05e409,
			0x4b7c0188, 0x39720a3d, 0x7c927c24, 0x86e3725f, 0x724d9db9,
			0x1ac15bb4, 0xd39eb8fc, 0xed545578, 0x08fca5b5, 0xd83d7cd3,
			0x4dad0fc4, 0x1e50ef5e, 0xb161e6f8, 0xa28514d9, 0x6c51133c,
			0x6fd5c7e7, 0x56e14ec4, 0x362abfce, 0xddc6c837, 0xd79a3234,
			0x92638212, 0x670efa8e, 0x406000e0, 0x3a39ce37, 0xd3faf5cf,
			0xabc27737, 0x5ac52d1b, 0x5cb0679e, 0x4fa33742, 0xd3822740,
			0x99bc9bbe, 0xd5118e9d, 0xbf0f7315, 0xd62d1c7e, 0xc700c47b,
			0xb78c1b6b, 0x21a19045, 0xb26eb1be, 0x6a366eb4, 0x5748ab2f,
			0xbc946e79, 0xc6a376d2, 0x6549c2c8, 0x530ff8ee, 0x468dde7d,
			0xd5730a1d, 0x4cd04dc6, 0x2939bbdb, 0xa9ba4650, 0xac9526e8,
			0xbe5ee304, 0xa1fad5f0, 0x6a2d519a, 0x63ef8ce2, 0x9a86ee22,
			0xc089c2b8, 0x43242ef6, 0xa51e03aa, 0x9cf2d0a4, 0x83c061ba,
			0x9be96a4d, 0x8fe51550, 0xba645bd6, 0x2826a2f9, 0xa73a3ae1,
			0x4ba99586, 0xef5562e9, 0xc72fefd3, 0xf752f7da, 0x3f046f69,
			0x77fa0a59, 0x80e4a915, 0x87b08601, 0x9b09e6ad, 0x3b3ee593,
			0xe990fd5a, 0x9e34d797, 0x2cf0b7d9, 0x022b8b51, 0x96d5ac3a,
			0x017da67d, 0xd1cf3ed6, 0x7c7d2d28, 0x1f9f25cf, 0xadf2b89b,
			0x5ad6b472, 0x5a88f54c, 0xe029ac71, 0xe019a5e6, 0x47b0acfd,
			0xed93fa9b, 0xe8d3c48d, 0x283b57cc, 0xf8d56629, 0x79132e28,
			0x785f0191, 0xed756055, 0xf7960e44, 0xe3d35e8c, 0x15056dd4,
			0x88f46dba, 0x03a16125, 0x0564f0bd, 0xc3eb9e15, 0x3c9057a2,
			0x97271aec, 0xa93a072a, 0x1b3f6d9b, 0x1e6321f5, 0xf59c66fb,
			0x26dcf319, 0x7533d928, 0xb155fdf5, 0x03563482, 0x8aba3cbb,
			0x28517711, 0xc20ad9f8, 0xabcc5167, 0xccad925f, 0x4de81751,
			0x3830dc8e, 0x379d5862, 0x9320f991, 0xea7a90c2, 0xfb3e7bce,
			0x5121ce64, 0x774fbe32, 0xa8b6e37e, 0xc3293d46, 0x48de5369,
			0x6413e680, 0xa2ae0810, 0xdd6db224, 0x69852dfd, 0x09072166,
			0xb39a460a, 0x6445c0dd, 0x586cdecf, 0x1c20c8ae, 0x5bbef7dd,
			0x1b588d40, 0xccd2017f, 0x6bb4e3bb, 0xdda26a7e, 0x3a59ff45,
			0x3e350a44, 0xbcb4cdd5, 0x72eacea8, 0xfa6484bb, 0x8d6612ae,
			0xbf3c6f47, 0xd29be463, 0x542f5d9e, 0xaec2771b, 0xf64e6370,
			0x740e0d8d, 0xe75b1357, 0xf8721671, 0xaf537d5d, 0x4040cb08,
			0x4eb4e2cc, 0x34d2466a, 0x0115af84, 0xe1b00428, 0x95983a1d,
			0x06b89fb4, 0xce6ea048, 0x6f3f3b82, 0x3520ab82, 0x011a1d4b,
			0x277227f8, 0x611560b1, 0xe7933fdc, 0xbb3a792b, 0x344525bd,
			0xa08839e1, 0x51ce794b, 0x2f32c9b7, 0xa01fbac9, 0xe01cc87e,
			0xbcc7d1f6, 0xcf0111c3, 0xa1e8aac7, 0x1a908749, 0xd44fbd9a,
			0xd0dadecb, 0xd50ada38, 0x0339c32a, 0xc6913667, 0x8df9317c,
			0xe0b12b4f, 0xf79e59b7, 0x43f5bb3a, 0xf2d519ff, 0x27d9459c,
			0xbf97222c, 0x15e6fc2a, 0x0f91fc71, 0x9b941525, 0xfae59361,
			0xceb69ceb, 0xc2a86459, 0x12baa8d1, 0xb6c1075e, 0xe3056a0c,
			0x10d25065, 0xcb03a442, 0xe0ec6e0e, 0x1698db3b, 0x4c98a0be,
			0x3278e964, 0x9f1f9532, 0xe0d392df, 0xd3a0342b, 0x8971f21e,
			0x1b0a7441, 0x4ba3348c, 0xc5be7120, 0xc37632d8, 0xdf359f8d,
			0x9b992f2e, 0xe60b6f47, 0x0fe3f11d, 0xe54cda54, 0x1edad891,
			0xce6279cf, 0xcd3e7e6f, 0x1618b166, 0xfd2c1d05, 0x848fd2c5,
			0xf6fb2299, 0xf523f357, 0xa6327623, 0x93a83531, 0x56cccd02,
			0xacf08162, 0x5a75ebb5, 0x6e163697, 0x88d273cc, 0xde966292,
			0x81b949d0, 0x4c50901b, 0x71c65614, 0xe6c6c7bd, 0x327a140a,
			0x45e1d006, 0xc3f27b9a, 0xc9aa53fd, 0x62a80f00, 0xbb25bfe2,
			0x35bdd2f6, 0x71126905, 0xb2040222, 0xb6cbcf7c, 0xcd769c2b,
			0x53113ec0, 0x1640e3d3, 0x38abbd60, 0x2547adf0, 0xba38209c,
			0xf746ce76, 0x77afa1c5, 0x20756060, 0x85cbfe4e, 0x8ae88dd8,
			0x7aaaf9b0, 0x4cf9aa7e, 0x1948c25c, 0x02fb8a8c, 0x01c36ae4,
			0xd6ebe1f9, 0x90d4f869, 0xa65cdea0, 0x3f09252d, 0xc208e69f,
			0xb74e6132, 0xce77e25b, 0x578fdfe3, 0x3ac372e6];
	this.bf_crypt_ciphertext = [0x4f727068, 0x65616e42, 0x65686f6c, 0x64657253,
			0x63727944, 0x6f756274];
	this.base64_code = ['.', '/', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
			'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
			'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
			'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
			'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8',
			'9'];
	this.index_64 = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1,
			54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1, -1,
			2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30, 31,
			32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
			49, 50, 51, 52, 53, -1, -1, -1, -1, -1];
	this.P;
	this.S;
	this.lr;
	this.offp;
};
bCrypt.prototype.getByte = function(c) {
	var ret = 0;
	try {
		var b = c.charCodeAt(0);
	} catch (err) {
		b = c;
	}
	if (b > 127) {
		return -128 + (b % 128);
	} else {
		return b;
	}
};
bCrypt.prototype.encode_base64 = function(d, len) {
	var off = 0;
	var rs = [];
	var c1;
	var c2;
	if (len <= 0 || len > d.length)
		throw "Invalid len";
	while (off < len) {
		c1 = d[off++] & 0xff;
		rs.push(this.base64_code[(c1 >> 2) & 0x3f]);
		c1 = (c1 & 0x03) << 4;
		if (off >= len) {
			rs.push(this.base64_code[c1 & 0x3f]);
			break;
		}
		c2 = d[off++] & 0xff;
		c1 |= (c2 >> 4) & 0x0f;
		rs.push(this.base64_code[c1 & 0x3f]);
		c1 = (c2 & 0x0f) << 2;
		if (off >= len) {
			rs.push(this.base64_code[c1 & 0x3f]);
			break;
		}
		c2 = d[off++] & 0xff;
		c1 |= (c2 >> 6) & 0x03;
		rs.push(this.base64_code[c1 & 0x3f]);
		rs.push(this.base64_code[c2 & 0x3f]);
	}
	return rs.join('');
};
bCrypt.prototype.char64 = function(x) {
	var code = x.charCodeAt(0);
	if (code < 0 || code > this.index_64.length) {
		return -1;
	}
	return this.index_64[code];
};
bCrypt.prototype.decode_base64 = function(s, maxolen) {
	var off = 0;
	var slen = s.length;
	var olen = 0;
	var rs = [];
	var c1, c2, c3, c4, o;
	if (maxolen <= 0)
		throw "Invalid maxolen";
	while (off < slen - 1 && olen < maxolen) {
		c1 = this.char64(s.charAt(off++));
		c2 = this.char64(s.charAt(off++));
		if (c1 == -1 || c2 == -1) {
			break;
		}
		o = this.getByte(c1 << 2);
		o |= (c2 & 0x30) >> 4;
		rs.push(String.fromCharCode(o));
		if (++olen >= maxolen || off >= slen) {
			break;
		}
		c3 = this.char64(s.charAt(off++));
		if (c3 == -1) {
			break;
		}
		o = this.getByte((c2 & 0x0f) << 4);
		o |= (c3 & 0x3c) >> 2;
		rs.push(String.fromCharCode(o));
		if (++olen >= maxolen || off >= slen) {
			break;
		}
		c4 = this.char64(s.charAt(off++));
		o = this.getByte((c3 & 0x03) << 6);
		o |= c4;
		rs.push(String.fromCharCode(o));
		++olen;
	}
	var ret = [];
	for (off = 0; off < olen; off++) {
		ret.push(this.getByte(rs[off]));
	}
	return ret;
};
bCrypt.prototype.encipher = function(lr, off) {
	var i;
	var n;
	var l = lr[off];
	var r = lr[off + 1];

	l ^= this.P[0];
	for (i = 0; i <= this.BLOWFISH_NUM_ROUNDS - 2;) {
		// Feistel substitution on left word
		n = this.S[(l >> 24) & 0xff];
		n += this.S[0x100 | ((l >> 16) & 0xff)];
		n ^= this.S[0x200 | ((l >> 8) & 0xff)];
		n += this.S[0x300 | (l & 0xff)];
		r ^= n ^ this.P[++i];

		// Feistel substitution on right word
		n = this.S[(r >> 24) & 0xff];
		n += this.S[0x100 | ((r >> 16) & 0xff)];
		n ^= this.S[0x200 | ((r >> 8) & 0xff)];
		n += this.S[0x300 | (r & 0xff)];
		l ^= n ^ this.P[++i];
	}
	lr[off] = r ^ this.P[this.BLOWFISH_NUM_ROUNDS + 1];
	lr[off + 1] = l;
};
bCrypt.prototype.streamtoword = function(data, offp) {
	var i;
	var word = 0;
	var off = offp;
	for (i = 0; i < 4; i++) {
		word = (word << 8) | (data[off] & 0xff);
		off = (off + 1) % data.length;
	}
	this.offp = off;
	return word;
};
bCrypt.prototype.init_key = function() {
	this.P = this.P_orig.slice();
	this.S = this.S_orig.slice();
};
bCrypt.prototype.key = function(key) {
	var i;
	this.offp = 0;
	var lr = new Array(0x00000000, 0x00000000);
	var plen = this.P.length;
	var slen = this.S.length;

	for (i = 0; i < plen; i++) {
		this.P[i] = this.P[i] ^ this.streamtoword(key, this.offp);
	}
	for (i = 0; i < plen; i += 2) {
		this.encipher(lr, 0);
		this.P[i] = lr[0];
		this.P[i + 1] = lr[1];
	}

	for (i = 0; i < slen; i += 2) {
		this.encipher(lr, 0);
		this.S[i] = lr[0];
		this.S[i + 1] = lr[1];
	}
};
bCrypt.prototype.ekskey = function(data, key) {
	var i;
	this.offp = 0;
	var lr = new Array(0x00000000, 0x00000000);
	var plen = this.P.length;
	var slen = this.S.length;

	for (i = 0; i < plen; i++)
		this.P[i] = this.P[i] ^ this.streamtoword(key, this.offp);
	this.offp = 0;
	for (i = 0; i < plen; i += 2) {
		lr[0] ^= this.streamtoword(data, this.offp);
		lr[1] ^= this.streamtoword(data, this.offp);
		this.encipher(lr, 0);
		this.P[i] = lr[0];
		this.P[i + 1] = lr[1];
	}
	for (i = 0; i < slen; i += 2) {
		lr[0] ^= this.streamtoword(data, this.offp);
		lr[1] ^= this.streamtoword(data, this.offp);
		this.encipher(lr, 0);
		this.S[i] = lr[0];
		this.S[i + 1] = lr[1];
	}
};

bCrypt.prototype.crypt_raw = function(password, salt, log_rounds, callback, progress) {
	var rounds;
	var j;
	var cdata = this.bf_crypt_ciphertext.slice();
	var clen = cdata.length;
	var one_percent;

	if (log_rounds < 4 || log_rounds > 31)
		throw "Bad number of rounds";
	if (salt.length != this.BCRYPT_SALT_LEN)
		throw "Bad salt length";

	rounds = 1 << log_rounds;
	one_percent = Math.floor(rounds / 100) + 1;
	this.init_key();
	this.ekskey(salt, password);

	var obj = this;
	var i = 0;
	setTimeout(function(){
		if(i < rounds){
			var start = new Date();
			for (; i < rounds;) {
				i = i + 1;
				obj.key(password);
				obj.key(salt);
		                if(i % one_percent == 0){
			        	progress();
                		}
		                if((new Date() - start) > obj.MAX_EXECUTION_TIME){
                    			break;
		                }
            		}
		        setTimeout(arguments.callee, 0);
        	}else{
 	        	for (i = 0; i < 64; i++) {
                		for (j = 0; j < (clen >> 1); j++) {
                    			obj.encipher(cdata, j << 1);
                		}
            		}
			var ret = [];
		        for (i = 0; i < clen; i++) {
                		ret.push(obj.getByte((cdata[i] >> 24) & 0xff));
                		ret.push(obj.getByte((cdata[i] >> 16) & 0xff));
                		ret.push(obj.getByte((cdata[i] >> 8) & 0xff));
                		ret.push(obj.getByte(cdata[i] & 0xff));
            		}
            		callback(ret);
        	}
    	}, 0);
};
/*
 * callback: a function that will be passed the hash when it is complete
 * progress: optional - this function will be called every time 1% of hashing
 *      is complete.
 */
bCrypt.prototype.hashpw = function(password, salt, callback, progress) {
	var real_salt;
	var passwordb = [];
	var saltb = [];
	var hashed = [];
	var minor = String.fromCharCode(0);
	var rounds = 0;
	var off = 0;

	if (!progress){
	        var progress = function() {};
	}

	if (salt.charAt(0) != '$' || salt.charAt(1) != '2')
		throw "Invalid salt version";
	if (salt.charAt(2) == '$')
		off = 3;
	else {
		minor = salt.charAt(2);
		if (minor != 'a' || salt.charAt(3) != '$')
			throw "Invalid salt revision";
		off = 4;
	}

	// Extract number of rounds
	if (salt.charAt(off + 2) > '$')
		throw "Missing salt rounds";
	var r1 = parseInt(salt.substring(off, off + 1)) * 10;
	var r2 = parseInt(salt.substring(off + 1, off + 2));
	rounds = r1 + r2;
	real_salt = salt.substring(off + 3, off + 25);
	password = password + (minor >= 'a' ? "\000" : "");
	for (var r = 0; r < password.length; r++) {
		passwordb.push(this.getByte(password.charAt(r)));
	}
	saltb = this.decode_base64(real_salt, this.BCRYPT_SALT_LEN);
	var obj = this;
	this.crypt_raw(passwordb, saltb, rounds, function(hashed) {
		var rs = [];
	        rs.push("$2");
	        if (minor >= 'a')
			rs.push(minor);
		rs.push("$");
        	if (rounds < 10)
			rs.push("0");
        	rs.push(rounds.toString());
	        rs.push("$");
	        rs.push(obj.encode_base64(saltb, saltb.length));
	        rs.push(obj.encode_base64(hashed, obj.bf_crypt_ciphertext.length * 4 - 1));
	        callback(rs.join(''));
	}, progress);
};

bCrypt.prototype.gensalt = function(rounds) {
	var iteration_count = rounds;
	if (iteration_count < 4 || iteration_count > 31) {
		iteration_count = this.GENSALT_DEFAULT_LOG2_ROUNDS;
	}
	var output = [];
	output.push("$2a$");
	if (iteration_count < 10)
		output.push("0");
	output.push(iteration_count.toString());
	output.push('$');
	var s1 = [];	
	for (var r = 0; r < this.BCRYPT_SALT_LEN; r++){
		s1.push(Math.abs(isaac.rand()));
	}
	output.push(this.encode_base64(s1,this.BCRYPT_SALT_LEN))
	return output.join('');
};

bCrypt.prototype.ready = function(){
	return true;
};
/**
 * UserAPI 2cnnct
 * 
 * @param string publicKey
 * @param string privateKey
 * @param string apiHost
 * @param int resellerID
 * @param int apiVersion
 * @param string locale
 */
function UserAPI_2cnnct(publicKey, privateKey, apiHost, resellerID, apiVersion, locale)
{
	// API version
	if ( ! apiVersion)
	{
		apiVersion = 1;
	}

	function buildCheckData(method, timestamp, uri, post)
	{
		// Prepare post
		if ( ! post || typeof post != 'object' || Object.keys(post).length == 0)
		{
			post = [];
		}

		// Build data
		return method + "\n" + timestamp + "\n" + uri + "\n" + JSON.stringify(post);
	}

	function buildCheckHash(method, timestamp, uri, post)
	{
		return CryptoJS.HmacSHA512(buildCheckData(method, timestamp, uri, post), privateKey);
	}

	function buildUri(uri, uriParams)
	{
		if (uriParams && typeof uriParams == 'object')
		{
			for (var key in uriParams)
			{
				if (('' + uriParams[key]).length == 0)
					throw new Error('Invalid uri param \'' + key + '\' given, can not be empty');
				uri = uri.split('<' + key + '>').join(uriParams[key]);
			}
		}
		return uri;
	}

	var requests = [];

	function logRequest(req)
	{
		requests.push(req);
		req.always(function()
		{
			unlogRequest(req);
		});
	}

	function unlogRequest(req)
	{
		var pos = requests.indexOf(req);
		if (pos != -1)
		{
			requests.splice(pos, 1);
		}
	}

	/**
	 * Abort all requests
	 */
	this.abortAll = function()
	{
		for (var i = 0; i < requests.length; ++i)
		{
			requests[i].aborted = true;
			requests[i].abort();
		}
		requests = [];
	};

	/**
	 * Post or error
	 *
	 * Does not throw exceptions on errors but pass these to the callback function
	 * 
	 * @param function cb Callback function(error, result)
	 * @param object data
	 * @param string uri
	 * @param object uriParams
	 */
	this.postOrError = function(cb, data, uri, uriParams)
	{
		try
		{
			this.post(cb, data, uri, uriParams, true);
		}
		catch (e)
		{
			cb(e, null);
		}
	};

	/**
	 * Post
	 *
	 * Throws exceptions on errors.
	 * 
	 * @param function cb Callback function(result)
	 * @param object data
	 * @param string uri
	 * @param object uriParams
	 * @param bool catch_
	 */
	this.post = function(cb, data, uri, uriParams, catch_)
	{
		// Prepare/check arguments
		if ( ! jQuery.isFunction(cb))
		{
			throw new Error('Invalid callback function provided');
		}
		if ( ! data || typeof data != 'object')
		{
			data = {};
		}
		if ( ! uriParams || typeof uriParams != 'object')
		{
			uriParams = {};
		}

		// Prepare data
		for (var key in data)
		{
			data[key] = JSON.stringify(data[key]);
		}
		data.__i18n = JSON.stringify(locale);
		data.__format = JSON.stringify('json');
		data.__resellerID = JSON.stringify(resellerID);

		// URI
		uri = '/userapi/v' + apiVersion + '/' + buildUri(uri, uriParams);

		// Body
		var query = http_build_query(data);

		// Ajax
		logRequest(
			$.ajax({
				url: 'https://' + apiHost + uri,
				data: query,
				type: 'POST',
				cache: false,
				dataType: 'json',
				crossDomain: true,
				beforeSend: function(x)
				{
					// Timestamp
					var timestamp = Math.round(new Date().getTime() / 1000);

					// Headers
					x.setRequestHeader('Timestamp', timestamp);
					x.setRequestHeader('Authenticate', publicKey + ':' + buildCheckHash('POST', timestamp, uri, data));
				},
				success: function(result, _, obj)
				{
					if (obj.aborted)
						return;
					try
					{
						if (result.error)
						{
							throw new Error(
								(result.errorCode ? result.errorCode : 500) + ': '
								+ (result.errorMessage ? result.errorMessage : 'Error')
							);
						}
						else if (result.result === undefined)
						{
							throw new Error('500: Invalid API response (format)');
						}
					}
					catch (e)
					{
						if (catch_)
						{
							cb(e, null);
						}
						else
						{
							throw e;
						}
					}
					if (catch_)
					{
						cb(null, result.result);
					}
					else
					{
						cb(result.result);
					}
				},
				error: function(obj)
				{
					if (obj.aborted)
						return;
					try
					{
						var result = JSON.parse(obj.responseText);
						if (result.error)
						{
							throw new Error(
								(result.errorCode ? result.errorCode : 500) + ': '
								+ (result.errorMessage ? result.errorMessage : 'Error')
							);
						}
						else
						{
							throw new SyntaxError('500: Invalid API response (format)');
						}
					}
					catch (e)
					{
						if (catch_)
						{
							cb(e, null);
						}
						else
						{
							throw e;
						}
					}
				}
			})
		);
	};

	/**
	 * Get or error
	 *
	 * Does not throw exceptions on errors but pass these to the callback function
	 * 
	 * @param function cb Callback function(error, result)
	 * @param array fields
	 * @param string uri
	 * @param object uriParams
	 * @param object data
	 */
	this.getOrError = function(cb, fields, uri, uriParams, data)
	{
		try
		{
			this.get(cb, fields, uri, uriParams, data, true);
		}
		catch (e)
		{
			cb(e, null);
		}
	};

	/**
	 * Get
	 *
	 * Throws excepions on errors
	 * 
	 * @param function cb Callback function(result)
	 * @param array fields
	 * @param string uri
	 * @param object uriParams
	 * @param object data
	 * @param bool catch_
	 */
	this.get = function(cb, fields, uri, uriParams, data, catch_)
	{
		// Prepare/check arguments
		if ( ! jQuery.isFunction(cb))
		{
			throw new Error('Invalid callback function provided');
		}
		if ( ! jQuery.isArray(fields))
		{
			throw new Error('Invalid fields array provided (not an array)');
		}
		if ( ! data || typeof data != 'object')
		{
			data = {};
		}
		if ( ! uriParams || typeof uriParams != 'object')
		{
			uriParams = {};
		}

		// Prepare data
		for (var key in data)
		{
			data[key] = JSON.stringify(data[key]);
		}
		data.__fields = JSON.stringify(fields);
		data.__i18n = JSON.stringify(locale);
		data.__format = JSON.stringify('json');
		data.__resellerID = JSON.stringify(resellerID);

		// URI
		uri = '/userapi/v' + apiVersion + '/' + buildUri(uri, uriParams);
		var query = http_build_query(data);
		if (query.length > 0) uri += '?' + query;

		// Ajax
		logRequest(
			$.ajax({
				url: 'https://' + apiHost + uri,
				type: 'GET',
				cache: false,
				dataType: 'json',
				crossDomain: true,
				beforeSend: function(x)
				{
					// Timestamp
					var timestamp = Math.round(new Date().getTime() / 1000);

					// Headers
					x.setRequestHeader('Timestamp', timestamp);
					x.setRequestHeader('Authenticate', publicKey + ':' + buildCheckHash('GET', timestamp, uri, {}));
				},
				success: function(result, _, obj)
				{
					if (obj.aborted)
						return;

					try
					{
						if (result.error)
						{
							throw new Error(
								(result.errorCode ? result.errorCode : 500) + ': '
								+ (result.errorMessage ? result.errorMessage : 'Error')
							);
						}
						else if (result.result === undefined)
						{
							throw new Error('500: Invalid API response (format)');
						}
					}
					catch (e)
					{
						if (catch_)
						{
							cb(e, null);
						}
						else
						{
							throw e;
						}
					}
					if (catch_)
					{
						cb(null, result.result);
					}
					else
					{
						cb(result.result);
					}
				},
				error: function(obj)
				{
					if (obj.aborted)
						return;
					try
					{
						var result = JSON.parse(obj.responseText);
						if (result.error)
						{
							throw new Error(
								(result.errorCode ? result.errorCode : 500) + ': '
								+ (result.errorMessage ? result.errorMessage : 'Error')
							);
						}
						else
						{
							throw new SyntaxError('500: Invalid API response (format)');
						}
					}
					catch (e)
					{

						if (catch_)
						{
							cb(e, null);
						}
						else
						{
							throw e;
						}
					}
				}
			})
		);
	};
}

/**
 * Factory
 *
 * @param string publicKey
 * @param string privateKey
 * @param string apiHost
 * @param int resellerID
 * @param int apiVersion
 * @param string locale
 * @return UserAPI_2cnnct
 */
UserAPI_2cnnct.factory = function(publicKey, privateKey, apiHost, resellerID, apiVersion, locale)
{
	return new UserAPI_2cnnct(
		publicKey,
		privateKey,
		apiHost,
		resellerID,
		apiVersion,
		locale
	);
};

/**
 * Login
 *
 * @param function cb Callback function(bool error, publicKey, privateKey, api)
 * @param string email
 * @param string password
 * @param string apiHost
 * @param int resellerID
 * @param int apiVersion
 * @param string locale
 */
UserAPI_2cnnct.login = function(cb, email, password, apiHost, resellerID, apiVersion, locale)
{
	// API version
	if ( ! apiVersion)
	{
		apiVersion = 1;
	}

	// Ajax
	$.ajax({
		url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/prepareLogin?' + http_build_query({
			email: JSON.stringify(email),
			__resellerID: JSON.stringify(resellerID)
		}),
		cache: false,
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		success: function(result)
		{
			if ( ! result.result)
			{
				cb(result.errorMessage || 'Invalid login credentials');
				return;
			}
			var settings = result.result;

			function hashPassword(cb, password)
			{
				var bcrypt = new bCrypt();
				bcrypt.hashpw(
					password,
					settings,
					function(hash)
					{
						cb(hash);
					},
					function()
					{}
				);
			}

			// Password hash
			hashPassword(function(password)
			{
				// Ajax
				$.ajax({
					url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/login?' + http_build_query({
						email: JSON.stringify(email),
						password: JSON.stringify(password),
						__resellerID: JSON.stringify(resellerID)
					}),
					cache: false,
					type: 'GET',
					dataType: 'json',
					crossDomain: true,
					success: function(result)
					{
						if ( ! result.result || ! result.result.publicKey || ! result.result.privateKey || ! result.result.user)
						{
							cb(result.errorMessage || 'Not a valid login'); // Error
						}
						else
						{
							cb(
								false,
								result.result.publicKey,
								result.result.privateKey,
								UserAPI_2cnnct.factory(
									result.result.publicKey,
									result.result.privateKey,
									apiHost,
									resellerID,
									apiVersion,
									locale
								),
								result.result.user
							);
						}
					},
					error: function(obj, text)
					{
						if (obj.status === 0 || obj.readyState === 0)
						{
							cb('Connection error');
							return;
						}
						try
						{
							var result = JSON.parse(obj.responseText);
							if (result.error)
							{
								throw new Error(
									(result.errorCode ? result.errorCode : 500) + ': '
									+ (result.errorMessage ? result.errorMessage : 'Error')
								);
							}
							else
							{
								throw new SyntaxError('500: Invalid API response (format)');
							}
						}
						catch (e)
						{
							cb(e);
							return;
						}
						cb(text || 'Connection error');
					}
				});
			}, password);
		},
		error: function(obj, text)
		{
			if (obj.status === 0 || obj.readyState === 0)
			{
				cb('Connection error');
				return;
			}
			try
			{
				var result = JSON.parse(obj.responseText);
				if (result.error)
				{
					throw new Error(
						(result.errorCode ? result.errorCode : 500) + ': '
						+ (result.errorMessage ? result.errorMessage : 'Error')
					);
				}
				else
				{
					throw new SyntaxError('500: Invalid API response (format)');
				}
			}
			catch (e)
			{
				cb(e);
				return;
			}
			cb(text || 'Connection error');
		}
	});
};
