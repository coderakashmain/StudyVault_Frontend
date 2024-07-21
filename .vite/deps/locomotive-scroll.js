import {
  __publicField
} from "./chunk-EQCVQC35.js";

// node_modules/lenis/dist/lenis.mjs
var __assign = function() {
  return __assign = Object.assign || function __assign2(t2) {
    for (var e3, i2 = 1, o2 = arguments.length; i2 < o2; i2++) for (var s2 in e3 = arguments[i2]) Object.prototype.hasOwnProperty.call(e3, s2) && (t2[s2] = e3[s2]);
    return t2;
  }, __assign.apply(this, arguments);
};
function clamp(t2, e3, i2) {
  return Math.max(t2, Math.min(e3, i2));
}
var Animate = class {
  advance(t2) {
    var _a;
    if (!this.isRunning) return;
    let e3 = false;
    if (this.lerp) this.value = function damp(t3, e4, i2, o2) {
      return function lerp(t4, e5, i3) {
        return (1 - i3) * t4 + i3 * e5;
      }(t3, e4, 1 - Math.exp(-i2 * o2));
    }(this.value, this.to, 60 * this.lerp, t2), Math.round(this.value) === this.to && (this.value = this.to, e3 = true);
    else {
      this.currentTime += t2;
      const i2 = clamp(0, this.currentTime / this.duration, 1);
      e3 = i2 >= 1;
      const o2 = e3 ? 1 : this.easing(i2);
      this.value = this.from + (this.to - this.from) * o2;
    }
    e3 && this.stop(), (_a = this.onUpdate) == null ? void 0 : _a.call(this, this.value, e3);
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(t2, e3, { lerp: i2 = 0.1, duration: o2 = 1, easing: s2 = (t3) => t3, onStart: n2, onUpdate: r2 }) {
    this.from = this.value = t2, this.to = e3, this.lerp = i2, this.duration = o2, this.easing = s2, this.currentTime = 0, this.isRunning = true, n2 == null ? void 0 : n2(), this.onUpdate = r2;
  }
};
var Dimensions = class {
  constructor({ wrapper: t2, content: e3, autoResize: i2 = true, debounce: o2 = 250 } = {}) {
    __publicField(this, "resize", () => {
      this.onWrapperResize(), this.onContentResize();
    });
    __publicField(this, "onWrapperResize", () => {
      this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    });
    __publicField(this, "onContentResize", () => {
      this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
    });
    this.wrapper = t2, this.content = e3, i2 && (this.debouncedResize = /* @__PURE__ */ function debounce(t3, e4) {
      let i3;
      return function() {
        let o3 = arguments, s2 = this;
        clearTimeout(i3), i3 = setTimeout(function() {
          t3.apply(s2, o3);
        }, e4);
      };
    }(this.resize, o2), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, false) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
  }
  destroy() {
    var _a, _b;
    (_a = this.wrapperResizeObserver) == null ? void 0 : _a.disconnect(), (_b = this.contentResizeObserver) == null ? void 0 : _b.disconnect(), window.removeEventListener("resize", this.debouncedResize, false);
  }
  get limit() {
    return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
  }
};
var Emitter = class {
  constructor() {
    this.events = {};
  }
  emit(t2, ...e3) {
    let i2 = this.events[t2] || [];
    for (let t3 = 0, o2 = i2.length; t3 < o2; t3++) i2[t3](...e3);
  }
  on(t2, e3) {
    var _a;
    return ((_a = this.events[t2]) == null ? void 0 : _a.push(e3)) || (this.events[t2] = [e3]), () => {
      var _a2;
      this.events[t2] = (_a2 = this.events[t2]) == null ? void 0 : _a2.filter((t3) => e3 !== t3);
    };
  }
  off(t2, e3) {
    var _a;
    this.events[t2] = (_a = this.events[t2]) == null ? void 0 : _a.filter((t3) => e3 !== t3);
  }
  destroy() {
    this.events = {};
  }
};
var t = 100 / 6;
var VirtualScroll = class {
  constructor(t2, { wheelMultiplier: e3 = 1, touchMultiplier: i2 = 1 }) {
    __publicField(this, "onTouchStart", (t2) => {
      const { clientX: e3, clientY: i2 } = t2.targetTouches ? t2.targetTouches[0] : t2;
      this.touchStart.x = e3, this.touchStart.y = i2, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t2 });
    });
    __publicField(this, "onTouchMove", (t2) => {
      const { clientX: e3, clientY: i2 } = t2.targetTouches ? t2.targetTouches[0] : t2, o2 = -(e3 - this.touchStart.x) * this.touchMultiplier, s2 = -(i2 - this.touchStart.y) * this.touchMultiplier;
      this.touchStart.x = e3, this.touchStart.y = i2, this.lastDelta = { x: o2, y: s2 }, this.emitter.emit("scroll", { deltaX: o2, deltaY: s2, event: t2 });
    });
    __publicField(this, "onTouchEnd", (t2) => {
      this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t2 });
    });
    __publicField(this, "onWheel", (e3) => {
      let { deltaX: i2, deltaY: o2, deltaMode: s2 } = e3;
      i2 *= 1 === s2 ? t : 2 === s2 ? this.windowWidth : 1, o2 *= 1 === s2 ? t : 2 === s2 ? this.windowHeight : 1, i2 *= this.wheelMultiplier, o2 *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: i2, deltaY: o2, event: e3 });
    });
    __publicField(this, "onWindowResize", () => {
      this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
    });
    this.element = t2, this.wheelMultiplier = e3, this.touchMultiplier = i2, this.touchStart = { x: null, y: null }, this.emitter = new Emitter(), window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
  }
  on(t2, e3) {
    return this.emitter.on(t2, e3);
  }
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, false), this.element.removeEventListener("wheel", this.onWheel, { passive: false }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: false });
  }
};
var e = function() {
  function Lenis(t2) {
    var e3 = void 0 === t2 ? {} : t2, i2 = e3.wrapper, o2 = void 0 === i2 ? window : i2, s2 = e3.content, n2 = void 0 === s2 ? document.documentElement : s2, r2 = e3.wheelEventsTarget, l2 = void 0 === r2 ? o2 : r2, h2 = e3.eventsTarget, a2 = void 0 === h2 ? l2 : h2, c2 = e3.smoothWheel, p = void 0 === c2 || c2, u = e3.syncTouch, d = void 0 !== u && u, m = e3.syncTouchLerp, v = void 0 === m ? 0.075 : m, g = e3.touchInertiaMultiplier, f = void 0 === g ? 35 : g, S = e3.duration, w = e3.easing, y = void 0 === w ? function(t3) {
      return Math.min(1, 1.001 - Math.pow(2, -10 * t3));
    } : w, b = e3.lerp, L = void 0 === b ? !S && 0.1 : b, _ = e3.infinite, z = void 0 !== _ && _, E = e3.orientation, T = void 0 === E ? "vertical" : E, M = e3.gestureOrientation, R = void 0 === M ? "vertical" : M, O = e3.touchMultiplier, W = void 0 === O ? 1 : O, x = e3.wheelMultiplier, H = void 0 === x ? 1 : x, N = e3.autoResize, k = void 0 === N || N, C = e3.__experimental__naiveDimensions, j = void 0 !== C && C, P = this;
    this.__isSmooth = false, this.__isScrolling = false, this.__isStopped = false, this.__isLocked = false, this.onVirtualScroll = function(t3) {
      var e4 = t3.deltaX, i3 = t3.deltaY, o3 = t3.event;
      if (!o3.ctrlKey) {
        var s3 = o3.type.includes("touch"), n3 = o3.type.includes("wheel");
        if (P.options.syncTouch && s3 && "touchstart" === o3.type && !P.isStopped && !P.isLocked) P.reset();
        else {
          var r3 = 0 === e4 && 0 === i3, l3 = "vertical" === P.options.gestureOrientation && 0 === i3 || "horizontal" === P.options.gestureOrientation && 0 === e4;
          if (!r3 && !l3) {
            var h3 = o3.composedPath();
            if (!(h3 = h3.slice(0, h3.indexOf(P.rootElement))).find(function(t4) {
              var e5, i4, o4, r4, l4;
              return (null === (e5 = t4.hasAttribute) || void 0 === e5 ? void 0 : e5.call(t4, "data-lenis-prevent")) || s3 && (null === (i4 = t4.hasAttribute) || void 0 === i4 ? void 0 : i4.call(t4, "data-lenis-prevent-touch")) || n3 && (null === (o4 = t4.hasAttribute) || void 0 === o4 ? void 0 : o4.call(t4, "data-lenis-prevent-wheel")) || (null === (r4 = t4.classList) || void 0 === r4 ? void 0 : r4.contains("lenis")) && !(null === (l4 = t4.classList) || void 0 === l4 ? void 0 : l4.contains("lenis-stopped"));
            })) if (P.isStopped || P.isLocked) o3.preventDefault();
            else {
              if (P.isSmooth = P.options.syncTouch && s3 || P.options.smoothWheel && n3, !P.isSmooth) return P.isScrolling = false, void P.animate.stop();
              o3.preventDefault();
              var a3 = i3;
              "both" === P.options.gestureOrientation ? a3 = Math.abs(i3) > Math.abs(e4) ? i3 : e4 : "horizontal" === P.options.gestureOrientation && (a3 = e4);
              var c3 = s3 && P.options.syncTouch, p2 = s3 && "touchend" === o3.type && Math.abs(a3) > 5;
              p2 && (a3 = P.velocity * P.options.touchInertiaMultiplier), P.scrollTo(P.targetScroll + a3, __assign({ programmatic: false }, c3 ? { lerp: p2 ? P.options.syncTouchLerp : 1 } : { lerp: P.options.lerp, duration: P.options.duration, easing: P.options.easing }));
            }
          }
        }
      }
    }, this.onNativeScroll = function() {
      if (!P.__preventNextScrollEvent && !P.isScrolling) {
        var t3 = P.animatedScroll;
        P.animatedScroll = P.targetScroll = P.actualScroll, P.velocity = 0, P.direction = Math.sign(P.animatedScroll - t3), P.emit();
      }
    }, window.lenisVersion = "1.0.45", o2 !== document.documentElement && o2 !== document.body || (o2 = window), this.options = { wrapper: o2, content: n2, wheelEventsTarget: l2, eventsTarget: a2, smoothWheel: p, syncTouch: d, syncTouchLerp: v, touchInertiaMultiplier: f, duration: S, easing: y, lerp: L, infinite: z, gestureOrientation: R, orientation: T, touchMultiplier: W, wheelMultiplier: H, autoResize: k, __experimental__naiveDimensions: j }, this.animate = new Animate(), this.emitter = new Emitter(), this.dimensions = new Dimensions({ wrapper: o2, content: n2, autoResize: k }), this.toggleClassName("lenis", true), this.velocity = 0, this.isLocked = false, this.isStopped = false, this.isSmooth = d || p, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false), this.virtualScroll = new VirtualScroll(a2, { touchMultiplier: W, wheelMultiplier: H }), this.virtualScroll.on("scroll", this.onVirtualScroll);
  }
  return Lenis.prototype.destroy = function() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, false), this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClassName("lenis", false), this.toggleClassName("lenis-smooth", false), this.toggleClassName("lenis-scrolling", false), this.toggleClassName("lenis-stopped", false), this.toggleClassName("lenis-locked", false);
  }, Lenis.prototype.on = function(t2, e3) {
    return this.emitter.on(t2, e3);
  }, Lenis.prototype.off = function(t2, e3) {
    return this.emitter.off(t2, e3);
  }, Lenis.prototype.setScroll = function(t2) {
    this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
  }, Lenis.prototype.resize = function() {
    this.dimensions.resize();
  }, Lenis.prototype.emit = function() {
    this.emitter.emit("scroll", this);
  }, Lenis.prototype.reset = function() {
    this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.animate.stop();
  }, Lenis.prototype.start = function() {
    this.isStopped && (this.isStopped = false, this.reset());
  }, Lenis.prototype.stop = function() {
    this.isStopped || (this.isStopped = true, this.animate.stop(), this.reset());
  }, Lenis.prototype.raf = function(t2) {
    var e3 = t2 - (this.time || t2);
    this.time = t2, this.animate.advance(1e-3 * e3);
  }, Lenis.prototype.scrollTo = function(t2, e3) {
    var i2 = this, o2 = void 0 === e3 ? {} : e3, s2 = o2.offset, n2 = void 0 === s2 ? 0 : s2, r2 = o2.immediate, l2 = void 0 !== r2 && r2, h2 = o2.lock, a2 = void 0 !== h2 && h2, c2 = o2.duration, p = void 0 === c2 ? this.options.duration : c2, u = o2.easing, d = void 0 === u ? this.options.easing : u, m = o2.lerp, v = void 0 === m ? !p && this.options.lerp : m, g = o2.onComplete, f = o2.force, S = void 0 !== f && f, w = o2.programmatic, y = void 0 === w || w;
    if (!this.isStopped && !this.isLocked || S) {
      if (["top", "left", "start"].includes(t2)) t2 = 0;
      else if (["bottom", "right", "end"].includes(t2)) t2 = this.limit;
      else {
        var b = void 0;
        if ("string" == typeof t2 ? b = document.querySelector(t2) : (null == t2 ? void 0 : t2.nodeType) && (b = t2), b) {
          if (this.options.wrapper !== window) {
            var L = this.options.wrapper.getBoundingClientRect();
            n2 -= this.isHorizontal ? L.left : L.top;
          }
          var _ = b.getBoundingClientRect();
          t2 = (this.isHorizontal ? _.left : _.top) + this.animatedScroll;
        }
      }
      if ("number" == typeof t2) {
        if (t2 += n2, t2 = Math.round(t2), this.options.infinite ? y && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = clamp(0, t2, this.limit), l2) return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), void (null == g || g(this));
        if (!y) {
          if (t2 === this.targetScroll) return;
          this.targetScroll = t2;
        }
        this.animate.fromTo(this.animatedScroll, t2, { duration: p, easing: d, lerp: v, onStart: function() {
          a2 && (i2.isLocked = true), i2.isScrolling = true;
        }, onUpdate: function(t3, e4) {
          i2.isScrolling = true, i2.velocity = t3 - i2.animatedScroll, i2.direction = Math.sign(i2.velocity), i2.animatedScroll = t3, i2.setScroll(i2.scroll), y && (i2.targetScroll = t3), e4 || i2.emit(), e4 && (i2.reset(), i2.emit(), null == g || g(i2), i2.__preventNextScrollEvent = true, requestAnimationFrame(function() {
            delete i2.__preventNextScrollEvent;
          }));
        } });
      }
    }
  }, Object.defineProperty(Lenis.prototype, "rootElement", { get: function() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }, enumerable: false, configurable: true }), Object.defineProperty(Lenis.prototype, "limit", { get: function() {
    return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }, enumerable: false, configurable: true }), Object.defineProperty(Lenis.prototype, "isHorizontal", { get: function() {
    return "horizontal" === this.options.orientation;
  }, enumerable: false, configurable: true }), Object.defineProperty(Lenis.prototype, "actualScroll", { get: function() {
    return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
  }, enumerable: false, configurable: true }), Object.defineProperty(Lenis.prototype, "scroll", { get: function() {
    return this.options.infinite ? function modulo(t2, e3) {
      return (t2 % e3 + e3) % e3;
    }(this.animatedScroll, this.limit) : this.animatedScroll;
  }, enumerable: false, configurable: true }), Object.defineProperty(Lenis.prototype, "progress", { get: function() {
    return 0 === this.limit ? 1 : this.scroll / this.limit;
  }, enumerable: false, configurable: true }), Object.defineProperty(Lenis.prototype, "isSmooth", { get: function() {
    return this.__isSmooth;
  }, set: function(t2) {
    this.__isSmooth !== t2 && (this.__isSmooth = t2, this.toggleClassName("lenis-smooth", t2));
  }, enumerable: false, configurable: true }), Object.defineProperty(Lenis.prototype, "isScrolling", { get: function() {
    return this.__isScrolling;
  }, set: function(t2) {
    this.__isScrolling !== t2 && (this.__isScrolling = t2, this.toggleClassName("lenis-scrolling", t2));
  }, enumerable: false, configurable: true }), Object.defineProperty(Lenis.prototype, "isStopped", { get: function() {
    return this.__isStopped;
  }, set: function(t2) {
    this.__isStopped !== t2 && (this.__isStopped = t2, this.toggleClassName("lenis-stopped", t2));
  }, enumerable: false, configurable: true }), Object.defineProperty(Lenis.prototype, "isLocked", { get: function() {
    return this.__isLocked;
  }, set: function(t2) {
    this.__isLocked !== t2 && (this.__isLocked = t2, this.toggleClassName("lenis-locked", t2));
  }, enumerable: false, configurable: true }), Object.defineProperty(Lenis.prototype, "className", { get: function() {
    var t2 = "lenis";
    return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), this.isSmooth && (t2 += " lenis-smooth"), t2;
  }, enumerable: false, configurable: true }), Lenis.prototype.toggleClassName = function(t2, e3) {
    this.rootElement.classList.toggle(t2, e3), this.emitter.emit("className change", this);
  }, Lenis;
}();

// node_modules/locomotive-scroll/dist/locomotive-scroll.modern.mjs
function s() {
  return s = Object.assign ? Object.assign.bind() : function(t2) {
    for (var s2 = 1; s2 < arguments.length; s2++) {
      var e3 = arguments[s2];
      for (var i2 in e3) Object.prototype.hasOwnProperty.call(e3, i2) && (t2[i2] = e3[i2]);
    }
    return t2;
  }, s.apply(this, arguments);
}
var e2 = class {
  constructor({ scrollElements: t2, rootMargin: s2 = "-1px -1px -1px -1px", IORaf: e3 }) {
    this.scrollElements = void 0, this.rootMargin = void 0, this.IORaf = void 0, this.observer = void 0, this.scrollElements = t2, this.rootMargin = s2, this.IORaf = e3, this._init();
  }
  _init() {
    this.observer = new IntersectionObserver((t2) => {
      t2.forEach((t3) => {
        const s2 = this.scrollElements.find((s3) => s3.$el === t3.target);
        t3.isIntersecting ? (s2 && (s2.isAlreadyIntersected = true), this._setInview(t3)) : s2 && s2.isAlreadyIntersected && this._setOutOfView(t3);
      });
    }, { rootMargin: this.rootMargin });
    for (const t2 of this.scrollElements) this.observe(t2.$el);
  }
  destroy() {
    this.observer.disconnect();
  }
  observe(t2) {
    t2 && this.observer.observe(t2);
  }
  unobserve(t2) {
    t2 && this.observer.unobserve(t2);
  }
  _setInview(t2) {
    const s2 = this.scrollElements.find((s3) => s3.$el === t2.target);
    this.IORaf && (null == s2 || s2.setInteractivityOn()), !this.IORaf && (null == s2 || s2.setInview());
  }
  _setOutOfView(t2) {
    const s2 = this.scrollElements.find((s3) => s3.$el === t2.target);
    this.IORaf && (null == s2 || s2.setInteractivityOff()), !this.IORaf && (null == s2 || s2.setOutOfView()), null != s2 && s2.attributes.scrollRepeat || this.IORaf || this.unobserve(t2.target);
  }
};
function i(t2, s2, e3, i2, r2) {
  return e3 + ((r2 - t2) / (s2 - t2) * (i2 - e3) || 0);
}
function r(t2, s2) {
  return t2.reduce((t3, e3) => Math.abs(e3 - s2) < Math.abs(t3 - s2) ? e3 : t3);
}
var l = class {
  constructor({ $el: t2, id: s2, modularInstance: e3, subscribeElementUpdateFn: i2, unsubscribeElementUpdateFn: r2, needRaf: l2, scrollOrientation: n2 }) {
    var o2, a2, c2, h2, d;
    this.$el = void 0, this.id = void 0, this.needRaf = void 0, this.attributes = void 0, this.scrollOrientation = void 0, this.isAlreadyIntersected = void 0, this.intersection = void 0, this.metrics = void 0, this.currentScroll = void 0, this.translateValue = void 0, this.progress = void 0, this.lastProgress = void 0, this.modularInstance = void 0, this.progressModularModules = void 0, this.isInview = void 0, this.isInteractive = void 0, this.isInFold = void 0, this.isFirstResize = void 0, this.subscribeElementUpdateFn = void 0, this.unsubscribeElementUpdateFn = void 0, this.$el = t2, this.id = s2, this.needRaf = l2, this.scrollOrientation = n2, this.modularInstance = e3, this.subscribeElementUpdateFn = i2, this.unsubscribeElementUpdateFn = r2, this.attributes = { scrollClass: null != (o2 = this.$el.dataset.scrollClass) ? o2 : "is-inview", scrollOffset: null != (a2 = this.$el.dataset.scrollOffset) ? a2 : "0,0", scrollPosition: null != (c2 = this.$el.dataset.scrollPosition) ? c2 : "start,end", scrollModuleProgress: null != this.$el.dataset.scrollModuleProgress, scrollCssProgress: null != this.$el.dataset.scrollCssProgress, scrollEventProgress: null != (h2 = this.$el.dataset.scrollEventProgress) ? h2 : null, scrollSpeed: null != this.$el.dataset.scrollSpeed ? parseFloat(this.$el.dataset.scrollSpeed) : null, scrollRepeat: null != this.$el.dataset.scrollRepeat, scrollCall: null != (d = this.$el.dataset.scrollCall) ? d : null, scrollCallSelf: null != this.$el.dataset.scrollCallSelf, scrollIgnoreFold: null != this.$el.dataset.scrollIgnoreFold, scrollEnableTouchSpeed: null != this.$el.dataset.scrollEnableTouchSpeed }, this.intersection = { start: 0, end: 0 }, this.metrics = { offsetStart: 0, offsetEnd: 0, bcr: {} }, this.currentScroll = "vertical" === this.scrollOrientation ? window.scrollY : window.scrollX, this.translateValue = 0, this.progress = 0, this.lastProgress = null, this.progressModularModules = [], this.isInview = false, this.isInteractive = false, this.isAlreadyIntersected = false, this.isInFold = false, this.isFirstResize = true, this._init();
  }
  _init() {
    this.needRaf && (this.modularInstance && this.attributes.scrollModuleProgress && this._getProgressModularModules(), this._resize());
  }
  onResize({ currentScroll: t2 }) {
    this.currentScroll = t2, this._resize();
  }
  onRender({ currentScroll: t2, smooth: s2 }) {
    const e3 = "vertical" === this.scrollOrientation ? window.innerHeight : window.innerWidth;
    if (this.currentScroll = t2, this._computeProgress(), this.attributes.scrollSpeed && !isNaN(this.attributes.scrollSpeed)) if (this.attributes.scrollEnableTouchSpeed || s2) {
      if (this.isInFold) {
        const t3 = Math.max(0, this.progress);
        this.translateValue = t3 * e3 * this.attributes.scrollSpeed * -1;
      } else {
        const t3 = i(0, 1, -1, 1, this.progress);
        this.translateValue = t3 * e3 * this.attributes.scrollSpeed * -1;
      }
      this.$el.style.transform = "vertical" === this.scrollOrientation ? `translate3d(0, ${this.translateValue}px, 0)` : `translate3d(${this.translateValue}px, 0, 0)`;
    } else this.translateValue && (this.$el.style.transform = "translate3d(0, 0, 0)"), this.translateValue = 0;
  }
  setInview() {
    if (this.isInview) return;
    this.isInview = true, this.$el.classList.add(this.attributes.scrollClass);
    const t2 = this._getScrollCallFrom();
    this.attributes.scrollCall && this._dispatchCall("enter", t2);
  }
  setOutOfView() {
    if (!this.isInview || !this.attributes.scrollRepeat) return;
    this.isInview = false, this.$el.classList.remove(this.attributes.scrollClass);
    const t2 = this._getScrollCallFrom();
    this.attributes.scrollCall && this._dispatchCall("leave", t2);
  }
  setInteractivityOn() {
    this.isInteractive || (this.isInteractive = true, this.subscribeElementUpdateFn(this));
  }
  setInteractivityOff() {
    this.isInteractive && (this.isInteractive = false, this.unsubscribeElementUpdateFn(this), null != this.lastProgress && this._computeProgress(r([0, 1], this.lastProgress)));
  }
  _resize() {
    this.metrics.bcr = this.$el.getBoundingClientRect(), this._computeMetrics(), this._computeIntersection(), this.isFirstResize && (this.isFirstResize = false, this.isInFold && this.setInview());
  }
  _computeMetrics() {
    const { top: t2, left: s2, height: e3, width: i2 } = this.metrics.bcr, r2 = "vertical" === this.scrollOrientation ? window.innerHeight : window.innerWidth, l2 = "vertical" === this.scrollOrientation ? e3 : i2;
    this.metrics.offsetStart = this.currentScroll + ("vertical" === this.scrollOrientation ? t2 : s2) - this.translateValue, this.metrics.offsetEnd = this.metrics.offsetStart + l2, this.isInFold = this.metrics.offsetStart < r2 && !this.attributes.scrollIgnoreFold;
  }
  _computeIntersection() {
    const t2 = "vertical" === this.scrollOrientation ? window.innerHeight : window.innerWidth, s2 = "vertical" === this.scrollOrientation ? this.metrics.bcr.height : this.metrics.bcr.width, e3 = this.attributes.scrollOffset.split(","), i2 = null != e3[0] ? e3[0].trim() : "0", r2 = null != e3[1] ? e3[1].trim() : "0", l2 = this.attributes.scrollPosition.split(",");
    let n2 = null != l2[0] ? l2[0].trim() : "start";
    const o2 = null != l2[1] ? l2[1].trim() : "end", a2 = i2.includes("%") ? t2 * parseInt(i2.replace("%", "").trim()) * 0.01 : parseInt(i2), c2 = r2.includes("%") ? t2 * parseInt(r2.replace("%", "").trim()) * 0.01 : parseInt(r2);
    switch (this.isInFold && (n2 = "fold"), n2) {
      case "start":
      default:
        this.intersection.start = this.metrics.offsetStart - t2 + a2;
        break;
      case "middle":
        this.intersection.start = this.metrics.offsetStart - t2 + a2 + 0.5 * s2;
        break;
      case "end":
        this.intersection.start = this.metrics.offsetStart - t2 + a2 + s2;
        break;
      case "fold":
        this.intersection.start = 0;
    }
    switch (o2) {
      case "start":
        this.intersection.end = this.metrics.offsetStart - c2;
        break;
      case "middle":
        this.intersection.end = this.metrics.offsetStart - c2 + 0.5 * s2;
        break;
      default:
        this.intersection.end = this.metrics.offsetStart - c2 + s2;
    }
    if (this.intersection.end <= this.intersection.start) switch (o2) {
      case "start":
      default:
        this.intersection.end = this.intersection.start + 1;
        break;
      case "middle":
        this.intersection.end = this.intersection.start + 0.5 * s2;
        break;
      case "end":
        this.intersection.end = this.intersection.start + s2;
    }
  }
  _computeProgress(t2) {
    const s2 = null != t2 ? t2 : (e3 = i(this.intersection.start, this.intersection.end, 0, 1, this.currentScroll)) < 0 ? 0 : e3 > 1 ? 1 : e3;
    var e3;
    if (this.progress = s2, s2 != this.lastProgress) {
      if (this.lastProgress = s2, this.attributes.scrollCssProgress && this._setCssProgress(s2), this.attributes.scrollEventProgress && this._setCustomEventProgress(s2), this.attributes.scrollModuleProgress) for (const t3 of this.progressModularModules) this.modularInstance && this.modularInstance.call("onScrollProgress", s2, t3.moduleName, t3.moduleId);
      s2 > 0 && s2 < 1 && this.setInview(), 0 === s2 && this.setOutOfView(), 1 === s2 && this.setOutOfView();
    }
  }
  _setCssProgress(t2 = 0) {
    this.$el.style.setProperty("--progress", t2.toString());
  }
  _setCustomEventProgress(t2 = 0) {
    const s2 = this.attributes.scrollEventProgress;
    if (!s2) return;
    const e3 = new CustomEvent(s2, { detail: { target: this.$el, progress: t2 } });
    window.dispatchEvent(e3);
  }
  _getProgressModularModules() {
    if (!this.modularInstance) return;
    const t2 = Object.keys(this.$el.dataset).filter((t3) => t3.includes("module")), s2 = Object.entries(this.modularInstance.modules);
    if (t2.length) for (const e3 of t2) {
      const t3 = this.$el.dataset[e3];
      if (!t3) return;
      for (const e4 of s2) {
        const [s3, i2] = e4;
        t3 in i2 && this.progressModularModules.push({ moduleName: s3, moduleId: t3 });
      }
    }
  }
  _getScrollCallFrom() {
    const t2 = r([this.intersection.start, this.intersection.end], this.currentScroll);
    return this.intersection.start === t2 ? "start" : "end";
  }
  _dispatchCall(t2, s2) {
    var e3, i2;
    const r2 = null == (e3 = this.attributes.scrollCall) ? void 0 : e3.split(","), l2 = null == (i2 = this.attributes) ? void 0 : i2.scrollCallSelf;
    if (r2 && r2.length > 1) {
      var n2;
      const [e4, i3, o2] = r2;
      let a2;
      a2 = l2 ? this.$el.dataset[`module${i3.trim()}`] : o2, this.modularInstance && this.modularInstance.call(e4.trim(), { target: this.$el, way: t2, from: s2 }, i3.trim(), null == (n2 = a2) ? void 0 : n2.trim());
    } else if (r2) {
      const [e4] = r2, i3 = new CustomEvent(e4, { detail: { target: this.$el, way: t2, from: s2 } });
      window.dispatchEvent(i3);
    }
  }
};
var n = ["scrollOffset", "scrollPosition", "scrollModuleProgress", "scrollCssProgress", "scrollEventProgress", "scrollSpeed"];
var o = class {
  constructor({ $el: t2, modularInstance: s2, triggerRootMargin: e3, rafRootMargin: i2, scrollOrientation: r2 }) {
    this.$scrollContainer = void 0, this.modularInstance = void 0, this.triggerRootMargin = void 0, this.rafRootMargin = void 0, this.scrollElements = void 0, this.triggeredScrollElements = void 0, this.RAFScrollElements = void 0, this.scrollElementsToUpdate = void 0, this.IOTriggerInstance = void 0, this.IORafInstance = void 0, this.scrollOrientation = void 0, t2 ? (this.$scrollContainer = t2, this.modularInstance = s2, this.scrollOrientation = r2, this.triggerRootMargin = null != e3 ? e3 : "-1px -1px -1px -1px", this.rafRootMargin = null != i2 ? i2 : "100% 100% 100% 100%", this.scrollElements = [], this.triggeredScrollElements = [], this.RAFScrollElements = [], this.scrollElementsToUpdate = [], this._init()) : console.error("Please provide a DOM Element as scrollContainer");
  }
  _init() {
    const t2 = this.$scrollContainer.querySelectorAll("[data-scroll]"), s2 = Array.from(t2);
    this._subscribeScrollElements(s2), this.IOTriggerInstance = new e2({ scrollElements: [...this.triggeredScrollElements], rootMargin: this.triggerRootMargin, IORaf: false }), this.IORafInstance = new e2({ scrollElements: [...this.RAFScrollElements], rootMargin: this.rafRootMargin, IORaf: true });
  }
  destroy() {
    this.IOTriggerInstance.destroy(), this.IORafInstance.destroy(), this._unsubscribeAllScrollElements();
  }
  onResize({ currentScroll: t2 }) {
    for (const s2 of this.RAFScrollElements) s2.onResize({ currentScroll: t2 });
  }
  onRender({ currentScroll: t2, smooth: s2 }) {
    for (const e3 of this.scrollElementsToUpdate) e3.onRender({ currentScroll: t2, smooth: s2 });
  }
  removeScrollElements(t2) {
    const s2 = t2.querySelectorAll("[data-scroll]");
    if (s2.length) {
      for (let t3 = 0; t3 < this.triggeredScrollElements.length; t3++) {
        const e3 = this.triggeredScrollElements[t3];
        Array.from(s2).indexOf(e3.$el) > -1 && (this.IOTriggerInstance.unobserve(e3.$el), this.triggeredScrollElements.splice(t3, 1));
      }
      for (let t3 = 0; t3 < this.RAFScrollElements.length; t3++) {
        const e3 = this.RAFScrollElements[t3];
        Array.from(s2).indexOf(e3.$el) > -1 && (this.IORafInstance.unobserve(e3.$el), this.RAFScrollElements.splice(t3, 1));
      }
      s2.forEach((t3) => {
        const s3 = this.scrollElementsToUpdate.find((s4) => s4.$el === t3), e3 = this.scrollElements.find((s4) => s4.$el === t3);
        s3 && this._unsubscribeElementUpdate(s3), e3 && (this.scrollElements = this.scrollElements.filter((t4) => t4.id != e3.id));
      });
    }
  }
  addScrollElements(t2) {
    const s2 = t2.querySelectorAll("[data-scroll]"), e3 = [];
    this.scrollElements.forEach((t3) => {
      e3.push(t3.id);
    });
    const i2 = Math.max(...e3) + 1, r2 = Array.from(s2);
    this._subscribeScrollElements(r2, i2, true);
  }
  _subscribeScrollElements(t2, s2 = 0, e3 = false) {
    for (let i2 = 0; i2 < t2.length; i2++) {
      const r2 = t2[i2], n2 = this._checkRafNeeded(r2), o2 = new l({ $el: r2, id: s2 + i2, scrollOrientation: this.scrollOrientation, modularInstance: this.modularInstance, subscribeElementUpdateFn: this._subscribeElementUpdate.bind(this), unsubscribeElementUpdateFn: this._unsubscribeElementUpdate.bind(this), needRaf: n2 });
      this.scrollElements.push(o2), n2 ? (this.RAFScrollElements.push(o2), e3 && (this.IORafInstance.scrollElements.push(o2), this.IORafInstance.observe(o2.$el))) : (this.triggeredScrollElements.push(o2), e3 && (this.IOTriggerInstance.scrollElements.push(o2), this.IOTriggerInstance.observe(o2.$el)));
    }
  }
  _unsubscribeAllScrollElements() {
    this.scrollElements = [], this.RAFScrollElements = [], this.triggeredScrollElements = [], this.scrollElementsToUpdate = [];
  }
  _subscribeElementUpdate(t2) {
    this.scrollElementsToUpdate.push(t2);
  }
  _unsubscribeElementUpdate(t2) {
    this.scrollElementsToUpdate = this.scrollElementsToUpdate.filter((s2) => s2.id != t2.id);
  }
  _checkRafNeeded(t2) {
    let s2 = [...n];
    const e3 = (t3) => {
      s2 = s2.filter((s3) => s3 != t3);
    };
    if (t2.dataset.scrollOffset) {
      if ("0,0" != t2.dataset.scrollOffset.split(",").map((t3) => t3.replace("%", "").trim()).join(",")) return true;
      e3("scrollOffset");
    } else e3("scrollOffset");
    if (t2.dataset.scrollPosition) {
      if ("top,bottom" != t2.dataset.scrollPosition.trim()) return true;
      e3("scrollPosition");
    } else e3("scrollPosition");
    if (t2.dataset.scrollSpeed && !isNaN(parseFloat(t2.dataset.scrollSpeed))) return true;
    e3("scrollSpeed");
    for (const e4 of s2) if (e4 in t2.dataset) return true;
    return false;
  }
};
var a = class {
  constructor({ resizeElements: t2, resizeCallback: s2 = () => {
  } }) {
    this.$resizeElements = void 0, this.isFirstObserve = void 0, this.observer = void 0, this.resizeCallback = void 0, this.$resizeElements = t2, this.resizeCallback = s2, this.isFirstObserve = true, this._init();
  }
  _init() {
    this.observer = new ResizeObserver((t2) => {
      var s2;
      !this.isFirstObserve && (null == (s2 = this.resizeCallback) || s2.call(this)), this.isFirstObserve = false;
    });
    for (const t2 of this.$resizeElements) this.observer.observe(t2);
  }
  destroy() {
    this.observer.disconnect();
  }
};
var c = { wrapper: window, content: document.documentElement, wheelEventsTarget: window, eventsTarget: window, smoothWheel: true, syncTouch: false, syncTouchLerp: 0.075, touchInertiaMultiplier: 35, duration: 0.75, easing: (t2) => Math.min(1, 1.001 - Math.pow(2, -10 * t2)), lerp: 0.1, infinite: false, orientation: "vertical", gestureOrientation: "vertical", touchMultiplier: 1, wheelMultiplier: 1, autoResize: true };
var h = class {
  constructor({ lenisOptions: t2 = {}, modularInstance: e3, triggerRootMargin: i2, rafRootMargin: r2, autoResize: l2 = true, autoStart: n2 = true, scrollCallback: o2 = () => {
  }, initCustomTicker: a2, destroyCustomTicker: h2 } = {}) {
    this.rafPlaying = void 0, this.lenisInstance = void 0, this.coreInstance = void 0, this.lenisOptions = void 0, this.modularInstance = void 0, this.triggerRootMargin = void 0, this.rafRootMargin = void 0, this.rafInstance = void 0, this.autoResize = void 0, this.autoStart = void 0, this.ROInstance = void 0, this.initCustomTicker = void 0, this.destroyCustomTicker = void 0, this._onRenderBind = void 0, this._onResizeBind = void 0, this._onScrollToBind = void 0, this.lenisOptions = s({}, c, t2), Object.assign(this, { lenisOptions: t2, modularInstance: e3, triggerRootMargin: i2, rafRootMargin: r2, autoResize: l2, autoStart: n2, scrollCallback: o2, initCustomTicker: a2, destroyCustomTicker: h2 }), this._onRenderBind = this._onRender.bind(this), this._onScrollToBind = this._onScrollTo.bind(this), this._onResizeBind = this._onResize.bind(this), this.rafPlaying = false, this._init();
  }
  _init() {
    var s2;
    this.lenisInstance = new e({ wrapper: this.lenisOptions.wrapper, content: this.lenisOptions.content, eventsTarget: this.lenisOptions.eventsTarget, lerp: this.lenisOptions.lerp, duration: this.lenisOptions.duration, orientation: this.lenisOptions.orientation, gestureOrientation: this.lenisOptions.gestureOrientation, smoothWheel: this.lenisOptions.smoothWheel, syncTouch: this.lenisOptions.syncTouch, syncTouchLerp: this.lenisOptions.syncTouchLerp, touchInertiaMultiplier: this.lenisOptions.touchInertiaMultiplier, wheelMultiplier: this.lenisOptions.wheelMultiplier, touchMultiplier: this.lenisOptions.touchMultiplier, easing: this.lenisOptions.easing }), null == (s2 = this.lenisInstance) || s2.on("scroll", this.scrollCallback), document.documentElement.setAttribute("data-scroll-orientation", this.lenisInstance.options.orientation), requestAnimationFrame(() => {
      this.coreInstance = new o({ $el: this.lenisInstance.rootElement, modularInstance: this.modularInstance, triggerRootMargin: this.triggerRootMargin, rafRootMargin: this.rafRootMargin, scrollOrientation: this.lenisInstance.options.orientation }), this._bindEvents(), this.initCustomTicker && !this.destroyCustomTicker ? console.warn("initCustomTicker callback is declared, but destroyCustomTicker is not. Please pay attention. It could cause trouble.") : !this.initCustomTicker && this.destroyCustomTicker && console.warn("destroyCustomTicker callback is declared, but initCustomTicker is not. Please pay attention. It could cause trouble."), this.autoStart && this.start();
    });
  }
  destroy() {
    var t2;
    this.stop(), this._unbindEvents(), this.lenisInstance.destroy(), null == (t2 = this.coreInstance) || t2.destroy(), requestAnimationFrame(() => {
      var t3;
      null == (t3 = this.coreInstance) || t3.destroy();
    });
  }
  _bindEvents() {
    this._bindScrollToEvents(), this.autoResize && ("ResizeObserver" in window ? this.ROInstance = new a({ resizeElements: [document.body], resizeCallback: this._onResizeBind }) : window.addEventListener("resize", this._onResizeBind));
  }
  _unbindEvents() {
    this._unbindScrollToEvents(), this.autoResize && ("ResizeObserver" in window ? this.ROInstance && this.ROInstance.destroy() : window.removeEventListener("resize", this._onResizeBind));
  }
  _bindScrollToEvents(t2) {
    const s2 = t2 || this.lenisInstance.rootElement, e3 = null == s2 ? void 0 : s2.querySelectorAll("[data-scroll-to]");
    (null == e3 ? void 0 : e3.length) && e3.forEach((t3) => {
      t3.addEventListener("click", this._onScrollToBind, false);
    });
  }
  _unbindScrollToEvents(t2) {
    const s2 = t2 || this.lenisInstance.rootElement, e3 = null == s2 ? void 0 : s2.querySelectorAll("[data-scroll-to]");
    (null == e3 ? void 0 : e3.length) && e3.forEach((t3) => {
      t3.removeEventListener("click", this._onScrollToBind, false);
    });
  }
  _onResize() {
    requestAnimationFrame(() => {
      var t2;
      null == (t2 = this.coreInstance) || t2.onResize({ currentScroll: this.lenisInstance.scroll });
    });
  }
  _onRender() {
    var t2, s2;
    null == (t2 = this.lenisInstance) || t2.raf(Date.now()), null == (s2 = this.coreInstance) || s2.onRender({ currentScroll: this.lenisInstance.scroll, smooth: this.lenisInstance.isSmooth });
  }
  _onScrollTo(t2) {
    var s2;
    t2.preventDefault();
    const e3 = null != (s2 = t2.currentTarget) ? s2 : null;
    if (!e3) return;
    const i2 = e3.getAttribute("data-scroll-to-href") || e3.getAttribute("href"), r2 = e3.getAttribute("data-scroll-to-offset") || 0, l2 = e3.getAttribute("data-scroll-to-duration") || this.lenisOptions.duration || c.duration;
    i2 && this.scrollTo(i2, { offset: "string" == typeof r2 ? parseInt(r2) : r2, duration: "string" == typeof l2 ? parseInt(l2) : l2 });
  }
  start() {
    var t2;
    this.rafPlaying || (null == (t2 = this.lenisInstance) || t2.start(), this.rafPlaying = true, this.initCustomTicker ? this.initCustomTicker(this._onRenderBind) : this._raf());
  }
  stop() {
    var t2;
    this.rafPlaying && (null == (t2 = this.lenisInstance) || t2.stop(), this.rafPlaying = false, this.destroyCustomTicker ? this.destroyCustomTicker(this._onRenderBind) : this.rafInstance && cancelAnimationFrame(this.rafInstance));
  }
  removeScrollElements(t2) {
    var s2;
    t2 ? (this._unbindScrollToEvents(t2), null == (s2 = this.coreInstance) || s2.removeScrollElements(t2)) : console.error("Please provide a DOM Element as $oldContainer");
  }
  addScrollElements(t2) {
    var s2;
    t2 ? (null == (s2 = this.coreInstance) || s2.addScrollElements(t2), requestAnimationFrame(() => {
      this._bindScrollToEvents(t2);
    })) : console.error("Please provide a DOM Element as $newContainer");
  }
  resize() {
    this._onResizeBind();
  }
  scrollTo(t2, s2) {
    var e3;
    null == (e3 = this.lenisInstance) || e3.scrollTo(t2, { offset: null == s2 ? void 0 : s2.offset, lerp: null == s2 ? void 0 : s2.lerp, duration: null == s2 ? void 0 : s2.duration, immediate: null == s2 ? void 0 : s2.immediate, lock: null == s2 ? void 0 : s2.lock, force: null == s2 ? void 0 : s2.force, easing: null == s2 ? void 0 : s2.easing, onComplete: null == s2 ? void 0 : s2.onComplete });
  }
  _raf() {
    this._onRenderBind(), this.rafInstance = requestAnimationFrame(() => this._raf());
  }
};
export {
  h as default
};
//# sourceMappingURL=locomotive-scroll.js.map
