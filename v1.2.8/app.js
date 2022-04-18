var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

function t(e, t, n, r, s, o) {
    return {
        tag: e,
        key: t,
        attrs: n,
        children: r,
        text: s,
        dom: o,
        domSize: void 0,
        state: void 0,
        events: void 0,
        instance: void 0
    }
}
t.normalize = function(e) {
    return Array.isArray(e) ? t("[", void 0, void 0, t.normalizeChildren(e), void 0, void 0) : null == e || "boolean" == typeof e ? null : "object" == typeof e ? e : t("#", void 0, void 0, String(e), void 0, void 0)
}, t.normalizeChildren = function(e) {
    var n = [];
    if (e.length) {
        for (var r = null != e[0] && null != e[0].key, s = 1; s < e.length; s++)
            if ((null != e[s] && null != e[s].key) !== r) throw new TypeError("Vnodes must either always have keys or never have keys!");
        for (s = 0; s < e.length; s++) n[s] = t.normalize(e[s])
    }
    return n
};
var n = t,
    r = n,
    s = function() {
        var e, t = arguments[this],
            n = this + 1;
        if (null == t ? t = {} : ("object" != typeof t || null != t.tag || Array.isArray(t)) && (t = {}, n = this), arguments.length === n + 1) e = arguments[n], Array.isArray(e) || (e = [e]);
        else
            for (e = []; n < arguments.length;) e.push(arguments[n++]);
        return r("", t.key, t, e)
    },
    o = n,
    i = s,
    a = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,
    l = {},
    c = {}.hasOwnProperty;

function u(e) {
    for (var t in e)
        if (c.call(e, t)) return !1;
    return !0
}

function f(e) {
    for (var t, n = "div", r = [], s = {}; t = a.exec(e);) {
        var o = t[1],
            i = t[2];
        if ("" === o && "" !== i) n = i;
        else if ("#" === o) s.id = i;
        else if ("." === o) r.push(i);
        else if ("[" === t[3][0]) {
            var c = t[6];
            c && (c = c.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")), "class" === t[4] ? r.push(c) : s[t[4]] = "" === c ? c : c || !0
        }
    }
    return r.length > 0 && (s.className = r.join(" ")), l[e] = {
        tag: n,
        attrs: s
    }
}

function d(e, t) {
    var n = t.attrs,
        r = o.normalizeChildren(t.children),
        s = c.call(n, "class"),
        i = s ? n.class : n.className;
    if (t.tag = e.tag, t.attrs = null, t.children = void 0, !u(e.attrs) && !u(n)) {
        var a = {};
        for (var l in n) c.call(n, l) && (a[l] = n[l]);
        n = a
    }
    for (var l in e.attrs) c.call(e.attrs, l) && "className" !== l && !c.call(n, l) && (n[l] = e.attrs[l]);
    for (var l in null == i && null == e.attrs.className || (n.className = null != i ? null != e.attrs.className ? String(e.attrs.className) + " " + String(i) : i : null != e.attrs.className ? e.attrs.className : null), s && (n.class = null), n)
        if (c.call(n, l) && "key" !== l) {
            t.attrs = n;
            break
        } return Array.isArray(r) && 1 === r.length && null != r[0] && "#" === r[0].tag ? t.text = r[0].children : t.children = r, t
}
var h = function(e) {
        if (null == e || "string" != typeof e && "function" != typeof e && "function" != typeof e.view) throw Error("The selector must be either a string or a component.");
        var t = i.apply(1, arguments);
        return "string" == typeof e && (t.children = o.normalizeChildren(t.children), "[" !== e) ? d(l[e] || f(e), t) : (t.tag = e, t)
    },
    p = n,
    m = n,
    g = s,
    v = h;
v.trust = function(e) {
    return null == e && (e = ""), p("<", void 0, void 0, e, void 0, void 0)
}, v.fragment = function() {
    var e = g.apply(0, arguments);
    return e.tag = "[", e.children = m.normalizeChildren(e.children), e
};
var y = v,
    w = {
        exports: {}
    },
    b = function(e) {
        if (!(this instanceof b)) throw new Error("Promise must be called with `new`");
        if ("function" != typeof e) throw new TypeError("executor must be a function");
        var t = this,
            n = [],
            r = [],
            s = l(n, !0),
            o = l(r, !1),
            i = t._instance = {
                resolvers: n,
                rejectors: r
            },
            a = "function" == typeof setImmediate ? setImmediate : setTimeout;

        function l(e, s) {
            return function l(u) {
                var f;
                try {
                    if (!s || null == u || "object" != typeof u && "function" != typeof u || "function" != typeof(f = u.then)) a((function() {
                        s || 0 !== e.length || console.error("Possible unhandled promise rejection:", u);
                        for (var t = 0; t < e.length; t++) e[t](u);
                        n.length = 0, r.length = 0, i.state = s, i.retry = function() {
                            l(u)
                        }
                    }));
                    else {
                        if (u === t) throw new TypeError("Promise can't be resolved w/ itself");
                        c(f.bind(u))
                    }
                } catch (e) {
                    o(e)
                }
            }
        }

        function c(e) {
            var t = 0;

            function n(e) {
                return function(n) {
                    t++ > 0 || e(n)
                }
            }
            var r = n(o);
            try {
                e(n(s), r)
            } catch (e) {
                r(e)
            }
        }
        c(e)
    };
b.prototype.then = function(e, t) {
    var n, r, s = this._instance;

    function o(e, t, o, i) {
        t.push((function(t) {
            if ("function" != typeof e) o(t);
            else try {
                n(e(t))
            } catch (e) {
                r && r(e)
            }
        })), "function" == typeof s.retry && i === s.state && s.retry()
    }
    var i = new b((function(e, t) {
        n = e, r = t
    }));
    return o(e, s.resolvers, n, !0), o(t, s.rejectors, r, !1), i
}, b.prototype.catch = function(e) {
    return this.then(null, e)
}, b.prototype.finally = function(e) {
    return this.then((function(t) {
        return b.resolve(e()).then((function() {
            return t
        }))
    }), (function(t) {
        return b.resolve(e()).then((function() {
            return b.reject(t)
        }))
    }))
}, b.resolve = function(e) {
    return e instanceof b ? e : new b((function(t) {
        t(e)
    }))
}, b.reject = function(e) {
    return new b((function(t, n) {
        n(e)
    }))
}, b.all = function(e) {
    return new b((function(t, n) {
        var r = e.length,
            s = 0,
            o = [];
        if (0 === e.length) t([]);
        else
            for (var i = 0; i < e.length; i++) ! function(i) {
                function a(e) {
                    s++, o[i] = e, s === r && t(o)
                }
                null == e[i] || "object" != typeof e[i] && "function" != typeof e[i] || "function" != typeof e[i].then ? a(e[i]) : e[i].then(a, n)
            }(i)
    }))
}, b.race = function(e) {
    return new b((function(t, n) {
        for (var r = 0; r < e.length; r++) e[r].then(t, n)
    }))
};
var A = b,
    S = A;
"undefined" != typeof window ? (void 0 === window.Promise ? window.Promise = S : window.Promise.prototype.finally || (window.Promise.prototype.finally = S.prototype.finally), w.exports = window.Promise) : void 0 !== e ? (void 0 === e.Promise ? e.Promise = S : e.Promise.prototype.finally || (e.Promise.prototype.finally = S.prototype.finally), w.exports = e.Promise) : w.exports = S;
var x = n,
    O = function(e) {
        var t, n = e && e.document,
            r = {
                svg: "http://www.w3.org/2000/svg",
                math: "http://www.w3.org/1998/Math/MathML"
            };

        function s(e) {
            return e.attrs && e.attrs.xmlns || r[e.tag]
        }

        function o(e, t) {
            if (e.state !== t) throw new Error("`vnode.state` must not be modified")
        }

        function i(e) {
            var t = e.state;
            try {
                return this.apply(t, arguments)
            } finally {
                o(e, t)
            }
        }

        function a() {
            try {
                return n.activeElement
            } catch (e) {
                return null
            }
        }

        function l(e, t, n, r, s, o, i) {
            for (var a = n; a < r; a++) {
                var l = t[a];
                null != l && c(e, l, s, i, o)
            }
        }

        function c(e, t, r, o, a) {
            var u = t.tag;
            if ("string" == typeof u) switch (t.state = {}, null != t.attrs && L(t.attrs, t, r), u) {
                case "#":
                    ! function(e, t, r) {
                        t.dom = n.createTextNode(t.children), w(e, t.dom, r)
                    }(e, t, a);
                    break;
                case "<":
                    f(e, t, o, a);
                    break;
                case "[":
                    ! function(e, t, r, s, o) {
                        var i = n.createDocumentFragment();
                        if (null != t.children) {
                            var a = t.children;
                            l(i, a, 0, a.length, r, null, s)
                        }
                        t.dom = i.firstChild, t.domSize = i.childNodes.length, w(e, i, o)
                    }(e, t, r, o, a);
                    break;
                default:
                    ! function(e, t, r, o, i) {
                        var a = t.tag,
                            c = t.attrs,
                            u = c && c.is,
                            f = (o = s(t) || o) ? u ? n.createElementNS(o, a, {
                                is: u
                            }) : n.createElementNS(o, a) : u ? n.createElement(a, {
                                is: u
                            }) : n.createElement(a);
                        t.dom = f, null != c && function(e, t, n) {
                            for (var r in t) E(e, r, null, t[r], n)
                        }(t, c, o);
                        if (w(e, f, i), !b(t) && (null != t.text && ("" !== t.text ? f.textContent = t.text : t.children = [x("#", void 0, void 0, t.text, void 0, void 0)]), null != t.children)) {
                            var d = t.children;
                            l(f, d, 0, d.length, r, null, o), "select" === t.tag && null != c && function(e, t) {
                                if ("value" in t)
                                    if (null === t.value) - 1 !== e.dom.selectedIndex && (e.dom.value = null);
                                    else {
                                        var n = "" + t.value;
                                        e.dom.value === n && -1 !== e.dom.selectedIndex || (e.dom.value = n)
                                    }
                                "selectedIndex" in t && E(e, "selectedIndex", null, t.selectedIndex, void 0)
                            }(t, c)
                        }
                    }(e, t, r, o, a)
            } else ! function(e, t, n, r, s) {
                (function(e, t) {
                    var n;
                    if ("function" == typeof e.tag.view) {
                        if (e.state = Object.create(e.tag), null != (n = e.state.view).$$reentrantLock$$) return;
                        n.$$reentrantLock$$ = !0
                    } else {
                        if (e.state = void 0, null != (n = e.tag).$$reentrantLock$$) return;
                        n.$$reentrantLock$$ = !0, e.state = null != e.tag.prototype && "function" == typeof e.tag.prototype.view ? new e.tag(e) : e.tag(e)
                    }
                    L(e.state, e, t), null != e.attrs && L(e.attrs, e, t);
                    if (e.instance = x.normalize(i.call(e.state.view, e)), e.instance === e) throw Error("A view cannot return the vnode it received as argument");
                    n.$$reentrantLock$$ = null
                })(t, n), null != t.instance ? (c(e, t.instance, n, r, s), t.dom = t.instance.dom, t.domSize = null != t.dom ? t.instance.domSize : 0) : t.domSize = 0
            }(e, t, r, o, a)
        }
        var u = {
            caption: "table",
            thead: "table",
            tbody: "table",
            tfoot: "table",
            tr: "tbody",
            th: "tr",
            td: "tr",
            colgroup: "table",
            col: "colgroup"
        };

        function f(e, t, r, s) {
            var o = t.children.match(/^\s*?<(\w+)/im) || [],
                i = n.createElement(u[o[1]] || "div");
            "http://www.w3.org/2000/svg" === r ? (i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + t.children + "</svg>", i = i.firstChild) : i.innerHTML = t.children, t.dom = i.firstChild, t.domSize = i.childNodes.length, t.instance = [];
            for (var a, l = n.createDocumentFragment(); a = i.firstChild;) t.instance.push(a), l.appendChild(a);
            w(e, l, s)
        }

        function d(e, t, n, r, s, o) {
            if (t !== n && (null != t || null != n))
                if (null == t || 0 === t.length) l(e, n, 0, n.length, r, s, o);
                else if (null == n || 0 === n.length) A(e, t, 0, t.length);
            else {
                var i = null != t[0] && null != t[0].key,
                    a = null != n[0] && null != n[0].key,
                    u = 0,
                    f = 0;
                if (!i)
                    for (; f < t.length && null == t[f];) f++;
                if (!a)
                    for (; u < n.length && null == n[u];) u++;
                if (null === a && null == i) return;
                if (i !== a) A(e, t, f, t.length), l(e, n, u, n.length, r, s, o);
                else if (a) {
                    for (var d, y, w, b, x, O = t.length - 1, k = n.length - 1; O >= f && k >= u && (w = t[O], b = n[k], w.key === b.key);) w !== b && h(e, w, b, r, s, o), null != b.dom && (s = b.dom), O--, k--;
                    for (; O >= f && k >= u && (d = t[f], y = n[u], d.key === y.key);) f++, u++, d !== y && h(e, d, y, r, g(t, f, s), o);
                    for (; O >= f && k >= u && u !== k && d.key === b.key && w.key === y.key;) v(e, w, x = g(t, f, s)), w !== y && h(e, w, y, r, x, o), ++u <= --k && v(e, d, s), d !== b && h(e, d, b, r, s, o), null != b.dom && (s = b.dom), f++, w = t[--O], b = n[k], d = t[f], y = n[u];
                    for (; O >= f && k >= u && w.key === b.key;) w !== b && h(e, w, b, r, s, o), null != b.dom && (s = b.dom), k--, w = t[--O], b = n[k];
                    if (u > k) A(e, t, f, O + 1);
                    else if (f > O) l(e, n, u, k + 1, r, s, o);
                    else {
                        var C, E, D = s,
                            N = k - u + 1,
                            P = new Array(N),
                            j = 0,
                            $ = 0,
                            _ = 2147483647,
                            I = 0;
                        for ($ = 0; $ < N; $++) P[$] = -1;
                        for ($ = k; $ >= u; $--) {
                            null == C && (C = p(t, f, O + 1));
                            var z = C[(b = n[$]).key];
                            null != z && (_ = z < _ ? z : -1, P[$ - u] = z, w = t[z], t[z] = null, w !== b && h(e, w, b, r, s, o), null != b.dom && (s = b.dom), I++)
                        }
                        if (s = D, I !== O - f + 1 && A(e, t, f, O + 1), 0 === I) l(e, n, u, k + 1, r, s, o);
                        else if (-1 === _)
                            for (E = function(e) {
                                    var t = [0],
                                        n = 0,
                                        r = 0,
                                        s = 0,
                                        o = m.length = e.length;
                                    for (s = 0; s < o; s++) m[s] = e[s];
                                    for (s = 0; s < o; ++s)
                                        if (-1 !== e[s]) {
                                            var i = t[t.length - 1];
                                            if (e[i] < e[s]) m[s] = i, t.push(s);
                                            else {
                                                for (n = 0, r = t.length - 1; n < r;) {
                                                    var a = (n >>> 1) + (r >>> 1) + (n & r & 1);
                                                    e[t[a]] < e[s] ? n = a + 1 : r = a
                                                }
                                                e[s] < e[t[n]] && (n > 0 && (m[s] = t[n - 1]), t[n] = s)
                                            }
                                        } n = t.length, r = t[n - 1];
                                    for (; n-- > 0;) t[n] = r, r = m[r];
                                    return m.length = 0, t
                                }(P), j = E.length - 1, $ = k; $ >= u; $--) y = n[$], -1 === P[$ - u] ? c(e, y, r, o, s) : E[j] === $ - u ? j-- : v(e, y, s), null != y.dom && (s = n[$].dom);
                        else
                            for ($ = k; $ >= u; $--) y = n[$], -1 === P[$ - u] && c(e, y, r, o, s), null != y.dom && (s = n[$].dom)
                    }
                } else {
                    var R = t.length < n.length ? t.length : n.length;
                    for (u = u < f ? u : f; u < R; u++)(d = t[u]) === (y = n[u]) || null == d && null == y || (null == d ? c(e, y, r, o, g(t, u + 1, s)) : null == y ? S(e, d) : h(e, d, y, r, g(t, u + 1, s), o));
                    t.length > R && A(e, t, u, t.length), n.length > R && l(e, n, u, n.length, r, s, o)
                }
            }
        }

        function h(e, t, n, r, o, a) {
            var l = t.tag;
            if (l === n.tag) {
                if (n.state = t.state, n.events = t.events, function(e, t) {
                        do {
                            var n;
                            if (null != e.attrs && "function" == typeof e.attrs.onbeforeupdate)
                                if (void 0 !== (n = i.call(e.attrs.onbeforeupdate, e, t)) && !n) break;
                            if ("string" != typeof e.tag && "function" == typeof e.state.onbeforeupdate)
                                if (void 0 !== (n = i.call(e.state.onbeforeupdate, e, t)) && !n) break;
                            return !1
                        } while (0);
                        return e.dom = t.dom, e.domSize = t.domSize, e.instance = t.instance, e.attrs = t.attrs, e.children = t.children, e.text = t.text, !0
                    }(n, t)) return;
                if ("string" == typeof l) switch (null != n.attrs && M(n.attrs, n, r), l) {
                    case "#":
                        ! function(e, t) {
                            e.children.toString() !== t.children.toString() && (e.dom.nodeValue = t.children);
                            t.dom = e.dom
                        }(t, n);
                        break;
                    case "<":
                        ! function(e, t, n, r, s) {
                            t.children !== n.children ? (O(e, t), f(e, n, r, s)) : (n.dom = t.dom, n.domSize = t.domSize, n.instance = t.instance)
                        }(e, t, n, a, o);
                        break;
                    case "[":
                        ! function(e, t, n, r, s, o) {
                            d(e, t.children, n.children, r, s, o);
                            var i = 0,
                                a = n.children;
                            if (n.dom = null, null != a) {
                                for (var l = 0; l < a.length; l++) {
                                    var c = a[l];
                                    null != c && null != c.dom && (null == n.dom && (n.dom = c.dom), i += c.domSize || 1)
                                }
                                1 !== i && (n.domSize = i)
                            }
                        }(e, t, n, r, o, a);
                        break;
                    default:
                        ! function(e, t, n, r) {
                            var o = t.dom = e.dom;
                            r = s(t) || r, "textarea" === t.tag && (null == t.attrs && (t.attrs = {}), null != t.text && (t.attrs.value = t.text, t.text = void 0));
                            (function(e, t, n, r) {
                                if (null != n)
                                    for (var s in n) E(e, s, t && t[s], n[s], r);
                                var o;
                                if (null != t)
                                    for (var s in t) null == (o = t[s]) || null != n && null != n[s] || D(e, s, o, r)
                            })(t, e.attrs, t.attrs, r), b(t) || (null != e.text && null != t.text && "" !== t.text ? e.text.toString() !== t.text.toString() && (e.dom.firstChild.nodeValue = t.text) : (null != e.text && (e.children = [x("#", void 0, void 0, e.text, void 0, e.dom.firstChild)]), null != t.text && (t.children = [x("#", void 0, void 0, t.text, void 0, void 0)]), d(o, e.children, t.children, n, null, r)))
                        }(t, n, r, a)
                } else ! function(e, t, n, r, s, o) {
                    if (n.instance = x.normalize(i.call(n.state.view, n)), n.instance === n) throw Error("A view cannot return the vnode it received as argument");
                    M(n.state, n, r), null != n.attrs && M(n.attrs, n, r);
                    null != n.instance ? (null == t.instance ? c(e, n.instance, r, o, s) : h(e, t.instance, n.instance, r, s, o), n.dom = n.instance.dom, n.domSize = n.instance.domSize) : null != t.instance ? (S(e, t.instance), n.dom = void 0, n.domSize = 0) : (n.dom = t.dom, n.domSize = t.domSize)
                }(e, t, n, r, o, a)
            } else S(e, t), c(e, n, r, a, o)
        }

        function p(e, t, n) {
            for (var r = Object.create(null); t < n; t++) {
                var s = e[t];
                if (null != s) {
                    var o = s.key;
                    null != o && (r[o] = t)
                }
            }
            return r
        }
        var m = [];

        function g(e, t, n) {
            for (; t < e.length; t++)
                if (null != e[t] && null != e[t].dom) return e[t].dom;
            return n
        }

        function v(e, t, r) {
            var s = n.createDocumentFragment();
            y(e, s, t), w(e, s, r)
        }

        function y(e, t, n) {
            for (; null != n.dom && n.dom.parentNode === e;) {
                if ("string" != typeof n.tag) {
                    if (null != (n = n.instance)) continue
                } else if ("<" === n.tag)
                    for (var r = 0; r < n.instance.length; r++) t.appendChild(n.instance[r]);
                else if ("[" !== n.tag) t.appendChild(n.dom);
                else if (1 === n.children.length) {
                    if (null != (n = n.children[0])) continue
                } else
                    for (r = 0; r < n.children.length; r++) {
                        var s = n.children[r];
                        null != s && y(e, t, s)
                    }
                break
            }
        }

        function w(e, t, n) {
            null != n ? e.insertBefore(t, n) : e.appendChild(t)
        }

        function b(e) {
            if (null == e.attrs || null == e.attrs.contenteditable && null == e.attrs.contentEditable) return !1;
            var t = e.children;
            if (null != t && 1 === t.length && "<" === t[0].tag) {
                var n = t[0].children;
                e.dom.innerHTML !== n && (e.dom.innerHTML = n)
            } else if (null != e.text || null != t && 0 !== t.length) throw new Error("Child node of a contenteditable must be trusted");
            return !0
        }

        function A(e, t, n, r) {
            for (var s = n; s < r; s++) {
                var o = t[s];
                null != o && S(e, o)
            }
        }

        function S(e, t) {
            var n, r, s, a = 0,
                l = t.state;
            "string" != typeof t.tag && "function" == typeof t.state.onbeforeremove && (null != (s = i.call(t.state.onbeforeremove, t)) && "function" == typeof s.then && (a = 1, n = s));
            t.attrs && "function" == typeof t.attrs.onbeforeremove && (null != (s = i.call(t.attrs.onbeforeremove, t)) && "function" == typeof s.then && (a |= 2, r = s));
            if (o(t, l), a) {
                if (null != n) {
                    var c = function() {
                        1 & a && ((a &= 2) || u())
                    };
                    n.then(c, c)
                }
                if (null != r) {
                    c = function() {
                        2 & a && ((a &= 1) || u())
                    };
                    r.then(c, c)
                }
            } else C(t), k(e, t);

            function u() {
                o(t, l), C(t), k(e, t)
            }
        }

        function O(e, t) {
            for (var n = 0; n < t.instance.length; n++) e.removeChild(t.instance[n])
        }

        function k(e, t) {
            for (; null != t.dom && t.dom.parentNode === e;) {
                if ("string" != typeof t.tag) {
                    if (null != (t = t.instance)) continue
                } else if ("<" === t.tag) O(e, t);
                else {
                    if ("[" !== t.tag && (e.removeChild(t.dom), !Array.isArray(t.children))) break;
                    if (1 === t.children.length) {
                        if (null != (t = t.children[0])) continue
                    } else
                        for (var n = 0; n < t.children.length; n++) {
                            var r = t.children[n];
                            null != r && k(e, r)
                        }
                }
                break
            }
        }

        function C(e) {
            if ("string" != typeof e.tag && "function" == typeof e.state.onremove && i.call(e.state.onremove, e), e.attrs && "function" == typeof e.attrs.onremove && i.call(e.attrs.onremove, e), "string" != typeof e.tag) null != e.instance && C(e.instance);
            else {
                var t = e.children;
                if (Array.isArray(t))
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        null != r && C(r)
                    }
            }
        }

        function E(e, t, r, s, o) {
            if ("key" !== t && "is" !== t && null != s && !N(t) && (r !== s || function(e, t) {
                    return "value" === t || "checked" === t || "selectedIndex" === t || "selected" === t && e.dom === a() || "option" === e.tag && e.dom.parentNode === n.activeElement
                }(e, t) || "object" == typeof s)) {
                if ("o" === t[0] && "n" === t[1]) return R(e, t, s);
                if ("xlink:" === t.slice(0, 6)) e.dom.setAttributeNS("http://www.w3.org/1999/xlink", t.slice(6), s);
                else if ("style" === t) I(e.dom, r, s);
                else if (P(e, t, o)) {
                    if ("value" === t) {
                        if (("input" === e.tag || "textarea" === e.tag) && e.dom.value === "" + s && e.dom === a()) return;
                        if ("select" === e.tag && null !== r && e.dom.value === "" + s) return;
                        if ("option" === e.tag && null !== r && e.dom.value === "" + s) return
                    }
                    "input" === e.tag && "type" === t ? e.dom.setAttribute(t, s) : e.dom[t] = s
                } else "boolean" == typeof s ? s ? e.dom.setAttribute(t, "") : e.dom.removeAttribute(t) : e.dom.setAttribute("className" === t ? "class" : t, s)
            }
        }

        function D(e, t, n, r) {
            if ("key" !== t && "is" !== t && null != n && !N(t))
                if ("o" !== t[0] || "n" !== t[1] || N(t))
                    if ("style" === t) I(e.dom, n, null);
                    else if (!P(e, t, r) || "className" === t || "value" === t && ("option" === e.tag || "select" === e.tag && -1 === e.dom.selectedIndex && e.dom === a()) || "input" === e.tag && "type" === t) {
                var s = t.indexOf(":"); - 1 !== s && (t = t.slice(s + 1)), !1 !== n && e.dom.removeAttribute("className" === t ? "class" : t)
            } else e.dom[t] = null;
            else R(e, t, void 0)
        }

        function N(e) {
            return "oninit" === e || "oncreate" === e || "onupdate" === e || "onremove" === e || "onbeforeremove" === e || "onbeforeupdate" === e
        }

        function P(e, t, n) {
            return void 0 === n && (e.tag.indexOf("-") > -1 || null != e.attrs && e.attrs.is || "href" !== t && "list" !== t && "form" !== t && "width" !== t && "height" !== t) && t in e.dom
        }
        var j = /[A-Z]/g;

        function $(e) {
            return "-" + e.toLowerCase()
        }

        function _(e) {
            return "-" === e[0] && "-" === e[1] ? e : "cssFloat" === e ? "float" : e.replace(j, $)
        }

        function I(e, t, n) {
            if (t === n);
            else if (null == n) e.style.cssText = "";
            else if ("object" != typeof n) e.style.cssText = n;
            else if (null == t || "object" != typeof t)
                for (var r in e.style.cssText = "", n) {
                    null != (s = n[r]) && e.style.setProperty(_(r), String(s))
                } else {
                    for (var r in n) {
                        var s;
                        null != (s = n[r]) && (s = String(s)) !== String(t[r]) && e.style.setProperty(_(r), s)
                    }
                    for (var r in t) null != t[r] && null == n[r] && e.style.removeProperty(_(r))
                }
        }

        function z() {
            this._ = t
        }

        function R(e, t, n) {
            if (null != e.events) {
                if (e.events[t] === n) return;
                null == n || "function" != typeof n && "object" != typeof n ? (null != e.events[t] && e.dom.removeEventListener(t.slice(2), e.events, !1), e.events[t] = void 0) : (null == e.events[t] && e.dom.addEventListener(t.slice(2), e.events, !1), e.events[t] = n)
            } else null == n || "function" != typeof n && "object" != typeof n || (e.events = new z, e.dom.addEventListener(t.slice(2), e.events, !1), e.events[t] = n)
        }

        function L(e, t, n) {
            "function" == typeof e.oninit && i.call(e.oninit, t), "function" == typeof e.oncreate && n.push(i.bind(e.oncreate, t))
        }

        function M(e, t, n) {
            "function" == typeof e.onupdate && n.push(i.bind(e.onupdate, t))
        }
        return z.prototype = Object.create(null), z.prototype.handleEvent = function(e) {
                var t, n = this["on" + e.type];
                "function" == typeof n ? t = n.call(e.currentTarget, e) : "function" == typeof n.handleEvent && n.handleEvent(e), this._ && !1 !== e.redraw && (0, this._)(), !1 === t && (e.preventDefault(), e.stopPropagation())
            },
            function(e, n, r) {
                if (!e) throw new TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");
                var s = [],
                    o = a(),
                    i = e.namespaceURI;
                null == e.vnodes && (e.textContent = ""), n = x.normalizeChildren(Array.isArray(n) ? n : [n]);
                var l = t;
                try {
                    t = "function" == typeof r ? r : void 0, d(e, e.vnodes, n, s, null, "http://www.w3.org/1999/xhtml" === i ? void 0 : i)
                } finally {
                    t = l
                }
                e.vnodes = n, null != o && a() !== o && "function" == typeof o.focus && o.focus();
                for (var c = 0; c < s.length; c++) s[c]()
            }
    }(window),
    k = n,
    C = function(e, t, n) {
        var r = [],
            s = !1,
            o = !1;

        function i() {
            if (s) throw new Error("Nested m.redraw.sync() call");
            s = !0;
            for (var t = 0; t < r.length; t += 2) try {
                e(r[t], k(r[t + 1]), a)
            } catch (e) {
                n.error(e)
            }
            s = !1
        }

        function a() {
            o || (o = !0, t((function() {
                o = !1, i()
            })))
        }
        return a.sync = i, {
            mount: function(t, n) {
                if (null != n && null == n.view && "function" != typeof n) throw new TypeError("m.mount(element, component) expects a component, not a vnode");
                var s = r.indexOf(t);
                s >= 0 && (r.splice(s, 2), e(t, [], a)), null != n && (r.push(t, n), e(t, k(n), a))
            },
            redraw: a
        }
    }(O, requestAnimationFrame, console),
    E = function(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return "";
        var t = [];
        for (var n in e) r(n, e[n]);
        return t.join("&");

        function r(e, n) {
            if (Array.isArray(n))
                for (var s = 0; s < n.length; s++) r(e + "[" + s + "]", n[s]);
            else if ("[object Object]" === Object.prototype.toString.call(n))
                for (var s in n) r(e + "[" + s + "]", n[s]);
            else t.push(encodeURIComponent(e) + (null != n && "" !== n ? "=" + encodeURIComponent(n) : ""))
        }
    },
    D = Object.assign || function(e, t) {
        t && Object.keys(t).forEach((function(n) {
            e[n] = t[n]
        }))
    },
    N = E,
    P = D,
    j = function(e, t) {
        if (/:([^\/\.-]+)(\.{3})?:/.test(e)) throw new SyntaxError("Template parameter names *must* be separated");
        if (null == t) return e;
        var n = e.indexOf("?"),
            r = e.indexOf("#"),
            s = r < 0 ? e.length : r,
            o = n < 0 ? s : n,
            i = e.slice(0, o),
            a = {};
        P(a, t);
        var l = i.replace(/:([^\/\.-]+)(\.{3})?/g, (function(e, n, r) {
                return delete a[n], null == t[n] ? e : r ? t[n] : encodeURIComponent(String(t[n]))
            })),
            c = l.indexOf("?"),
            u = l.indexOf("#"),
            f = u < 0 ? l.length : u,
            d = c < 0 ? f : c,
            h = l.slice(0, d);
        n >= 0 && (h += e.slice(n, s)), c >= 0 && (h += (n < 0 ? "?" : "&") + l.slice(c, f));
        var p = N(a);
        return p && (h += (n < 0 && c < 0 ? "?" : "&") + p), r >= 0 && (h += e.slice(r)), u >= 0 && (h += (r < 0 ? "" : "&") + l.slice(u)), h
    },
    $ = j,
    _ = w.exports,
    I = function(e, t, n) {
        var r = 0;

        function s(e) {
            return new t(e)
        }

        function o(e) {
            return function(r, o) {
                "string" != typeof r ? (o = r, r = r.url) : null == o && (o = {});
                var i = new t((function(t, n) {
                    e($(r, o.params), o, (function(e) {
                        if ("function" == typeof o.type)
                            if (Array.isArray(e))
                                for (var n = 0; n < e.length; n++) e[n] = new o.type(e[n]);
                            else e = new o.type(e);
                        t(e)
                    }), n)
                }));
                if (!0 === o.background) return i;
                var a = 0;

                function l() {
                    0 == --a && "function" == typeof n && n()
                }
                return function e(t) {
                    var n = t.then;
                    return t.constructor = s, t.then = function() {
                        a++;
                        var r = n.apply(t, arguments);
                        return r.then(l, (function(e) {
                            if (l(), 0 === a) throw e
                        })), e(r)
                    }, t
                }(i)
            }
        }

        function i(e, t) {
            for (var n in e.headers)
                if ({}.hasOwnProperty.call(e.headers, n) && t.test(n)) return !0;
            return !1
        }
        return s.prototype = t.prototype, s.__proto__ = t, {
            request: o((function(t, n, r, s) {
                var o, a = null != n.method ? n.method.toUpperCase() : "GET",
                    l = n.body,
                    c = !(null != n.serialize && n.serialize !== JSON.serialize || l instanceof e.FormData),
                    u = n.responseType || ("function" == typeof n.extract ? "" : "json"),
                    f = new e.XMLHttpRequest,
                    d = !1,
                    h = f,
                    p = f.abort;
                for (var m in f.abort = function() {
                        d = !0, p.call(this)
                    }, f.open(a, t, !1 !== n.async, "string" == typeof n.user ? n.user : void 0, "string" == typeof n.password ? n.password : void 0), c && null != l && !i(n, /^content-type$/i) && f.setRequestHeader("Content-Type", "application/json; charset=utf-8"), "function" == typeof n.deserialize || i(n, /^accept$/i) || f.setRequestHeader("Accept", "application/json, text/*"), n.withCredentials && (f.withCredentials = n.withCredentials), n.timeout && (f.timeout = n.timeout), f.responseType = u, n.headers)({}).hasOwnProperty.call(n.headers, m) && f.setRequestHeader(m, n.headers[m]);
                f.onreadystatechange = function(e) {
                    if (!d && 4 === e.target.readyState) try {
                        var o, i = e.target.status >= 200 && e.target.status < 300 || 304 === e.target.status || /^file:\/\//i.test(t),
                            a = e.target.response;
                        if ("json" === u ? e.target.responseType || "function" == typeof n.extract || (a = JSON.parse(e.target.responseText)) : u && "text" !== u || null == a && (a = e.target.responseText), "function" == typeof n.extract ? (a = n.extract(e.target, n), i = !0) : "function" == typeof n.deserialize && (a = n.deserialize(a)), i) r(a);
                        else {
                            try {
                                o = e.target.responseText
                            } catch (e) {
                                o = a
                            }
                            var l = new Error(o);
                            l.code = e.target.status, l.response = a, s(l)
                        }
                    } catch (e) {
                        s(e)
                    }
                }, "function" == typeof n.config && (f = n.config(f, n, t) || f) !== h && (o = f.abort, f.abort = function() {
                    d = !0, o.call(this)
                }), null == l ? f.send() : "function" == typeof n.serialize ? f.send(n.serialize(l)) : l instanceof e.FormData ? f.send(l) : f.send(JSON.stringify(l))
            })),
            jsonp: o((function(t, n, s, o) {
                var i = n.callbackName || "_mithril_" + Math.round(1e16 * Math.random()) + "_" + r++,
                    a = e.document.createElement("script");
                e[i] = function(t) {
                    delete e[i], a.parentNode.removeChild(a), s(t)
                }, a.onerror = function() {
                    delete e[i], a.parentNode.removeChild(a), o(new Error("JSONP request failed"))
                }, a.src = t + (t.indexOf("?") < 0 ? "?" : "&") + encodeURIComponent(n.callbackKey || "callback") + "=" + encodeURIComponent(i), e.document.documentElement.appendChild(a)
            }))
        }
    }(window, _, C.redraw),
    z = function(e) {
        if ("" === e || null == e) return {};
        "?" === e.charAt(0) && (e = e.slice(1));
        for (var t = e.split("&"), n = {}, r = {}, s = 0; s < t.length; s++) {
            var o = t[s].split("="),
                i = decodeURIComponent(o[0]),
                a = 2 === o.length ? decodeURIComponent(o[1]) : "";
            "true" === a ? a = !0 : "false" === a && (a = !1);
            var l = i.split(/\]\[?|\[/),
                c = r;
            i.indexOf("[") > -1 && l.pop();
            for (var u = 0; u < l.length; u++) {
                var f = l[u],
                    d = l[u + 1],
                    h = "" == d || !isNaN(parseInt(d, 10));
                if ("" === f) null == n[i = l.slice(0, u).join()] && (n[i] = Array.isArray(c) ? c.length : 0), f = n[i]++;
                else if ("__proto__" === f) break;
                if (u === l.length - 1) c[f] = a;
                else {
                    var p = Object.getOwnPropertyDescriptor(c, f);
                    null != p && (p = p.value), null == p && (c[f] = p = h ? [] : {}), c = p
                }
            }
        }
        return r
    },
    R = z,
    L = function(e) {
        var t = e.indexOf("?"),
            n = e.indexOf("#"),
            r = n < 0 ? e.length : n,
            s = t < 0 ? r : t,
            o = e.slice(0, s).replace(/\/{2,}/g, "/");
        return o ? ("/" !== o[0] && (o = "/" + o), o.length > 1 && "/" === o[o.length - 1] && (o = o.slice(0, -1))) : o = "/", {
            path: o,
            params: t < 0 ? {} : R(e.slice(t + 1, r))
        }
    },
    M = L,
    T = n,
    U = h,
    F = w.exports,
    q = j,
    W = L,
    B = function(e) {
        var t = M(e),
            n = Object.keys(t.params),
            r = [],
            s = new RegExp("^" + t.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g, (function(e, t, n) {
                return null == t ? "\\" + e : (r.push({
                    k: t,
                    r: "..." === n
                }), "..." === n ? "(.*)" : "." === n ? "([^/]+)\\." : "([^/]+)" + (n || ""))
            })) + "$");
        return function(e) {
            for (var o = 0; o < n.length; o++)
                if (t.params[n[o]] !== e.params[n[o]]) return !1;
            if (!r.length) return s.test(e.path);
            var i = s.exec(e.path);
            if (null == i) return !1;
            for (o = 0; o < r.length; o++) e.params[r[o].k] = r[o].r ? i[o + 1] : decodeURIComponent(i[o + 1]);
            return !0
        }
    },
    V = D,
    J = {},
    K = function(e, t) {
        var n;

        function r(t, r, s) {
            if (t = q(t, r), null != n) {
                n();
                var o = s ? s.state : null,
                    i = s ? s.title : null;
                s && s.replace ? e.history.replaceState(o, i, u.prefix + t) : e.history.pushState(o, i, u.prefix + t)
            } else e.location.href = u.prefix + t
        }
        var s, o, i, a, l = J,
            c = u.SKIP = {};

        function u(f, d, h) {
            if (null == f) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined");
            var p, m = 0,
                g = Object.keys(h).map((function(e) {
                    if ("/" !== e[0]) throw new SyntaxError("Routes must start with a `/`");
                    if (/:([^\/\.-]+)(\.{3})?:/.test(e)) throw new SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`");
                    return {
                        route: e,
                        component: h[e],
                        check: B(e)
                    }
                })),
                v = "function" == typeof setImmediate ? setImmediate : setTimeout,
                y = F.resolve(),
                w = !1;
            if (n = null, null != d) {
                var b = W(d);
                if (!g.some((function(e) {
                        return e.check(b)
                    }))) throw new ReferenceError("Default route doesn't match any known routes")
            }

            function A() {
                w = !1;
                var n = e.location.hash;
                "#" !== u.prefix[0] && (n = e.location.search + n, "?" !== u.prefix[0] && "/" !== (n = e.location.pathname + n)[0] && (n = "/" + n));
                var f = n.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent).slice(u.prefix.length),
                    h = W(f);

                function p() {
                    if (f === d) throw new Error("Could not resolve default route " + d);
                    r(d, null, {
                        replace: !0
                    })
                }
                V(h.params, e.history.state),
                    function e(n) {
                        for (; n < g.length; n++)
                            if (g[n].check(h)) {
                                var r = g[n].component,
                                    u = g[n].route,
                                    d = r,
                                    v = a = function(u) {
                                        if (v === a) {
                                            if (u === c) return e(n + 1);
                                            s = null == u || "function" != typeof u.view && "function" != typeof u ? "div" : u, o = h.params, i = f, a = null, l = r.render ? r : null, 2 === m ? t.redraw() : (m = 2, t.redraw.sync())
                                        }
                                    };
                                return void(r.view || "function" == typeof r ? (r = {}, v(d)) : r.onmatch ? y.then((function() {
                                    return r.onmatch(h.params, f, u)
                                })).then(v, p) : v("div"))
                            } p()
                    }(0)
            }
            return n = function() {
                w || (w = !0, v(A))
            }, "function" == typeof e.history.pushState ? (p = function() {
                e.removeEventListener("popstate", n, !1)
            }, e.addEventListener("popstate", n, !1)) : "#" === u.prefix[0] && (n = null, p = function() {
                e.removeEventListener("hashchange", A, !1)
            }, e.addEventListener("hashchange", A, !1)), t.mount(f, {
                onbeforeupdate: function() {
                    return !(!(m = m ? 2 : 1) || J === l)
                },
                oncreate: A,
                onremove: p,
                view: function() {
                    if (m && J !== l) {
                        var e = [T(s, o.key, o)];
                        return l && (e = l.render(e[0])), e
                    }
                }
            })
        }
        return u.set = function(e, t, n) {
            null != a && ((n = n || {}).replace = !0), a = null, r(e, t, n)
        }, u.get = function() {
            return i
        }, u.prefix = "#!", u.Link = {
            view: function(e) {
                var t, n, r = e.attrs.options,
                    s = {};
                V(s, e.attrs), s.selector = s.options = s.key = s.oninit = s.oncreate = s.onbeforeupdate = s.onupdate = s.onbeforeremove = s.onremove = null;
                var o = U(e.attrs.selector || "a", s, e.children);
                return (o.attrs.disabled = Boolean(o.attrs.disabled)) ? (o.attrs.href = null, o.attrs["aria-disabled"] = "true", o.attrs.onclick = null) : (t = o.attrs.onclick, n = o.attrs.href, o.attrs.href = u.prefix + n, o.attrs.onclick = function(e) {
                    var s;
                    "function" == typeof t ? s = t.call(e.currentTarget, e) : null == t || "object" != typeof t || "function" == typeof t.handleEvent && t.handleEvent(e), !1 === s || e.defaultPrevented || 0 !== e.button && 0 !== e.which && 1 !== e.which || e.currentTarget.target && "_self" !== e.currentTarget.target || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || (e.preventDefault(), e.redraw = !1, u.set(n, null, r))
                }), o
            }
        }, u.param = function(e) {
            return o && null != e ? o[e] : o
        }, u
    }(window, C),
    H = y,
    Q = I,
    Y = C,
    G = function() {
        return H.apply(this, arguments)
    };
G.m = H, G.trust = H.trust, G.fragment = H.fragment, G.mount = Y.mount, G.route = K, G.render = O, G.redraw = Y.redraw, G.request = Q.request, G.jsonp = Q.jsonp, G.parseQueryString = z, G.buildQueryString = E, G.parsePathname = L, G.buildPathname = j, G.vnode = n, G.PromisePolyfill = A;
const Z = G,
    X = () => ({
        view: e => {
            const t = {
                    [e.attrs.page]: "active"
                },
                n = [];
            window.authorizer.hasAccess("devices", 1) && n.push(Z("li", {
                class: t.overview
            }, Z("a", {
                href: "#!/overview"
            }, "Resumen"))), window.authorizer.hasAccess("devices", 2) && n.push(Z("li", {
                class: t.devices
            }, Z("a", {
                href: "#!/devices"
            }, "Dispositivos"))), window.authorizer.hasAccess("faults", 2) && n.push(Z("li", {
                class: t.faults
            }, Z("a", {
                href: "#!/faults"
            }, "Fallos de provision")));
            const r = ["presets", "provisions", "virtualParameters", "files"];
            for (const e of r)
                if (window.authorizer.hasAccess(e, 2)) {
                    n.push(Z("li", {
                        class: t.admin
                    }, Z("a", {
                        href: "#!/admin"
                    }, "Administracion")));
                    break
                } return Z("nav", Z("ul", n))
        }
    });

function ee(e) {
    if (!(this instanceof ee)) return new ee(e);
    this._ = e
}
var te = ee.prototype;

function ne(e, t) {
    for (var n = 0; n < e; n++) t(n)
}

function re(e, t, n) {
    return function(e, t) {
        ne(t.length, (function(n) {
            e(t[n], n, t)
        }))
    }((function(n, r, s) {
        t = e(t, n, r, s)
    }), n), t
}

function se(e, t) {
    return re((function(t, n, r, s) {
        return t.concat([e(n, r, s)])
    }), [], t)
}

function oe(e) {
    var t = re((function(e, t, n, r) {
        return e.concat(n === r.length - 1 ? Buffer.from([t, 0]).readUInt16BE(0) : r.readUInt16BE(n))
    }), [], e);
    return Buffer.from(se((function(e) {
        return (e << 1 & 65535) >> 8
    }), t))
}

function ie(e) {
    return e[0] >> 7
}

function ae() {
    return "undefined" != typeof Buffer
}

function le() {
    if (!ae()) throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.")
}

function ce(e) {
    le();
    var t = re((function(e, t) {
        return e + t
    }), 0, e);
    if (t % 8 != 0) throw new Error("The bits [" + e.join(", ") + "] add up to " + t + " which is not an even number of bytes; the total should be divisible by 8");
    var n, r = t / 8,
        s = (n = function(e) {
            return e > 48
        }, re((function(e, t) {
            return e || (n(t) ? t : e)
        }), null, e));
    if (s) throw new Error(s + " bit range requested exceeds 48 bit (6 byte) Number max.");
    return new ee((function(t, n) {
        var s = r + n;
        return s > t.length ? Ae(n, r.toString() + " bytes") : be(s, re((function(e, t) {
            var n = function(e, t) {
                var n = {
                    v: 0,
                    buf: t
                };
                return ne(e, (function() {
                    n = {
                        v: n.v << 1 | ie(n.buf),
                        buf: oe(n.buf)
                    }
                })), n
            }(t, e.buf);
            return {
                coll: e.coll.concat(n.v),
                buf: n.buf
            }
        }), {
            coll: [],
            buf: t.slice(n, s)
        }, e).coll)
    }))
}

function ue(e, t) {
    return new ee((function(n, r) {
        return le(), r + t > n.length ? Ae(r, t + " bytes for " + e) : be(r + t, n.slice(r, r + t))
    }))
}

function fe(e, t) {
    if ("number" != typeof(n = t) || Math.floor(n) !== n || t < 0 || t > 6) throw new Error(e + " requires integer length in range [0, 6].");
    var n
}

function de(e) {
    return fe("uintBE", e), ue("uintBE(" + e + ")", e).map((function(t) {
        return t.readUIntBE(0, e)
    }))
}

function he(e) {
    return fe("uintLE", e), ue("uintLE(" + e + ")", e).map((function(t) {
        return t.readUIntLE(0, e)
    }))
}

function pe(e) {
    return fe("intBE", e), ue("intBE(" + e + ")", e).map((function(t) {
        return t.readIntBE(0, e)
    }))
}

function me(e) {
    return fe("intLE", e), ue("intLE(" + e + ")", e).map((function(t) {
        return t.readIntLE(0, e)
    }))
}

function ge(e) {
    return Array.prototype.slice.call(e)
}

function ve(e) {
    return e instanceof ee
}

function ye(e) {
    return "[object Array]" === {}.toString.call(e)
}

function we(e) {
    return ae() && Buffer.isBuffer(e)
}

function be(e, t) {
    return {
        status: !0,
        index: e,
        value: t,
        furthest: -1,
        expected: []
    }
}

function Ae(e, t) {
    return ye(t) || (t = [t]), {
        status: !1,
        index: -1,
        value: null,
        furthest: e,
        expected: t
    }
}

function Se(e, t) {
    if (!t) return e;
    if (e.furthest > t.furthest) return e;
    var n = e.furthest === t.furthest ? function(e, t) {
        if (function() {
                if (void 0 !== ee._supportsSet) return ee._supportsSet;
                var e = "undefined" != typeof Set;
                return ee._supportsSet = e, e
            }() && Array.from) {
            for (var n = new Set(e), r = 0; r < t.length; r++) n.add(t[r]);
            var s = Array.from(n);
            return s.sort(), s
        }
        for (var o = {}, i = 0; i < e.length; i++) o[e[i]] = !0;
        for (var a = 0; a < t.length; a++) o[t[a]] = !0;
        var l = [];
        for (var c in o)({}).hasOwnProperty.call(o, c) && l.push(c);
        return l.sort(), l
    }(e.expected, t.expected) : t.expected;
    return {
        status: e.status,
        index: e.index,
        value: e.value,
        furthest: t.furthest,
        expected: n
    }
}
var xe = {};

function Oe(e, t) {
    if (we(e)) return {
        offset: t,
        line: -1,
        column: -1
    };
    e in xe || (xe[e] = {});
    for (var n = xe[e], r = 0, s = 0, o = 0, i = t; i >= 0;) {
        if (i in n) {
            r = n[i].line, 0 === o && (o = n[i].lineStart);
            break
        }
        "\n" === e.charAt(i) && (s++, 0 === o && (o = i + 1)), i--
    }
    var a = r + s,
        l = t - o;
    return n[t] = {
        line: a,
        lineStart: o
    }, {
        offset: t,
        line: a + 1,
        column: l + 1
    }
}

function ke(e) {
    if (!ve(e)) throw new Error("not a parser: " + e)
}

function Ce(e, t) {
    return "string" == typeof e ? e.charAt(t) : e[t]
}

function Ee(e) {
    if ("number" != typeof e) throw new Error("not a number: " + e)
}

function De(e) {
    if (!(e instanceof RegExp)) throw new Error("not a regexp: " + e);
    for (var t = Re(e), n = 0; n < t.length; n++) {
        var r = t.charAt(n);
        if ("i" !== r && "m" !== r && "u" !== r && "s" !== r) throw new Error('unsupported regexp flag "' + r + '": ' + e)
    }
}

function Ne(e) {
    if ("function" != typeof e) throw new Error("not a function: " + e)
}

function Pe(e) {
    if ("string" != typeof e) throw new Error("not a string: " + e)
}

function je(e, t) {
    return new Array(t + 1).join(e)
}

function $e(e, t, n) {
    var r = t - e.length;
    return r <= 0 ? e : je(n, r) + e
}

function _e(e, t, n, r) {
    return {
        from: e - t > 0 ? e - t : 0,
        to: e + n > r ? r : e + n
    }
}

function Ie(e, t) {
    var n, r, s, o, i, a = t.index,
        l = a.offset,
        c = 1;
    if (l === e.length) return "Got the end of the input";
    if (we(e)) {
        var u = l - l % 8,
            f = l - u,
            d = _e(u, 40, 40, e.length),
            h = function(e, t) {
                var n = e.length,
                    r = [],
                    s = 0;
                if (n <= t) return [e.slice()];
                for (var o = 0; o < n; o++) r[s] || r.push([]), r[s].push(e[o]), (o + 1) % t == 0 && s++;
                return r
            }(e.slice(d.from, d.to).toJSON().data, 8),
            p = se((function(e) {
                return se((function(e) {
                    return $e(e.toString(16), 2, "0")
                }), e)
            }), h);
        o = function(e) {
            return 0 === e.from && 1 === e.to ? {
                from: e.from,
                to: e.to
            } : {
                from: e.from / 8,
                to: Math.floor(e.to / 8)
            }
        }(d), r = u / 8, n = 3 * f, f >= 4 && (n += 1), c = 2, s = se((function(e) {
            return e.length <= 4 ? e.join(" ") : e.slice(0, 4).join(" ") + "  " + e.slice(4).join(" ")
        }), p), (i = (8 * (o.to > 0 ? o.to - 1 : o.to)).toString(16).length) < 2 && (i = 2)
    } else {
        var m = e.split(/\r\n|[\n\r\u2028\u2029]/);
        n = a.column - 1, r = a.line - 1, o = _e(r, 2, 3, m.length), s = m.slice(o.from, o.to), i = o.to.toString().length
    }
    var g = r - o.from;
    we(e) && (i = (8 * (o.to > 0 ? o.to - 1 : o.to)).toString(16).length) < 2 && (i = 2);
    var v = re((function(t, r, s) {
        var a, l = s === g,
            u = l ? "> " : "  ";
        return a = we(e) ? $e((8 * (o.from + s)).toString(16), i, "0") : $e((o.from + s + 1).toString(), i, " "), [].concat(t, [u + a + " | " + r], l ? ["  " + je(" ", i) + " | " + $e("", n, " ") + je("^", c)] : [])
    }), [], s);
    return v.join("\n")
}

function ze(e, t) {
    return ["\n", "-- PARSING FAILED " + je("-", 50), "\n\n", Ie(e, t), "\n\n", (n = t.expected, 1 === n.length ? "Expected:\n\n" + n[0] : "Expected one of the following: \n\n" + n.join(", ")), "\n"].join("");
    var n
}

function Re(e) {
    return void 0 !== e.flags ? e.flags : [e.global ? "g" : "", e.ignoreCase ? "i" : "", e.multiline ? "m" : "", e.unicode ? "u" : "", e.sticky ? "y" : ""].join("")
}

function Le(e) {
    return RegExp("^(?:" + e.source + ")", Re(e))
}

function Me() {
    for (var e = [].slice.call(arguments), t = e.length, n = 0; n < t; n += 1) ke(e[n]);
    return ee((function(n, r) {
        for (var s, o = new Array(t), i = 0; i < t; i += 1) {
            if (!(s = Se(e[i]._(n, r), s)).status) return s;
            o[i] = s.value, r = s.index
        }
        return Se(be(r, o), s)
    }))
}

function Te() {
    var e = [].slice.call(arguments);
    if (0 === e.length) throw new Error("seqMap needs at least one argument");
    var t = e.pop();
    return Ne(t), Me.apply(null, e).map((function(e) {
        return t.apply(null, e)
    }))
}

function Ue() {
    var e = [].slice.call(arguments),
        t = e.length;
    if (0 === t) return Je("zero alternates");
    for (var n = 0; n < t; n += 1) ke(e[n]);
    return ee((function(t, n) {
        for (var r, s = 0; s < e.length; s += 1)
            if ((r = Se(e[s]._(t, n), r)).status) return r;
        return r
    }))
}

function Fe(e, t) {
    return qe(e, t).or(Ve([]))
}

function qe(e, t) {
    return ke(e), ke(t), Te(e, t.then(e).many(), (function(e, t) {
        return [e].concat(t)
    }))
}

function We(e) {
    Pe(e);
    var t = "'" + e + "'";
    return ee((function(n, r) {
        var s = r + e.length,
            o = n.slice(r, s);
        return o === e ? be(s, o) : Ae(r, t)
    }))
}

function Be(e, t) {
    De(e), arguments.length >= 2 ? Ee(t) : t = 0;
    var n = Le(e),
        r = "" + e;
    return ee((function(e, s) {
        var o = n.exec(e.slice(s));
        if (o) {
            if (0 <= t && t <= o.length) {
                var i = o[0],
                    a = o[t];
                return be(s + i.length, a)
            }
            return Ae(s, "valid match group (0 to " + o.length + ") in " + r)
        }
        return Ae(s, r)
    }))
}

function Ve(e) {
    return ee((function(t, n) {
        return be(n, e)
    }))
}

function Je(e) {
    return ee((function(t, n) {
        return Ae(n, e)
    }))
}

function Ke(e) {
    if (ve(e)) return ee((function(t, n) {
        var r = e._(t, n);
        return r.index = n, r.value = "", r
    }));
    if ("string" == typeof e) return Ke(We(e));
    if (e instanceof RegExp) return Ke(Be(e));
    throw new Error("not a string, regexp, or parser: " + e)
}

function He(e) {
    return ke(e), ee((function(t, n) {
        var r = e._(t, n),
            s = t.slice(n, r.index);
        return r.status ? Ae(n, 'not "' + s + '"') : be(n, null)
    }))
}

function Qe(e) {
    return Ne(e), ee((function(t, n) {
        var r = Ce(t, n);
        return n < t.length && e(r) ? be(n + 1, r) : Ae(n, "a character/byte matching " + e)
    }))
}

function Ye(e, t) {
    arguments.length < 2 && (t = e, e = void 0);
    var n = ee((function(e, r) {
        return n._ = t()._, n._(e, r)
    }));
    return e ? n.desc(e) : n
}

function Ge() {
    return Je("fantasy-land/empty")
}
te.parse = function(e) {
    if ("string" != typeof e && !we(e)) throw new Error(".parse must be called with a string or Buffer as its argument");
    var t, n = this.skip(tt)._(e, 0);
    return t = n.status ? {
        status: !0,
        value: n.value
    } : {
        status: !1,
        index: Oe(e, n.furthest),
        expected: n.expected
    }, delete xe[e], t
}, te.tryParse = function(e) {
    var t = this.parse(e);
    if (t.status) return t.value;
    var n = ze(e, t),
        r = new Error(n);
    throw r.type = "ParsimmonError", r.result = t, r
}, te.assert = function(e, t) {
    return this.chain((function(n) {
        return e(n) ? Ve(n) : Je(t)
    }))
}, te.or = function(e) {
    return Ue(this, e)
}, te.trim = function(e) {
    return this.wrap(e, e)
}, te.wrap = function(e, t) {
    return Te(e, this, t, (function(e, t) {
        return t
    }))
}, te.thru = function(e) {
    return e(this)
}, te.then = function(e) {
    return ke(e), Me(this, e).map((function(e) {
        return e[1]
    }))
}, te.many = function() {
    var e = this;
    return ee((function(t, n) {
        for (var r = [], s = void 0;;) {
            if (!(s = Se(e._(t, n), s)).status) return Se(be(n, r), s);
            if (n === s.index) throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");
            n = s.index, r.push(s.value)
        }
    }))
}, te.tieWith = function(e) {
    return Pe(e), this.map((function(t) {
        if (function(e) {
                if (!ye(e)) throw new Error("not an array: " + e)
            }(t), t.length) {
            Pe(t[0]);
            for (var n = t[0], r = 1; r < t.length; r++) Pe(t[r]), n += e + t[r];
            return n
        }
        return ""
    }))
}, te.tie = function() {
    return this.tieWith("")
}, te.times = function(e, t) {
    var n = this;
    return arguments.length < 2 && (t = e), Ee(e), Ee(t), ee((function(r, s) {
        for (var o = [], i = void 0, a = void 0, l = 0; l < e; l += 1) {
            if (a = Se(i = n._(r, s), a), !i.status) return a;
            s = i.index, o.push(i.value)
        }
        for (; l < t && (a = Se(i = n._(r, s), a), i.status); l += 1) s = i.index, o.push(i.value);
        return Se(be(s, o), a)
    }))
}, te.result = function(e) {
    return this.map((function() {
        return e
    }))
}, te.atMost = function(e) {
    return this.times(0, e)
}, te.atLeast = function(e) {
    return Te(this.times(e), this.many(), (function(e, t) {
        return e.concat(t)
    }))
}, te.map = function(e) {
    Ne(e);
    var t = this;
    return ee((function(n, r) {
        var s = t._(n, r);
        return s.status ? Se(be(s.index, e(s.value)), s) : s
    }))
}, te.contramap = function(e) {
    Ne(e);
    var t = this;
    return ee((function(n, r) {
        var s = t.parse(e(n.slice(r)));
        return s.status ? be(r + n.length, s.value) : s
    }))
}, te.promap = function(e, t) {
    return Ne(e), Ne(t), this.contramap(e).map(t)
}, te.skip = function(e) {
    return Me(this, e).map((function(e) {
        return e[0]
    }))
}, te.mark = function() {
    return Te(Ze, this, Ze, (function(e, t, n) {
        return {
            start: e,
            value: t,
            end: n
        }
    }))
}, te.node = function(e) {
    return Te(Ze, this, Ze, (function(t, n, r) {
        return {
            name: e,
            value: n,
            start: t,
            end: r
        }
    }))
}, te.sepBy = function(e) {
    return Fe(this, e)
}, te.sepBy1 = function(e) {
    return qe(this, e)
}, te.lookahead = function(e) {
    return this.skip(Ke(e))
}, te.notFollowedBy = function(e) {
    return this.skip(He(e))
}, te.desc = function(e) {
    ye(e) || (e = [e]);
    var t = this;
    return ee((function(n, r) {
        var s = t._(n, r);
        return s.status || (s.expected = e), s
    }))
}, te.fallback = function(e) {
    return this.or(Ve(e))
}, te.ap = function(e) {
    return Te(e, this, (function(e, t) {
        return e(t)
    }))
}, te.chain = function(e) {
    var t = this;
    return ee((function(n, r) {
        var s = t._(n, r);
        return s.status ? Se(e(s.value)._(n, s.index), s) : s
    }))
}, te.concat = te.or, te.empty = Ge, te.of = Ve, te["fantasy-land/ap"] = te.ap, te["fantasy-land/chain"] = te.chain, te["fantasy-land/concat"] = te.concat, te["fantasy-land/empty"] = te.empty, te["fantasy-land/of"] = te.of, te["fantasy-land/map"] = te.map;
var Ze = ee((function(e, t) {
        return be(t, Oe(e, t))
    })),
    Xe = ee((function(e, t) {
        return t >= e.length ? Ae(t, "any character/byte") : be(t + 1, Ce(e, t))
    })),
    et = ee((function(e, t) {
        return be(e.length, e.slice(t))
    })),
    tt = ee((function(e, t) {
        return t < e.length ? Ae(t, "EOF") : be(t, null)
    })),
    nt = Be(/[0-9]/).desc("a digit"),
    rt = Be(/[0-9]*/).desc("optional digits"),
    st = Be(/[a-z]/i).desc("a letter"),
    ot = Be(/[a-z]*/i).desc("optional letters"),
    it = Be(/\s*/).desc("optional whitespace"),
    at = Be(/\s+/).desc("whitespace"),
    lt = We("\r"),
    ct = We("\n"),
    ut = We("\r\n"),
    ft = Ue(ut, ct, lt).desc("newline"),
    dt = Ue(ft, tt);
ee.all = et, ee.alt = Ue, ee.any = Xe, ee.cr = lt, ee.createLanguage = function(e) {
    var t = {};
    for (var n in e)({}).hasOwnProperty.call(e, n) && function(n) {
        t[n] = Ye((function() {
            return e[n](t)
        }))
    }(n);
    return t
}, ee.crlf = ut, ee.custom = function(e) {
    return ee(e(be, Ae))
}, ee.digit = nt, ee.digits = rt, ee.empty = Ge, ee.end = dt, ee.eof = tt, ee.fail = Je, ee.formatError = ze, ee.index = Ze, ee.isParser = ve, ee.lazy = Ye, ee.letter = st, ee.letters = ot, ee.lf = ct, ee.lookahead = Ke, ee.makeFailure = Ae, ee.makeSuccess = be, ee.newline = ft, ee.noneOf = function(e) {
    return Qe((function(t) {
        return e.indexOf(t) < 0
    })).desc("none of '" + e + "'")
}, ee.notFollowedBy = He, ee.of = Ve, ee.oneOf = function(e) {
    for (var t = e.split(""), n = 0; n < t.length; n++) t[n] = "'" + t[n] + "'";
    return Qe((function(t) {
        return e.indexOf(t) >= 0
    })).desc(t)
}, ee.optWhitespace = it, ee.Parser = ee, ee.range = function(e, t) {
    return Qe((function(n) {
        return e <= n && n <= t
    })).desc(e + "-" + t)
}, ee.regex = Be, ee.regexp = Be, ee.sepBy = Fe, ee.sepBy1 = qe, ee.seq = Me, ee.seqMap = Te, ee.seqObj = function() {
    for (var e = {}, t = 0, n = ge(arguments), r = n.length, s = 0; s < r; s += 1) {
        var o = n[s];
        if (!ve(o)) {
            if (ye(o)) {
                var i = 2 === o.length && "string" == typeof o[0] && ve(o[1]);
                if (i) {
                    var a = o[0];
                    if (Object.prototype.hasOwnProperty.call(e, a)) throw new Error("seqObj: duplicate key " + a);
                    e[a] = !0, t++;
                    continue
                }
            }
            throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.")
        }
    }
    if (0 === t) throw new Error("seqObj expects at least one named parser, found zero");
    return ee((function(e, t) {
        for (var s, o = {}, i = 0; i < r; i += 1) {
            var a, l;
            if (ye(n[i]) ? (a = n[i][0], l = n[i][1]) : (a = null, l = n[i]), !(s = Se(l._(e, t), s)).status) return s;
            a && (o[a] = s.value), t = s.index
        }
        return Se(be(t, o), s)
    }))
}, ee.string = We, ee.succeed = Ve, ee.takeWhile = function(e) {
    return Ne(e), ee((function(t, n) {
        for (var r = n; r < t.length && e(Ce(t, r));) r++;
        return be(r, t.slice(n, r))
    }))
}, ee.test = Qe, ee.whitespace = at, ee["fantasy-land/empty"] = Ge, ee["fantasy-land/of"] = Ve, ee.Binary = {
    bitSeq: ce,
    bitSeqObj: function(e) {
        le();
        var t = {},
            n = 0,
            r = se((function(e) {
                if (ye(e)) {
                    var r = e;
                    if (2 !== r.length) throw new Error("[" + r.join(", ") + "] should be length 2, got length " + r.length);
                    if (Pe(r[0]), Ee(r[1]), Object.prototype.hasOwnProperty.call(t, r[0])) throw new Error("duplicate key in bitSeqObj: " + r[0]);
                    return t[r[0]] = !0, n++, r
                }
                return Ee(e), [null, e]
            }), e);
        if (n < 1) throw new Error("bitSeqObj expects at least one named pair, got [" + e.join(", ") + "]");
        var s = se((function(e) {
            return e[0]
        }), r);
        return ce(se((function(e) {
            return e[1]
        }), r)).map((function(e) {
            return re((function(e, t) {
                return null !== t[0] && (e[t[0]] = t[1]), e
            }), {}, se((function(t, n) {
                return [t, e[n]]
            }), s))
        }))
    },
    byte: function(e) {
        if (le(), Ee(e), e > 255) throw new Error("Value specified to byte constructor (" + e + "=0x" + e.toString(16) + ") is larger in value than a single byte.");
        var t = (e > 15 ? "0x" : "0x0") + e.toString(16);
        return ee((function(n, r) {
            var s = Ce(n, r);
            return s === e ? be(r + 1, s) : Ae(r, t)
        }))
    },
    buffer: function(e) {
        return ue("buffer", e).map((function(e) {
            return Buffer.from(e)
        }))
    },
    encodedString: function(e, t) {
        return ue("string", t).map((function(t) {
            return t.toString(e)
        }))
    },
    uintBE: de,
    uint8BE: de(1),
    uint16BE: de(2),
    uint32BE: de(4),
    uintLE: he,
    uint8LE: he(1),
    uint16LE: he(2),
    uint32LE: he(4),
    intBE: pe,
    int8BE: pe(1),
    int16BE: pe(2),
    int32BE: pe(4),
    intLE: me,
    int8LE: me(1),
    int16LE: me(2),
    int32LE: me(4),
    floatBE: ue("floatBE", 4).map((function(e) {
        return e.readFloatBE(0)
    })),
    floatLE: ue("floatLE", 4).map((function(e) {
        return e.readFloatLE(0)
    })),
    doubleBE: ue("doubleBE", 8).map((function(e) {
        return e.readDoubleBE(0)
    })),
    doubleLE: ue("doubleLE", 8).map((function(e) {
        return e.readDoubleLE(0)
    }))
};
const ht = ee;

function pt(e) {
    const t = {
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "\t"
    };
    return e.replace(/\\(u[0-9a-fA-F]{4}|[^u])/g, ((e, n) => {
        const r = n.charAt(0),
            s = n.slice(1);
        return "u" === r ? String.fromCharCode(parseInt(s, 16)) : t.hasOwnProperty(r) ? t[r] : r
    }))
}

function mt(e, t) {
    if (!Array.isArray(e)) return t(e);
    let n;
    for (let r = 1; r < e.length; ++r) {
        const s = mt(e[r], t);
        s !== e[r] && (n = n || e.slice(), n[r] = s)
    }
    return t(n || e)
}

function gt(e, t) {
    return ht.seqMap(t, ht.seq(e, t).many(), ((e, t) => t.reduce(((e, t) => {
        const [n, r] = t;
        return Array.isArray(e) && n === e[0] ? e.concat([r]) : [n, e, r]
    }), e)))
}
const vt = ht.createLanguage({
    ComparisonOperator: function() {
        return ht.alt(ht.string(">="), ht.string("<>"), ht.string("<="), ht.string("="), ht.string(">"), ht.string("<")).skip(ht.optWhitespace)
    },
    LikeOperator: function() {
        return ht.alt(ht.regexp(/like/i).result("LIKE").desc("LIKE"), ht.regexp(/not\s+like/i).result("NOT LIKE").desc("NOT LIKE")).notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace)
    },
    IsNullOperator: function() {
        return ht.alt(ht.regexp(/is\s+null/i).result("IS NULL").desc("IS NULL"), ht.regexp(/is\s+not\s+null/i).result("IS NOT NULL").desc("IS NOT NULL")).notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace)
    },
    NotOperator: function() {
        return ht.regexp(/not/i).result("NOT").notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace).desc("NOT")
    },
    AndOperator: function() {
        return ht.regexp(/and/i).result("AND").notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace).desc("AND")
    },
    OrOperator: function() {
        return ht.regexp(/or/i).result("OR").notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace).desc("OR")
    },
    Parameter: function(e) {
        return ht.alt(ht.regexp(/[a-zA-Z0-9_.*-]+/), e.Expression.wrap(ht.string("{").skip(ht.optWhitespace), ht.string("}"))).atLeast(1).map((e => ["PARAM", e.length > 1 ? ["||"].concat(e) : e[0]])).skip(ht.optWhitespace).desc("parameter")
    },
    StringValueSql: function() {
        return ht.regexp(/'([^']*)'/, 1).atLeast(1).skip(ht.optWhitespace).map((e => e.join("'"))).desc("string")
    },
    StringValueJs: function() {
        return ht.regexp(/"((?:\\.|.)*?)"/, 1).skip(ht.optWhitespace).map(pt).desc("string")
    },
    NumberValue: function() {
        return ht.regexp(/-?(0|[1-9][0-9]*)([.][0-9]+)?([eE][+-]?[0-9]+)?/).notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace).map(Number).desc("number")
    },
    BooleanValue: function() {
        return ht.alt(ht.regexp(/true/i).result(!0).desc("TRUE"), ht.regexp(/false/i).result(!1).desc("FALSE")).notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace)
    },
    NullValue: function() {
        return ht.regexp(/null/i).notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace).result(null).desc("NULL")
    },
    FuncValue: function(e) {
        return ht.seqMap(ht.regexp(/([a-zA-Z0-9_]+)/, 1).skip(ht.optWhitespace).desc("function"), e.ExpressionList.wrap(ht.string("(").skip(ht.optWhitespace), ht.string(")").skip(ht.optWhitespace)), ((e, t) => ["FUNC", e.toUpperCase()].concat(t)))
    },
    WhenPair: function(e) {
        return ht.seq(ht.regexp(/when/i).notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace).desc("WHEN").then(e.Expression), ht.regexp(/then/i).notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace).desc("THEN").then(e.Expression))
    },
    CaseStatement: function(e) {
        return ht.seqMap(ht.regexp(/case/i).result("CASE").notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace).desc("CASE"), e.WhenPair.many(), ht.regexp(/else/i).notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/)).skip(ht.optWhitespace).desc("ELSE").then(e.Expression).map((e => [
            [!0, e]
        ])).fallback(null).skip(ht.regex(/end/i).notFollowedBy(ht.regexp(/[a-zA-Z0-9_]/))).skip(ht.optWhitespace), ((...e) => e.flat(2)))
    },
    Value: function(e) {
        return ht.alt(e.NullValue, e.BooleanValue, e.NumberValue, e.StringValueSql, e.StringValueJs, e.FuncValue, e.CaseStatement)
    },
    ValueExpression: function(e) {
        return gt(ht.string("||").skip(ht.optWhitespace), gt(ht.alt(ht.string("+"), ht.string("-")).skip(ht.optWhitespace), gt(ht.alt(ht.string("*"), ht.string("/"), ht.string("%")).skip(ht.optWhitespace), ht.alt(e.Value, e.Parameter, e.Expression.wrap(ht.string("(").skip(ht.optWhitespace), ht.string(")").skip(ht.optWhitespace))))))
    },
    Comparison: function(e) {
        return ht.alt(ht.seqMap(e.ValueExpression, e.IsNullOperator, ((e, t) => [t, e])), ht.seqMap(e.ValueExpression, e.ComparisonOperator, e.ValueExpression, ((e, t, n) => [t, e, n])), ht.seqMap(e.ValueExpression, e.LikeOperator, e.ValueExpression.skip(ht.regexp(/escape/i).result("ESCAPE").skip(ht.whitespace).desc("ESCAPE")), e.ValueExpression, ((e, t, n, r) => [t, e, n, r])), ht.seqMap(e.ValueExpression, e.LikeOperator, e.ValueExpression, ((e, t, n) => [t, e, n])))
    },
    ExpressionList: function(e) {
        return e.Expression.sepBy(ht.string(",").skip(ht.optWhitespace))
    },
    Expression: function(e) {
        return gt(e.OrOperator, gt(e.AndOperator, (t = e.NotOperator, n = e.Comparison.or(e.ValueExpression), ht.seq(t, n).or(n)))).trim(ht.optWhitespace);
        var t, n
    }
});

function yt(e) {
    return e ? vt.Expression.tryParse(e) : null
}

function wt(e, t = 0) {
    if (!Array.isArray(e)) return JSON.stringify(e);
    const n = {
            OR: 10,
            AND: 11,
            NOT: 12,
            "=": 20,
            "<>": 20,
            ">": 20,
            ">=": 20,
            "<": 20,
            "<=": 20,
            LIKE: 20,
            "NOT LIKE": 20,
            "IS NULL": 20,
            "IS NOT NULL": 20,
            "||": 30,
            "+": 31,
            "-": 31,
            "*": 32,
            "/": 32,
            "%": 32
        },
        r = e[0].toUpperCase();

    function s(e) {
        return n[r] <= t ? `(${e})` : e
    }
    if ("FUNC" === r) return s(`${e[1]}(${e.slice(2).map((e=>wt(e))).join(", ")})`);
    if ("PARAM" === r) return "string" == typeof e[1] ? s(e[1]) : Array.isArray(e[1]) && "||" === e[1][0] ? s(e[1].slice(1).map((e => "string" == typeof e ? e : `{${wt(e)}}`)).join("")) : s(`{${wt(e[1])}}`);
    if ("IS NULL" === r || "IS NOT NULL" === r) return s(`${wt(e[1],n[r])} ${r}`);
    if ("LIKE" === r || "NOT LIKE" === r) return e[3] ? s(`${wt(e[1],n[r])} ${r} ${wt(e[2],n[r])} ESCAPE ${wt(e[3],n[r])}`) : s(`${wt(e[1],n[r])} ${r} ${wt(e[2],n[r])}`);
    if ("CASE" === r) {
        const t = ["CASE"];
        for (let n = 1; n < e.length - 1; n += 2) {
            if (!Array.isArray(e[n]) && e[n]) {
                null != e[n + 1] && t.push("ELSE", wt(e[n + 1]));
                break
            }
            t.push("WHEN", wt(e[n]), "THEN", wt(e[n + 1]))
        }
        return t.push("END"), t.join(" ")
    }
    if (r in n) {
        const t = e.slice(1).map(((t, r) => wt(t, n[e[0]] + Math.min(r - 1, 0))));
        return s("NOT" === r ? `${r} ${t[0]}` : t.join(` ${r} `))
    }
    throw new Error(`Unrecognized operator ${e[0]}`)
}
const bt = Array.isArray,
    At = new WeakMap,
    St = {};

function xt(e, t) {
    let n = !0;
    for (; n;) {
        n = !1;
        for (let r = 2; r < e.length; ++r) {
            const s = t(e[r - 1], e[r], r - 2);
            s !== St && (n = !0, (e = e.slice()).splice(r - 1, 2, s))
        }
    }
    return 2 === e.length ? e[1] : e
}

function Ot(e, t = "", n = "") {
    const r = {
        "-": "\\-",
        "/": "\\/",
        "\\": "\\/",
        "^": "\\^",
        $: "\\$",
        "*": "\\*",
        "+": "\\+",
        "?": "\\?",
        ".": "\\.",
        "(": "\\(",
        ")": "\\)",
        "|": "\\|",
        "[": "\\[",
        "]": "\\]",
        "{": "\\{",
        "}": "\\}",
        "\\%": ".*",
        "\\_": "."
    };
    let s = function(e, t) {
        const n = e.split("");
        for (let e = 0; e < n.length; ++e) {
            const r = n[e];
            if (r === t) n[e] = n[e + 1] || "", n[e + 1] = "";
            else if ("_" === r) n[e] = "\\_";
            else if ("%" === r)
                for (n[e] = "\\%";
                    "%" === n[e + 1];) n[++e] = ""
        }
        return n.filter((e => e))
    }(e, t);
    if (!s.length) return new RegExp("^$", n);
    s = s.map((e => r[e] || e)), s[0] = ".*" === s[0] ? "" : "^" + s[0];
    const o = s.length - 1;
    return s[o] = [".*", ""].includes(s[o]) ? "" : s[o] + "$", new RegExp(s.join(""), n)
}

function kt(e, t) {
    return "boolean" == typeof e && (e = +e), "boolean" == typeof t && (t = +t), typeof e != typeof t ? "string" == typeof e ? 1 : -1 : e > t ? 1 : e < t ? -1 : 0
}

function Ct(e) {
    switch (typeof e) {
        case "number":
            return e;
        case "boolean":
            return +e;
        case "string":
            return parseFloat(e) || 0
    }
}

function Et(e) {
    switch (typeof e) {
        case "string":
            return e;
        case "number":
            return e.toString();
        case "boolean":
            return (+e).toString()
    }
}

function Dt(e) {
    if (!Array.isArray(e)) return e;
    if ("CASE" === e[0]) {
        for (let t = 1; t < e.length; t += 2) {
            if (Array.isArray(e[t])) return e;
            if (e[t]) return e[t + 1]
        }
        return null
    }
    if ("FUNC" === e[0]) {
        if ("COALESCE" === e[1]) {
            const t = [];
            for (let n = 2; n < e.length; ++n) {
                const r = e[n];
                if (null != r && (t.push(r), !Array.isArray(r))) break
            }
            return t.length ? 1 === t.length ? t[0] : ["FUNC", "COALESCE", ...t] : null
        }
        if ("UPPER" === e[1]) {
            if (null == e[2]) return null;
            if (!bt(e[2])) return Et(e[2]).toUpperCase()
        } else if ("LOWER" === e[1]) {
            if (null == e[2]) return null;
            if (!bt(e[2])) return Et(e[2]).toLowerCase()
        } else if ("ROUND" === e[1]) {
            const t = e[2],
                n = e.length > 3 ? e[3] : 0;
            if (null == t || null == n) return null;
            if (!bt(t) && !bt(n)) {
                const e = 10 ** n,
                    r = t * e * (1 + Number.EPSILON);
                return Math.round(r) / e
            }
        }
    } else if ("PARAM" === e[0]) {
        if (null == e[1]) return null
    } else {
        if ("AND" === e[0]) {
            for (let t = 1; t < e.length; ++t)
                if (!Array.isArray(e[t]) && null != e[t] && !e[t]) return !1;
            const t = [];
            for (let n = 1; n < e.length; ++n) {
                const r = e[n];
                if (null == r) return null;
                Array.isArray(r) && ("AND" === r[0] ? t.push(...r.slice(1)) : t.push(r))
            }
            return !t.length || (1 === t.length && t.push(!0), ["AND", ...t])
        }
        if ("OR" === e[0]) {
            const t = [];
            for (let n = 1; n < e.length; ++n) {
                const r = e[n];
                if (Array.isArray(r)) "OR" === r[0] ? t.push(...r.slice(1)) : t.push(r);
                else if (r) return !0
            }
            return t.length ? (1 === t.length && t.push(!1), ["OR", ...t]) : !!e.some((e => null == e)) && null
        }
        if ("NOT" === e[0]) {
            if (null == e[1]) return null;
            if (!bt(e[1])) return !e[1];
            if ("NOT" === e[1][0]) return e[1][1]
        } else {
            if ("IS NULL" === e[0]) return bt(e[1]) ? e : null == e[1];
            if ("IS NOT NULL" === e[0]) return bt(e[1]) ? e : null != e[1];
            if ("LIKE" === e[0]) {
                if (bt(e[1]) || bt(e[2]) || bt(e[3])) return e;
                if (null == e[1] || null == e[2] || e.length >= 4 && null == e[3]) return null;
                let t = At.get(e);
                return t || (t = Ot(e[2], e[3]), At.set(e, t)), t.test(e[1])
            }
            if ("NOT LIKE" === e[0]) {
                if (bt(e[1]) || bt(e[2]) || bt(e[3])) return e;
                if (null == e[1] || null == e[2] || e.length >= 4 && null == e[3]) return null;
                let t = At.get(e);
                return t || (t = Ot(e[2], e[3]), At.set(e, t)), !t.test(e[1])
            }
            if ("=" === e[0]) return null == e[1] || null == e[2] ? null : bt(e[1]) || bt(e[2]) ? e : 0 === kt(e[1], e[2]);
            if ("<>" === e[0]) return null == e[1] || null == e[2] ? null : bt(e[1]) || bt(e[2]) ? e : 0 !== kt(e[1], e[2]);
            if (">" === e[0]) return null == e[1] || null == e[2] ? null : bt(e[1]) || bt(e[2]) ? e : kt(e[1], e[2]) > 0;
            if (">=" === e[0]) return null == e[1] || null == e[2] ? null : bt(e[1]) || bt(e[2]) ? e : kt(e[1], e[2]) >= 0;
            if ("<" === e[0]) return null == e[1] || null == e[2] ? null : bt(e[1]) || bt(e[2]) ? e : kt(e[1], e[2]) < 0;
            if ("<=" === e[0]) return null == e[1] || null == e[2] ? null : bt(e[1]) || bt(e[2]) ? e : kt(e[1], e[2]) <= 0;
            if ("*" === e[0]) return xt(e, ((e, t) => null == e || null == t ? null : bt(e) || bt(t) ? St : Ct(e) * Ct(t)));
            if ("/" === e[0]) return xt(e, ((e, t, n) => {
                if (null == e || null == t) return null;
                if (bt(e) || bt(t)) return St;
                const r = Ct(e),
                    s = Ct(t);
                return 0 !== n ? r * s : 0 === s ? null : r / s
            }));
            if ("+" === e[0]) return xt(e, ((e, t) => null == e || null == t ? null : bt(e) || bt(t) ? St : Ct(e) + Ct(t)));
            if ("-" === e[0]) return xt(e, ((e, t, n) => null == e || null == t ? null : bt(e) || bt(t) ? St : 0 === n ? Ct(e) - Ct(t) : Ct(e) + Ct(t)));
            if ("%" === e[0]) return xt(e, ((e, t, n) => {
                if (null == e || null == t) return null;
                if (bt(e) || bt(t) || 0 !== n) return St;
                const r = Ct(e),
                    s = Math.trunc(Ct(t));
                return 0 === s ? null : r % s
            }));
            if ("||" === e[0]) return xt(e, ((e, t) => null == e || null == t ? null : bt(e) || bt(t) ? St : Et(e) + Et(t)))
        }
    }
    return e
}

function Nt(e, t, n, r) {
    return mt(e, (e => {
        if (r && (e = r(e)), !bt(e)) return e;
        if ("FUNC" === e[0] && "NOW" === e[1]) {
            if (n) return n
        } else if ("PARAM" === e[0]) {
            if (null == e[1]) return null;
            if (t && !bt(e[1])) {
                let n;
                return n = "function" == typeof t ? t(e[1]) : t[e[1]], null == n ? null : ("object" == typeof n && (n = n.value ? n.value[0] : null), n)
            }
        }
        return Dt(e)
    }))
}

function Pt(e, t) {
    if (null != e && !e) return !1;
    if (null != t && !t) return !1;
    if (!Array.isArray(e) && !Array.isArray(t)) return null != e && null != t || null;
    if (!Array.isArray(t) && "AND" === e[0]) return e;
    if (!Array.isArray(e) && "AND" === t[0]) return t;
    const n = ["AND"];
    return Array.isArray(e) && "AND" === e[0] ? n.push(...e.slice(1)) : n.push(e), Array.isArray(t) && "AND" === t[0] ? n.push(...t.slice(1)) : n.push(t), n
}

function jt(e, t) {
    if (!Array.isArray(e) && e) return !0;
    if (!Array.isArray(t) && t) return !0;
    if (!Array.isArray(e) && !Array.isArray(t)) return (null == e || null == t) && null;
    if (!Array.isArray(t) && "OR" === e[0]) return e;
    if (!Array.isArray(e) && "OR" === t[0]) return t;
    const n = ["OR"];
    return Array.isArray(e) && "OR" === e[0] ? n.push(...e.slice(1)) : n.push(e), Array.isArray(t) && "OR" === t[0] ? n.push(...t.slice(1)) : n.push(t), n
}
let $t = new Map,
    _t = new Map;
const It = new WeakMap;

function zt(e) {
    if (null === e) return "null";
    if (void 0 === e) return "undefined";
    const t = typeof e;
    if ("number" === t || "boolean" === t || "string" === t) return `${t}:${e}`;
    if ("function" !== t && "object" !== t) throw new Error(`Cannot memoize ${t} arguments`);
    let n = It.get(e);
    if (!n) {
        n = `${t}:${Math.trunc(Math.random()*Number.MAX_SAFE_INTEGER).toString(36)}`, It.set(e, n)
    }
    return n
}

function Rt(e) {
    const t = zt(e);
    return (...n) => {
        const r = JSON.stringify(n.map(zt)) + t;
        if ($t.has(r)) return $t.get(r);
        let s;
        return _t.has(r) ? $t.set(r, s = _t.get(r)) : ($t.set(r, s = e(...n)), s instanceof Promise && s.catch((() => {
            $t.delete(r), _t.delete(r)
        }))), s
    }
}
const Lt = setInterval((() => {
    _t = $t, $t = new Map
}), 12e4);
Lt.unref && Lt.unref();
const Mt = new Set;

function Tt(e, t, n) {
    const r = {
        type: e,
        message: t,
        timestamp: Date.now(),
        actions: n
    };
    return Mt.add(r), Z.redraw(), n || setTimeout((() => {
        Ut(r)
    }), 4e3), r
}

function Ut(e) {
    Mt.delete(e), Z.redraw()
}
const Ft = window.clientConfig,
    qt = window.configSnapshot,
    Wt = window.genieacsVersion;

function Bt(e, t) {
    return e + t
}

function Vt(e, t) {
    return e * t
}

function Jt(e, t) {
    return e / t
}

function Kt(e, t) {
    return e % t
}

function Ht(e) {
    return Number(e)
}

function Qt(e, t) {
    return e !== t
}

function Yt(e, t) {
    return e < t
}
const Gt = BigInt;

function Zt(e, t) {
    return e & t
}

function Xt(e, t) {
    return e | t
}

function en(e, t) {
    return e ^ t
}

function tn(e) {
    return ~e
}

function nn(e, t) {
    return e << t
}

function rn(e, t) {
    return e >> t
}

function sn(e) {
    return Number(e)
}

function on(e, t) {
    return e === t
}

function an(e, t) {
    return e !== t
}

function ln(e, t) {
    return e >= t
}

function cn(e, t) {
    return BigInt.asIntN(e, t)
}
const un = BigInt,
    fn = un(0),
    dn = un(1),
    hn = tn(fn),
    pn = un(32),
    mn = [];
for (let e = 0; e <= 512; ++e) {
    const t = nn(dn, un(e));
    mn.push(t)
}
const gn = mn.filter(((e, t) => t % 2 == 0)).reduce(((e, t) => Xt(e, t)));

function vn(e) {
    const t = [];
    let n = 0;
    for (; an(e, fn);) {
        let r = sn(cn(32, e));
        e = rn(e, pn);
        let s = Math.clz32(r);
        for (; s < 32;) {
            const e = 31 - s;
            t.push(n + e), r ^= 1 << e, s = Math.clz32(r)
        }
        n += 32
    }
    return t
}

function yn(e) {
    const t = 1431655765,
        n = [];
    let r = 0;
    for (; an(e, fn);) {
        let s = sn(cn(32, e));
        s = s & t | s >> 1 & t, e = rn(e, pn);
        let o = Math.clz32(s);
        for (; o < 32;) {
            const e = 31 - o;
            n.push(r + e), s ^= 1 << e, o = Math.clz32(s)
        }
        r += 32
    }
    return n
}

function wn(e, t) {
    const n = new Map;
    for (const r of t) {
        const t = r - r % 2;
        if (n.has(t)) continue;
        const s = new Set;
        for (const t of e)(t.set.has(r) || t.set.has(r + 1)) && s.add(t);
        s.size && n.set(t, s)
    }
    if (n.size <= 1) return [e];
    for (const t of e) {
        let r = -1;
        for (const [s, o] of n)
            if (o.has(t))
                if (-1 !== r) {
                    if (n.set(r, new Set([...n.get(r), ...o])), n.delete(s), 1 === n.size) return [e]
                } else r = s
    }
    return [...n.values()].map((e => [...e]))
}

function bn(e) {
    return Xt(nn(Zt(e, gn), dn), Zt(rn(e, dn), gn))
}

function An(e, t = 512) {
    let n = 0;
    for (; n < t && an(e, fn); ++n) e = Zt(e, e - dn);
    return n
}
class Sn {
    constructor(e, t, n) {
        this._bigint = e, this._set = t, this._hash = n
    }
    get bigint() {
        return this._bigint
    }
    get set() {
        return this._set
    }
    get hash() {
        return this._hash
    }
    raise(e) {
        if (!this._set.has(e)) return this;
        const t = en(this._bigint, mn[e]),
            n = new Set(this._set);
        n.delete(e);
        const r = this._hash ^ 1 << e;
        return new Sn(t, n, r)
    }
    covers(e) {
        return this.set.size <= e.set.size && on(Zt(this.bigint, e.bigint), this.bigint)
    }
    static parse(e) {
        const t = e.split("");
        let n = fn,
            r = 0;
        const s = new Set;
        for (const [e, o] of t.entries()) {
            if ("-" === o) continue;
            const t = 2 * e;
            if ("0" === o) n = Xt(n, mn[t]), s.add(t), r ^= 1 << t;
            else if ("1" === o) n = Xt(n, mn[t + 1]), s.add(t + 1), r ^= 2 << t;
            else {
                if ("/" !== o) throw new Error("Invalid cube string");
                n = Xt(n, mn[t]), s.add(t), n = Xt(n, mn[t + 1]), s.add(t + 1), r ^= 3 << t
            }
        }
        return new Sn(n, s, r)
    }
    toString() {
        let e = this.bigint.toString(2);
        e.length % 2 && (e = "0" + e);
        return e.match(/.{2}/g).reverse().map((e => "00" === e ? "-" : "01" === e ? "0" : "10" === e ? "1" : "/")).join("")
    }
    static from(e) {
        let t = fn,
            n = 0;
        const r = new Set;
        for (const s of e) r.add(s), n ^= 1 << s, t = Xt(t, mn[s]);
        return new Sn(t, r, n)
    }
    static fromBigInt(e) {
        let t = 0;
        const n = new Set;
        let r = 0,
            s = e;
        for (; an(s, fn);) {
            let e = sn(cn(32, s));
            t ^= e, s = rn(s, pn);
            let o = Math.clz32(e);
            for (; o < 32;) {
                const t = 31 - o;
                n.add(r + t), e ^= 1 << t, o = Math.clz32(e)
            }
            r += 32
        }
        return new Sn(e, n, t)
    }
}
class xn {
    constructor(e, t, n) {
        this._cubes = e, this._count = t, this._bigint = n
    }
    static from(e) {
        const t = [];
        let n = fn;
        const r = [];
        for (const s of e) {
            n = Xt(n, s.bigint), t.push(s);
            for (const e of s.set) {
                for (; r.length <= e + 1 - e % 2;) r.push(0);
                ++r[e]
            }
        }
        return new xn(t, r, n)
    }
    get bigint() {
        return this._bigint
    }
    get cubes() {
        return this._cubes
    }
    count(e) {
        return this._count[e]
    }
    filter(e) {
        const t = this._count.slice();
        let n = this._bigint;
        const r = this._cubes.filter((r => {
            if (e(r)) return !0;
            for (const e of r.set) --t[e] || (n = en(n, mn[e]));
            return !1
        }));
        return new xn(r, t, n)
    }
    pop() {
        const e = this._cubes.pop();
        if (e) {
            for (const t of e.set) --this._count[t] || (this._bigint = en(this._bigint, mn[t]));
            return e
        }
    }
    push(e) {
        const t = this._cubes.push(e);
        for (const t of e.set) ++this._count[t];
        return this._bigint = Xt(this._bigint, e.bigint), t
    }
    unshift(e) {
        const t = this._cubes.unshift(e);
        for (const t of e.set) ++this._count[t];
        return this._bigint = Xt(this._bigint, e.bigint), t
    }
}

function On(e, t = fn, n = Zt(e.bigint, tn(Xt(t, bn(t))))) {
    let r = !1,
        s = !1;
    do {
        if (r = !1, e = e.filter((e => {
                if (an(Zt(t, e.bigint), fn)) return !1;
                const o = Zt(e.bigint, n),
                    i = An(o, 2);
                return 1 === i ? (r = !0, t = Xt(t, o), n = on(Zt(gn, o), fn) ? en(n, rn(o, dn)) : en(n, nn(o, dn)), !1) : (0 === i && (s = !0), !0)
            })), s) return !0
    } while (r);
    if (e.cubes.length <= 1) return !1;
    let o = -1,
        i = 0,
        a = 0,
        l = 0;
    const c = yn(n = Zt(e.bigint, n)),
        u = new Set;
    for (const r of c) {
        const s = e.count(r),
            c = e.count(r + 1),
            f = s + c;
        if (s && c) {
            if (f >= i) {
                const e = Math.min(s, c);
                (f > i || e > a) && (o = r, i = f, a = e)
            }
        } else {
            if (f === e.cubes.length) return !1;
            u.add(r), t = Xt(t, mn[s ? r : r + 1]), n = en(n, mn[s ? r + 1 : r])
        }
        l = Math.max(l, f)
    }
    if (-1 === o) return !1;
    if (3 * l < e.cubes.length && c.length - u.size > 8) {
        const r = wn(e.cubes, c.filter((e => !u.has(e))));
        if (r.length > 1) {
            for (const e of r)
                if (!On(xn.from(e), t, n)) return !1;
            return !0
        }
    }
    return !!On(e, Xt(t, mn[o]), en(n, mn[o + 1])) && On(e, Xt(t, mn[o + 1]), en(n, mn[o]))
}

function kn(e, t = fn, n = e.bigint) {
    let r = !1,
        s = !1;
    do {
        if (r = !1, e = e.filter((e => {
                if (an(Zt(t, e.bigint), fn)) return !1;
                const o = Zt(e.bigint, n),
                    i = An(o, 2);
                return 1 === i ? (r = !0, t = Xt(t, o), n = on(Zt(gn, o), fn) ? en(n, rn(o, dn)) : en(n, nn(o, dn)), !1) : (0 === i && (s = !0), !0)
            })), s) return []
    } while (r);
    if (!e.cubes.length) return [Sn.fromBigInt(bn(t))];
    n = Zt(e.bigint, n);
    const o = [];
    if (1 === e.cubes.length) {
        const e = bn(t);
        for (const t of vn(n)) o.push(Sn.fromBigInt(Xt(e, mn[1 ^ t])));
        return o
    }
    let i = -1,
        a = 0,
        l = 0,
        c = 0;
    const u = yn(n),
        f = new Set;
    for (const r of u) {
        const s = e.count(r),
            u = e.count(r + 1),
            d = s + u;
        if (s && u) {
            if (d >= a) {
                const e = Math.min(s, u);
                (d > a || e > l) && (i = r, a = d, l = e)
            }
        } else d === e.cubes.length && (f.add(r), o.push(Sn.fromBigInt(bn(Xt(t, mn[s ? r : r + 1])))), n = en(n, mn[s ? r : r + 1]));
        c = Math.max(c, d)
    }
    if (3 * c < e.cubes.length && u.length - f.size > 8) {
        const r = wn(e.cubes, u.filter((e => !f.has(e))));
        if (r.length > 1) {
            let e = kn(xn.from(r.pop()), t, n);
            for (const s of r) {
                if (!e.length) return o;
                const r = kn(xn.from(s), t, n),
                    i = [];
                for (const t of e)
                    for (const e of r) i.push(Sn.fromBigInt(Xt(t.bigint, e.bigint)));
                e = i
            }
            return [...o, ...e]
        }
    }
    if (-1 === i) return Cn(e, o, t, n), o;
    const d = kn(e, Xt(t, mn[i]), en(n, mn[i + 1]));
    let h = kn(e, Xt(t, mn[i + 1]), en(n, mn[i]));
    const p = 3 << i,
        m = Xt(mn[i], mn[i + 1]),
        g = new Set;
    e: for (const [e, t] of d.entries()) {
        const n = t.hash ^ p;
        for (const r of h)
            if (r.hash === n && on(en(t.bigint, r.bigint), m)) {
                d[e] = Sn.fromBigInt(Zt(t.bigint, r.bigint)), g.add(r);
                continue e
            }
    }
    return g.size && (h = h.filter((e => !g.has(e)))), [...o, ...d, ...h]
}

function Cn(e, t, n, r) {
    let s = !1,
        o = !1,
        i = 512,
        a = fn;
    do {
        if (i = 512, a = fn, s = !1, e = e.filter((e => {
                if (an(Zt(n, e.bigint), fn)) return !1;
                const t = Zt(e.bigint, r),
                    l = An(t, i);
                return 1 === l ? (s = !0, n = Xt(n, t), !1) : (l < i && (a = t, i = l), 0 === l && (o = !0), !0)
            })), o) return
    } while (s);
    if (!e.cubes.length) return void t.push(Sn.fromBigInt(bn(n)));
    const l = vn(a);
    if (1 === e.cubes.length) {
        const e = bn(n);
        for (const n of l) t.push(Sn.fromBigInt(Xt(e, mn[1 ^ n])));
        return
    }
    let c = -1,
        u = 0;
    for (const t of l) {
        const n = e.count(t);
        n > u && (c = t, u = n)
    }
    Cn(e, t, Xt(n, mn[c]), r), Cn(e, t, n, en(r, mn[c]))
}

function En(e, t) {
    return On(e, bn(t.bigint))
}

function Dn(e, t, n, r) {
    const s = bn(e.bigint);
    let o = n.map((e => new Set(vn(Zt(s, e.bigint)))));
    o = o.filter((e => e.size));
    let i = t.map((t => new Set(vn(Zt(e.bigint, en(e.bigint, t.bigint))))));
    i = i.filter((e => e.size));
    const a = new Set(e.set),
        l = [];
    for (let e = Math.max(...a); e >= 0; --e) l.push(0);
    for (const e of i)
        for (const t of e) ++l[t];
    for (; i.length && o.length;) {
        const t = new Set;
        for (const e of o) 1 === e.size && t.add(e.values().next().value);
        if (t.size) {
            for (const e of t) a.delete(1 ^ e), o = o.filter((t => !t.has(e))), i = i.filter((t => !t.has(1 ^ e)));
            const n = new Set(a);
            for (const e of o)
                for (const t of e) n.delete(1 ^ t);
            for (const t of n) a.delete(t), e = e.raise(t), i = i.filter((e => !(e.delete(t) && !e.size)));
            if (!o.length || !i.length) break
        }
        const n = new Set;
        for (const e of i) 1 === e.size && n.add(e.values().next().value);
        if (n.size) {
            let t = 0,
                s = -1;
            for (const o of n) l[o] > t && r(o, e.set) && (t = l[o], s = o);
            if (s >= 0) {
                a.delete(s), e = e.raise(s), i = i.filter((e => !(e.delete(s) && !e.size)));
                for (const e of o) e.delete(1 ^ s);
                continue
            }
        }
        let s = 0,
            c = -1;
        for (const t of a) l[t] > s && r(t, e.set) && (s = l[t], c = t);
        if (c < 0) {
            a.clear();
            break
        }
        a.delete(c), e = e.raise(c);
        for (const e of i) e.delete(c);
        for (const e of o) e.delete(1 ^ c)
    }
    if (o.length) {
        const e = jn(o);
        for (const t of e) a.delete(1 ^ t)
    }
    for (const t of a) r(t, e.set) && (e = e.raise(t));
    return e
}

function Nn(e, t, n, r) {
    let s = t.map((t => new Set(vn(Zt(e.bigint, en(e.bigint, t.bigint))))));
    s = s.filter((e => e.size));
    const o = [...e.set],
        i = [];
    for (let e = Math.max(...o); e >= 0; --e) i.push(0);
    for (const e of s)
        for (const t of e) ++i[t];
    for (; o.length;) {
        const t = new Set;
        for (const e of s) 1 === e.size && t.add(e.values().next().value);
        o.sort(((e, n) => +t.has(e) - +t.has(n) || i[e] - i[n]));
        const a = [];
        for (; o.length;) {
            const t = o.pop();
            if (!r(t, e.set)) {
                a.unshift(t);
                continue
            }
            const i = e.raise(t);
            if (!En(n, i)) {
                s = s.filter((e => !e.has(t))), o.push(...a);
                break
            }
            e = i;
            for (const e of s) e.delete(t);
            s = s.filter((e => e.size)), o.push(...a.splice(0))
        }
    }
    return e
}

function Pn(e, t, n, r, s) {
    if (!e.length) return e;
    (e = e.slice()).sort(((e, t) => e.set.size - t.set.size));
    const o = e[0];
    do {
        let o = e[0];
        r.has(o) || (o = n ? Dn(o, e, n, s) : Nn(o, e, xn.from([...e, ...t]), s)), (e = e.filter((e => !o.covers(e)))).push(o)
    } while (e[0].set.size >= o.set.size && an(e[0].bigint, o.bigint));
    return e
}

function jn(e) {
    let t = new Set;
    const n = function(e) {
        const t = new Map,
            n = e.length;
        for (let e = 0; e < n; ++e) t.set(e, new Set);
        for (let r = 0; r < n; ++r) {
            const s = e[r],
                o = t.get(r);
            for (let i = r + 1; i < n; ++i) {
                const n = e[i];
                let a = !1;
                for (const e of s)
                    if (n.has(e)) {
                        a = !0;
                        break
                    } if (!a) {
                    const e = t.get(i);
                    o.add(i), e.add(r)
                }
            }
        }
        const r = Array.from(e.keys());
        r.sort(((e, n) => t.get(n).size - t.get(e).size));
        let s = [],
            o = 0,
            i = 0;
        return function e(r, a, l) {
            if (i > n) return;
            if (!a.length && !l.length) {
                if (++i, r.length >= s.length) {
                    const e = r.reduce(((e, n) => e + t.get(n).size), 0);
                    (e > o || r.length > s.length) && (s = r, o = e, i = 0)
                }
                return
            }
            const c = new Set,
                u = t.get(a[0]);
            for (const n of a) {
                if (u.has(n)) continue;
                const o = t.get(n),
                    i = a.filter((e => o.has(e) && !c.has(e))),
                    f = l.filter((e => o.has(e)));
                if (e([...r, n], i, f), s.length > r.length + a.length) return;
                l.push(n), c.add(n)
            }
        }([], r, []), s.map((t => e[t]))
    }(e);
    let r = e;
    for (const s of n) {
        const n = new Map;
        for (const t of e)
            for (const e of t)
                if (s.has(e)) {
                    let r = n.get(e);
                    r || n.set(e, r = new Set), r.add(t)
                } const [o, i] = Array.from(n).reduce(((e, t) => t[1].size > e[1].size ? t : e));
        r = r.filter((e => !i.has(e))), t.add(o)
    }
    return t = function(e, t) {
        let n = e.map((e => new Set([...e].filter((e => t.has(e))))));
        const r = new Set;
        for (;;) {
            for (const e of n)
                if (1 === e.size) {
                    const [t] = e;
                    r.add(t)
                } if (n = n.filter((e => {
                    for (const t of e)
                        if (r.has(t)) return !1;
                    return e.size > 1
                })), !n.length) break;
            const e = new Map;
            for (const t of n) {
                for (const n of t) e.has(n) || e.set(n, new Set);
                if (2 === t.size) {
                    const [n, r] = t, s = e.get(n), o = e.get(r);
                    s.add(r), o.add(n)
                }
            }
            const t = Array.from(e).reduce(((e, t) => t[1].size < e[1].size ? t : e))[0];
            for (const e of n) e.delete(t)
        }
        return r
    }(e, t), r.length && (t = new Set([...t, ...jn(r)])), t
}

function $n(e, t, n, r) {
    let s = !1,
        o = !1;
    const i = [];
    do {
        if (s = !1, e = e.filter((e => {
                if (an(Zt(n, e.bigint), fn)) return !1;
                const a = Zt(e.bigint, r),
                    l = An(a, 2);
                if (1 === l && !t.has(e)) return s = !0, n = Xt(n, a), r = on(Zt(gn, a), fn) ? en(r, rn(a, dn)) : en(r, nn(a, dn)), !1;
                if (0 === l) {
                    const n = t.get(e);
                    if (null != n) return i.push(n), !1;
                    o = !0
                }
                return !0
            })), o) return []
    } while (s);
    if (e.cubes.length <= 1) return [new Set(i)];
    let a = -1,
        l = 0,
        c = 0,
        u = 0;
    const f = yn(r = Zt(e.bigint, r)),
        d = new Set;
    for (const t of f) {
        const s = e.count(t),
            o = e.count(t + 1),
            i = s + o;
        if (s && o) {
            if (i >= l) {
                const e = Math.min(s, o);
                (i > l || e > c) && (a = t, l = i, c = e)
            }
        } else d.add(t), n = Xt(n, mn[s ? t : t + 1]), r = en(r, mn[s ? t + 1 : t]);
        u = Math.max(u, i)
    }
    if (-1 === a) return [new Set(i)];
    if (3 * u < e.cubes.length && f.length - d.size > 8) {
        const s = wn(e.cubes, f.filter((e => !d.has(e))));
        if (s.length > 1) {
            let e = [new Set(i)];
            for (const o of s) {
                const s = e;
                e = $n(xn.from(o), t, n, r);
                const i = [];
                for (const t of e)
                    for (const e of s) i.push(new Set([...t, ...e]));
                e = i
            }
            return e
        }
    }
    let h = $n(e, t, Xt(n, mn[a]), en(r, mn[a + 1])),
        p = $n(e, t, Xt(n, mn[a + 1]), en(r, mn[a]));
    const m = new Set,
        g = new Set;
    for (const e of h)
        for (const t of p)
            if (e.size <= t.size) {
                let n = !0;
                for (const r of e)
                    if (!t.has(r)) {
                        n = !1;
                        break
                    } n && g.delete(t)
            } else {
                let n = !0;
                for (const r of t)
                    if (!e.has(r)) {
                        n = !1;
                        break
                    } n && m.delete(e)
            } return m.size && (h = h.filter((e => !m.has(e)))), g.size && (p = p.filter((e => !g.has(e)))), [...h, ...p].map((e => new Set([...i, ...e])))
}

function _n(e, t, n) {
    const r = function(e, t, n) {
            const r = new Map,
                s = new WeakMap;
            for (const [t, n] of e.entries()) s.set(n, t);
            const o = xn.from([...e, ...t, ...n]);
            for (const t of e) {
                const e = bn(t.bigint),
                    n = $n(o, s, e, Zt(o.bigint, tn(Xt(t.bigint, e))));
                for (const e of n) {
                    let t = 0;
                    for (const n of e) t ^= 1 << n;
                    const n = r.get(t);
                    if (!n) {
                        r.set(t, [e]);
                        continue
                    }
                    let s = !1;
                    e: for (const t of n)
                        if (t.size === e.size) {
                            for (const n of t)
                                if (!e.has(n)) continue e;
                            s = !0;
                            break
                        } s || n.push(e)
                }
            }
            return [...r.values()].flat()
        }(e, t, n),
        s = jn(r);
    return e.filter(((e, t) => s.has(t)))
}

function In(e, t) {
    const [n, r] = function(e, t) {
        const n = xn.from([...t, ...e]),
            r = [],
            s = [];
        for (let t = 0; t < e.length; ++t) {
            const e = n.pop();
            En(n, e) ? s.push(e) : r.push(e), n.unshift(e)
        }
        return [r, s]
    }(e, t), s = function(e, t, n) {
        const r = xn.from([...n, ...t]);
        return e.filter((e => !En(r, e)))
    }(r, n, t), o = _n(s, n, t);
    return [...n, ...o]
}

function zn(e, t, n) {
    let r = !1,
        s = !1;
    do {
        if (r = !1, e = e.filter((e => {
                if (an(Zt(t, e.bigint), fn)) return !1;
                const o = Zt(e.bigint, n),
                    i = An(o, 2);
                return 1 === i ? (r = !0, t = Xt(t, o), n = on(Zt(gn, o), fn) ? en(n, rn(o, dn)) : en(n, nn(o, dn)), !1) : (0 === i && (s = !0), !0)
            })), s) return hn
    } while (r);
    if (e.cubes.length <= 1) return t;
    let o = -1,
        i = 0,
        a = 0,
        l = 0;
    const c = yn(n = Zt(e.bigint, n)),
        u = new Set;
    for (const t of c) {
        const n = e.count(t),
            r = e.count(t + 1),
            s = n + r;
        if (n && r) {
            if (s >= i) {
                const e = Math.min(n, r);
                (s > i || e > a) && (o = t, i = s, a = e)
            }
        } else u.add(t), e = n ? e.filter((e => !e.set.has(t))) : e.filter((e => !e.set.has(t + 1)));
        l = Math.max(l, s)
    }
    if (-1 === o) return t;
    if (3 * l < e.cubes.length && c.length - u.size > 8) {
        const r = wn(e.cubes, c.filter((e => !u.has(e))));
        let s = hn;
        if (r.length > 1) {
            for (const e of r) s = Zt(s, zn(xn.from(e), t, n));
            return s
        }
    }
    return Zt(zn(e, Xt(t, mn[o]), en(n, mn[o + 1])), zn(e, Xt(t, mn[o + 1]), en(n, mn[o])))
}

function Rn(e, t, n) {
    ! function(e) {
        if (e.length <= 1) return;
        const t = e.reduce(((e, t) => t.set.size <= e.set.size ? t : e));
        e.sort(((e, n) => {
            const r = An(Zt(e.bigint, t.bigint)),
                s = e.set.size - r + (t.set.size - r),
                o = An(Zt(n.bigint, t.bigint));
            return s - (n.set.size - o + (t.set.size - o))
        }))
    }(e = e.slice());
    for (let r = e.length; r > 0; --r) {
        const r = e.shift(),
            s = bn(r.bigint),
            o = Xt(r.bigint, s),
            i = [...e, ...t].filter((e => on(Zt(s, e.bigint), fn))),
            a = zn(xn.from(i), s, tn(o));
        ln(a, fn) && (on(a, s) ? (e.push(r), n.add(r)) : e.push(Sn.fromBigInt(bn(a))))
    }
    return e
}

function Ln(e, t, n, r) {
    const s = function(e, t) {
            const n = [];
            for (let r = e.length; r > 0; --r) {
                const r = e.shift(),
                    s = bn(r.bigint),
                    o = Xt(r.bigint, s),
                    i = [...e, ...t].filter((e => on(Zt(s, e.bigint), fn))),
                    a = zn(xn.from(i), s, tn(o));
                an(a, s) && ln(a, fn) && n.push(Sn.fromBigInt(bn(a))), e.push(r)
            }
            return n
        }(e, t),
        o = [],
        i = r ? null : xn.from([...e, ...t]);
    for (let e = s.length; e > 0; --e) {
        const e = s.shift(),
            t = r ? Dn(e, s, r, n) : Nn(e, s, i, n);
        for (const e of s) t.covers(e) && o.push(t);
        s.push(e)
    }
    return o.length ? In([...e, ...o], t) : e
}

function Mn(e) {
    return e.reduce(((e, t) => e + t.set.size), 0)
}

function Tn(e, t, n, r = (() => !0)) {
    if (!e.length) return e;
    const s = new WeakSet,
        o = function(e, t) {
            const n = [...t, ...e],
                r = [];
            for (let t = 0; t < e.length; ++t) {
                const e = n.pop(),
                    t = bn(e.bigint),
                    s = [];
                for (const e of n) {
                    const n = Zt(t, e.bigint),
                        r = An(n, 2);
                    0 === r ? s.push(e) : 1 === r && s.push(Sn.fromBigInt(en(e.bigint, n)))
                }
                On(xn.from(s), t) || r.push(e), n.unshift(e)
            }
            return r
        }(e = In(e = Pn(e, t, n, s, r), t), t);
    o.length && (e = e.filter((e => !o.includes(e))), t = [...t, ...o]);
    let i = Mn(e);
    for (;;) {
        let o = Rn(e, t, s);
        o = Pn(o, t, n, s, r), o = In(o, t);
        let a = Mn(o);
        if (a >= i && (o = Ln(e, t, r, n), a = Mn(o), a >= i)) break;
        i = a, e = o
    }
    return [...o, ...e]
}

function Un(e) {
    return e.map((e => Sn.from(e)))
}

function Fn(e) {
    return e.map((e => [...e.set]))
}

function qn(e) {
    return Fn(kn(xn.from(Un(e))))
}

function Wn(e, t = [], n = {}) {
    const r = Un(e),
        s = Un(t);
    return Fn(Tn(r, s, n.computeOffSet ? kn(xn.from([...r, ...s])) : void 0, n.canRaise))
}
const Bn = Gt(0),
    Vn = Gt(1),
    Jn = Gt(2),
    Kn = Gt(-1);
class Hn {
    constructor(e) {
        this.map = new Map, e ? (this.map.set(e, 1), this.sortedKeys = [e]) : this.sortedKeys = []
    }
    reciprocal() {
        const e = new Hn;
        e.sortedKeys = this.sortedKeys, e.map = new Map;
        for (const [t, n] of this.map) e.map.set(t, 0 - n);
        return e
    }
    static multiply(e, t) {
        const n = new Hn;
        n.sortedKeys = e.sortedKeys.slice(), n.map = new Map(e.map);
        for (const [e, r] of t.map) {
            const t = n.map.get(e);
            if (t) {
                const s = r + t;
                s ? n.map.set(e, s) : (n.map.delete(e), n.sortedKeys = n.sortedKeys.filter((t => t !== e)))
            } else n.map.set(e, r), n.sortedKeys.push(e)
        }
        return n.sortedKeys.sort(((e, t) => e.length !== t.length ? t.length - e.length : e > t ? 1 : e < t ? -1 : 0)), n
    }
    static compare(e, t) {
        if (e.sortedKeys.length !== t.sortedKeys.length) return t.sortedKeys.length - e.sortedKeys.length;
        for (let n = 0; n < e.sortedKeys.length; ++n) {
            const r = e.sortedKeys[n],
                s = e.map.get(r),
                o = t.sortedKeys[n],
                i = t.map.get(o);
            if (s !== i) return i - s;
            if (r.length > o.length) return -1;
            if (r.length < o.length) return 1;
            if (r > o) return 1;
            if (r < o) return -1
        }
        return 0
    }
}

function Qn(e, t) {
    for (; Qt(t, Bn);) {
        const n = t;
        t = Kt(e, t), e = n
    }
    return e
}
class Yn {
    constructor(e) {
        this.terms = e
    }
    static simplifyTerms(e) {
        const t = e.slice().sort(((e, t) => Hn.compare(e.indeterminates, t.indeterminates)));
        for (let e = 1; e < t.length; ++e) {
            const n = t[e - 1],
                r = t[e];
            if (0 === Hn.compare(n.indeterminates, r.indeterminates)) {
                const s = Bt(Vt(n.coefficientNumerator, r.coefficientDenominator), Vt(r.coefficientNumerator, n.coefficientDenominator)),
                    o = Vt(n.coefficientDenominator, r.coefficientDenominator),
                    i = Qn(s, o);
                t[e] = {
                    indeterminates: r.indeterminates,
                    coefficientNumerator: Jt(s, i),
                    coefficientDenominator: Jt(o, i)
                }, t[e - 1] = {
                    indeterminates: n.indeterminates,
                    coefficientNumerator: Bn,
                    coefficientDenominator: n.coefficientDenominator
                }
            }
        }
        return t.filter((e => Qt(e.coefficientNumerator, Bn)))
    }
    static fromIndeterminate(e) {
        const t = new Hn(JSON.stringify(e));
        return new Yn([{
            indeterminates: t,
            coefficientNumerator: Vn,
            coefficientDenominator: Vn
        }])
    }
    static fromConstant(e) {
        const [t, n] = Math.abs(e).toString(2).split(".", 2);
        let r = Gt("0b" + t);
        e < 0 && (r = Vt(r, Kn));
        let s = Vn;
        var o, i;
        n && (o = Jn, i = Gt(n.length), s = o ** i, r = Bt(Vt(r, s), Gt("0b" + n)));
        const a = [{
            indeterminates: new Hn,
            coefficientNumerator: r,
            coefficientDenominator: s
        }];
        return new Yn(a)
    }
    negation() {
        const e = this.terms.map((e => ({
            indeterminates: e.indeterminates,
            coefficientNumerator: Vt(e.coefficientNumerator, Kn),
            coefficientDenominator: e.coefficientDenominator
        })));
        return new Yn(e)
    }
    reciprocal() {
        const e = this.terms.map((e => ({
            indeterminates: e.indeterminates.reciprocal(),
            coefficientNumerator: e.coefficientDenominator,
            coefficientDenominator: e.coefficientNumerator
        })));
        return new Yn(e)
    }
    constant() {
        const e = this.terms.filter((e => !e.indeterminates.sortedKeys.length));
        return new Yn(e)
    }
    add(e) {
        return new Yn(Yn.simplifyTerms(this.terms.concat(e.terms)))
    }
    subtract(e) {
        return this.add(e.negation())
    }
    multiply(e) {
        const t = [];
        for (const n of this.terms)
            for (const r of e.terms) {
                const e = Vt(n.coefficientNumerator, r.coefficientNumerator),
                    s = Vt(n.coefficientDenominator, r.coefficientDenominator),
                    o = Qn(e, s);
                t.push({
                    indeterminates: Hn.multiply(n.indeterminates, r.indeterminates),
                    coefficientNumerator: Jt(e, o),
                    coefficientDenominator: Jt(s, o)
                })
            }
        return new Yn(Yn.simplifyTerms(t))
    }
    divide(e) {
        return this.multiply(e.reciprocal())
    }
    toString() {
        const e = [];
        for (const t of this.terms) {
            const n = Ht(t.coefficientNumerator) / Ht(t.coefficientDenominator),
                r = [];
            if (t.indeterminates.sortedKeys.length) {
                for (const e of t.indeterminates.sortedKeys) {
                    const n = t.indeterminates.map.get(e);
                    for (let t = Math.abs(n); t > 0; --t) n > 0 ? r.push(e) : r.push(`["/",1,${e}]`)
                }
                1 !== n && r.push(n.toString()), r.length > 1 ? e.push(`["*",${r.join(",")}]`) : e.push(r[0])
            } else e.push(n.toString())
        }
        return e.length ? 1 === e.length ? e[0] : `["+",${e.join(",")}]` : "0"
    }
}
class Gn {}
class Zn extends Gn {
    true() {
        return [
            []
        ]
    }
    false() {
        return []
    }
    null() {
        return []
    }
}
class Xn extends Gn {
    true() {
        return []
    }
    false() {
        return [
            []
        ]
    }
    null() {
        return []
    }
}
class er extends Gn {
    true() {
        return []
    }
    false() {
        return []
    }
    null() {
        return [
            []
        ]
    }
}
class tr extends Gn {
    constructor(e) {
        if (super(), this.negate = !1, Array.isArray(e)) {
            const t = e[0];
            "<>" === t ? ((e = e.slice())[0] = "=", this.negate = !0) : ">=" === t ? ((e = e.slice())[0] = "<", this.negate = !0) : "<=" === t ? ((e = e.slice())[0] = ">", this.negate = !0) : "NOT LIKE" === t && ((e = e.slice())[0] = "LIKE", this.negate = !0)
        }
        this.exp = e
    }
    true(e) {
        return [
            [e.getVariable(this.exp) << 2 ^ (this.negate ? 1 : 3)]
        ]
    }
    false(e) {
        return [
            [e.getVariable(this.exp) << 2 ^ (this.negate ? 3 : 1)]
        ]
    }
    null(e) {
        const t = e.getVariable(this.exp);
        return [
            [t << 2, t << 2 ^ 2]
        ]
    }
}
class nr extends Gn {
    constructor(e) {
        super(), this.exprSynth = e
    }
    true(e) {
        return this.exprSynth.false(e)
    }
    false(e) {
        return this.exprSynth.true(e)
    }
    null(e) {
        return this.exprSynth.null(e)
    }
}
class rr extends Gn {
    constructor(e) {
        super(), this.exprSynth = e
    }
    true(e) {
        return this.exprSynth.null(e)
    }
    false(e) {
        return [...this.exprSynth.true(e), ...this.exprSynth.false(e)]
    }
    null() {
        return []
    }
}
class sr extends Gn {
    constructor(...e) {
        super(), this.exprSynths = e.filter((e => !(e instanceof Xn)));
        const t = [];
        this.exprSynths = this.exprSynths.filter((e => !(e instanceof sr) || (t.push(...e.exprSynths), !1))), this.exprSynths.push(...t)
    }
    true(e) {
        return 0 === this.exprSynths.length ? [] : 1 === this.exprSynths.length ? this.exprSynths[0].true(e) : this.exprSynths.some((e => e instanceof Zn)) ? [
            []
        ] : this.exprSynths.map((t => t.true(e))).flat()
    }
    false(e) {
        return 0 === this.exprSynths.length ? [
            []
        ] : 1 === this.exprSynths.length ? this.exprSynths[0].false(e) : this.exprSynths.some((e => e instanceof Zn || e instanceof er)) ? [] : qn(this.exprSynths.map((t => qn(t.false(e)))).flat())
    }
    null(e) {
        if (0 === this.exprSynths.length) return [];
        if (1 === this.exprSynths.length) return this.exprSynths[0].null(e);
        const t = this.exprSynths.map((t => t.null(e))).flat(),
            n = this.exprSynths.map((t => t.true(e))).flat();
        return qn([...qn(t), ...n])
    }
}
class or extends Gn {
    constructor(...e) {
        super(), this.exprSynths = e.filter((e => !(e instanceof Zn)));
        const t = [];
        this.exprSynths = this.exprSynths.filter((e => !(e instanceof or) || (t.push(...e.exprSynths), !1))), this.exprSynths.push(...t)
    }
    true(e) {
        return 0 === this.exprSynths.length ? [
            []
        ] : 1 === this.exprSynths.length ? this.exprSynths[0].true(e) : this.exprSynths.some((e => e instanceof Xn || e instanceof er)) ? [] : qn(this.exprSynths.map((t => qn(t.true(e)))).flat())
    }
    false(e) {
        return 0 === this.exprSynths.length ? [] : 1 === this.exprSynths.length ? this.exprSynths[0].false(e) : this.exprSynths.some((e => e instanceof Xn)) ? [
            []
        ] : this.exprSynths.map((t => t.false(e))).flat()
    }
    null(e) {
        if (0 === this.exprSynths.length) return [];
        if (1 === this.exprSynths.length) return this.exprSynths[0].null(e);
        const t = this.exprSynths.map((t => t.null(e))).flat(),
            n = this.exprSynths.map((t => t.false(e))).flat();
        return qn([...qn(t), ...n])
    }
}
class ir extends Gn {
    constructor(e) {
        super(), this.exprSynths = e
    }
    true(e) {
        const t = [],
            n = [];
        for (let r = 0; r < this.exprSynths.length; r += 2) {
            const s = this.exprSynths[r].true(e),
                o = this.exprSynths[r + 1].true(e);
            t.push(...qn([...n, ...qn(s), ...qn(o)])), r < this.exprSynths.length - 2 && n.push(...qn([...this.exprSynths[r].false(e), ...this.exprSynths[r].null(e)]))
        }
        return t
    }
    false(e) {
        const t = [],
            n = [];
        for (let r = 0; r < this.exprSynths.length; r += 2) {
            const s = this.exprSynths[r].true(e),
                o = this.exprSynths[r + 1].false(e);
            t.push(...qn([...n, ...qn(s), ...qn(o)])), r < this.exprSynths.length - 2 && n.push(...qn([...this.exprSynths[r].false(e), ...this.exprSynths[r].null(e)]))
        }
        return t
    }
    null(e) {
        const t = [],
            n = [];
        for (let r = 0; r < this.exprSynths.length; r += 2) {
            const s = this.exprSynths[r].true(e),
                o = this.exprSynths[r + 1].null(e);
            t.push(...qn([...n, ...qn(s), ...qn(o)])), n.push(...qn([...this.exprSynths[r].false(e), ...this.exprSynths[r].null(e)]))
        }
        return t.push(...qn([...n])), t
    }
}
const ar = Yn.fromConstant(0),
    lr = Yn.fromConstant(1),
    cr = {
        "=": "=",
        "<>": "<>",
        ">": "<",
        ">=": "<=",
        "<": ">",
        "<=": ">="
    };

function ur(e) {
    if (!Array.isArray(e)) return e;
    const t = e[0];
    if ("FUNC" === t && "COALESCE" === e[1]) {
        const t = ["CASE"];
        for (let n = 2; n < e.length; ++n) t.push(ur(["IS NOT NULL", e[n]]), e[n]);
        return ur(t)
    }
    if ("CASE" === t) {
        const t = [];
        for (let n = 1; n < e.length; n += 2) {
            let r = e[n];
            if (r instanceof Yn && (r = JSON.parse(r.toString())), !Array.isArray(r) && !r) continue;
            const s = e[n + 1];
            if (Array.isArray(s) && "CASE" === s[0]) {
                for (let e = 1; e < s.length; e += 2) t.push([Pt(r, s[e]), s[e + 1]]);
                if (t.push([r, null]), !Array.isArray(r) && r) break
            } else t.push([r, s])
        }
        for (; null == t[t.length - 1][1];) t.pop();
        return ["CASE", ...t.flat()]
    }
    const n = new Map;
    for (const [t, r] of e.entries()) {
        if (!Array.isArray(r)) continue;
        if ("CASE" !== r[0]) continue;
        const e = [];
        for (let t = 1; t < r.length; t += 2) e.push([r[t], r[t + 1]]);
        n.set(t, e)
    }
    if (n.size) {
        let t = [
            [!0, e]
        ];
        for (const [e, r] of n) {
            const n = [];
            for (const [s, o] of r) n.push(...t.map((t => {
                const n = t[1].slice();
                return n[e] = o, [Pt(s, t[0]), n]
            })));
            t = n
        }
        for (const e of t) e[1] = ur(e[1]);
        if (!0 === t[0][0]) return t[0][1];
        for (; null == t[t.length - 1][1];) t.pop();
        return ["CASE", ...t.flat()]
    }

    function r(e) {
        return null == e ? null : e instanceof Yn ? e : "number" == typeof e ? Yn.fromConstant(e) : "string" == typeof e ? Yn.fromConstant(parseFloat(e) || 0) : "boolean" == typeof e ? Yn.fromConstant(+e) : Yn.fromIndeterminate(e)
    }
    if ("+" === t) {
        const t = [];
        for (let n = 1; n < e.length; ++n) {
            const s = r(e[n]);
            if (null == s) return null;
            t.push(s)
        }
        return t.reduce(((e, t) => e.add(t)), ar)
    }
    if ("*" === t) {
        const t = [];
        for (let n = 1; n < e.length; ++n) {
            const s = r(e[n]);
            if (null == s) return null;
            t.push(s)
        }
        return t.reduce(((e, t) => e.multiply(t)), lr)
    }
    if ("-" === t) {
        const t = [];
        for (let n = 1; n < e.length; ++n) {
            const s = r(e[n]);
            if (null == s) return null;
            t.push(s)
        }
        return t.reduce(((e, t) => e.subtract(t)))
    }
    if ("/" === t) {
        const t = [];
        for (let n = 1; n < e.length; ++n) {
            const s = r(e[n]);
            if (null == s) return null;
            t.push(s)
        }
        return t.reduce(((e, t) => e.divide(t)))
    }
    if (["=", "<>", ">", ">=", "<", "<="].includes(t)) {
        if (null == e[1] || null == e[2]) return null;
        let n, r;
        if (e[1] instanceof Yn ? n = e[1] : "number" == typeof e[1] && (n = Yn.fromConstant(e[1])), e[2] instanceof Yn ? r = e[2] : "number" == typeof e[2] && (r = Yn.fromConstant(e[2])), n || r)
            if (n || (n = Yn.fromIndeterminate(e[1])), r || (r = Yn.fromIndeterminate(e[2])), n = n.subtract(r), r = n.constant().negation(), n = n.add(r), n.terms.length) {
                let s = 1;
                const o = n.terms[0].coefficientNumerator,
                    i = n.terms[0].coefficientDenominator;
                (Yt(o, Bn) || Yt(i, Bn)) && (s *= -1);
                const a = new Yn([{
                    indeterminates: new Hn,
                    coefficientNumerator: i,
                    coefficientDenominator: o
                }]);
                n = n.multiply(a), r = r.multiply(a);
                const l = n.terms[0].indeterminates.sortedKeys;
                let c = n.terms[0].indeterminates.map.get(l[0]) < 0 ? -1 : 0;
                for (const e of n.terms)
                    for (const t of e.indeterminates.map.values()) c += t;
                c < 0 && (s *= -1, n = n.reciprocal(), r = r.reciprocal()), e = s < 0 ? [cr[t], n, r] : [t, n, r]
            } else {
                if (e = [t, JSON.parse(n.toString()), JSON.parse(r.toString())], "=" === t) return e[1] === e[2];
                if ("<>" === t) return e[1] !== e[2];
                if (">" === t) return e[1] > e[2];
                if (">=" === t) return e[1] >= e[2];
                if ("<" === t) return e[1] < e[2];
                if ("<=" === t) return e[1] <= e[2]
            }
    }
    return e = Dt(e = e.map((e => e instanceof Yn ? JSON.parse(e.toString()) : e)))
}

function fr(e) {
    return (e = mt(e, ur)) instanceof Yn ? e = JSON.parse(e.toString()) : Array.isArray(e) && "CASE" === e[0] && (e = e.map((e => e instanceof Yn ? JSON.parse(e.toString()) : e))), e
}

function dr(e) {
    return e instanceof Gn ? e : Array.isArray(e) ? "CASE" === e[0] ? new ir(e.slice(1).map((e => dr(e)))) : new tr(e) : null == e ? new er : e ? new Zn : new Xn
}

function hr(e, t) {
    if (!e.length) return !1;
    const n = [];
    for (const r of e) {
        if (!r.length) return !0;
        const e = [];
        for (const n of r) {
            let r = t.getExpression(n >>> 2);
            if (!(1 & n) != !(2 & n) && (r = ["NOT", r]), Array.isArray(r) && "NOT" === r[0] && Array.isArray(r[1])) {
                const e = r[1];
                r = "IS NULL" === e[0] ? ["IS NOT NULL", ...e.slice(1)] : "LIKE" === e[0] ? ["NOT LIKE", ...e.slice(1)] : "=" === e[0] ? ["<>", ...e.slice(1)] : "<>" === e[0] ? ["=", ...e.slice(1)] : ">" === e[0] ? ["<=", ...e.slice(1)] : ">=" === e[0] ? ["<", ...e.slice(1)] : "<" === e[0] ? [">=", ...e.slice(1)] : "<=" === e[0] ? [">", ...e.slice(1)] : "NOT" === e[0] ? e[1] : ["NOT", e]
            }
            e.push(r)
        }
        e.length > 1 ? n.push(["AND"].concat(e)) : n.push(e[0])
    }
    return n.length > 1 ? ["OR"].concat(n) : n[0]
}

function pr(e) {
    if (!Array.isArray(e)) return [];
    const t = e[0];
    if ("IS NULL" === t || "IS NOT NULL" === t) return [];
    if ("FUNC" === t) {
        if ("NOW" === e[1]) return [];
        if ("LOWER" === e[1] || "UPPER" === e[1]) return pr(e[2]);
        if ("ROUND" === e[1]) return e.slice(2, 4).map((e => pr(e))).flat()
    } else if ("PARAM" !== t) return e.slice(1).map((e => pr(e))).flat();
    return [e]
}
class mr {
    constructor() {
        this._dcSet = [], this._variables = new Map, this._expressions = new Map, this._isNullRelations = new Map, this._isNullVars = new Set, this._comparisons = new Map
    }
    getVariable(e) {
        const t = JSON.stringify(e);
        if (this._variables.has(t)) return this._variables.get(t);
        const n = this._variables.size;
        return this._variables.set(t, n), this._expressions.set(n, e), this.generateIsNullDc(n), this.generateComparisionDc(n), '["IS NULL",["PARAM","DeviceID.ID"]]' !== t && '["IS NULL",["PARAM","_id"]]' !== t || this._dcSet.push([n << 2 ^ 3]), n
    }
    generateIsNullDc(e) {
        this._isNullRelations.set(e, []);
        const t = this._expressions.get(e),
            n = new Set(pr(t).map((e => this.getVariable(["IS NULL", e]))));
        if (n.size) {
            for (const t of n) this._isNullVars.add(t), this._isNullRelations.get(t).push(e), this._isNullRelations.get(e).push(t), this._dcSet.push([t << 2 ^ 3, e << 2 ^ 1]), this._dcSet.push([t << 2 ^ 3, e << 2 ^ 3]);
            this._dcSet.push([...n].map((e => e << 2 ^ 2)).concat([e << 2 ^ 0, e << 2 ^ 2]))
        }
    }
    generateComparisionDc(e) {
        const t = this._expressions.get(e);
        if (!Array.isArray(t)) return;
        const n = t[0];
        if (![">", "<", "="].includes(n)) return;
        const r = t[2],
            s = JSON.stringify(r),
            o = JSON.stringify(t[1]);
        let i = this._comparisons.get(o);
        if (i || this._comparisons.set(o, i = new Map), i.has(s)) return;
        const a = {
            eq: -1,
            gt: -1,
            lt: -1
        };
        i.set(s, a), a.eq = this.getVariable(["=", t[1], t[2]]), a.gt = this.getVariable([">", t[1], t[2]]), a.lt = this.getVariable(["<", t[1], t[2]]), this._dcSet.push([a.eq << 2 ^ 1, a.gt << 2 ^ 1, a.lt << 2 ^ 1]), this._dcSet.push([a.eq << 2 ^ 3, a.gt << 2 ^ 3]), this._dcSet.push([a.eq << 2 ^ 3, a.lt << 2 ^ 3]), this._dcSet.push([a.gt << 2 ^ 3, a.lt << 2 ^ 3]);
        const l = typeof t[2];
        if (["boolean", "number", "string"].includes(l))
            for (const [e, t] of i) {
                if (t === a) continue;
                const n = JSON.parse(e),
                    s = typeof n;
                if (!["boolean", "number", "string"].includes(s)) continue;
                let o = 0;
                o = l === s ? r > n ? 1 : -1 : "string" === l ? 1 : "string" === s ? -1 : +r - +n;
                const i = o > 0 ? a : t,
                    c = o > 0 ? t : a;
                this._dcSet.push([i.lt << 2 ^ 1, c.gt << 2 ^ 1]), this._dcSet.push([i.lt << 2 ^ 1, c.eq << 2 ^ 3]), this._dcSet.push([i.lt << 2 ^ 1, c.lt << 2 ^ 3]), this._dcSet.push([i.eq << 2 ^ 3, c.gt << 2 ^ 1]), this._dcSet.push([i.eq << 2 ^ 3, c.eq << 2 ^ 3]), this._dcSet.push([i.eq << 2 ^ 3, c.lt << 2 ^ 3]), this._dcSet.push([i.gt << 2 ^ 3, c.gt << 2 ^ 1]), this._dcSet.push([i.gt << 2 ^ 3, c.eq << 2 ^ 3]), this._dcSet.push([i.gt << 2 ^ 3, c.lt << 2 ^ 3])
            }
    }
    getExpression(e) {
        return this._expressions.get(e)
    }
    getIsNullRelations(e) {
        return this._isNullRelations.get(e)
    }
    isIsNull(e) {
        return this._isNullVars.has(e)
    }
    getDcSet(e) {
        if (!e) return this._dcSet;
        const t = new Set(e.flat().map((e => e >> 2)));
        for (const e of this._comparisons.values())
            for (const n of e.values()) {
                const e = Object.values(n).filter((e => !t.has(e)));
                1 === e.length && t.add(e[0])
            }
        for (const e of this._isNullVars) this._isNullRelations.get(e).some((e => t.has(e))) && t.add(e);
        const n = this._dcSet.filter((e => e.every((e => t.has(e >> 2)))));
        return n
    }
}

function gr(e, t) {
    const n = [];
    e: for (const r of e) {
        const e = new Map;
        for (const t of r) e.set(t >> 2, (e.get(t >> 2) || 0) | 1 << (3 & t));
        const s = [],
            o = [];
        for (const [n, r] of e) {
            if (10 === r) continue e;
            const e = t.getIsNullRelations(n),
                i = n << 2;
            5 === r ? 1 === e.length ? s.push(e[0] << 2 ^ 3) : o.push(e.map((e => e << 2 ^ 3))) : 1 === r ? o.push([...e.map((e => e << 2 ^ 3)), 3 ^ i]) : 4 === r ? o.push([...e.map((e => e << 2 ^ 3)), 1 ^ i]) : 8 & r ? s.push(3 ^ i) : 2 & r && s.push(1 ^ i)
        }
        let i = [s];
        for (; o.length;) {
            const e = [],
                t = o.pop();
            for (const n of t) e.push(...i.map((e => [...e, n])));
            i = e
        }
        n.push(...i)
    }
    return n
}

function vr(e) {
    const t = new mr;
    let n = e.true(t);
    n = gr(n, t);
    const r = wr(t);
    return n = Wn(n, t.getDcSet(n), {
        canRaise: r
    }), hr(n, t)
}

function yr(e) {
    if (!Array.isArray(e)) return e;
    if ("CASE" === e[0]) {
        e = e.slice();
        for (let t = 1; t < e.length; t += 2) e[t] = dr(e[t]);
        return e
    }
    const t = e[0];
    if ("IS NULL" === t) return new rr(dr(e[1]));
    if ("IS NOT NULL" === t) return new nr(new rr(dr(e[1])));
    if ("NOT" === t) return new nr(dr(e[1]));
    if ("OR" === t) return new sr(...e.slice(1).map((e => dr(e))));
    if ("AND" === t) return new or(...e.slice(1).map((e => dr(e))));
    for (let t = 1; t < e.length; ++t)
        if (e[t] instanceof Gn) e[t] = vr(e[t]);
        else if (Array.isArray(e[t]) && "CASE" === e[t][0])
        for (let n = 2; n < e[t].length; n += 2) e[t][n] instanceof Gn && (e[t][n] = vr(e[t][n]));
    return e
}

function wr(e) {
    return (t, n) => {
        const r = t >> 2,
            s = e.getIsNullRelations(r);
        if (!e.isIsNull(r)) {
            if (!(1 & t)) return !0;
            for (const e of s)
                if (n.has(e << 2 ^ 3)) return !0;
            if (n.has(3 ^ t)) return !1;
            for (const e of s)
                if (!n.has(e << 2 ^ 2)) return !1;
            return !0
        }
        for (const e of s)
            if (!n.has(e << 2 ^ 1) && !n.has(e << 2 ^ 3)) {
                if (n.has(e << 2 ^ 0)) return !1;
                if (n.has(e << 2 ^ 2)) return !1
            } return !0
    }
}

function br(e, t) {
    if (!(t = fr(t))) return [e, !1];
    if (t = mt(t, yr), !e) return Array.isArray(t) && "CASE" === t[0] && (t = dr(t)), t instanceof Gn && (t = vr(t)), [t, t];
    const n = dr(t),
        r = dr(e = mt(e = fr(e), yr)),
        s = new mr,
        o = n.true(s),
        i = r.true(s),
        a = r.null(s),
        l = r.false(s),
        c = gr([...i, ...o], s),
        u = gr(qn([...qn([...a, ...l]), ...qn(o)]), s),
        f = wr(s),
        d = Wn(c, s.getDcSet(c), {
            canRaise: f
        }),
        h = Wn(u, s.getDcSet(u), {
            canRaise: f
        });
    return [hr(d, s), hr(h, s)]
}

function Ar(e, t) {
    if (!(t = fr(t))) return !0;
    if (e = fr(e), !Array.isArray(e)) return !!e;
    const n = dr(e = mt(e, yr)),
        r = dr(t = mt(t, yr)),
        s = new mr,
        o = n.true(s),
        i = r.true(s);
    return a = [...qn(i), ...s.getDcSet(), ...o], On(xn.from(Un(a)));
    var a
}
const Sr = Rt(wt),
    xr = Rt(Nt);
let Or, kr, Cr, Er = 0,
    Dr = 0;
const Nr = {
        filter: new WeakMap,
        bookmark: new WeakMap,
        limit: new WeakMap,
        sort: new WeakMap,
        fulfilled: new WeakMap,
        fulfilling: new WeakSet,
        accessed: new WeakMap,
        value: new WeakMap
    },
    Pr = {};
for (const e of ["devices", "faults", "files", "presets", "provisions", "virtualParameters", "files", "config", "users", "permissions"]) Pr[e] = {
    objects: new Map,
    count: new Map,
    fetch: new Map,
    combinedFilter: null
};
class jr {
    get fulfilled() {
        return Nr.accessed.set(this, Date.now()), Nr.fulfilled.get(this) || 0
    }
    get fulfilling() {
        return Nr.accessed.set(this, Date.now()), !(Nr.fulfilled.get(this) >= Er)
    }
    get value() {
        return Nr.accessed.set(this, Date.now()), Nr.value.get(this)
    }
}
async function $r(e) {
    const t = e.extract,
        n = e.deserialize;
    return e.extract = (e, r) => {
        if ("function" == typeof t) return t(e, r);
        if (304 !== e.status && 2 !== Math.floor(e.status / 100)) {
            if (403 === e.status) throw new Error("Not authorized");
            const t = new Error;
            throw t.message = 0 === e.status ? "Server is unreachable" : `Unexpected response status code ${e.status}`, t.code = e.status, t.response = e.responseText, t
        }
        let s;
        if ("function" == typeof n) s = n(e.responseText);
        else if ((e.getResponseHeader("content-type") || "").startsWith("application/json")) try {
            s = e.responseText ? JSON.parse(e.responseText) : null
        } catch (t) {
            throw new Error("Invalid JSON: " + e.responseText.slice(0, 80))
        } else s = e.responseText;
        return s
    }, Z.request(e)
}

function _r(e) {
    if (!Array.isArray(e)) return e;
    return xr(e, null, Er + Dr)
}

function Ir(e, t) {
    const n = Sr(t);
    let r = Pr[e].count.get(n);
    return r || (r = new jr, Pr[e].count.set(n, r), Nr.filter.set(r, t), r)
}

function zr(e, t, n) {
    return Pt(e, Object.entries(t).sort(((e, t) => Math.abs(t[1]) - Math.abs(e[1]))).reverse().reduce(((e, t) => {
        const [r, s] = t;
        if (s <= 0) {
            if (null == n[r]) return jt(["IS NOT NULL", ["PARAM", r]], Pt(["IS NULL", ["PARAM", r]], e));
            let t = null;
            return t = jt(t, [">", ["PARAM", r], n[r]]), jt(t, Pt(["=", ["PARAM", r], n[r]], e))
        } {
            let t = ["IS NULL", ["PARAM", r]];
            return null == n[r] ? Pt(t, e) : (t = jt(t, ["<", ["PARAM", r], n[r]]), jt(t, Pt(["=", ["PARAM", r], n[r]], e)))
        }
    }), !0))
}

function Rr(e, t, n, r) {
    let s = [];
    for (const n of Pr[e].objects.values()) Nt(t, n, Er + Dr) && s.push(n);
    return s = s.sort(function(e) {
        const t = Object.entries(e).sort(((e, t) => Math.abs(t[1]) - Math.abs(e[1])));
        return (e, n) => {
            for (const [r, s] of t) {
                let t = e[r],
                    o = n[r];
                if (null != t && "object" == typeof t && (t = t.value ? t.value[0] : null), null != o && "object" == typeof o && (o = o.value ? o.value[0] : null), t > o) return s;
                if (t < o) return -1 * s;
                if (t !== o) {
                    const e = {
                            null: 1,
                            number: 2,
                            string: 3
                        },
                        n = e[null == t ? "null" : typeof t] || 4,
                        r = e[null == o ? "null" : typeof o] || 4;
                    return Math.max(-1, Math.min(1, n - r)) * s
                }
            }
            return 0
        }
    }(n)), r && (s = s.slice(0, r)), s
}

function Lr(e, t, n = {}) {
    const r = Sr(t),
        s = Object.assign({}, n.sort);
    for (const [e, t] of Object.entries(s)) s[e] += Math.sign(t);
    const o = n.limit || 0;
    "devices" === e ? s["DeviceID.ID"] = s["DeviceID.ID"] || 1 : s._id = s._id || 1;
    const i = `${r}:${o}:${JSON.stringify(s)}`;
    let a = Pr[e].fetch.get(i);
    return a || (a = new jr, Pr[e].fetch.set(i, a), Nr.filter.set(a, t), Nr.limit.set(a, o), Nr.sort.set(a, s), function(e, t) {
        const n = Nr.limit.get(t);
        let r = Nr.filter.get(t);
        r = _r(r);
        const s = Nr.bookmark.get(t),
            o = Nr.sort.get(t);
        !s && n || (s && (r = zr(r, o, s)), Ar(Pr[e].combinedFilter, r) && Nr.fulfilled.set(t, Er)), Nr.value.set(t, Rr(e, r, o, n))
    }(e, a), a)
}

function Mr() {
    return Er
}

function Tr(e) {
    if (e > Er) {
        Er = e;
        for (const e of Object.values(Pr)) e.combinedFilter = null
    }
}

function Ur() {
    return Dr
}

function Fr(e, t) {
    for (const n of t) n.status = "pending", n.device = e;
    return $r({
        method: "POST",
        url: `api/devices/${encodeURIComponent(e)}/tasks`,
        body: t,
        extract: e => {
            if (403 === e.status) throw new Error("Not authorized");
            if (!e.status) throw new Error("Server is unreachable");
            if (200 !== e.status) throw new Error(e.response);
            const n = e.getResponseHeader("Connection-Request"),
                r = JSON.parse(e.response);
            for (const [e, n] of r.entries()) t[e]._id = n._id, t[e].status = n.status, t[e].fault = n.fault;
            return n
        }
    })
}

function qr(e, t) {
    return $r({
        method: "POST",
        url: `api/devices/${encodeURIComponent(e)}/tags`,
        body: t
    })
}

function Wr(e, t) {
    return $r({
        method: "DELETE",
        url: `api/${e}/${encodeURIComponent(t)}`
    })
}

function Br(e, t, n) {
    for (const e in n) void 0 === n[e] && (n[e] = null);
    return $r({
        method: "PUT",
        url: `api/${e}/${encodeURIComponent(t)}`,
        body: n
    })
}

function Vr(e, t) {
    const n = ["=", ["PARAM", "devices" === e ? "DeviceID.ID" : "_id"], t];
    return $r({
        method: "HEAD",
        url: `api/${e}/?` + Z.buildQueryString({
            filter: Sr(n)
        }),
        extract: e => {
            if (403 === e.status) throw new Error("Not authorized");
            if (!e.status) throw new Error("Server is unreachable");
            if (200 !== e.status) throw new Error(`Unexpected response status code ${e.status}`);
            return +e.getResponseHeader("x-total-count")
        },
        background: !0
    })
}

function Jr(e, t) {
    return Array.isArray(e) ? xr(e, t, Er + Dr) : e
}

function Kr(e, t, n) {
    const r = {
        newPassword: t
    };
    return n && (r.authPassword = n), $r({
        method: "PUT",
        url: `api/users/${e}/password`,
        background: !0,
        body: r
    })
}

function Hr(e) {
    return Z(`svg.icon.icon-${e}`, {
        key: `icon-${e}`
    }, Z("use", {
        href: `icons.svg#icon-${e}`
    }))
}
setInterval((function() {
    const e = Date.now();
    Z.request({
        url: "status",
        method: "GET",
        background: !0,
        extract: t => {
            const n = Date.now();
            if (200 !== t.status) Or || (Or = Tt("warning", "Server is unreachable", {}));
            else {
                Or && (Ut(Or), Or = null);
                try {
                    const r = Math.trunc((e + n) / 2),
                        s = Date.parse(t.getResponseHeader("Date")) - r;
                    Math.abs(s - Dr) > 5e3 && n - e < 1e3 && (Dr = s, console.warn(`System and server clocks are out of sync. Adding ${Dr}ms offset to any client-side time relative calculations.`), Tr(n), Z.redraw())
                } catch (e) {}
                const r = t.getResponseHeader("x-config-snapshot") !== qt,
                    s = t.getResponseHeader("genieacs-version") !== Wt;
                !kr != !r && (kr ? (Ut(kr), kr = null) : kr = Tt("warning", "Configuration has been modified, please reload the page", {
                    Reload: () => {
                        window.location.reload()
                    }
                })), !Cr != !s && (Cr ? (Ut(Cr), Cr = null) : Cr = Tt("warning", "Server has been updated, please reload the page", {
                    Reload: () => {
                        window.location.reload()
                    }
                }))
            }
        }
    }).catch((e => {
        Tt("error", e.message)
    }))
}), 3e3);
const Qr = new Set,
    Yr = new Set;

function Gr(e) {
    let t = Qr.size;
    for (const n of e) Qr.has(n) || ++t;
    return t <= 100
}

function Zr(...e) {
    if (Gr(e))
        for (const t of e) t.status = "queued", Qr.add(t);
    else Tt("error", "Too many tasks in queue")
}

function Xr(e) {
    Qr.delete(e)
}

function es() {
    return Qr
}

function ts() {
    Qr.clear()
}

function ns() {
    return Yr
}

function rs(e) {
    Qr.size + e.devices.length > 100 ? Tt("error", "Too many tasks in queue") : Yr.add(e)
}

function ss(e, t) {
    const n = {};
    if (!Gr(e)) return Promise.reject(new Error("Too many tasks in queue"));
    for (const t of e) n[t.device] = n[t.device] || [], n[t.device].push(t), t.status = "queued", Qr.add(t);
    return new Promise((e => {
        let r = 1;
        for (const [s, o] of Object.entries(n)) ++r, Fr(s, o).then((n => {
            for (const e of o) "pending" === e.status ? e.status = "stale" : "done" === e.status && Qr.delete(e);
            t(s, null, n, o), 0 == --r && e()
        })).catch((n => {
            for (const e of o) e.status = "stale";
            t(s, n, null, o), 0 == --r && e()
        }));
        0 == --r && e()
    }))
}
const os = new WeakSet;

function is(e) {
    return Z("span.parameter", {
        title: e
    }, `${e}`)
}

function as(e, t, n) {
    function r(e) {
        "Enter" === e.key ? t() : "Escape" === e.key ? n() : e.redraw = !1
    }
    let s;
    if ("xsd:boolean" === e.parameterValues[0][2]) s = Z("select", {
        value: e.parameterValues[0][1].toString(),
        onchange: t => {
            t.redraw = !1, e.parameterValues[0][1] = s.dom.value
        },
        onkeydown: r,
        oncreate: e => {
            e.dom.focus()
        }
    }, [Z("option", {
        value: "true"
    }, "true"), Z("option", {
        value: "false"
    }, "false")]);
    else {
        const t = e.parameterValues[0][2];
        let n = e.parameterValues[0][1];
        "xsd:dateTime" === t && "number" == typeof n && (n = new Date(n).toJSON() || n), s = Z("input", {
            type: ["xsd:int", "xsd:unsignedInt"].includes(t) ? "number" : "text",
            value: n,
            oninput: t => {
                t.redraw = !1, e.parameterValues[0][1] = s.dom.value
            },
            onkeydown: r,
            oncreate: e => {
                e.dom.focus(), e.dom.select(), e.dom.parentNode.parentNode.scrollTop = 0
            }
        })
    }
    return [Z("span", "Editando ", is(e.parameterValues[0][0])), s]
}

function ls(e) {
    e.fileName && e.fileType ? os.delete(e) : os.add(e);
    const t = Lr("files", !0);
    let n = "",
        r = "";
    for (const t of e.devices) {
        const e = t.split("-");
        "" === n ? n = e[0] : n !== e[0] && (n = null), 3 === e.length && ("" === r ? r = e[1] : r !== e[1] && (r = null))
    }
    n && (n = decodeURIComponent(n)), r && (r = decodeURIComponent(r));
    const s = [...new Set(["", "1 Firmware Upgrade Image", "2 Web Content", "3 Vendor Configuration File", "4 Tone File", "5 Ringer File", ...t.value.map((e => e["metadata.fileType"])).filter((e => e))])].map((t => Z("option", {
            disabled: !t,
            value: t,
            selected: (e.fileType || "") === t
        }, t))),
        o = [""].concat(t.value.filter((e => !(e["metadata.oui"] && e["metadata.oui"] !== n || e["metadata.productClass"] && e["metadata.productClass"] !== r))).map((e => e._id))).map((t => Z("option", {
            disabled: !t,
            value: t,
            selected: (e.fileName || "") === t
        }, t)));
    return ["Push ", Z("select", {
        onchange: n => {
            const r = n.target.value;
            e.fileName = r, e.fileType = "";
            for (const n of t.value) n._id === r && (e.fileType = n["metadata.fileType"])
        },
        disabled: t.fulfilling,
        style: "width: 350px"
    }, o), " as ", Z("select", {
        onchange: t => {
            e.fileType = t.target.value
        }
    }, s)]
}
const cs = () => ({
        view: e => {
            const t = es(),
                n = ns();
            let r, s;
            const o = function(e) {
                    const t = [];
                    for (const n of e) {
                        let e;
                        if (n.actions) {
                            const t = Object.entries(n.actions).map((([e, t]) => Z("button.primary", {
                                onclick: t
                            }, e)));
                            t.length && (e = Z("div", {
                                style: "float: right"
                            }, t))
                        }
                        t.push(Z("div.notification", {
                            class: n.type,
                            style: "position: absolute;opacity: 0",
                            oncreate: e => {
                                e.dom.style.opacity = "1"
                            },
                            onbeforeremove: e => (e.dom.style.opacity = "0", new Promise((e => {
                                setTimeout((() => {
                                    e()
                                }), 500)
                            }))),
                            key: n.timestamp
                        }, Z("div", e, n.message)))
                    }
                    return t
                }(Mt),
                i = function(e) {
                    const t = [];
                    for (const n of e) {
                        const r = () => {
                                e.delete(n);
                                for (const e of n.devices) {
                                    const t = Object.assign({
                                        device: e
                                    }, n);
                                    delete t.devices, Zr(t)
                                }
                            },
                            s = () => {
                                e.delete(n)
                            };
                        let o;
                        "setParameterValues" === n.name ? o = as(n, r, s) : "download" === n.name && (o = ls(n));
                        const i = Z("button.primary", {
                                title: "Queue task",
                                onclick: r,
                                disabled: os.has(n)
                            }, "Queue"),
                            a = Z("button", {
                                title: "Cancel edit",
                                onclick: s
                            }, "Cancel");
                        t.push(Z(".staging", o, Z("div.actions", i, a)))
                    }
                    return t
                }(n),
                a = function(e) {
                    const t = [],
                        n = {};
                    for (const t of e) n[t.device] = n[t.device] || [], n[t.device].push(t);
                    for (const [e, s] of Object.entries(n)) {
                        t.push(Z("strong", e));
                        for (const e of s) {
                            const n = [];
                            "fault" !== e.status && "stale" !== e.status || n.push(Z("button", {
                                title: "Retry this task",
                                onclick: () => {
                                    Zr(e)
                                }
                            }, Hr("retry"))), n.push(Z("button", {
                                title: "Remove this task",
                                onclick: () => {
                                    Xr(e)
                                }
                            }, Hr("remove"))), "setParameterValues" === e.name ? t.push(Z(`div.${e.status}`, Z("span", "Set ", is(e.parameterValues[0][0]), " to '", (r = e.parameterValues[0][1], Z("span.value", {
                                title: r
                            }, `${r}`)), "'"), Z(".actions", n))) : "refreshObject" === e.name ? t.push(Z(`div.${e.status}`, Z("span", "Refresh ", is(e.parameterName)), Z(".actions", n))) : "reboot" === e.name ? t.push(Z(`div.${e.status}`, "Reboot", Z(".actions", n))) : "factoryReset" === e.name ? t.push(Z(`div.${e.status}`, "Factory reset", Z(".actions", n))) : "addObject" === e.name ? t.push(Z(`div.${e.status}`, Z("span", "Add ", is(e.objectName)), Z(".actions", n))) : "deleteObject" === e.name ? t.push(Z(`div.${e.status}`, Z("span", "Delete ", is(e.objectName)), Z(".actions", n))) : "getParameterValues" === e.name ? t.push(Z(`div.${e.status}`, `Refresh ${e.parameterNames.length} parameters`, Z(".actions", n))) : "download" === e.name ? t.push(Z(`div.${e.status}`, `Push file: ${e.fileName} (${e.fileType})`, Z(".actions", n))) : t.push(Z(`div.${e.status}`, e.name, Z(".actions", n)))
                        }
                    }
                    var r;
                    return t
                }(t);

            function l() {
                let e = 10;
                for (const t of o) t.dom.style.top = `${e}`, e += t.dom.offsetHeight + 10
            }

            function c() {
                let t = s.dom.offsetTop + s.dom.offsetHeight;
                if (i.length)
                    for (const e of i) t = Math.max(t, e.dom.offsetTop + e.dom.offsetHeight);
                else if (e.state.mouseIn)
                    for (const e of r.children) t = Math.max(t, e.dom.offsetTop + e.dom.offsetHeight);
                r.dom.style.height = t
            }
            if (i.length + a.length) {
                const n = {
                    queued: 0,
                    pending: 0,
                    fault: 0,
                    stale: 0
                };
                for (const e of t) n[e.status] += 1;
                const o = Z(".actions", Z("button.primary", {
                    title: "Commit queued tasks",
                    disabled: !n.queued,
                    onclick: () => {
                        ss(Array.from(es()).filter((e => "queued" === e.status)), ((e, t, n, r) => {
                            if (t) Tt("error", `${e}: ${t.message}`);
                            else if ("OK" === n) {
                                for (const t of r) {
                                    if ("stale" === t.status) return void Tt("error", `${e}: No contact from device`);
                                    if ("fault" === t.status) return void Tt("error", `${e}: Task(s) faulted`)
                                }
                                Tt("success", `${e}: Task(s) committed`)
                            } else Tt("error", `${e}: ${n}`)
                        })).then((() => {
                            Tr(Date.now())
                        })).catch((e => {
                            Tt("error", e.message)
                        }))
                    }
                }, "Enviar"), Z("button", {
                    title: "Limpiar tareas",
                    onclick: ts,
                    disabled: !a.length
                }, "Limpiar"));
                s = Z(".status", Z("span.queued", {
                    class: n.queued ? "active" : ""
                }, `En cola: ${n.queued}`), Z("span.pending", {
                    class: n.pending ? "active" : ""
                }, `Pendientes: ${n.pending}`), Z("span.fault", {
                    class: n.fault ? "active" : ""
                }, `Con fallos: ${n.fault}`), Z("span.stale", {
                    class: n.stale ? "active" : ""
                }, `Duradero: ${n.stale}`), o), r = Z(".drawer", {
                    key: "drawer",
                    style: "opacity: 0;height: 0;",
                    oncreate: t => {
                        e.state.mouseIn = !1, t.dom.style.opacity = "1", c()
                    },
                    onmouseover: t => {
                        e.state.mouseIn = !0, c(), t.redraw = !1
                    },
                    onmouseleave: t => {
                        e.state.mouseIn = !1, c(), t.redraw = !1
                    },
                    onupdate: c,
                    onbeforeremove: e => (e.dom.onmouseover = null, e.dom.onmouseleave = null, e.dom.style.opacity = "0", e.dom.style.height = "0", new Promise((e => {
                        setTimeout(e, 500)
                    })))
                }, s, i.length ? i : Z(".queue", a))
            }
            return Z("div.drawer-wrapper", r, Z("div.notifications-wrapper", {
                key: "notifications",
                style: "position: relative;",
                onupdate: l,
                oncreate: l
            }, o))
        }
    }),
    us = () => ({
        view: () => window.username ? Z("div.user-menu", window.username, Z("button", {
            onclick: e => (e.target.disabled = !0, $r({
                method: "POST",
                url: "logout"
            }).then((() => {
                location.hash = "", location.reload()
            })).catch((t => {
                e.target.disabled = !1, Tt("error", t.message)
            })), !1)
        }, "Cerrar sesion")) : Z("div.user-menu", Z("a", {
            href: "#!/login?" + Z.buildQueryString({
                continue: Z.route.get()
            })
        }, "Iniciar sesion"))
    }),
    fs = () => ({
        view: e => {
            const t = {
                    [e.attrs.page]: "active"
                },
                n = [];
            return window.authorizer.hasAccess("presets", 1) && n.push(Z("li", {
                class: t.presets
            }, Z("a", {
                href: "#!/admin/presets"
            }, "Presets"))), window.authorizer.hasAccess("provisions", 1) && n.push(Z("li", {
                class: t.provisions
            }, Z("a", {
                href: "#!/admin/provisions"
            }, "Provisiones"))), window.authorizer.hasAccess("virtualParameters", 1) && n.push(Z("li", {
                class: t.virtualParameters
            }, Z("a", {
                href: "#!/admin/virtualParameters"
            }, "Parametros virtuales"))), window.authorizer.hasAccess("files", 1) && n.push(Z("li", {
                class: t.files
            }, Z("a", {
                href: "#!/admin/files"
            }, "Archivos"))), window.authorizer.hasAccess("config", 1) && n.push(Z("li", {
                class: t.config
            }, Z("a", {
                href: "#!/admin/config"
            }, "Configuracion"))), window.authorizer.hasAccess("permissions", 1) && n.push(Z("li", {
                class: t.permissions
            }, Z("a", {
                href: "#!/admin/permissions"
            }, "Permisos"))), window.authorizer.hasAccess("users", 1) && n.push(Z("li", {
                class: t.users
            }, Z("a", {
                href: "#!/admin/users"
            }, "Usuarios"))), Z("nav#side-menu", Z("ul", n))
        }
    });
let ds = null,
    hs = null;

function ps(e, t = null) {
    ds = e, hs = t
}

function ms(e, t = !0) {
    return e === ds && (!(!t && hs && !hs()) && (ds = null, hs = null, !0))
}
document.addEventListener("keydown", (e => {
    ds && "Escape" === e.key && ms(ds, !1) && Z.redraw()
})), window.addEventListener("popstate", (() => {
    ms(ds, !1) && Z.redraw()
}));
const gs = new Map;
const vs = () => ({
        view: () => [...gs.values()],
        onupdate: () => {
            for (const e of gs.keys()) {
                document.querySelector(`[list='${e}']`) || gs.delete(e)
            }
        }
    }),
    ys = ["presets", "provisions", "virtualParameters", "files", "config", "users", "permissions"],
    ws = () => ({
        view: e => {
            let t, n;
            if (ys.includes(e.attrs.page)) {
                n = "admin";
                const r = {};
                r.page = e.attrs.page, t = Z(fs, r)
            }
            const r = {};
            return r.page = n || e.attrs.page, [Z("#header", [Z("div.logo", Z("img", {
                src: "logo.png"
            }), Z("span.version", "")), Z(us), Z(X, r), Z(cs)]), Z("#content-wrapper", t, Z("#content", {
                class: `page-${e.attrs.page}`
            }, [e.children])), ds ? Z(".overlay-wrapper", {
                tabindex: 0,
                onclick: () => {
                    ms(ds, !1)
                },
                style: "opacity: 0",
                oncreate: e => {
                    e.dom.focus(), e.dom.style.opacity = "1"
                },
                onbeforeremove: e => (e.dom.style.opacity = "0", new Promise((e => {
                    setTimeout((() => {
                        e()
                    }), 500)
                })))
            }, Z(".overlay", {
                onclick: e => {
                    e.stopPropagation()
                }
            }, ds())) : null, Z(vs)]
        }
    });
const bs = Object.freeze({
        __proto__: null,
        init: async function() {
            return Z.request({
                url: "init"
            })
        },
        component: e => {
            let t = e.attrs;
            const n = new Set;
            for (const [e, r] of Object.entries(t)) r && n.add(e);
            return {
                view: () => {
                    document.title = "Asistente de inicializacion - GenieACS";
                    const e = ["users", "presets", "filters", "device", "index", "overview"].map((e => (t[e] || n.delete(e), Z("input", {
                        type: "checkbox",
                        checked: n.has(e),
                        disabled: !t[e],
                        style: "display: inline; margin-right: 0.5em;",
                        onclick: t => {
                            t.target.checked ? n.add(e) : n.delete(e)
                        }
                    }))));
                    return Z(".wizard-dialog", [Z("h1", "Initialization wizard"), Z("p", "This wizard will seed the database with a minimal initial configuration to serve as a starting point. Select what you want to initialize and click 'ABRACADABRA!'."), Z("div", Z("label", e[0], "Users, roles and permissions")), Z("div", Z("label", e[1], "Presets and provisions")), Z("div", Z("label", e[2], "Devices predefined search filters")), Z("div", Z("label", e[3], "Device details page")), Z("div", Z("label", e[4], "Devices listing page")), Z("div", Z("label", e[5], "Overview page")), Z("button.primary", {
                        style: "margin: 10px;",
                        disabled: 0 === n.size,
                        onclick: e => {
                            e.target.disabled = !0;
                            const r = {};
                            for (const e of n) r[e] = !0;
                            Z.request({
                                method: "POST",
                                url: "init",
                                body: r
                            }).then((() => {
                                setTimeout((() => {
                                    Z.request({
                                        url: "init"
                                    }).then((n => {
                                        e.target.disabled = !1, t = n, Tt("success", "Initialization complete", {
                                            "Open Sesame!": () => {
                                                Z.route.set("/login"), window.location.reload()
                                            }
                                        })
                                    })).catch((e => {
                                        Tt("error", e.message)
                                    }))
                                }), 3e3), r.users && alert("An administrator user has been created for you. Use admin/admin to log in. Don't forget to change the default password.")
                            })).catch((e => {
                                Tt("error", e.message)
                            }))
                        }
                    }, "ABRACADABRA!")])
                }
            }
        }
    }),
    As = {
        year: 31104e6,
        month: 2592e6,
        day: 864e5,
        hour: 36e5,
        minute: 6e4,
        second: 1e3
    };
const Ss = Rt(((e, t, n) => {
        let r = n;
        e = Nt(e, null, n, (e => {
            if (!Array.isArray(e)) return e;
            for (let n = 1; n < e.length; ++n)
                if (Array.isArray(e[n]) && "PARAM" === e[n][0] && !Array.isArray(e[n][1])) {
                    let s = null;
                    const o = t[e[n][1]];
                    (null == o ? void 0 : o.value) && (s = o.value[0], r = Math.min(r, o.valueTimestamp)), (e = e.slice())[n] = s
                } return "FUNC" !== e[0] || "DATE_STRING" !== e[1] || Array.isArray(e[2]) ? e : new Date(e[2]).toLocaleString()
        }));
        let s = null,
            o = null;
        if (Array.isArray(e)) {
            if ("PARAM" === e[0]) {
                const n = t[e[1]];
                (null == n ? void 0 : n.value) && (r = n.valueTimestamp, o = n.value[0], s = e[1], "xsd:dateTime" === n.value[1] && "number" == typeof o && (o = new Date(o).toLocaleString()))
            }
        } else o = e;
        return {
            value: o,
            timestamp: r,
            parameter: s
        }
    })),
    xs = () => ({
        view: e => {
            var t;
            const n = e.attrs.device,
                {
                    value: r,
                    timestamp: s,
                    parameter: o
                } = Ss(e.attrs.parameter, n, Mr() + Ur());
            if (null == r) return null;
            let i;
            (null === (t = n[o]) || void 0 === t ? void 0 : t.writable) && (i = Qs("button", {
                title: "Editar valor del parametro",
                onclick: () => {
                    var e;
                    e = {
                        name: "setParameterValues",
                        devices: [n["DeviceID.ID"].value[0]],
                        parameterValues: [
                            [o, n[o].value[0], n[o].value[1]]
                        ]
                    }, Qr.size + e.devices.length > 100 ? Tt("error", "Too many tasks in queue") : Yr.add(e)
                }
            }, Hr("edit")));
            const a = Qs("long-text", {
                text: `${r}`
            });
            return Qs("span", {
                class: "parameter-value",
                onmouseover: e => {
                    if (e.redraw = !1, e.target === a.dom) {
                        const t = Date.now() + Ur(),
                            n = new Date(s).toLocaleString();
                        e.target.title = `${n} (${function(e){let t="",n=2;for(const[r,s]of Object.entries(As))if(e>=s){let o;if(n>1?(o=Math.floor(e/s),e-=o*s):o=Math.round(e/s),t+=o>1?`${o} ${r}s `:`${o} ${r} `,!--n)break}return t+"ago"}(t-s)})`
                    }
                }
            }, a, i)
        }
    }),
    Os = () => ({
        view: e => {
            const t = e.attrs.device,
                n = Object.values(e.attrs.parameters).map((e => {
                    const n = Jr(e.type, t),
                        r = Qs.context({
                            device: t,
                            parameter: e.parameter
                        }, n || "parameter", e);
                    return Qs("tr", {
                        oncreate: e => {
                            e.dom.style.display = r.dom ? "" : "none"
                        },
                        onupdate: e => {
                            e.dom.style.display = r.dom ? "" : "none"
                        }
                    }, Qs("th", e.label), Qs("td", r))
                }));
            return Qs("loading", {
                queries: [e.attrs.deviceQuery]
            }, Qs("table.parameter-list", n))
        }
    }),
    ks = () => ({
        oninit: e => {
            const t = e.attrs.parameter;
            if (!Array.isArray(t) || "PARAM" !== t[0]) throw new Error("Object must be a parameter path");
            e.state.object = t[1], e.state.parameters = Object.values(e.attrs.childParameters)
        },
        view: e => {
            const t = e.attrs.device,
                n = Jr(e.state.object, t),
                r = e.state.parameters;
            if ("string" != typeof n || !t[n]) return null;
            const s = new Set,
                o = `${n}.`;
            for (const e in t)
                if (e.startsWith(o)) {
                    const t = e.indexOf(".", o.length); - 1 === t ? s.add(e) : s.add(e.slice(0, t))
                } const i = Object.values(r).map((e => Qs("th", e.label))),
                a = Qs("thead", Qs("tr", i)),
                l = [];
            for (const n of s) {
                let s = !("filter" in e.attrs) || e.attrs.filter;
                if (s = mt(s, (e => Array.isArray(e) && "PARAM" === e[0] ? ["PARAM", ["||", n, ".", e[1]]] : e)), !Jr(s, t)) continue;
                const o = r.map((e => {
                    const r = mt(e.parameter, (e => Array.isArray(e) && "PARAM" === e[0] ? ["PARAM", ["||", n, ".", e[1]]] : e));
                    return Qs("td", Qs.context({
                        device: t,
                        parameter: r
                    }, e.type || "parameter", Object.assign({}, e, {
                        device: t,
                        parameter: r,
                        label: null
                    })))
                }));
                !0 === t[n].writable && o.push(Qs("td", Qs("button", {
                    title: "Delete this instance",
                    onclick: () => {
                        Zr({
                            name: "deleteObject",
                            device: t["DeviceID.ID"].value[0],
                            objectName: n
                        })
                    }
                }, Hr("delete-instance")))), l.push(Qs("tr", o))
            }
            let c;
            l.length || l.push(Qs("tr.empty", Qs("td", {
                colspan: i.length
            }, "No instances"))), !0 === t[n].writable && l.push(Qs("tr", Qs("td", {
                colspan: i.length
            }), Qs("td", Qs("button", {
                title: "Create a new instance",
                onclick: () => {
                    Zr({
                        name: "addObject",
                        device: t["DeviceID.ID"].value[0],
                        objectName: n
                    })
                }
            }, Hr("add-instance")))));
            const u = Jr(e.attrs.label, t);
            return null != u && (c = Qs("h2", u)), [c, Qs("loading", {
                queries: [e.attrs.deviceQuery]
            }, Qs("table.table", a, Qs("tbody", l)))]
        }
    }),
    Cs = Ft.ui.overview.charts,
    Es = () => ({
        view: e => {
            const t = e.attrs.device,
                n = Jr(e.attrs.chart, t || {}),
                r = Cs[n];
            if (!r) return null;
            for (const e of Object.values(r.slices)) {
                if (Jr(e.filter, t || {})) {
                    const t = Qs("svg", {
                        width: "1em",
                        height: "1em",
                        xmlns: "http://www.w3.org/2000/svg",
                        "xmlns:xlink": "http://www.w3.org/1999/xlink"
                    }, Qs("circle", {
                        cx: "0.5em",
                        cy: "0.5em",
                        r: "0.4em",
                        fill: e.color
                    }));
                    return Qs("span.overview-dot", t, `${e.label}`)
                }
            }
            return null
        }
    }),
    Ds = Rt(((e, t, n) => {
        const r = {};
        for (const [n, s] of Object.entries(e)) {
            const e = mt(s, (e => {
                if (Array.isArray(e) && "FUNC" === e[0] && "ENCODEURICOMPONENT" === e[1]) {
                    const n = Jr(e[2], t);
                    return null == n ? null : encodeURIComponent(n)
                }
                return e
            }));
            r[n] = Jr(e, t)
        }
        return r
    })),
    Ns = () => ({
        view: e => {
            const t = e.attrs.device;
            if ("filter" in e.attrs && !Jr(e.attrs.filter, t || {})) return null;
            const n = Object.values(e.attrs.components).map((e => {
                if (Array.isArray(e) && (e = Jr(e, t || {})), "object" != typeof e) return `${e}`;
                const n = Jr(e.type, t || {});
                return n ? Qs(n, e) : null
            }));
            let r, s = e.attrs.element;
            return null == s ? n : (Array.isArray(s) ? s = Jr(s, t || {}) : "object" == typeof s && (null != s.attributes && (r = Ds(s.attributes, t || {}, Mr())), s = Jr(s.tag, t || {})), Qs(s, r, n))
        }
    }),
    Ps = () => ({
        view: e => {
            const t = e.attrs.device;
            return Qs("button.primary", {
                title: "Iniciar sesion en el dispositivo y refrescar los parametros basicos",
                onclick: n => {
                    n.target.disabled = !0;
                    const r = Object.values(e.attrs.parameters).map((e => Array.isArray(e) && "PARAM" === e[0] ? Jr(e[1], t) : null)).filter((e => !!e));
                    ss([{
                        name: "getParameterValues",
                        parameterNames: r,
                        device: t["DeviceID.ID"].value[0]
                    }], ((e, t, n, r) => {
                        if (t) Tt("error", `${e}: ${t.message}`);
                        else {
                            for (const e of r) "stale" === e.status && Xr(e);
                            "OK" !== n ? Tt("error", `${e}: ${n}`) : "stale" === r[0].status ? Tt("error", `${e}: No contact from device`) : "fault" === r[0].status ? Tt("error", `${e}: Refresh faulted`) : Tt("success", `${e}: Summoned`)
                        }
                    })).then((() => {
                        n.target.disabled = !1, Tr(Date.now())
                    })).catch((e => {
                        n.target.disabled = !1, Tt("error", e.message)
                    }))
                }
            }, "Leer valores basicos")
        }
    }),
    js = new Set(["true", "True", "TRUE", "false", "False", "FALSE", "null", "Null", "NULL"]);

function $s(e) {
    return !/[^\t\n\x20-\x7e\x85\u{a0}-\u{d7ff}\u{e000}-\u{fffd}\u{10000}-\u{10ffff}]/u.test(e)
}

function _s(e) {
    return e && $s(e) ? /^[\s-?:,[\]{}#&$!|>'"%@`]|: | #|[\n,[\]{}]|\s$/.test(e) ? JSON.stringify(e) : e : JSON.stringify(e)
}

function Is(e, t, n = "", r = "") {
    if (null == e) return void t.push(`${n}null`);
    if ("number" == typeof e || "boolean" == typeof e) return void t.push(`${n}${JSON.stringify(e)}`);
    if (e instanceof Date) return void t.push(`${n}${e.toJSON()}`);
    if ("string" == typeof e) return void
    function(e, t, n, r) {
        if (/^\s*$/.test(e) || js.has(e) || !$s(e)) return void t.push(n + JSON.stringify(e));
        r || (r = "  ");
        const s = e.split("\n");
        if (s.length > 1) {
            let o = "",
                i = "-";
            if ((s.find((e => e)) || "").startsWith(" ") && (o = `${"  ".length}`), s[s.length - 1] || (s.pop(), i = s[s.length - 1] ? "" : "+"), /^\s+$/.test(s[s.length - 1])) return void t.push(n + JSON.stringify(e));
            let a = !1;
            const l = s.map((e => {
                const t = function(e) {
                    if (e.length <= 80) return [e];
                    if (e.startsWith(" ")) return [e];
                    const t = [];
                    let n = 0,
                        r = 0;
                    for (let s = 1; s < e.length - 1; ++s) {
                        if (" " !== e[s]) continue;
                        if (" " === e[s + 1]) {
                            for (s += 2;
                                " " === e[s];) ++s;
                            continue
                        }
                        if (s <= n + 80) {
                            r = s;
                            continue
                        }
                        const o = r > n ? r : s;
                        t.push(e.slice(n, o)), n = o + 1, r = s
                    }
                    return r > n && e.length > n + 80 && (t.push(e.slice(n, r)), n = r + 1), t.push(e.slice(n)), t
                }(e);
                return t.length > 1 && (a = !0), t
            }));
            if (!a) return void t.push(`${n}|${o}${i}`, ...s.map((e => e ? r + e : e)));
            t.push(`${n}>${o}${i}`), t.push(...l[0].map((e => r + e)));
            for (let e = 1; e < l.length; ++e) l[e - 1][0] && !l[e - 1][0].startsWith(" ") && t.push(""), t.push(...l[e].map((e => r + e)))
        } else /^[\s-?:,[\]{}#&$!|>'"%@`]|: | #|\s$/.test(e) || parseFloat(e) === +e ? t.push(n + JSON.stringify(e)) : t.push(n + e)
    }(e, t, n, r);
    if (Array.isArray(e)) {
        if (!e.length) return void t.push(n + "[]");
        if (!n || n.endsWith("- ")) {
            Is(e[0], t, n + "- ", r + "  "), n = r + "- ", r += "  ";
            for (let s = 1; s < e.length; ++s) Is(e[s], t, n, r)
        } else {
            t.push(n), n = r + "- ", r += "  ";
            for (let s = 0; s < e.length; ++s) Is(e[s], t, n, r)
        }
        return
    }
    const s = Object.entries(e).filter((e => void 0 !== e[1]));
    if (s.length)
        if (!n || n.endsWith("- ")) {
            Is(s[0][1], t, n + `${_s(s[0][0])}: `, r + "  "), n = r, r += "  ";
            for (let e = 1; e < s.length; ++e) Is(s[e][1], t, n + `${_s(s[e][0])}: `, r)
        } else {
            t.push(n), n = r, r += "  ";
            for (let e = 0; e < s.length; ++e) Is(s[e][1], t, n + `${_s(s[e][0])}: `, r)
        }
    else t.push(n + "{}")
}

function zs(e) {
    if (void 0 === e) return;
    const t = [];
    return Is(e, t), t.join("\n") + "\n"
}
const Rs = () => ({
        view: e => {
            const t = e.attrs.device["DeviceID.ID"].value[0],
                n = Lr("faults", ["AND", [">", ["PARAM", "_id"], `${t}:`],
                    ["<", ["PARAM", "_id"], `${t}:zzzz`]
                ]),
                r = ["Canal", "Codigo", "Mensaje", "Detalles", "Intentos", "Fecha y hora"].map((e => Qs("th", e))),
                s = Qs("thead", Qs("tr", r)),
                o = [];
            for (const e of n.value) o.push([Qs("td", e.channel), Qs("td", e.code), Qs("td", Qs("long-text", {
                text: e.message
            })), Qs("td", Qs("long-text", {
                text: zs(e.detail)
            })), Qs("td", e.retries), Qs("td", new Date(e.timestamp).toLocaleString()), Qs("td", Qs("button", {
                title: "Eliminar fallo(s)",
                onclick: t => {
                    t.redraw = !1, Wr("faults", e._id).then((() => {
                        Tt("success", "Fallo(s) eliminado(s)"), Tr(Date.now()), Qs.redraw()
                    })).catch((e => {
                        Tt("error", e.message), Tr(Date.now())
                    }))
                }
            }, Hr("remove")))]);
            let i;
            return i = o.length ? Qs("tbody", o.map((e => Qs("tr", e)))) : Qs("tbody", Qs("tr.empty", Qs("td", {
                colspan: r.length
            }, "Sin fallos"))), Qs("loading", {
                queries: [n]
            }, Qs("table.table", s, i))
        }
    }),
    Ls = Rt(yt);
const Ms = new WeakMap;
const Ts = () => ({
        view: e => {
            var t;
            const n = e.attrs.device,
                r = Jr(e.attrs.limit, n) || 100,
                s = Qs("input", {
                    type: "text",
                    placeholder: "Buscar parametros",
                    oninput: t => {
                        e.state.searchString = t.target.value, t.redraw = !1, clearTimeout(e.state.timeout), e.state.timeout = setTimeout(Qs.redraw, 500)
                    }
                }),
                o = /\.[0-9]+$/;
            let i;
            if (e.state.searchString) {
                const t = e.state.searchString.split(" ").filter((e => e));
                t.length && (i = new RegExp(t.map((e => e.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&"))).join(".*"), "i"))
            }
            const a = [],
                l = function(e) {
                    if (Ms.has(e)) return Ms.get(e);
                    const t = [];
                    for (const n of Object.keys(e)) {
                        let e = 0;
                        for (let t = n.lastIndexOf(".", n.length - 2); t >= 0; t = n.lastIndexOf(".", t - 1)) ++e;
                        for (; t.length <= e;) t.push([]);
                        t[e].push(n)
                    }
                    return Ms.set(e, t), t
                }(n);
            let c = 0;
            for (const e of l) {
                let s = 0;
                for (const o of e) {
                    const e = n[o],
                        l = (null === (t = e.value) || void 0 === t ? void 0 : t[0]) ? `${o} ${e.value[0]}` : o;
                    i && !i.test(l) || (++s, c < r && a.push(o))
                }
                c += s
            }
            a.sort();
            const u = a.map((e => {
                const t = n[e],
                    r = [],
                    s = {
                        key: e
                    };
                return !1 === t.object ? r.push(Qs("parameter", Object.assign({
                    device: n,
                    parameter: Ls(e)
                }))) : t.object && t.writable && (o.test(e) ? r.push(Qs("button", {
                    title: "Eliminar esta instancia",
                    onclick: () => {
                        Zr({
                            name: "deleteObject",
                            device: n["DeviceID.ID"].value[0],
                            objectName: e
                        })
                    }
                }, Hr("delete-instance"))) : r.push(Qs("button", {
                    title: "Crear nueva instancia",
                    onclick: () => {
                        Zr({
                            name: "addObject",
                            device: n["DeviceID.ID"].value[0],
                            objectName: e
                        })
                    }
                }, Hr("add-instance")))), r.push(Qs("button", {
                    title: "Refrescar arbol",
                    onclick: () => {
                        Zr({
                            name: "getParameterValues",
                            device: n["DeviceID.ID"].value[0],
                            parameterNames: [e]
                        })
                    }
                }, Hr("refresh"))), Qs("tr", s, Qs("td.left", Qs("long-text", {
                    text: e
                })), Qs("td.right", r))
            }));
            return Qs("loading", {
                queries: [e.attrs.deviceQuery]
            }, Qs(".all-parameters", Qs("a.download-csv", {
                href: `api/devices/${encodeURIComponent(n["DeviceID.ID"].value[0])}.csv`,
                download: "",
                style: "float: right;"
            }, "Descargar datamodel"), s, Qs(".parameter-list", Qs("table", Qs("tbody", u)), Qs("m", `Displaying ${a.length} out of ${c} parameters.`))))
        }
    }),
    Us = () => ({
        view: e => {
            const t = e.attrs.device,
                n = [];
            return n.push(Qs("button.primary", {
                title: "Reiniciar dispositivo",
                onclick: () => {
                    Zr({
                        name: "reboot",
                        device: t["DeviceID.ID"].value[0]
                    })
                }
            }, "Reiniciar")), n.push(Qs("button.critical", {
                title: "Realizar un factory reset al dispositivo",
                onclick: () => {
                    Zr({
                        name: "factoryReset",
                        device: t["DeviceID.ID"].value[0]
                    })
                }
            }, "Factory reset")), n.push(Qs("button.critical", {
                title: "Enviar archivo de configuracion o firmware al dispositivo",
                onclick: () => {
                    rs({
                        name: "download",
                        devices: [t["DeviceID.ID"].value[0]]
                    })
                }
            }, "Enviar archivo")), n.push(Qs("button.primary", {
                title: "Eliminar dispositivo",
                onclick: () => {
                    if (!confirm("Deleting this device. Are you sure?")) return;
                    const e = t["DeviceID.ID"].value[0];
                    Wr("devices", e).then((() => {
                        Tt("success", `${e}: Device deleted`), Qs.route.set("/devices")
                    })).catch((e => {
                        Tt("error", e.message)
                    }))
                }
            }, "Eliminar")), Qs(".actions-bar", n)
        }
    });
const Fs = () => ({
        view: e => {
            const t = e.attrs.device;
            let n = !0;
            "writable" in e.attrs && (n = !!Jr(e.attrs.writable, t));
            const r = [];
            for (const e of Object.keys(t)) e.startsWith("Tags.") && r.push((s = e.slice(5), decodeURIComponent(s.replace(/0x(?=[0-9A-Z]{2})/g, "%"))));
            var s;
            return r.sort(), n ? Qs(".tags", r.map((e => Qs("span.tag", e, Qs("button", {
                onclick: n => {
                    n.target.disabled = !0;
                    const r = t["DeviceID.ID"].value[0];
                    qr(r, {
                        [e]: !1
                    }).then((() => {
                        n.target.disabled = !1, Tt("success", `${r}: Tags updated`), Tr(Date.now())
                    })).catch((e => {
                        n.target.disabled = !1, Tt("error", `${r}: ${e.message}`)
                    }))
                }
            }, Hr("remove"))))), Qs("span.tag.writable", Qs.trust("&nbsp;"), Qs("button", {
                onclick: e => {
                    e.target.disabled = !0;
                    const n = t["DeviceID.ID"].value[0],
                        r = prompt("Enter tag to assign to device:");
                    r ? qr(n, {
                        [r]: !0
                    }).then((() => {
                        e.target.disabled = !1, Tt("success", `${n}: Tags updated`), Tr(Date.now())
                    })).catch((t => {
                        e.target.disabled = !1, Tt("error", `${n}: ${t.message}`)
                    })) : e.target.disabled = !1
                }
            }, Hr("add")))) : Qs(".tags", r.map((e => Qs("span.tag", e))))
        }
    }),
    qs = e => {
        let t, n;
        const r = () => {
            if (!n) {
                const t = e.dom;
                return void(t && (t.innerHTML = ""))
            }
            let r = "";
            (function(e) {
                return $r({
                    url: `api/ping/${encodeURIComponent(e)}`,
                    background: !0
                })
            })(n).then((e => {
                r = null != e.avg ? `${Math.trunc(e.avg)} ms` : "Unreachable"
            })).catch((() => {
                r = "Error!", clearInterval(t)
            })).finally((() => {
                const t = e.dom;
                t && (t.innerHTML = `Pinging ${n}: ${r}`)
            }))
        };
        return {
            onremove: () => {
                clearInterval(t)
            },
            view: e => {
                const s = e.attrs.device;
                let o, i = s["InternetGatewayDevice.ManagementServer.ConnectionRequestURL"];
                i || (i = s["Device.ManagementServer.ConnectionRequestURL"]);
                try {
                    o = new URL(i.value[0]).hostname
                } catch (e) {}
                return n !== o && (n = o, clearInterval(t), n && (r(), t = setInterval(r, 3e3))), Qs("div", n ? `Pinging ${n}:` : "")
            }
        }
    },
    Ws = () => ({
        view: e => {
            let t;
            const n = e.attrs.device;
            n && (t = n["DeviceID.ID"].value[0]);
            const r = Object.values(e.attrs.components).map((t => {
                if (Array.isArray(t) && (t = Jr(t, n || {})), "object" != typeof t) return `${t}`;
                const r = Jr(t.type, n || {});
                if (!r) return null;
                const s = Object.assign({}, e.attrs, t);
                return Qs(r, s)
            }));
            return t ? Qs("a", {
                href: `#!/devices/${encodeURIComponent(t)}`
            }, r) : r
        }
    }),
    Bs = () => ({
        view: e => {
            const t = e.attrs.text,
                n = e.attrs.element || "span";

            function r(e) {
                e.dom.classList.add("long-text-overflowed"), e.dom.onclick = e => {
                    ps((() => Z("textarea.long-text", {
                        value: t,
                        cols: 80,
                        rows: 24,
                        readonly: "",
                        oncreate: e => {
                            e.dom.focus(), e.dom.select()
                        }
                    }))), e.stopPropagation(), Z.redraw()
                }
            }
            return Z(n, {
                oncreate: e => {
                    e.dom.clientWidth !== e.dom.scrollWidth && r(e)
                },
                onupdate: e => {
                    e.dom.clientWidth === e.dom.scrollWidth ? (e.dom.classList.remove("long-text-overflowed"), e.dom.onclick = null) : r(e)
                },
                class: "long-text",
                title: t
            }, t)
        }
    }),
    Vs = () => {
        let e, t, n = !1;

        function r(r) {
            if (!n) return e && e.parentElement.remove(), t && t.classList.remove("loading"), e = null, void(t = null);
            if (t && t !== r.dom && t.classList.remove("loading"), t = r.dom, t.classList.add("loading"), !e) {
                const t = document.createElement("div");
                t.style.position = "relative", t.style.pointerEvents = "none", e = document.createElement("div"), e.classList.add("loading-overlay"), e.style.position = "absolute", t.appendChild(e)
            }
            const s = e.parentElement;
            s.parentElement !== t.parentElement && t.parentNode.appendChild(s);
            const o = s.getBoundingClientRect(),
                i = t.getBoundingClientRect();
            e.style.width = `${t.scrollWidth}px`, e.style.height = `${t.scrollHeight}px`, e.style.left = i.left - o.left + "px", e.style.top = i.top - o.top + "px"
        }
        return {
            view: e => {
                const t = e.attrs.queries;
                return n = t.some((e => e.fulfilling)), e.children
            },
            oncreate: r,
            onupdate: r,
            onremove: () => {
                e && e.parentElement.remove(), t && t.classList.remove("loading"), e = null, t = null
            }
        }
    },
    Js = {
        parameter: xs,
        "parameter-list": Os,
        "parameter-table": ks,
        "overview-dot": Es,
        container: Ns,
        "summon-button": Ps,
        "device-faults": Rs,
        "all-parameters": Ts,
        "device-actions": Us,
        tags: Fs,
        ping: qs,
        "device-link": Ws,
        "long-text": Bs,
        loading: Vs
    },
    Ks = new WeakMap,
    Hs = new WeakMap,
    Qs = new Proxy(Z, {
        apply: (e, t, n) => {
            const r = n[0];
            return "string" != typeof r ? n[0] = Zs(r) : Js[r] && (n[0] = Zs(Js[r])), Reflect.apply(e, void 0, n)
        },
        get: (e, t) => "context" === t ? Ys : Reflect.get(e, t)
    });

function Ys(e, ...t) {
    const n = Reflect.apply(Qs, void 0, t);
    return Hs.set(n, e), n
}

function Gs(e, t) {
    var n;
    if (Array.isArray(e))
        for (const n of e) Gs(n, t);
    else if (e && "object" == typeof e && e.tag) {
        const r = Object.assign({}, t, Hs.get(e));
        if ("string" != typeof e.tag && (Hs.set(e, r), e.attrs = Object.assign({}, r, e.attrs)), null === (n = e.children) || void 0 === n ? void 0 : n.length)
            for (const t of e.children) Gs(t, r)
    }
}

function Zs(e) {
    var t;
    let n = Ks.get(e);
    if (!n) {
        if ("function" != typeof e) {
            n = Object.assign({}, e);
            const t = e.view;
            n.view = function(e) {
                const n = Hs.get(e) || {},
                    r = Reflect.apply(t, this, [e]);
                return Gs(r, n), r
            }
        } else {
            if (null === (t = e.prototype) || void 0 === t ? void 0 : t.view) throw new Error("Class components not supported");
            n = t => {
                const n = e(t),
                    r = n.view;
                return n.view = function(e) {
                    const t = Hs.get(e) || {};
                    try {
                        const n = Reflect.apply(r, this, [e]);
                        return Gs(n, t), n
                    } catch (e) {
                        return Z("p.error", {
                            title: "Click to print stack trace to console",
                            onclick: () => console.error(e)
                        }, "Error!")
                    }
                }, n
            }
        }
        Ks.set(e, n)
    }
    return n
}
const Xs = () => ({
    view: e => {
        const t = e.attrs.onPasswordChange,
            n = !e.attrs.noAuth,
            r = e.attrs.username;
        r && (e.state.username = r);
        const s = [Qs("p", Qs("label", {
            for: "username"
        }, "Nombre de usuario"), Qs("input", {
            name: "username",
            type: "text",
            value: e.state.username,
            disabled: !!r,
            oninput: t => {
                e.state.username = t.target.value
            },
            oncreate: e => {
                e.dom.focus()
            }
        }))];
        let o = {
            newPassword: "Nueva contraseña",
            confirmPassword: "Confirmar contraseña"
        };
        n && (o = Object.assign({
            authPassword: "Your password"
        }, o));
        for (const [t, n] of Object.entries(o)) s.push(Qs("p", Qs("label", {
            for: t
        }, n), Qs("input", {
            name: t,
            type: "password",
            value: e.state[t],
            oninput: n => {
                e.state[t] = n.target.value
            }
        })));
        const i = Qs("button.primary", {
            type: "submit"
        }, "Cambiar contraseña");
        s.push(Qs(".actions-bar", i));
        const a = [Qs("h1", "Cambiar contraseña"), Qs("form", {
            onsubmit: r => {
                r.redraw = !1, r.preventDefault(), !e.state.username || !e.state.newPassword || n && !e.state.authPassword ? Tt("error", "Please fill all fields") : e.state.newPassword !== e.state.confirmPassword ? Tt("error", "Password confirm doesn't match new password") : (i.dom.disabled = !0, Kr(e.state.username, e.state.newPassword, e.state.authPassword).then((() => {
                    Tt("success", "Password updated successfully"), t && t(), i.dom.disabled = !1
                })).catch((e => {
                    Tt("error", e.message), i.dom.disabled = !1
                })))
            }
        }, s)];
        return Qs("div.put-form", a)
    }
});
const eo = Object.freeze({
        __proto__: null,
        init: function(e) {
            return Promise.resolve(e)
        },
        component: () => ({
            view: e => (window.username && Qs.route.set(e.attrs.continue || "/"), document.title = "Iniciar sesion - GenieACS", [Qs("h1", "Iniciar sesion"), Qs("form", Qs("p", Qs("label", {
                for: "username"
            }, "Nombre de usuario"), Qs("input", {
                name: "username",
                type: "text",
                value: e.state.username,
                oncreate: e => {
                    e.dom.focus()
                },
                oninput: t => {
                    e.state.username = t.target.value
                }
            })), Qs("p", Qs("label", {
                for: "password"
            }, "Contraseña"), Qs("input", {
                name: "password",
                type: "password",
                value: e.state.password,
                oninput: t => {
                    e.state.password = t.target.value
                }
            })), Qs("p", Qs("button.primary", {
                type: "submit",
                onclick: t => {
                    var n, r;
                    return t.target.disabled = !0, (n = e.state.username, r = e.state.password, $r({
                        method: "POST",
                        url: "login",
                        background: !0,
                        body: {
                            username: n,
                            password: r
                        }
                    })).then((() => {
                        location.reload()
                    })).catch((e => {
                        Tt("error", e.response || e.message), t.target.disabled = !1
                    })), !1
                }
            }, "Iniciar sesion"))), Qs("a", {
                onclick: () => {
                    const e = () => {
                        const t = {
                            onPasswordChange: () => {
                                ms(e), Qs.redraw()
                            }
                        };
                        return Qs(Xs, t)
                    };
                    ps(e)
                }
            }, "Cambiar contraseña")])
        })
    }),
    to = Rt(wt);
const no = () => ({
        view: e => function(e) {
            const t = e.slices,
                n = Array.from(Object.values(e.slices)).reduce(((e, t) => e + (t.count.value || 0)), 0),
                r = [],
                s = [],
                o = [];
            let i, a, l = 0,
                c = 100 * Math.cos(2 * Math.PI * l),
                u = 100 * Math.sin(2 * Math.PI * l);
            for (const e of Object.values(t)) {
                const t = n > 0 ? (e.count.value || 0) / n : 0;
                if (r.push(Qs(".legend-line", [Qs("span.color", {
                        style: `background-color: ${e.color} !important;`
                    }), `${e.label}: `, Qs("a", {
                        href: `#!/devices/?${Qs.buildQueryString({filter:to(e.filter)})}`
                    }, e.count.value || 0), ` (${(100*t).toFixed(2)}%)`])), t > 0) {
                    l += t, i = 100 * Math.cos(2 * Math.PI * l), a = 100 * Math.sin(2 * Math.PI * l);
                    const n = `M ${c} ${u} A 100 100 0 ${t>.5?1:0} 1 ${i} ${a} L 0 0 z`;
                    c = i, u = a, s.push(Qs("path", {
                        d: n,
                        fill: e.color
                    }));
                    const r = 50 * Math.cos(2 * Math.PI * (l - t / 2)),
                        f = 50 * Math.sin(2 * Math.PI * (l - t / 2));
                    o.push(Qs("a", {
                        "xlink:href": `#!/devices/?${Qs.buildQueryString({filter:to(e.filter)})}`
                    }, [Qs("path", {
                        d: n,
                        "fill-opacity": 0
                    }), Qs("text", {
                        x: r,
                        y: f,
                        "dominant-baseline": "middle",
                        "text-anchor": "middle"
                    }, `${(100*t).toFixed(2)}%`)]))
                }
            }
            return r.push(Qs("span.legend-total", `Total: ${n}`)), Qs("loading", {
                queries: Object.values(e.slices).map((e => e.count))
            }, Qs("div", {
                class: "pie-chart"
            }, [Qs("svg", {
                viewBox: "-102 -102 204 204",
                width: "204px",
                height: "204px",
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:xlink": "http://www.w3.org/1999/xlink"
            }, s.concat(o)), Qs(".legend", r)]))
        }(e.attrs.chart)
    }),
    ro = Ft.ui.overview.groups || {},
    so = {};
for (const e of Object.values(ro))
    for (const t of Object.values(e.charts)) so[t] = Ft.ui.overview.charts[t];

function oo(e) {
    e = Object.assign({}, e);
    for (let [t, n] of Object.entries(e)) {
        e[t] = n = Object.assign({}, n), n.slices = Object.assign({}, n.slices);
        for (let [e, t] of Object.entries(n.slices)) {
            const r = t.filter;
            n.slices[e] = t = Object.assign({}, t), t.count = Ir("devices", r)
        }
    }
    return e
}
const io = Object.freeze({
    __proto__: null,
    init: function() {
        return window.authorizer.hasAccess("devices", 1) ? Promise.resolve({
            charts: oo(so)
        }) : Promise.reject(new Error("No esta autorizado para ver esta pagina"))
    },
    component: () => ({
        view: e => {
            document.title = "Resumen - GenieACS";
            const t = [];
            for (const n of Object.values(ro)) {
                n.label && t.push(Qs("h1", n.label));
                const r = [];
                for (const t of Object.values(n.charts)) {
                    const n = e.attrs.charts[t],
                        s = [];
                    n.label && s.push(Qs("h2", n.label));
                    const o = {};
                    o.chart = n, s.push(Qs(no, o)), r.push(Qs(".overview-chart", s))
                }
                t.push(Qs(".overview-chart-group", r))
            }
            return t
        }
    })
});
const ao = () => {
    let e = new Set;
    return {
        view: t => {
            const n = t.attrs.attributes,
                r = t.attrs.data,
                s = t.attrs.valueCallback,
                o = t.attrs.total,
                i = t.attrs.showMoreCallback,
                a = t.attrs.sortAttributes,
                l = t.attrs.onSortChange,
                c = t.attrs.downloadUrl,
                u = t.attrs.actionsCallback,
                f = t.attrs.recordActionsCallback,
                d = new Set;
            for (const t of r) {
                const n = t._id || t["DeviceID.ID"].value[0];
                e.has(n) && d.add(n)
            }
            return e = d,
                function(e, t, n, r, s, o, i, a, l, c, u) {
                    const f = t || [];
                    let d = [];
                    "function" == typeof c ? (d = c(s), Array.isArray(d) || (d = [d])) : Array.isArray(c) && (d = c);
                    const h = [];
                    if (d.length) {
                        const e = Qs("input", {
                            type: "checkbox",
                            checked: f.length && s.size === f.length,
                            onchange: e => {
                                for (const t of f) {
                                    const n = t._id || t["DeviceID.ID"].value[0];
                                    e.target.checked ? s.add(n) : s.delete(n)
                                }
                            },
                            disabled: !n
                        });
                        h.push(Qs("th", e))
                    }
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t].label;
                        if (!o.hasOwnProperty(t)) {
                            h.push(Qs("th", n));
                            continue
                        }
                        let r = Hr("unsorted");
                        o[t] > 0 ? r = Hr("sorted-asc") : o[t] < 0 && (r = Hr("sorted-dsc"));
                        const s = Qs("button", {
                            onclick: () => {
                                const e = (o[t] + 2) % 3 - 1;
                                return i({
                                    [t]: e
                                })
                            }
                        }, r);
                        h.push(Qs("th", [n, s]))
                    }
                    const p = [];
                    for (const t of f) {
                        const n = t._id || t["DeviceID.ID"].value[0],
                            r = [];
                        if (d.length) {
                            const e = Qs("input", {
                                type: "checkbox",
                                checked: s.has(n),
                                onchange: e => {
                                    e.target.checked ? s.add(n) : s.delete(n)
                                },
                                onclick: e => {
                                    e.stopPropagation(), e.redraw = !1
                                }
                            });
                            r.push(Qs("td", e))
                        }
                        for (const n of e) {
                            const e = {};
                            let s;
                            if ("function" == typeof l) s = l(n, t);
                            else if ("code" === n.type) {
                                const r = t[n.id].split("\n", 11);
                                r.length > 10 && (r[10] = ["︙"]), null == e.title && (e.title = r.join("\n")), s = r[0] || ""
                            } else s = t[n.id];
                            r.push(Qs("td", e, s))
                        }
                        let o = [];
                        "function" == typeof u ? (o = u(t), Array.isArray(o) || (o = [o])) : Array.isArray(u) && (o = u);
                        for (const e of o) r.push(Qs("td.table-row-links", e));
                        p.push(Qs("tr", {
                            onclick: e => {
                                ["INPUT", "BUTTON", "A"].includes(e.target.nodeName) ? e.redraw = !1 : s.delete(n) || s.add(n)
                            }
                        }, r))
                    }
                    p.length || p.push(Qs("tr.empty", Qs("td", {
                        colspan: h.length
                    }, "No hay registros")));
                    const m = [];
                    null != n ? m.push(`${f.length}/${n}`) : m.push(`${f.length}`), m.push(Qs("button", {
                        title: "Ver/Editar mas registros",
                        onclick: r,
                        disabled: !t.length || f.length >= Math.min(200, n)
                    }, "Mas")), a && m.push(Qs("a.download-csv", {
                        href: a,
                        download: ""
                    }, "Descargar"));
                    const g = Qs("tfoot", Qs("tr", Qs("td", {
                            colspan: h.length
                        }, m))),
                        v = [Qs("table.table.highlight", Qs("thead", Qs("tr", h)), Qs("tbody", p), g)];
                    return d.length && v.push(Qs("div.actions-bar", d)), v
                }(n, r, o, i, e, a, l, c, s, u, f)
        }
    }
};
class lo {
    constructor(e, t) {
        this.callback = t, this.element = null, this.hideTimeout = null, this.visible = !1, this.default = null, this.selection = null, this.container = document.createElement("div"), this.container.style.position = "absolute", this.container.style.display = "block", this.container.style.opacity = "0", this.container.className = e
    }
    attach(e) {
        e.setAttribute("autocomplete", "off"), e.addEventListener("focus", (() => {
            this.element = e, this.update(), this.reposition()
        })), e.addEventListener("blur", (() => {
            this.element === e && this.visible && this.hide()
        })), e.addEventListener("keydown", (t => {
            this.element === e && ("Escape" === t.key ? this.visible && this.hide() : "Enter" === t.key ? null != this.default && (e.value = this.default, t.stopImmediatePropagation(), e.dispatchEvent(new InputEvent("input")), this.update()) : "ArrowDown" === t.key ? (t.preventDefault(), null == this.selection ? this.selection = 0 : ++this.selection, this.update()) : "ArrowUp" === t.key && (t.preventDefault(), --this.selection, this.update()))
        })), e.addEventListener("input", (() => {
            this.element === e && (this.selection = null, this.update())
        }))
    }
    reposition() {
        if (!this.element) return;
        const e = this.element.getBoundingClientRect();
        e.width ? (this.container.style.left = `${e.left+window.pageXOffset}px`, this.container.style.width = `${e.width}px`, this.container.style.top = `${e.bottom+window.pageYOffset}px`) : this.visible && this.hide()
    }
    hide() {
        this.container.style.opacity = "0", this.visible = !1, this.default = null, this.selection = null, clearTimeout(this.hideTimeout), this.hideTimeout = setTimeout((() => {
            for (this.hideTimeout = null; this.container.firstChild;) this.container.removeChild(this.container.firstChild);
            document.body.removeChild(this.container)
        }), 500)
    }
    update() {
        const e = this.element;
        this.callback(e.value, (t => {
            if (this.element !== e) return;
            if (this.default = null, !t.length) return void(this.visible && this.hide());
            for (; this.container.firstChild;) this.container.removeChild(this.container.firstChild);
            let n;
            this.visible || (this.hideTimeout ? (clearTimeout(this.hideTimeout), this.hideTimeout = null) : (document.body.appendChild(this.container), window.getComputedStyle(this.container).opacity), this.container.style.opacity = "1", this.visible = !0), null != this.selection ? (this.selection = (this.selection % t.length + t.length) % t.length, this.default = t[this.selection].value) : this.default = t[0].value;
            for (const [r, s] of t.entries()) {
                const t = document.createElement("div");
                s.tip && (t.title = s.tip), t.classList.add("suggestion"), r === this.selection && (t.classList.add("selected"), n = t);
                const o = document.createTextNode(s.value);
                t.appendChild(o), t.addEventListener("mousedown", (t => {
                    t.preventDefault(), e.value = s.value, e.dispatchEvent(new InputEvent("input")), this.element === e && this.update()
                })), this.container.appendChild(t)
            }
            n && (this.container.scrollTop = Math.min(this.container.scrollTop, n.offsetTop), this.container.scrollTop = Math.max(this.container.scrollTop, n.offsetTop + n.scrollHeight - this.container.clientHeight))
        }))
    }
}
const co = {
    devices: {},
    faults: {
        Dispositivo: {
            parameter: ["PARAM", "device"],
            type: "string"
        },
        Canal: {
            parameter: ["PARAM", "channel"],
            type: "string"
        },
        Codigo: {
            parameter: ["PARAM", "code"],
            type: "string"
        },
        Intentos: {
            parameter: ["PARAM", "retries"],
            type: "number"
        },
        Fecha: {
            parameter: ["PARAM", "timestamp"],
            type: "timestamp"
        }
    },
    presets: {
        ID: {
            parameter: ["PARAM", "_id"],
            type: "string"
        },
        Canal: {
            parameter: ["PARAM", "channel"],
            type: "string"
        },
        Peso: {
            parameter: ["PARAM", "weight"],
            type: "number"
        }
    },
    provisions: {
        ID: {
            parameter: ["PARAM", "_id"],
            type: "string"
        }
    },
    virtualParameters: {
        ID: {
            parameter: ["PARAM", "_id"],
            type: "string"
        }
    },
    files: {
        ID: {
            parameter: ["PARAM", "_id"],
            type: "string"
        },
        Tipo: {
            parameter: ["PARAM", "metadata.fileType"],
            type: "string"
        },
        OUI: {
            parameter: ["PARAM", "metadata.oui"],
            type: "string"
        },
        Modelo: {
            parameter: ["PARAM", "metadata.productClass"],
            type: "string"
        },
        Version: {
            parameter: ["PARAM", "metadata.version"],
            type: "string"
        }
    },
    permissions: {
        Rol: {
            parameter: ["PARAM", "role"],
            type: "string"
        },
        Recurso: {
            parameter: ["PARAM", "resource"],
            type: "string"
        },
        Acceso: {
            parameter: ["PARAM", "access"],
            type: "number"
        }
    },
    users: {
        Usuario: {
            parameter: ["PARAM", "_id"],
            type: "string"
        }
    }
};
for (const e of Object.values(Ft.ui.filters)) co.devices[e.label] = {
    parameter: e.parameter,
    type: (e.type || "").split(",").map((e => e.trim()))
};

function uo(e) {
    const t = function(e) {
        return encodeURIComponent(e).replace(/[!~*'().]/g, (e => "%" + e.charCodeAt(0).toString(16).toUpperCase())).replace(/0x(?=[0-9A-Z]{2})/g, "0%78").replace(/%/g, "0x")
    }(e);
    return ["IS NOT NULL", ["PARAM", `Tags.${t}`]]
}

function fo(e, t) {
    var n;
    let r;
    if (null === (n = co[e]) || void 0 === n ? void 0 : n[t]) {
        const n = co[e][t],
            s = "devices" === e ? n.type : n.type.split(","),
            o = [];
        for (const e of s) switch (e.trim()) {
            case "string":
                o.push("case insensitive string pattern");
                break;
            case "number":
                o.push("numeric value");
                break;
            case "timestamp":
                o.push("Unix timestamp or string in the form YYYY-MM-DDTHH:mm:ss.sssZ");
                break;
            case "mac":
                o.push("partial case insensitive MAC address");
                break;
            case "tag":
                o.push("case sensitive string")
        }
        o.length && (r = `${t}: ${o.join(", ")}`)
    }
    return r
}

function ho(e, t, n) {
    if (!co[e]) return null;
    const r = co[e][t].type;
    n = n.trim();
    const s = ["OR"];
    if (0 === r.length || r.includes("number")) {
        const r = function(e, t) {
            let n = "=";
            for (const e of ["<>", "=", "<=", "<", ">=", ">"])
                if (t.startsWith(e)) {
                    n = e, t = t.slice(e.length).trim();
                    break
                } const r = parseInt(t);
            return r !== +t ? null : [n, e, r]
        }(co[e][t].parameter, n);
        r && s.push(r)
    }
    if (0 === r.length || r.includes("string")) {
        const r = function(e, t) {
            return ["LIKE", ["FUNC", "LOWER", e], t.toLowerCase()]
        }(co[e][t].parameter, n);
        r && s.push(r)
    }
    if (0 === r.length || r.includes("timestamp")) {
        const r = function(e, t) {
            let n = "=";
            for (const e of ["<>", "=", "<=", "<", ">=", ">"])
                if (t.startsWith(e)) {
                    n = e, t = t.slice(e.length).trim();
                    break
                } let r = parseInt(t);
            return r !== +t && (r = Date.parse(t)), isNaN(r) ? null : [n, e, r]
        }(co[e][t].parameter, n);
        r && s.push(r)
    }
    if (r.includes("mac")) {
        const r = function(e, t) {
            return (t = t.replace(/[^a-f0-9]/gi, "").toLowerCase()) ? 12 === t.length ? ["LIKE", ["FUNC", "LOWER", e], t.replace(/(..)(?!$)/g, "$1:")] : ["OR", ["LIKE", ["FUNC", "LOWER", e], `%${t.replace(/(..)(?!$)/g,"$1:")}%`],
                ["LIKE", ["FUNC", "LOWER", e], `%${t.replace(/(.)(.)/g,"$1:$2")}%`]
            ] : null
        }(co[e][t].parameter, n);
        r && s.push(r)
    }
    if (r.includes("tag")) {
        const e = uo(n);
        e && s.push(e)
    }
    return s.length <= 1 ? null : 2 === s.length ? s[1] : s
}
const po = Array.isArray;
const mo = Rt((e => {
    const t = function(e) {
        return co[e] ? Object.keys(co[e]) : []
    }(e);
    return new lo("autocomplete", ((n, r) => {
        n = n.toLowerCase(), r(t.filter((e => e.toLowerCase().includes(n))).map((t => ({
            value: `${t}: `,
            tip: fo(e, t)
        }))))
    }))
}));

function go(e) {
    e = fr(e), Array.isArray(e) && "CASE" === e[0] && (e = (e = e.slice(1).filter((e => Array.isArray(e)))).length > 1 ? ["AND", ...e] : e[0]), Array.isArray(e) && function(e) {
        if (!po(e)) {
            if (!0 === e) return {};
            throw new Error("Primitives are not valid queries")
        }(function e(t, n) {
            const r = t[0];
            if ("AND" === r && 2 === (t = t.filter((e => !0 !== e))).length) return e(t[1], n);
            if ("OR" === r && 2 === (t = t.filter((e => !1 !== e))).length) return e(t[1], n);
            if (!n && "AND" === r || n && "OR" === r) return {
                $and: t.slice(1).map((t => e(t, n)))
            };
            if (!n && "OR" === r || n && "AND" === r) return {
                $or: t.slice(1).map((t => e(t, n)))
            };
            if ("NOT" === r) return e(t[1], !n);
            if (po(t[2])) throw new Error(`Invalid RHS operand of ${r} clause`);
            if ("LIKE" === r || "NOT LIKE" === r) {
                let e, s;
                if ("NOT LIKE" === r && (n = !n), !Array.isArray(t[1])) throw new Error(`Invalid LHS operand of ${r} clause`);
                if ("FUNC" === t[1][0] && "UPPER" === t[1][1]) {
                    if (t[2] !== t[2].toUpperCase()) throw new Error(`Invalid RHS operand of ${r} clause`);
                    e = t[1][2][1], s = "i"
                } else if ("FUNC" === t[1][0] && "LOWER" === t[1][1]) {
                    if (t[2] !== t[2].toLowerCase()) throw new Error(`Invalid RHS operand of ${r} clause`);
                    e = t[1][2][1], s = "i"
                } else {
                    if ("PARAM" !== t[1][0]) throw new Error(`Invalid LHS operand of ${r} clause`);
                    e = t[1][1], s = ""
                }
                const o = Ot(t[2], t[3], s);
                return n ? {
                    [e]: {
                        $nin: [o, null]
                    }
                } : {
                    [e]: o
                }
            }
            if ("_tags" === r) {
                let e = t[2];
                return n && (e = !e), e ? {
                    _tags: t[1]
                } : {
                    _tags: {
                        $ne: t[1]
                    }
                }
            }
            if (!po(t[1]) || "PARAM" !== t[1][0]) throw new Error(`Invalid LHS operand of ${r} clause`);
            if ("IS NULL" === r) return {
                [t[1][1]]: null
            };
            if ("IS NOT NULL" === r) return {
                [t[1][1]]: {
                    $ne: null
                }
            };
            if (po(t[2]) || null == t[2]) throw new Error(`Invalid RHS operand of ${r} clause`);
            if ("=" === r) {
                const e = t[1][1],
                    r = t[2];
                return n ? {
                    [e]: {
                        $nin: [r, null]
                    }
                } : {
                    [e]: r
                }
            }
            if ("<>" === r) {
                const e = t[1][1],
                    r = t[2];
                return n ? {
                    [e]: r
                } : {
                    [e]: {
                        $nin: [r, null]
                    }
                }
            }
            if (">" === r) {
                const e = t[1][1],
                    r = t[2];
                return n ? {
                    [e]: {
                        $lte: r
                    }
                } : {
                    [e]: {
                        $gt: r
                    }
                }
            }
            if (">=" === r) {
                const e = t[1][1],
                    r = t[2];
                return n ? {
                    [e]: {
                        $lt: r
                    }
                } : {
                    [e]: {
                        $gte: r
                    }
                }
            }
            if ("<" === r) {
                const e = t[1][1],
                    r = t[2];
                return n ? {
                    [e]: {
                        $gte: r
                    }
                } : {
                    [e]: {
                        $lt: r
                    }
                }
            }
            if ("<=" === r) {
                const e = t[1][1],
                    r = t[2];
                return n ? {
                    [e]: {
                        $gt: r
                    }
                } : {
                    [e]: {
                        $lte: r
                    }
                }
            }
            throw new Error(`Unrecognized operator ${r}`)
        })(e, !1)
    }(e)
}

function vo(e) {
    return Array.isArray(e) && "FUNC" === e[0] && "Q" === e[1] ? `${e[2]}: ${e[3]}` : wt(e)
}

function yo(e) {
    if (!e) return [""];
    const t = [],
        n = yt(e);
    if (Array.isArray(n) && "AND" === n[0])
        for (const e of n.slice(1)) t.push(vo(e));
    else t.push(vo(n));
    return t.push(""), t
}
const wo = e => {
        let t = yo(e.attrs.filter),
            n = 0,
            r = !1,
            s = e.attrs;

        function o() {
            r = !1, n = 0, t = t.filter((e => e));
            const e = t.map(((e, t) => {
                try {
                    return function(e, t) {
                        let n;
                        if (/^[\s0-9a-zA-Z]+:/.test(t)) {
                            const e = t.split(":", 1)[0],
                                r = t.slice(e.length + 1).trim();
                            n = ["FUNC", "Q", e.trim(), r]
                        } else n = yt(t);
                        return go(mt(n, (t => {
                            if (Array.isArray(t) && "FUNC" === t[0]) {
                                if ("Q" === t[1]) return ho(e, t[2], t[3]);
                                if ("NOW" === t[1]) return Date.now()
                            }
                            return t
                        }))), n
                    }(s.resource, e)
                } catch (e) {
                    n |= 1 << t
                }
                return null
            }));
            t.push(""), n ? Z.redraw() : 0 === e.length ? s.onChange("") : e.length > 1 ? s.onChange(wt(["AND", ...e])) : s.onChange(wt(e[0]))
        }
        return {
            onupdate: e => {
                mo(e.attrs.resource).reposition()
            },
            view: e => (s.filter !== e.attrs.filter && (n = 0, t = yo(e.attrs.filter)), s = e.attrs, Z("div.filter", [Z("b", "Filtro"), ...t.map(((s, i) => Z("input", {
                type: "text",
                class: "" + (n >> i & 1 ? "error" : ""),
                value: s,
                oninput: e => {
                    e.redraw = !1, t[i] = e.target.value, r = !0
                },
                oncreate: t => {
                    const n = t.dom;
                    mo(e.attrs.resource).attach(n), n.addEventListener("blur", (() => {
                        r && o()
                    })), n.addEventListener("keydown", (e => {
                        "Enter" === e.key && r && o()
                    }))
                }
            })))]))
        }
    },
    bo = Ft.ui.pageSize || 10,
    Ao = Rt(yt),
    So = Rt(JSON.parse),
    xo = Rt((e => {
        const t = function(e) {
            const t = new Set;
            return mt(e, (e => (bt(e) && "PARAM" === e[0] && t.add(e[1]), e))), Array.from(t)
        }(e);
        if (1 === t.length) {
            const e = Nt(t[0]);
            if ("string" == typeof e) return e
        }
        return null
    })),
    Oo = Rt(((e, t) => {
        const n = {};
        for (const e of t) n[e.label] = wt(e.parameter);
        return `api/devices.csv?${Qs.buildQueryString({filter:wt(e),columns:JSON.stringify(n)})}`
    })),
    ko = Rt((e => mt(e, (e => Array.isArray(e) && "FUNC" === e[0] && "Q" === e[1] ? ho("devices", e[2], e[3]) : e))));

function Co(e) {
    const t = [];
    return t.push(Qs("button.primary", {
        title: "Reiniciar dispositivos seleccionados",
        disabled: !e.size,
        onclick: () => {
            Zr(...[...e].map((e => ({
                name: "reboot",
                device: e
            }))))
        }
    }, "Reiniciar")), t.push(Qs("button.critical", {
        title: "Realizar factory reset a los dispositivos seleccionados",
        disabled: !e.size,
        onclick: () => {
            Zr(...[...e].map((e => ({
                name: "factoryReset",
                device: e
            }))))
        }
    }, "Factory Reset")), t.push(Qs("button.critical", {
        title: "Enviar un archivo de configuracion o firmware a los dispositivos seleccionados",
        disabled: !e.size,
        onclick: () => {
            rs({
                name: "download",
                devices: [...e]
            })
        }
    }, "Enviar archivo")), t.push(Qs("button.primary", {
        title: "Elmiminar dispositivos seleccionados",
        disabled: !e.size,
        onclick: () => {
            const t = Array.from(e);
            if (!confirm(`Eliminar ${t.length} dispositivo(s). ¿Estas seguro?`)) return;
            let n = 1;
            for (const e of t) ++n, Wr("devices", e).then((() => {
                Tt("success", `${e}: Deleted`), 0 == --n && Tr(Date.now())
            })).catch((t => {
                Tt("error", `${e}: ${t.message}`), 0 == --n && Tr(Date.now())
            }));
            0 == --n && Tr(Date.now())
        }
    }, "Eliminar")), t.push(Qs("button.primary", {
        title: "Etiquetar los dispositivos seleccionados",
        disabled: !e.size,
        onclick: () => {
            const t = Array.from(e),
                n = prompt(`Introduce la etiqueta que deseas asignar a ${t.length} dispositivo(s):`);
            if (!n) return;
            let r = 1;
            for (const e of t) ++r, qr(e, {
                [n]: !0
            }).then((() => {
                Tt("success", `${e}: Tags updated`), 0 == --r && Tr(Date.now())
            })).catch((t => {
                Tt("error", `${e}: ${t.message}`), 0 == --r && Tr(Date.now())
            }));
            0 == --r && Tr(Date.now())
        }
    }, "Etiquetar")), t.push(Qs("button.primary", {
        title: "Eliminar etiqueta de los dispositivos seleccionados",
        disabled: !e.size,
        onclick: () => {
            const t = Array.from(e),
                n = prompt(`Introduce la etiqueta que deseas eliminar de ${t.length} dispositivo(s):`);
            if (!n) return;
            let r = 1;
            for (const e of t) ++r, qr(e, {
                [n]: !1
            }).then((() => {
                Tt("success", `${e}: Tags updated`), 0 == --r && Tr(Date.now())
            })).catch((t => {
                Tt("error", `${e}: ${t.message}`), 0 == --r && Tr(Date.now())
            }));
            0 == --r && Tr(Date.now())
        }
    }, "Eliminar etiqueta")), t
}
const Eo = Object.freeze({
    __proto__: null,
    init: function(e) {
        return new Promise(((t, n) => {
            if (!window.authorizer.hasAccess("devices", 2)) return void n(new Error("No esta autorizado para ver esta pagina"));
            const r = e.hasOwnProperty("filter") ? "" + e.filter : "",
                s = e.hasOwnProperty("sort") ? "" + e.sort : "",
                o = Object.values(Ft.ui.index);
            o.length || o.push({
                label: "ID",
                parameter: ["PARAM", "DeviceID.ID"]
            }), t({
                filter: r,
                indexParameters: o,
                sort: s
            })
        }))
    },
    component: () => ({
        view: e => {
            document.title = "Dispositivos - GenieACS";
            const t = e.attrs.indexParameters;
            const n = e.attrs.sort ? So(e.attrs.sort) : {},
                r = {};
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                if (s.unsortable) continue;
                const o = xo(s.parameter);
                o && (r[e] = n[o] || 0)
            }
            let s = !e.attrs.filter || Ao(e.attrs.filter);
            s = ko(s);
            const o = Lr("devices", s, {
                    limit: e.state.showCount || bo,
                    sort: n
                }),
                i = Ir("devices", s),
                a = Oo(s, t),
                l = {};
            l.attributes = t, l.data = o.value, l.total = i.value, l.showMoreCallback = function() {
                e.state.showCount = (e.state.showCount || bo) + bo, Qs.redraw()
            }, l.sortAttributes = r, l.onSortChange = function(r) {
                let s = Object.assign({}, n);
                for (const [e, n] of Object.entries(r)) {
                    const r = xo(t[e].parameter);
                    r && (delete s[r], n && (s = Object.assign({
                        [r]: n
                    }, s)))
                }
                const o = {};
                Object.keys(s).length && (o.sort = JSON.stringify(s)), e.attrs.filter && (o.filter = e.attrs.filter), Qs.route.set("/devices", o)
            }, l.downloadUrl = a, l.valueCallback = (e, t) => Qs.context({
                device: t,
                parameter: e.parameter
            }, e.type || "parameter", e), l.recordActionsCallback = e => Qs("a", {
                href: `#!/devices/${encodeURIComponent(e["DeviceID.ID"].value[0])}`
            }, "Show"), window.authorizer.hasAccess("devices", 3) && (l.actionsCallback = Co);
            const c = {
                resource: "devices",
                filter: e.attrs.filter,
                onChange: function(t) {
                    const n = {
                        filter: t
                    };
                    e.attrs.sort && (n.sort = e.attrs.sort), Qs.route.set("/devices", n)
                }
            };
            return [Qs("h1", "Listado de dispositivos"), Qs(wo, c), Qs("loading", {
                queries: [o, i]
            }, Qs(ao, l))]
        }
    })
});
const Do = Object.freeze({
        __proto__: null,
        init: function(e) {
            return window.authorizer.hasAccess("devices", 2) ? Promise.resolve({
                deviceId: e.id,
                deviceFilter: ["=", ["PARAM", "DeviceID.ID"], e.id]
            }) : Promise.reject(new Error("No esta autorizado para ver esta pagina"))
        },
        component: () => ({
            view: e => {
                document.title = `${e.attrs.deviceId} - Dispositivos - GenieACS`;
                const t = Lr("devices", e.attrs.deviceFilter);
                if (!t.value.length) return t.fulfilling ? Qs("loading", {
                    queries: [t]
                }, Qs("div", {
                    style: "height: 100px;"
                })) : Qs("p.error", `No such device ${e.attrs.deviceId}`);
                const n = Ft.ui.device,
                    r = [];
                for (const e of Object.values(n)) r.push(Qs.context({
                    device: t.value[0],
                    deviceQuery: t
                }, e.type, e));
                return [Qs("h1", e.attrs.deviceId), r]
            }
        })
    }),
    No = () => ({
        view: function(e) {
            return document.title = "Error! - GenieACS", Qs("p.error", e.attrs.error)
        }
    }),
    Po = Ft.ui.pageSize || 10,
    jo = Rt(yt),
    $o = Rt(JSON.parse),
    _o = [{
        id: "device",
        label: "Dispositivo"
    }, {
        id: "channel",
        label: "Canal"
    }, {
        id: "code",
        label: "Codigo"
    }, {
        id: "message",
        label: "Mensaje"
    }, {
        id: "detail",
        label: "Detalles"
    }, {
        id: "retries",
        label: "Intentos"
    }, {
        id: "timestamp",
        label: "Fecha y hora"
    }],
    Io = Rt((e => {
        const t = {};
        for (const e of _o) t[e.label] = "timestamp" === e.id ? `DATE_STRING(${e.id})` : e.id;
        return `api/faults.csv?${Qs.buildQueryString({filter:wt(e),columns:JSON.stringify(t)})}`
    })),
    zo = Rt((e => mt(e, (e => Array.isArray(e) && "FUNC" === e[0] && "Q" === e[1] ? ho("faults", e[2], e[3]) : e))));
const Ro = Object.freeze({
    __proto__: null,
    init: function(e) {
        if (!window.authorizer.hasAccess("faults", 2)) return Promise.reject(new Error("No esta autorizado para ver esta pagina"));
        const t = e.hasOwnProperty("sort") ? "" + e.sort : "",
            n = e.hasOwnProperty("filter") ? "" + e.filter : "";
        return Promise.resolve({
            filter: n,
            sort: t
        })
    },
    component: () => ({
        view: e => {
            document.title = "Fallos de provision - GenieACS";
            const t = e.attrs.sort ? $o(e.attrs.sort) : {},
                n = {};
            for (let e = 0; e < _o.length; e++) {
                const r = _o[e];
                "detail" !== r.id && (n[e] = t[r.id] || 0)
            }
            let r = !e.attrs.filter || jo(e.attrs.filter);
            r = zo(r);
            const s = Lr("faults", r, {
                    limit: e.state.showCount || Po,
                    sort: t
                }),
                o = Ir("faults", r),
                i = Io(r),
                a = {};
            a.attributes = _o, a.data = s.value, a.valueCallback = (e, t) => {
                if ("device" === e.id) {
                    const e = `#!/devices/${encodeURIComponent(t.device)}`;
                    return Qs("a", {
                        href: e
                    }, t.device)
                }
                return "message" === e.id ? Qs("long-text", {
                    text: t.message
                }) : "detail" === e.id ? Qs("long-text", {
                    text: zs(t.detail)
                }) : "timestamp" === e.id ? new Date(t.timestamp).toLocaleString() : t[e.id]
            }, a.total = o.value, a.showMoreCallback = function() {
                e.state.showCount = (e.state.showCount || Po) + Po, Qs.redraw()
            }, a.sortAttributes = n, a.onSortChange = function(n) {
                let r = Object.assign({}, t);
                for (const [e, t] of Object.entries(n)) delete r[_o[e].id], t && (r = Object.assign({
                    [_o[e].id]: t
                }, r));
                const s = {};
                Object.keys(r).length && (s.sort = JSON.stringify(r)), e.attrs.filter && (s.filter = e.attrs.filter), Qs.route.set("/faults", s)
            }, a.downloadUrl = i, window.authorizer.hasAccess("faults", 3) && (a.actionsCallback = e => Qs("button.primary", {
                disabled: 0 === e.size,
                title: "Delete selected faults",
                onclick: t => {
                    t.redraw = !1, t.target.disabled = !0, confirm(`Deleting ${e.size} faults. Are you sure?`) && Promise.all(Array.from(e).map((e => Wr("faults", e)))).then((e => {
                        Tt("success", `${e.length} faults deleted`), Tr(Date.now())
                    })).catch((e => {
                        Tt("error", e.message), Tr(Date.now())
                    }))
                }
            }, "Delete"));
            const l = {
                resource: "faults",
                filter: e.attrs.filter,
                onChange: function(t) {
                    const n = {
                        filter: t
                    };
                    e.attrs.sort && (n.sort = e.attrs.sort), Qs.route.set("/faults", n)
                }
            };
            return [Qs("h1", "Listado de fallos"), Qs(wo, l), Qs("loading", {
                queries: [s, o]
            }, Qs(ao, a))]
        }
    })
});
let Lo, Mo, To;

function Uo() {
    To || (To = Tt("error", "Error loading JS resource, please reload the page", {
        Reload: () => {
            window.location.reload()
        }
    }))
}

function Fo() {
    return Lo ? Promise.resolve() : new Promise(((e, t) => {
        const n = [import("./codemirror-1afb9229.js").then((function(e) {
            return e.c
        })), import("./codemirror-1afb9229.js").then((function(e) {
            return e.j
        })), import("./codemirror-1afb9229.js").then((function(e) {
            return e.y
        }))];
        Promise.all(n).then((t => {
            Lo = t[0].default, e()
        })).catch((e => {
            Uo(), t(e)
        }))
    }))
}
const qo = () => ({
        view: e => Qs("textarea", {
            name: e.attrs.id,
            value: e.attrs.value,
            oncreate: t => {
                const n = Lo.fromTextArea(t.dom, {
                    mode: e.attrs.mode,
                    lineNumbers: !0,
                    readOnly: e.attrs.readOnly,
                    extraKeys: {
                        "Ctrl-Enter": () => {
                            e.attrs.onSubmit && e.attrs.onSubmit(t.dom)
                        },
                        "Cmd-Enter": () => {
                            e.attrs.onSubmit && e.attrs.onSubmit(t.dom)
                        }
                    }
                });
                e.attrs.onChange && n.on("change", (t => {
                    e.attrs.onChange(t.getValue())
                })), e.attrs.focus && n.focus(), e.attrs.onReady && e.attrs.onReady(n)
            }
        })
    }),
    Wo = {
        presets: "preset",
        provisions: "provision",
        virtualParameters: "parametro virtual",
        files: "archivo",
        users: "usuario",
        permissions: "permiso"
    };

function Bo(e, t, n) {
    if ("combo" === t.type) {
        let r = "",
            s = t.options;
        null != e.object[t.id] && (s.includes(e.object[t.id]) || (s = s.concat([e.object[t.id]])), r = e.object[t.id]);
        const o = [Qs("option", {
            value: ""
        }, "")];
        for (const e of s) o.push(Qs("option", {
            value: e
        }, e));
        return Qs("select", {
            name: t.id,
            value: r,
            oncreate: n ? e => {
                e.dom.focus()
            } : null,
            onchange: n => {
                e.object[t.id] = n.target.value, e.modified = !0, n.redraw = !1
            }
        }, o)
    }
    if ("multi" === t.type) {
        const r = Array.from(new Set(t.options.concat(e.object[t.id] || []))),
            s = new Set(e.object[t.id]),
            o = r.map((r => {
                const i = `${t.id}-${r}`;
                return Qs("tr", [Qs("td", Qs("input", {
                    type: "checkbox",
                    id: i,
                    value: r,
                    oncreate: e => {
                        n && !o.length && e.dom.focus(), s.has(r) && (e.dom.checked = !0)
                    },
                    onchange: n => {
                        n.target.checked ? s.add(r) : s.delete(r), e.object[t.id] = Array.from(s), e.modified = !0, n.redraw = !1
                    }
                })), Qs("td", r)])
            }));
        return Qs("table", o)
    }
    if ("code" === t.type) {
        const n = {
            id: t.id,
            value: e.object[t.id],
            mode: "javascript",
            onSubmit: e => {
                e.form.querySelector("button[type=submit]").click()
            },
            onChange: n => {
                e.object[t.id] = n, e.modified = !0
            }
        };
        return Qs(qo, n)
    }
    if ("file" === t.type) return Qs("input", {
        type: "file",
        name: t.id,
        oncreate: n ? e => {
            e.dom.focus()
        } : null,
        onchange: n => {
            e.object[t.id] = n.target.files, e.modified = !0, n.redraw = !1
        }
    });
    if ("textarea" === t.type) return Qs("textarea", {
        name: t.id,
        value: e.object[t.id],
        readonly: "_id" === t.id && !e.isNew,
        cols: t.cols || 80,
        rows: t.rows || 4,
        style: "resize: none;",
        oncreate: n ? e => {
            const t = e.dom;
            t.focus(), t.setSelectionRange(t.value.length, t.value.length)
        } : null,
        oninput: n => {
            e.object[t.id] = n.target.value, e.modified = !0, n.redraw = !1
        },
        onkeypress: e => {
            if (e.redraw = !1, 13 === e.which && !e.shiftKey) {
                return e.target.form.querySelector("button[type=submit]").click(), !1
            }
            return !0
        }
    });
    let r = null;
    return t.options && (r = function(e) {
        const t = "datalist" + e.reduce(((e, t) => e ^ function(e) {
            let t = 0;
            for (let n = 0; n < e.length; ++n) t = (t << 5) - t + e.charCodeAt(n), t |= 0;
            return t
        }(t)), 0);
        if (!gs.has(t)) {
            const n = Z("datalist", {
                id: t
            }, e.map((e => Z("option", {
                value: e
            }))));
            gs.set(t, n)
        }
        return t
    }(t.options)), Qs("input", {
        type: "password" === t.type ? "password" : "text",
        name: t.id,
        list: r,
        autocomplete: r ? "off" : null,
        disabled: "_id" === t.id && !e.isNew,
        value: e.object[t.id],
        oncreate: n ? e => {
            e.dom.focus()
        } : null,
        oninput: n => {
            e.object[t.id] = n.target.value, e.modified = !0, n.redraw = !1
        }
    })
}
const Vo = () => ({
        view: e => {
            const t = e.attrs.actionHandler,
                n = e.attrs.attributes,
                r = e.attrs.resource,
                s = e.attrs.base || {};
            e.state.current || (e.state.current = {
                isNew: !s._id,
                object: Object.assign({}, s),
                modified: !1
            });
            const o = e.state.current,
                i = [];
            let a = !1;
            for (const e of n) {
                let t = !1;
                a || !o.isNew && "_id" === e.id || (t = a = !0), i.push(Qs("p", Qs("label", {
                    for: e.id
                }, e.label || e.id), Qs("br"), Bo(o, e, t)))
            }
            const l = Qs("button.primary", {
                    type: "submit"
                }, "Guardar"),
                c = [l];
            o.isNew || c.push(Qs("button.primary", {
                type: "button",
                title: `Eliminar ${Wo[r]||r}`,
                onclick: e => {
                    e.redraw = !1, e.target.disabled = !0, t("delete", o.object).finally((() => {
                        e.target.disabled = !1
                    }))
                }
            }, "Eliminar")), i.push(Qs(".actions-bar", c));
            const u = [Qs("h1", `${o.isNew?"Nuevo":"Editando"} ${Wo[r]||r}`), Qs("form", {
                onsubmit: e => {
                    e.redraw = !1, e.preventDefault(), l.dom.disabled = !0, t("save", o.object).finally((() => {
                        l.dom.disabled = !1
                    }))
                }
            }, i)];
            return Qs("div.put-form", u)
        }
    }),
    Jo = Ft.ui.pageSize || 10,
    Ko = Rt(yt),
    Ho = Rt(JSON.parse),
    Qo = [{
        id: "_id",
        label: "Nombre"
    }, {
        id: "channel",
        label: "Canal"
    }, {
        id: "weight",
        label: "Peso"
    }, {
        id: "schedule",
        label: "Programado"
    }, {
        id: "events",
        label: "Eventos"
    }, {
        id: "precondition",
        label: "Precondicion",
        type: "textarea"
    }, {
        id: "provision",
        label: "Provision",
        type: "combo"
    }, {
        id: "provisionArgs",
        label: "Argumentos",
        type: "textarea"
    }],
    Yo = Rt((e => mt(e, (e => Array.isArray(e) && "FUNC" === e[0] && "Q" === e[1] ? ho("presets", e[2], e[3]) : e))));

function Go(e, t, n) {
    return new Promise(((r, s) => {
        const o = Object.assign({}, t);
        if ("save" === e) {
            const e = o._id;
            delete o._id;
            const t = {};
            if (e || (t._id = "ID can not be empty"), o.provision || (t.provision = "Provision not selected"), Object.keys(t).length) return void r(t);
            if (o.precondition) try {
                o.precondition = wt(Ko(o.precondition))
            } catch (e) {
                return void r({
                    precondition: "Precondition must be valid expression"
                })
            }
            Vr("presets", e).then((t => t && n ? (Tr(Date.now()), void r({
                _id: "Preset already exists"
            })) : t || n ? void Br("presets", e, o).then((() => {
                Tt("success", "Preset " + (t ? "updated" : "created")), Tr(Date.now()), r(null)
            })).catch(s) : (Tr(Date.now()), void r({
                _id: "Preset does not exist"
            })))).catch(s)
        } else "delete" === e ? Wr("presets", o._id).then((() => {
            Tt("success", "Preset deleted"), Tr(Date.now()), r(null)
        })).catch((e => {
            s(e), Tr(Date.now())
        })) : s(new Error("Undefined action"))
    }))
}
const Zo = {
        resource: "presets",
        attributes: Qo
    },
    Xo = Rt((e => {
        const t = {};
        for (const e of Qo) t[e.label] = e.id;
        return `api/presets.csv?${Qs.buildQueryString({filter:wt(e),columns:JSON.stringify(t)})}`
    }));
const ei = Object.freeze({
        __proto__: null,
        init: function(e) {
            if (!window.authorizer.hasAccess("presets", 2)) return Promise.reject(new Error("No esta autorizado para ver esta pagina"));
            const t = e.hasOwnProperty("sort") ? "" + e.sort : "",
                n = e.hasOwnProperty("filter") ? "" + e.filter : "";
            return Promise.resolve({
                filter: n,
                sort: t
            })
        },
        component: () => ({
            view: e => {
                document.title = "Presets - GenieACS";
                const t = e.attrs.sort ? Ho(e.attrs.sort) : {},
                    n = {};
                for (let e = 0; e < Qo.length; e++) {
                    const r = Qo[e];
                    "events" !== r.id && "precondition" !== r.id && "provision" !== r.id && "provisionArgs" !== r.id && (n[e] = t[r.id] || 0)
                }
                let r = !e.attrs.filter || Ko(e.attrs.filter);
                r = Yo(r);
                const s = Lr("presets", r, {
                        limit: e.state.showCount || Jo,
                        sort: t
                    }),
                    o = Ir("presets", r),
                    i = new Set,
                    a = new Set(["refresh", "value", "tag", "reboot", "reset", "download", "instances"]),
                    l = Lr("provisions", !0);
                if (l.fulfilled)
                    for (const e of l.value) i.add(e._id), a.add(e._id);
                Qo.find((e => "provision" === e.id)).options = Array.from(a);
                const c = Xo(r),
                    u = {};
                u.attributes = Qo, u.data = s.value, u.total = o.value, u.showMoreCallback = function() {
                    e.state.showCount = (e.state.showCount || Jo) + Jo, Qs.redraw()
                }, u.sortAttributes = n, u.onSortChange = function(n) {
                    let r = Object.assign({}, t);
                    for (const [e, t] of Object.entries(n)) delete r[Qo[e].id], t && (r = Object.assign({
                        [Qo[e].id]: t
                    }, r));
                    const s = {};
                    Object.keys(r).length && (s.sort = JSON.stringify(r)), e.attrs.filter && (s.filter = e.attrs.filter), Qs.route.set("/admin/presets", s)
                }, u.downloadUrl = c, u.valueCallback = (e, t) => {
                    if ("precondition" === e.id) {
                        let e = "#!/devices";
                        return t.precondition.length && (e += `?${Qs.buildQueryString({filter:t.precondition})}`), Qs("a", {
                            href: e,
                            title: t.precondition
                        }, t.precondition)
                    }
                    return "provision" === e.id && i.has(t[e.id]) ? Qs("a", {
                        href: `#!/admin/provisions?${Qs.buildQueryString({filter:`Q("ID", "${t.provision}")`})}`
                    }, t.provision) : t[e.id]
                }, u.recordActionsCallback = e => [Qs("a", {
                    onclick: () => {
                        let t = null;
                        const n = Qs(Vo, Object.assign({
                            base: e,
                            actionHandler: (e, n) => new Promise((r => {
                                Go(e, n, !1).then((e => {
                                    const n = e ? Object.values(e) : [];
                                    if (n.length)
                                        for (const e of n) Tt("error", e);
                                    else ms(t);
                                    r()
                                })).catch((e => {
                                    Tt("error", e.message), r()
                                }))
                            }))
                        }, Zo));
                        t = () => e.provision ? n : Qs("div", {
                            style: "margin:20px"
                        }, "This UI only supports presets with a single 'provision' configuration. If this preset was originally created from the old UI (genieacs-gui), you must edit it there."), ps(t, (() => {
                            var e;
                            return !(null === (e = n.state) || void 0 === e ? void 0 : e.current.modified) || confirm("Hay cambios sin guardar, ¿Quieres salir?")
                        }))
                    }
                }, "Ver/Editar")], window.authorizer.hasAccess("presets", 3) && (u.actionsCallback = e => [Qs("button.primary", {
                    title: "Crear nuevo preset",
                    onclick: () => {
                        let e = null;
                        const t = Qs(Vo, Object.assign({
                            actionHandler: (t, n) => new Promise((r => {
                                Go(t, n, !0).then((t => {
                                    const n = t ? Object.values(t) : [];
                                    if (n.length)
                                        for (const e of n) Tt("error", e);
                                    else ms(e);
                                    r()
                                })).catch((e => {
                                    Tt("error", e.message), r()
                                }))
                            }))
                        }, Zo));
                        e = () => t, ps(e, (() => !t.state.current.modified || confirm("Hay cambios sin guardar, ¿Quieres salir?")))
                    }
                }, "Nuevo"), Qs("button.primary", {
                    title: "Eliminar presets seleccionados",
                    disabled: !e.size,
                    onclick: t => {
                        confirm(`Eliminar ${e.size} presets. ¿Estas seguro?`) && (t.redraw = !1, t.target.disabled = !0, Promise.all(Array.from(e).map((e => Wr("presets", e)))).then((e => {
                            Tt("success", `Se han eliminado ${e.length} presets`), Tr(Date.now())
                        })).catch((e => {
                            Tt("error", e.message), Tr(Date.now())
                        })))
                    }
                }, "Eliminar")]);
                const f = {
                    resource: "presets",
                    filter: e.attrs.filter,
                    onChange: function(t) {
                        const n = {
                            filter: t
                        };
                        e.attrs.sort && (n.sort = e.attrs.sort), Qs.route.set("/admin/presets", n)
                    }
                };
                return [Qs("h1", "Listado de presets"), Qs(wo, f), Qs("loading", {
                    queries: [s, o]
                }, Qs(ao, u))]
            }
        })
    }),
    ti = Ft.ui.pageSize || 10,
    ni = Rt(yt),
    ri = Rt(JSON.parse),
    si = [{
        id: "_id",
        label: "Nombre"
    }, {
        id: "script",
        label: "Codigo",
        type: "code"
    }],
    oi = Rt((e => mt(e, (e => Array.isArray(e) && "FUNC" === e[0] && "Q" === e[1] ? ho("provisions", e[2], e[3]) : e))));

function ii(e, t, n) {
    return new Promise(((r, s) => {
        const o = Object.assign({}, t);
        if ("save" === e) {
            const e = o._id;
            if (delete o._id, !e) return void r({
                _id: "ID can not be empty"
            });
            Vr("provisions", e).then((t => t && n ? (Tr(Date.now()), void r({
                _id: "Provision already exists"
            })) : t || n ? void Br("provisions", e, o).then((() => {
                Tt("success", "Provision " + (t ? "updated" : "created")), Tr(Date.now()), r(null)
            })).catch((e => {
                400 === e.code && e.response ? s(new Error(e.response)) : s(e)
            })) : (Tr(Date.now()), void r({
                _id: "Provision does not exist"
            })))).catch(s)
        } else "delete" === e ? Wr("provisions", o._id).then((() => {
            Tt("success", "Provision deleted"), Tr(Date.now()), r(null)
        })).catch((e => {
            Tr(Date.now()), s(e)
        })) : s(new Error("Undefined action"))
    }))
}
const ai = {
        resource: "provisions",
        attributes: si
    },
    li = Rt((e => {
        const t = {};
        for (const e of si) t[e.label] = e.id;
        return `api/provisions.csv?${Qs.buildQueryString({filter:wt(e),columns:JSON.stringify(t)})}`
    }));
const ci = Object.freeze({
        __proto__: null,
        init: function(e) {
            if (!window.authorizer.hasAccess("provisions", 2)) return Promise.reject(new Error("No esta autorizado para ver esta pagina"));
            const t = e.hasOwnProperty("sort") ? "" + e.sort : "",
                n = e.hasOwnProperty("filter") ? "" + e.filter : "";
            return new Promise(((e, r) => {
                Fo().then((() => {
                    e({
                        filter: n,
                        sort: t
                    })
                })).catch(r)
            }))
        },
        component: () => ({
            view: e => {
                document.title = "Provisiones - GenieACS";
                const t = e.attrs.sort ? ri(e.attrs.sort) : {},
                    n = {};
                for (let e = 0; e < si.length; e++) n[e] = t[si[e].id] || 0;
                let r = !e.attrs.filter || ni(e.attrs.filter);
                r = oi(r);
                const s = Lr("provisions", r, {
                        limit: e.state.showCount || ti,
                        sort: t
                    }),
                    o = Ir("provisions", r),
                    i = li(r),
                    a = {};
                a.attributes = si, a.data = s.value, a.total = o.value, a.showMoreCallback = function() {
                    e.state.showCount = (e.state.showCount || ti) + ti, Qs.redraw()
                }, a.sortAttributes = n, a.onSortChange = function(n) {
                    let r = Object.assign({}, t);
                    for (const [e, t] of Object.entries(n)) delete r[si[e].id], t && (r = Object.assign({
                        [si[e].id]: t
                    }, r));
                    const s = {};
                    Object.keys(r).length && (s.sort = JSON.stringify(r)), e.attrs.filter && (s.filter = e.attrs.filter), Qs.route.set("/admin/provisions", s)
                }, a.downloadUrl = i, a.recordActionsCallback = e => [Qs("a", {
                    onclick: () => {
                        let t = null;
                        const n = Qs(Vo, Object.assign({
                            base: e,
                            actionHandler: (e, n) => new Promise((r => {
                                ii(e, n, !1).then((e => {
                                    const n = e ? Object.values(e) : [];
                                    if (n.length)
                                        for (const e of n) Tt("error", e);
                                    else ms(t);
                                    r()
                                })).catch((e => {
                                    Tt("error", e.message), r()
                                }))
                            }))
                        }, ai));
                        t = () => n, ps(t, (() => !n.state.current.modified || confirm("Hay cambios sin guardar, ¿Quieres salir?")))
                    }
                }, "Ver/Editar")], window.authorizer.hasAccess("provisions", 3) && (a.actionsCallback = e => [Qs("button.primary", {
                    title: "Crear nueva provision",
                    onclick: () => {
                        let e = null;
                        const t = Qs(Vo, Object.assign({
                            actionHandler: (t, n) => new Promise((r => {
                                ii(t, n, !0).then((t => {
                                    const n = t ? Object.values(t) : [];
                                    if (n.length)
                                        for (const e of n) Tt("error", e);
                                    else ms(e);
                                    r()
                                })).catch((e => {
                                    Tt("error", e.message), r()
                                }))
                            }))
                        }, ai));
                        e = () => t, ps(e, (() => !t.state.current.modified || confirm("Hay cambios sin guardar, ¿Quieres salir?")))
                    }
                }, "Nuevo"), Qs("button.primary", {
                    title: "Eliminar provisiones seleccionadas",
                    disabled: !e.size,
                    onclick: t => {
                        confirm(`Deleting ${e.size} provisions. Are you sure?`) && (t.redraw = !1, t.target.disabled = !0, Promise.all(Array.from(e).map((e => Wr("provisions", e)))).then((e => {
                            Tt("success", `${e.length} provisions deleted`), Tr(Date.now())
                        })).catch((e => {
                            Tt("error", e.message), Tr(Date.now())
                        })))
                    }
                }, "Eliminar")]);
                const l = {
                    resource: "provisions",
                    filter: e.attrs.filter,
                    onChange: function(t) {
                        const n = {
                            filter: t
                        };
                        e.attrs.sort && (n.sort = e.attrs.sort), Qs.route.set("/admin/provisions", n)
                    }
                };
                return [Qs("h1", "Listado de provisiones"), Qs(wo, l), Qs("loading", {
                    queries: [s, o]
                }, Qs(ao, a))]
            }
        })
    }),
    ui = Ft.ui.pageSize || 10,
    fi = Rt(yt),
    di = Rt(JSON.parse),
    hi = [{
        id: "_id",
        label: "Nombre"
    }, {
        id: "script",
        label: "Codigo",
        type: "code"
    }],
    pi = Rt((e => mt(e, (e => Array.isArray(e) && "FUNC" === e[0] && "Q" === e[1] ? ho("virtualParameters", e[2], e[3]) : e))));

function mi(e, t, n) {
    return new Promise(((r, s) => {
        const o = Object.assign({}, t);
        if ("save" === e) {
            const e = o._id;
            if (delete o._id, !e) return void r({
                _id: "ID can not be empty"
            });
            Vr("virtualParameters", e).then((t => t && n ? (Tr(Date.now()), void r({
                _id: "Virtual parameter already exists"
            })) : t || n ? void Br("virtualParameters", e, o).then((() => {
                Tt("success", "Virtual parameter " + (t ? "updated" : "created")), Tr(Date.now()), r(null)
            })).catch((e => {
                400 === e.code && e.response ? s(new Error(e.response)) : s(e)
            })) : (Tr(Date.now()), void r({
                _id: "Virtual parameter does not exist"
            })))).catch(s)
        } else "delete" === e ? Wr("virtualParameters", o._id).then((() => {
            Tt("success", "Virtual parameter deleted"), Tr(Date.now()), r(null)
        })).catch((e => {
            Tr(Date.now()), s(e)
        })) : s(new Error("Undefined action"))
    }))
}
const gi = {
        resource: "virtualParameters",
        attributes: hi
    },
    vi = Rt((e => {
        const t = {};
        for (const e of hi) t[e.label] = e.id;
        return `api/virtualParameters.csv?${Qs.buildQueryString({filter:wt(e),columns:JSON.stringify(t)})}`
    }));
const yi = Object.freeze({
        __proto__: null,
        init: function(e) {
            if (!window.authorizer.hasAccess("virtualParameters", 2)) return Promise.reject(new Error("No esta autorizado para ver esta pagina"));
            const t = e.hasOwnProperty("sort") ? "" + e.sort : "",
                n = e.hasOwnProperty("filter") ? "" + e.filter : "";
            return new Promise(((e, r) => {
                Fo().then((() => {
                    e({
                        filter: n,
                        sort: t
                    })
                })).catch(r)
            }))
        },
        component: () => ({
            view: e => {
                document.title = "Parametros virtuales - GenieACS";
                const t = e.attrs.sort ? di(e.attrs.sort) : {},
                    n = {};
                for (let e = 0; e < hi.length; e++) n[e] = t[hi[e].id] || 0;
                let r = !e.attrs.filter || fi(e.attrs.filter);
                r = pi(r);
                const s = Lr("virtualParameters", r, {
                        limit: e.state.showCount || ui,
                        sort: t
                    }),
                    o = Ir("virtualParameters", r),
                    i = vi(r),
                    a = {};
                a.attributes = hi, a.data = s.value, a.total = o.value, a.showMoreCallback = function() {
                    e.state.showCount = (e.state.showCount || ui) + ui, Qs.redraw()
                }, a.sortAttributes = n, a.onSortChange = function(n) {
                    let r = Object.assign({}, t);
                    for (const [e, t] of Object.entries(n)) delete r[hi[e].id], t && (r = Object.assign({
                        [hi[e].id]: t
                    }, r));
                    const s = {};
                    Object.keys(r).length && (s.sort = JSON.stringify(r)), e.attrs.filter && (s.filter = e.attrs.filter), Qs.route.set("/admin/virtualParameters", s)
                }, a.downloadUrl = i, a.recordActionsCallback = e => [Qs("a", {
                    onclick: () => {
                        let t = null;
                        const n = Qs(Vo, Object.assign({
                            base: e,
                            actionHandler: (e, n) => new Promise((r => {
                                mi(e, n, !1).then((e => {
                                    const n = e ? Object.values(e) : [];
                                    if (n.length)
                                        for (const e of n) Tt("error", e);
                                    else ms(t);
                                    r()
                                })).catch((e => {
                                    Tt("error", e.message), r()
                                }))
                            }))
                        }, gi));
                        t = () => n, ps(t, (() => !n.state.current.modified || confirm("Hay cambios sin guardar, ¿Quieres cerrar?")))
                    }
                }, "Ver/Editar")], window.authorizer.hasAccess("virtualParameters", 3) && (a.actionsCallback = e => [Qs("button.primary", {
                    title: "Crear nuevo parametro virtual",
                    onclick: () => {
                        let e = null;
                        const t = Qs(Vo, Object.assign({
                            actionHandler: (t, n) => new Promise((r => {
                                mi(t, n, !0).then((t => {
                                    const n = t ? Object.values(t) : [];
                                    if (n.length)
                                        for (const e of n) Tt("error", e);
                                    else ms(e);
                                    r()
                                })).catch((e => {
                                    Tt("error", e.message), r()
                                }))
                            }))
                        }, gi));
                        e = () => t, ps(e, (() => !t.state.current.modified || confirm("Hay cambios sin guardar, ¿Quieres salir?")))
                    }
                }, "Nuevo"), Qs("button.primary", {
                    title: "Eliminar parametro virtual seleccionado",
                    disabled: !e.size,
                    onclick: t => {
                        confirm(`Eliminar ${e.size} parametros virtuales. ¿Estas seguro?`) && (t.redraw = !1, t.target.disabled = !0, Promise.all(Array.from(e).map((e => Wr("virtualParameters", e)))).then((e => {
                            Tt("success", `Se han eliminado ${e.length} parametros virtuales`), Tr(Date.now())
                        })).catch((e => {
                            Tt("error", e.message), Tr(Date.now())
                        })))
                    }
                }, "Delete")]);
                const l = {
                    resource: "virtualParameters",
                    filter: e.attrs.filter,
                    onChange: function(t) {
                        const n = {
                            filter: t
                        };
                        e.attrs.sort && (n.sort = e.attrs.sort), Qs.route.set("/admin/virtualParameters", n)
                    }
                };
                return [Qs("h1", "Listado de parametros virtuales"), Qs(wo, l), Qs("loading", {
                    queries: [s, o]
                }, Qs(ao, a))]
            }
        })
    }),
    wi = Ft.ui.pageSize || 10,
    bi = Rt(yt),
    Ai = Rt(JSON.parse),
    Si = [{
        id: "_id",
        label: "Nombre"
    }, {
        id: "metadata.fileType",
        label: "Tipo",
        options: ["1 Firmware Upgrade Image", "2 Web Content", "3 Vendor Configuration File", "4 Tone File", "5 Ringer File"]
    }, {
        id: "metadata.oui",
        label: "OUI"
    }, {
        id: "metadata.productClass",
        label: "Modelo"
    }, {
        id: "metadata.version",
        label: "Version"
    }],
    xi = {
        resource: "files",
        attributes: Si.slice(1).concat([{
            id: "file",
            label: "Archivo",
            type: "file"
        }])
    },
    Oi = Rt((e => mt(e, (e => Array.isArray(e) && "FUNC" === e[0] && "Q" === e[1] ? ho("files", e[2], e[3]) : e))));
const ki = Rt((e => {
    const t = {};
    for (const e of Si) t[e.label] = e.id;
    return `api/files.csv?${Qs.buildQueryString({filter:wt(e),columns:JSON.stringify(t)})}`
}));
const Ci = Object.freeze({
    __proto__: null,
    init: function(e) {
        if (!window.authorizer.hasAccess("files", 2)) return Promise.reject(new Error("No esta autorizado para ver esta pagina"));
        const t = e.hasOwnProperty("sort") ? "" + e.sort : "",
            n = e.hasOwnProperty("filter") ? "" + e.filter : "";
        return Promise.resolve({
            filter: n,
            sort: t
        })
    },
    component: () => ({
        view: e => {
            document.title = "Archivos - GenieACS";
            const t = e.attrs.sort ? Ai(e.attrs.sort) : {},
                n = {};
            for (let e = 0; e < Si.length; e++) n[e] = t[Si[e].id] || 0;
            let r = !e.attrs.filter || bi(e.attrs.filter);
            r = Oi(r);
            const s = Lr("files", r, {
                    limit: e.state.showCount || wi,
                    sort: t
                }),
                o = Ir("files", r),
                i = ki(r),
                a = {};
            a.attributes = Si, a.data = s.value, a.total = o.value, a.showMoreCallback = function() {
                e.state.showCount = (e.state.showCount || wi) + wi, Qs.redraw()
            }, a.sortAttributes = n, a.onSortChange = function(n) {
                let r = Object.assign({}, t);
                for (const [e, t] of Object.entries(n)) delete r[Si[e].id], t && (r = Object.assign({
                    [Si[e].id]: t
                }, r));
                const s = {};
                Object.keys(r).length && (s.sort = JSON.stringify(r)), e.attrs.filter && (s.filter = e.attrs.filter), Qs.route.set("/admin/files", s)
            }, a.downloadUrl = i, a.recordActionsCallback = e => [Qs("a", {
                href: "api/blob/files/" + e._id
            }, "Download")], window.authorizer.hasAccess("files", 3) && (a.actionsCallback = e => [Qs("button.primary", {
                title: "Crear nuevo archivo",
                onclick: () => {
                    let e = null;
                    const t = new AbortController;
                    let n = -1;
                    const r = Qs(Vo, Object.assign({
                        actionHandler: async (r, s) => {
                            var o;
                            if ("save" !== r) throw new Error("Undefined action");
                            const i = null === (o = s.file) || void 0 === o ? void 0 : o[0],
                                a = {
                                    "metadata-fileType": s["metadata.fileType"] || "",
                                    "metadata-oui": s["metadata.oui"] || "",
                                    "metadata-productclass": s["metadata.productClass"] || "",
                                    "metadata-version": s["metadata.version"] || ""
                                };
                            if (!i) return void Tt("error", "File not selected");
                            if (await Vr("files", i.name)) return Tr(Date.now()), void Tt("error", "File already exists");
                            const l = e => {
                                n = e.loaded / e.total, Qs.redraw()
                            };
                            n = 0;
                            try {
                                await
                                function(e, t, n, r) {
                                    return $r({
                                        method: "PUT",
                                        headers: t = Object.assign({
                                            "Content-Type": "application/octet-stream"
                                        }, t),
                                        url: `api/files/${encodeURIComponent(e.name)}`,
                                        serialize: e => e,
                                        body: e,
                                        config: e => {
                                            r && e.upload.addEventListener("progress", r), n && (n.aborted && e.abort(), n.addEventListener("abort", (() => e.abort())))
                                        }
                                    })
                                }(i, a, t.signal, l), Tr(Date.now()), Tt("success", "File created"), ms(e)
                            } catch (e) {
                                Tt("error", e.message)
                            }
                            n = -1
                        }
                    }, xi));
                    e = () => n < 0 ? [null, r] : [Qs("div.progress", Qs("div.progress-bar", {
                        style: `width: ${Math.trunc(100*n)}%`
                    })), r], ps(e, (() => !(r.state.current.modified && !confirm("Hay cambios sin guardar, ¿Quieres salir?")) && (t.abort(), !0)))
                }
            }, "Nuevo"), Qs("button.primary", {
                title: "Eliminar los archivos seleccionados",
                disabled: !e.size,
                onclick: t => {
                    confirm(`Deleting ${e.size} files. Are you sure?`) && (t.redraw = !1, t.target.disabled = !0, Promise.all(Array.from(e).map((e => Wr("files", e)))).then((e => {
                        Tt("success", `${e.length} files deleted`), Tr(Date.now())
                    })).catch((e => {
                        Tt("error", e.message), Tr(Date.now())
                    })))
                }
            }, "Eliminar")]);
            const l = {
                resource: "files",
                filter: e.attrs.filter,
                onChange: function(t) {
                    const n = {
                        filter: t
                    };
                    e.attrs.sort && (n.sort = e.attrs.sort), Qs.route.set("/admin/files", n)
                }
            };
            return [Qs("h1", "Listado de archivos"), Qs(wo, l), Qs("loading", {
                queries: [s, o]
            }, Qs(ao, a))]
        }
    })
});

function Ei(e) {
    let t = 1;
    if (null == e || "object" != typeof e) return t;
    if (Array.isArray(e)) {
        for (const n of e) t += Ei(n);
        return t
    }
    const n = Object.entries(e).map((([e, t]) => [e, Ei(t)]));
    n.sort(((e, t) => e[1] !== t[1] ? e[1] - t[1] : t[0] > e[0] ? -1 : 1));
    for (const [r, s] of n) {
        t += s;
        const n = e[r];
        delete e[r], e[r] = n
    }
    return t
}

function Di(e) {
    e.sort(((e, t) => e._id > t._id ? 1 : e._id < t._id ? -1 : 0));
    const t = {};
    for (const n of e) {
        const e = n._id.split(".");
        let r = t;
        for (; e.length > 1;) {
            const t = e.shift();
            null != r[t] && "object" == typeof r[t] || (r[t] = {}), r = r[t]
        }
        r[e[0]] = n.value
    }
    const n = function(e) {
            if (null == e || "object" != typeof e) return e;
            if (Object.keys(e).length <= 300) {
                let t = [];
                for (const n of Object.keys(e)) {
                    const e = Math.floor(+n);
                    if (!(e >= 0 && e < 300 && String(e) === n)) {
                        t = [];
                        break
                    } {
                        const n = Math.floor(e / 30);
                        t[n] || (t[n] = 0), t[n] |= 1 << e % 30
                    }
                }
                let n = 0;
                for (; t.length && 1073741823 === (n = t.shift()););
                if (n && (~n & n + 1) === n + 1) {
                    const t = [];
                    for (let n = 0; n < Object.keys(e).length; n++) t[n] = e[n];
                    e = t
                }
            }
            for (const [t, r] of Object.entries(e)) e[t] = n(r);
            return e
        },
        r = n(t);
    return Ei(r), r
}

function Ni(e, t) {
    return new Promise(((n, r) => {
        try {
            let s = Mo.parse(t, {
                schema: "failsafe"
            });
            if (s) {
                const t = {};
                let n = t;
                e.forEach(((t, r) => {
                    r < e.length - 1 ? (n[t] = {}, n = n[t]) : n[t] = s
                })), s = function(e) {
                    const t = {},
                        n = (e, r) => {
                            for (const [s, o] of Object.entries(e)) {
                                const e = r ? `${r}.${s}` : s;
                                void 0 !== o && (null === o || "object" != typeof o ? t[e] = o : n(o, e))
                            }
                        };
                    return null !== e && "object" == typeof e && n(e, ""), t
                }(t)
            } else s = {};
            for (const e of Object.values(s)) yt(e);
            (function(e = "%") {
                const t = wt(["LIKE", ["PARAM", "_id"], e]);
                return $r({
                    method: "GET",
                    url: `api/config/?${Z.buildQueryString({filter:t})}`,
                    background: !0
                })
            })(`${e.join(".")}.%`).then((e => {
                const t = {};
                for (const n of e) t[n._id] = n.value;
                const o = function(e, t) {
                    const n = {
                        add: [],
                        remove: []
                    };
                    for (const [r, s] of Object.entries(t)) s && e[r] !== s && n.add.push({
                        _id: r,
                        value: s
                    });
                    for (const r of Object.keys(e)) t[r] || n.remove.push(r);
                    return n
                }(t, s);
                if (!o.add.length && !o.remove.length) return void n(null);
                const i = [];
                for (const e of o.add) i.push(Br("config", e._id, e));
                for (const e of o.remove) i.push(Wr("config", e));
                Promise.all(i).then((() => {
                    n(null)
                })).catch(r)
            })).catch(r)
        } catch (e) {
            n({
                config: e.message
            })
        }
    }))
}
const Pi = () => ({
    view: e => {
        const t = e.attrs.prefix.split("."),
            n = e.attrs.name,
            r = e.attrs.data;
        let s;
        if ("" === t[t.length - 1] && t.pop(), r.length) {
            s = Di(r);
            for (const e of t) s = s[e]
        }
        const o = s && Object.values(s).length ? Mo.stringify(s, {
                schema: "failsafe"
            }) : "",
            i = Qs(qo, {
                id: `${n}-ui-config`,
                value: o,
                mode: "yaml",
                focus: !0,
                onSubmit: e => {
                    e.form.querySelector("button[type=submit]").click()
                },
                onChange: t => {
                    e.state.updatedYaml = t, e.state.modified = !0
                }
            }),
            a = Qs("button.primary", {
                type: "submit"
            }, "Guardar");
        return Qs("div.put-form", [Qs("h1", `Editando ${n}`), Qs("form", {
            onsubmit: n => {
                n.redraw = !1, n.preventDefault(), null == e.state.updatedYaml && (e.state.updatedYaml = o), Ni(t, e.state.updatedYaml).then(e.attrs.onUpdate).catch(e.attrs.onError)
            }
        }, [i, Qs(".actions-bar", [a])])])
    }
});

function ji(e, t, n) {
    return new Promise(((r, s) => {
        const o = Object.assign({}, t);
        if ("save" === e) {
            let e = o._id || "";
            delete o._id;
            const t = /^[0-9a-zA-Z_.-]+$/;
            if (e = e.trim(), !e.match(t)) return void r({
                _id: "Invalid ID"
            });
            try {
                o.value = wt(yt(o.value || ""))
            } catch (e) {
                return void r({
                    value: "Config value must be valid expression"
                })
            }
            Vr("config", e).then((t => t && n ? (Tr(Date.now()), void r({
                _id: "Config already exists"
            })) : t || n ? void Br("config", e, o).then((() => {
                Tt("success", "Config " + (t ? "updated" : "created")), Tr(Date.now()), r(null)
            })).catch(s) : (Tr(Date.now()), void r({
                _id: "Config does not exist"
            })))).catch(s)
        } else "delete" === e ? Wr("config", o._id).then((() => {
            Tt("success", "Config deleted"), Tr(Date.now()), r(null)
        })).catch((e => {
            Tr(Date.now()), s(e)
        })) : s(new Error("Undefined action"))
    }))
}
const $i = {
    resource: "config",
    attributes: [{
        id: "_id",
        label: "Clave"
    }, {
        id: "value",
        label: "Valor",
        type: "textarea"
    }]
};

function _i(e, t) {
    const n = e.value.sort(((e, t) => e._id < t._id ? -1 : 1));
    let r;
    if (t) {
        const e = t.split(" ").filter((e => e));
        e.length && (r = new RegExp(e.map((e => e.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&"))).join(".*"), "i"))
    }
    const s = [];
    for (const e of n) {
        const t = {};
        !r || r.test(e._id) || r.test(e.value) || (t.style = "display: none;");
        const n = Qs("button", {
                title: "Edit config value",
                onclick: () => {
                    let t = null;
                    const n = Qs(Vo, Object.assign({
                        base: e,
                        actionHandler: (e, n) => new Promise((r => {
                            ji(e, n, !1).then((e => {
                                const n = e ? Object.values(e) : [];
                                if (n.length)
                                    for (const e of n) Tt("error", e);
                                else ms(t);
                                r()
                            })).catch((e => {
                                Tt("error", e.message), r()
                            }))
                        }))
                    }, $i));
                    t = () => n, ps(t, (() => !n.state.current.modified || confirm("Hay cambios sin guardar, ¿Quieres salir?")))
                }
            }, Hr("edit")),
            o = Qs("button", {
                title: "Delete config",
                onclick: () => {
                    confirm(`Deleting ${e._id} config. Are you sure?`) && ji("delete", e).catch((e => {
                        throw e
                    }))
                }
            }, Hr("remove"));
        s.push(Qs("tr", t, Qs("td.left", Qs("long-text", {
            text: e._id
        })), Qs("td.right", Qs("span", [Qs("long-text", {
            text: `${e.value}`
        }), n, o]))))
    }
    return s.length || s.push(Qs("tr.empty", Qs("td", {
        colspan: 2
    }, "No config"))), Qs("table", Qs("tbody", s))
}
const Ii = Object.freeze({
        __proto__: null,
        init: function() {
            return window.authorizer.hasAccess("config", 2) ? new Promise(((e, t) => {
                Promise.all([Fo(), Mo ? Promise.resolve() : new Promise(((e, t) => {
                    import("./yaml-60b35c66.js").then((function(e) {
                        return e.i
                    })).then((t => {
                        Mo = t, e()
                    })).catch((e => {
                        Uo(), t(e)
                    }))
                }))]).then((() => {
                    e({})
                })).catch(t)
            })) : Promise.reject(new Error("No esta autorizado para ver esta pagina"))
        },
        component: () => ({
            view: e => {
                document.title = "Configuracion - GenieACS";
                const t = Qs("input", {
                        type: "text",
                        placeholder: "Buscar configuracion",
                        oninput: t => {
                            e.state.searchString = t.target.value, t.redraw = !1, clearTimeout(e.state.timeout), e.state.timeout = setTimeout(Qs.redraw, 250)
                        }
                    }),
                    n = Lr("config", !0);
                let r;
                const s = [];
                if (window.authorizer.hasAccess("config", 3)) {
                    r = Qs("button.primary", {
                        title: "Create new config",
                        onclick: () => {
                            let e = null;
                            const t = Qs(Vo, Object.assign({
                                actionHandler: (t, n) => new Promise((r => {
                                    ji(t, n, !0).then((t => {
                                        const n = t ? Object.values(t) : [];
                                        if (n.length)
                                            for (const e of n) Tt("error", e);
                                        else ms(e);
                                        r(null)
                                    })).catch((e => {
                                        Tt("error", e.message), r()
                                    }))
                                }))
                            }, $i));
                            e = () => t, ps(e, (() => !t.state.current.modified || confirm("Hay cambios sin guardar, ¿Quieres salir?")))
                        }
                    }, "Nueva configuracion");
                    const e = [{
                        name: "pagina de resumen",
                        prefix: "ui.overview.groups.",
                        data: []
                    }, {
                        name: "pagina de graficos",
                        prefix: "ui.overview.charts.",
                        data: []
                    }, {
                        name: "filtros",
                        prefix: "ui.filters.",
                        data: []
                    }, {
                        name: "pagina de inicio",
                        prefix: "ui.index.",
                        data: []
                    }, {
                        name: "pagina de dispositivo",
                        prefix: "ui.device.",
                        data: []
                    }];
                    if (n.fulfilled)
                        for (const t of n.value)
                            for (const n of e)
                                if (t._id.startsWith(n.prefix)) {
                                    n.data.push(t);
                                    break
                                } for (const t of e) {
                        const e = {
                            prefix: t.prefix,
                            name: t.name,
                            data: t.data
                        };
                        s.push(Qs("button", {
                            onclick: () => {
                                let n = null;
                                const r = Qs(Pi, Object.assign({
                                    onUpdate: e => {
                                        const r = e ? Object.values(e) : [];
                                        if (r.length)
                                            for (const e of r) Tt("error", e);
                                        else Tt("success", `${t.name.replace(/^[a-z]/,t.name[0].toUpperCase())} config updated`), ms(n);
                                        Tr(Date.now())
                                    },
                                    onError: e => {
                                        Tt("error", e.message), Tr(Date.now()), ms(n)
                                    }
                                }, e));
                                n = () => r, ps(n, (() => !r.state.modified || confirm("Hay cambios sin guardar, ¿Quieres salir?")))
                            }
                        }, `Editar ${t.name}`))
                    }
                }
                return [Qs("h1", "Listado de configuraciones"), Qs("loading", {
                    queries: [n]
                }, Qs(".all-parameters", t, Qs(".parameter-list", {
                    style: "height: 400px"
                }, _i(n, e.state.searchString)), Qs(".actions-bar", [r].concat(s))))]
            }
        })
    }),
    zi = Ft.ui.pageSize || 10,
    Ri = Rt(yt),
    Li = Rt(JSON.parse),
    Mi = [{
        id: "role",
        label: "Rol"
    }, {
        id: "resource",
        label: "Recurso",
        type: "combo",
        options: ["config", "devices", "faults", "files", "permissions", "users", "presets", "provisions", "virtualParameters"]
    }, {
        id: "filter",
        label: "Filtro",
        type: "textarea"
    }, {
        id: "access",
        label: "Acceso",
        type: "combo",
        options: ["1: count", "2: read", "3: write"]
    }, {
        id: "validate",
        label: "Validar",
        type: "textarea"
    }],
    Ti = Rt((e => mt(e, (e => Array.isArray(e) && "FUNC" === e[0] && "Q" === e[1] ? ho("permissions", e[2], e[3]) : e))));

function Ui(e, t) {
    return new Promise(((n, r) => {
        const s = Object.assign({}, t);
        if ("save" === e) {
            if (!s.role) return void n({
                role: "Role can not be empty"
            });
            if (!s.resource) return void n({
                resource: "Resource can not be empty"
            });
            if (!s.access) return void n({
                access: "Access can not be empty"
            });
            if ("3: write" === s.access) s.access = 3;
            else if ("2: read" === s.access) s.access = 2;
            else {
                if ("1: count" !== s.access) return void n({
                    access: "Invalid access level"
                });
                s.access = 1
            }
            if (s.filter) try {
                s.filter = wt(Ri(s.filter))
            } catch (e) {
                return void n({
                    filter: "Filter must be valid expression"
                })
            }
            if (s.validate) try {
                s.validate = wt(Ri(s.validate))
            } catch (e) {
                return void n({
                    validate: "Validate must be valid expression"
                })
            }
            const e = `${s.role}:${s.resource}:${s.access}`;
            Vr("permissions", e).then((t => {
                if (t) return Tr(Date.now()), void n({
                    _id: "Permission already exists"
                });
                Br("permissions", e, s).then((() => {
                    Tt("success", "Permission created"), Tr(Date.now()), n(null)
                })).catch(r)
            })).catch(r)
        } else "delete" === e ? Wr("permissions", s._id).then((() => {
            Tt("success", "Permission deleted"), Tr(Date.now()), n(null)
        })).catch((e => {
            Tr(Date.now()), r(e)
        })) : r(new Error("Undefined action"))
    }))
}
const Fi = {
        resource: "permissions",
        attributes: Mi
    },
    qi = Rt((e => {
        const t = {};
        for (const e of Mi) t[e.label] = e.id;
        return `api/permissions.csv?${Qs.buildQueryString({filter:wt(e),columns:JSON.stringify(t)})}`
    }));
const Wi = Object.freeze({
        __proto__: null,
        init: function(e) {
            if (!window.authorizer.hasAccess("permissions", 2)) return Promise.reject(new Error("No esta autorizado para ver esta pagina"));
            const t = e.hasOwnProperty("sort") ? "" + e.sort : "",
                n = e.hasOwnProperty("filter") ? "" + e.filter : "";
            return Promise.resolve({
                filter: n,
                sort: t
            })
        },
        component: () => ({
            view: e => {
                document.title = "Permisos - GenieACS";
                const t = e.attrs.sort ? Li(e.attrs.sort) : {},
                    n = {};
                for (let e = 0; e < Mi.length; e++) {
                    const r = Mi[e];
                    "filter" !== r.id && "validate" !== r.id && (n[e] = t[r.id] || 0)
                }
                let r = !e.attrs.filter || Ri(e.attrs.filter);
                r = Ti(r);
                const s = Lr("permissions", r, {
                        limit: e.state.showCount || zi,
                        sort: t
                    }),
                    o = Ir("permissions", r),
                    i = qi(r),
                    a = {};
                a.attributes = Mi, a.data = s.value, a.total = o.value, a.valueCallback = (e, t) => {
                    if ("access" === e.id) {
                        const e = t.access;
                        return 1 === e ? "1: count" : 2 === e ? "2: read" : 3 === e ? "3: write" : e
                    }
                    return t[e.id]
                }, a.showMoreCallback = function() {
                    e.state.showCount = (e.state.showCount || zi) + zi, Qs.redraw()
                }, a.sortAttributes = n, a.onSortChange = function(n) {
                    let r = Object.assign({}, t);
                    for (const [e, t] of Object.entries(n)) delete r[Mi[e].id], t && (r = Object.assign({
                        [Mi[e].id]: t
                    }, r));
                    const s = {};
                    Object.keys(r).length && (s.sort = JSON.stringify(r)), e.attrs.filter && (s.filter = e.attrs.filter), Qs.route.set("/admin/permissions", s)
                }, a.downloadUrl = i, window.authorizer.hasAccess("permissions", 3) && (a.recordActionsCallback = e => [Qs("button", {
                    title: "Eliminar permiso",
                    onclick: () => {
                        confirm(`Deleting ${e._id} permission. Are you sure?`) && Ui("delete", e).catch((e => {
                            Tt("error", e.message)
                        }))
                    }
                }, Hr("remove"))], a.actionsCallback = e => [Qs("button.primary", {
                    title: "Crear permiso",
                    onclick: () => {
                        let e = null;
                        const t = Qs(Vo, Object.assign({
                            actionHandler: (t, n) => new Promise((r => {
                                Ui(t, n).then((t => {
                                    const n = t ? Object.values(t) : [];
                                    if (n.length)
                                        for (const e of n) Tt("error", e);
                                    else ms(e);
                                    r()
                                })).catch((e => {
                                    Tt("error", e.message), r()
                                }))
                            }))
                        }, Fi));
                        e = () => t, ps(e, (() => !t.state.current.modified || confirm("Hay cambios sin guardar, ¿Quieres salir?")))
                    }
                }, "Nuevo"), Qs("button.primary", {
                    title: "Eliminar permisos seleccionados",
                    disabled: !e.size,
                    onclick: t => {
                        confirm(`Deleting ${e.size} permissions. Are you sure?`) && (t.redraw = !1, t.target.disabled = !0, Promise.all(Array.from(e).map((e => Wr("permissions", e)))).then((e => {
                            Tt("success", `${e.length} permissions deleted`), Tr(Date.now())
                        })).catch((e => {
                            Tt("error", e.message), Tr(Date.now())
                        })))
                    }
                }, "Eliminar")]);
                const l = {
                    resource: "permissions",
                    filter: e.attrs.filter,
                    onChange: function(t) {
                        const n = {
                            filter: t
                        };
                        e.attrs.sort && (n.sort = e.attrs.sort), Qs.route.set("/admin/permissions", n)
                    }
                };
                return [Qs("h1", "Listado de permisos"), Qs(wo, l), Qs("loading", {
                    queries: [s, o]
                }, Qs(ao, a))]
            }
        })
    }),
    Bi = Ft.ui.pageSize || 10,
    Vi = Rt(yt),
    Ji = Rt(JSON.parse),
    Ki = [{
        id: "_id",
        label: "Usuario"
    }, {
        id: "roles",
        label: "Roles",
        type: "multi",
        options: []
    }],
    Hi = Rt((e => mt(e, (e => Array.isArray(e) && "FUNC" === e[0] && "Q" === e[1] ? ho("users", e[2], e[3]) : e))));

function Qi(e, t, n) {
    return new Promise(((r, s) => {
        const o = Object.assign({}, t);
        if ("save" === e) {
            const e = o._id,
                t = o.password,
                i = o.confirm;
            if (delete o._id, delete o.password, delete o.confirm, !e) return void r({
                _id: "ID can not be empty"
            });
            if (n) {
                if (!t) return void r({
                    password: "Password can not be empty"
                });
                if (t !== i) return void r({
                    confirm: "Confirm password doesn't match password"
                })
            }
            if (!Array.isArray(o.roles) || !o.roles.length) return void r({
                roles: "Role(s) must be selected"
            });
            o.roles = o.roles.join(","), Vr("users", e).then((i => i && n ? (Tr(Date.now()), void r({
                _id: "User already exists"
            })) : i || n ? void Br("users", e, o).then((() => {
                n ? Kr(e, t).then((() => {
                    Tt("success", "User created"), Tr(Date.now()), r(null)
                })).catch(s) : (Tt("success", "User updated"), Tr(Date.now()), r(null))
            })).catch(s) : (Tr(Date.now()), void r({
                _id: "User does not exist"
            })))).catch(s)
        } else "delete" === e ? Wr("users", o._id).then((() => {
            Tt("success", "User deleted"), Tr(Date.now()), r(null)
        })).catch((e => {
            Tr(Date.now()), s(e)
        })) : s(new Error("Undefined action"))
    }))
}
const Yi = Rt((e => {
    const t = {};
    for (const e of Ki) t[e.label] = e.id;
    return `api/users.csv?${Qs.buildQueryString({filter:wt(e),columns:JSON.stringify(t)})}`
}));
const Gi = Object.freeze({
    __proto__: null,
    init: function(e) {
        if (!window.authorizer.hasAccess("users", 2)) return Promise.reject(new Error("No esta autorizado para ver esta pagina"));
        const t = e.hasOwnProperty("sort") ? "" + e.sort : "",
            n = e.hasOwnProperty("filter") ? "" + e.filter : "";
        return Promise.resolve({
            filter: n,
            sort: t
        })
    },
    component: () => ({
        view: e => {
            document.title = "Usuarios - GenieACS";
            const t = e.attrs.sort ? Ji(e.attrs.sort) : {},
                n = {};
            for (let e = 0; e < Ki.length; e++) {
                "roles" !== Ki[e].id && (n[e] = t[Ki[e].id] || 0)
            }
            let r = !e.attrs.filter || Vi(e.attrs.filter);
            r = Hi(r);
            const s = Lr("users", r, {
                    limit: e.state.showCount || Bi,
                    sort: t
                }),
                o = Ir("users", r),
                i = Lr("permissions", !0);
            if (i.fulfilled)
                for (const e of Ki) "roles" === e.id && (e.options = [...new Set(i.value.map((e => e.role)))]);
            const a = Yi(r),
                l = window.authorizer.hasAccess("users", 3),
                c = {};
            if (c.attributes = Ki, c.data = s.value, c.total = o.value, c.showMoreCallback = function() {
                    e.state.showCount = (e.state.showCount || Bi) + Bi, Qs.redraw()
                }, c.sortAttributes = n, c.onSortChange = function(n) {
                    let r = Object.assign({}, t);
                    for (const [e, t] of Object.entries(n)) delete r[Ki[e].id], t && (r = Object.assign({
                        [Ki[e].id]: t
                    }, r));
                    const s = {};
                    Object.keys(r).length && (s.sort = JSON.stringify(r)), e.attrs.filter && (s.filter = e.attrs.filter), Qs.route.set("/admin/users", s)
                }, c.downloadUrl = a, c.recordActionsCallback = e => [Qs("a", {
                    onclick: () => {
                        let t = null;
                        const n = Qs(Vo, Object.assign({
                            base: {
                                _id: e._id,
                                roles: e.roles.split(",")
                            },
                            actionHandler: (e, n) => new Promise((r => {
                                Qi(e, n, !1).then((e => {
                                    const n = e ? Object.values(e) : [];
                                    if (n.length)
                                        for (const e of n) Tt("error", e);
                                    else ms(t);
                                    r()
                                })).catch((e => {
                                    Tt("error", e.message), r()
                                }))
                            }))
                        }, {
                            resource: "users",
                            attributes: Ki
                        }));
                        t = () => {
                            const r = [n];
                            if (l) {
                                r.push(Qs("hr"));
                                const n = {
                                    noAuth: !0,
                                    username: e._id,
                                    onPasswordChange: () => {
                                        ms(t), Qs.redraw()
                                    }
                                };
                                r.push(Qs(Xs, n))
                            }
                            return r
                        }, ps(t, (() => !n.state.current.modified || confirm("Hay cambios sin guardar, ¿Quieres salir?")))
                    }
                }, "Ver/Editar")], l) {
                const e = {
                    resource: "users",
                    attributes: [Ki[0], {
                        id: "password",
                        label: "Contraseña",
                        type: "password"
                    }, {
                        id: "confirm",
                        label: "Confirmar contraseña",
                        type: "password"
                    }, Ki[1]]
                };
                c.actionsCallback = t => [Qs("button.primary", {
                    title: "Crear nuevo usuario",
                    onclick: () => {
                        let t = null;
                        const n = Qs(Vo, Object.assign({
                            actionHandler: (e, n) => new Promise((r => {
                                Qi(e, n, !0).then((e => {
                                    const n = e ? Object.values(e) : [];
                                    if (n.length)
                                        for (const e of n) Tt("error", e);
                                    else ms(t);
                                    r()
                                })).catch((e => {
                                    Tt("error", e.message), r()
                                }))
                            }))
                        }, e));
                        t = () => n, ps(t, (() => !n.state.current.modified || confirm("Hay cambios sin guardar, ¿Quieres salir?")))
                    }
                }, "Nuevo"), Qs("button.primary", {
                    title: "Eliminar usuarios seleccionados",
                    disabled: !t.size,
                    onclick: e => {
                        confirm(`Eliminar ${t.size} usuarios. ¿Estas seguro?`) && (e.redraw = !1, e.target.disabled = !0, Promise.all(Array.from(t).map((e => Wr("users", e)))).then((e => {
                            Tt("success", `Se han eliminado ${e.length} usuarios`), Tr(Date.now())
                        })).catch((e => {
                            Tt("error", e.message), Tr(Date.now())
                        })))
                    }
                }, "Eliminar")]
            }
            const u = {
                resource: "users",
                filter: e.attrs.filter,
                onChange: function(t) {
                    const n = {
                        filter: t
                    };
                    e.attrs.sort && (n.sort = e.attrs.sort), Qs.route.set("/admin/users", n)
                }
            };
            return [Qs("h1", "Listado de usuarios"), Qs(wo, u), Qs("loading", {
                queries: [s, o]
            }, Qs(ao, c))]
        }
    })
});
window.authorizer = new class {
    constructor(e) {
        this.permissionSets = e, this.validatorCache = new WeakMap, this.hasAccessCache = new Map, this.getFilterCache = new Map
    }
    hasAccess(e, t) {
        const n = `${e}-${t}`;
        if (this.hasAccessCache.has(n)) return this.hasAccessCache.get(n);
        let r = !1;
        for (const n of this.permissionSets)
            for (const s of n)
                if (s[e] && s[e].access >= t) {
                    r = !0;
                    break
                } return this.hasAccessCache.set(n, r), r
    }
    getFilter(e, t) {
        const n = `${e}-${t}`;
        if (this.getFilterCache.has(n)) return this.getFilterCache.get(n);
        let r = null;
        for (const n of this.permissionSets)
            for (const s of n) s[e] && s[e].access >= t && (r = jt(r, s[e].filter));
        return this.getFilterCache.set(n, r), r
    }
    getValidator(e, t) {
        if (this.validatorCache.has(t)) return this.validatorCache.get(t);
        const n = [];
        for (const t of this.permissionSets)
            for (const r of t) r[e] && r[e].access >= 3 && r[e].validate && n.push(r[e].validate);
        const r = (r, s, o) => {
            if (!n.length) return !1;
            const i = {
                    mutationType: r,
                    mutation: s,
                    resourceType: e,
                    object: t,
                    options: o
                },
                a = Nt(n.length > 1 ? ["OR", n] : n[0], (e => {
                    const t = e.split(".", 1)[0];
                    e = e.slice(t.length + 1);
                    let n = null;
                    if (["mutation", "options"].includes(t)) {
                        n = i[t];
                        for (const t of e.split("."))
                            if (n = null != n && "object" != typeof n ? null : n[t], null == n) break
                    } else i[t] && (n = e ? i[t][e] : i[t]);
                    return n
                }), Date.now());
            return !Array.isArray(a) && !!a
        };
        return this.validatorCache.set(t, r), r
    }
    getPermissionSets() {
        return this.permissionSets
    }
}(window.permissionSets);
const Zi = ["presets", "provisions", "virtualParameters", "files", "config", "users", "permissions"];
let Xi;

function ea(e, t) {
    const n = {
        render: () => {
            const n = Date.now();
            let r;
            r = (null == Xi ? void 0 : Xi.error) ? Z(No, Xi) : Z(Zs(t.component), Xi);
            const s = {};
            return s.page = e, s.oncreate = s.onupdate = () => {
                ! function(e) {
                    const t = [];
                    for (const [n, r] of Object.entries(Pr))
                        for (const [s, o] of r.count)
                            if (Nr.accessed.get(o) >= e) {
                                if (!(Nr.fulfilling.has(o) || Er <= Nr.fulfilled.get(o))) {
                                    Nr.fulfilling.add(o);
                                    let e = Nr.filter.get(o);
                                    e = _r(e), t.push($r({
                                        method: "HEAD",
                                        url: `api/${n}/?` + Z.buildQueryString({
                                            filter: Sr(e)
                                        }),
                                        extract: e => {
                                            if (403 === e.status) throw new Error("Not authorized");
                                            if (!e.status) throw new Error("Server is unreachable");
                                            if (200 !== e.status) throw new Error(`Unexpected response status code ${e.status}`);
                                            return +e.getResponseHeader("x-total-count")
                                        },
                                        background: !1
                                    }).then((e => {
                                        Nr.value.set(o, e), Nr.fulfilled.set(o, Er), Nr.fulfilling.delete(o)
                                    })))
                                }
                            } else r.count.delete(s);
                    const n = {};
                    for (const [r, s] of Object.entries(Pr))
                        for (const [o, i] of s.fetch)
                            if (Nr.accessed.get(i) >= e) {
                                if (!(Nr.fulfilling.has(i) || Er <= Nr.fulfilled.get(i))) {
                                    Nr.fulfilling.add(i), n[r] = n[r] || [], n[r].push(i);
                                    const e = Nr.limit.get(i),
                                        s = Nr.sort.get(i);
                                    if (e) {
                                        let n = Nr.filter.get(i);
                                        n = _r(n), t.push($r({
                                            method: "GET",
                                            url: `api/${r}/?` + Z.buildQueryString({
                                                filter: Sr(n),
                                                limit: 1,
                                                skip: e - 1,
                                                sort: JSON.stringify(s),
                                                projection: Object.keys(s).join(",")
                                            }),
                                            background: !0
                                        }).then((e => {
                                            if (e.length) {
                                                const t = Object.keys(s).reduce(((t, n) => (null != e[0][n] && ("object" == typeof e[0][n] ? null != e[0][n].value && (t[n] = e[0][n].value[0]) : t[n] = e[0][n]), t)), {});
                                                Nr.bookmark.set(i, t)
                                            } else Nr.bookmark.delete(i)
                                        })))
                                    }
                                }
                            } else s.fetch.delete(o);
                    Promise.all(t).then((() => {
                        let e = !1;
                        const t = [];
                        for (const [r, s] of Object.entries(n)) {
                            let n = null;
                            for (const e of s) {
                                let t = Nr.filter.get(e);
                                t = xr(t, null, Er + Dr);
                                const r = Nr.bookmark.get(e),
                                    s = Nr.sort.get(e);
                                r && (t = zr(t, s, r)), n = jt(n, t)
                            }
                            const [o, i] = br(Pr[r].combinedFilter, n);
                            if (!i) {
                                for (const t of s) {
                                    let n = Nr.filter.get(t);
                                    n = xr(n, null, Er + Dr);
                                    const s = Nr.limit.get(t),
                                        o = Nr.bookmark.get(t),
                                        i = Nr.sort.get(t);
                                    o && (n = zr(n, i, o)), Nr.value.set(t, Rr(r, n, i, s)), Nr.fulfilled.set(t, Er), Nr.fulfilling.delete(t), e = !0
                                }
                                continue
                            }
                            let a = new Set;
                            Pr[r].combinedFilter || (a = new Set(Pr[r].objects.keys()));
                            const l = i;
                            Pr[r].combinedFilter = o, t.push($r({
                                method: "GET",
                                url: `api/${r}/?` + Z.buildQueryString({
                                    filter: Sr(l)
                                }),
                                background: !1
                            }).then((e => {
                                for (const t of e) {
                                    const e = "devices" === r ? t["DeviceID.ID"].value[0] : t._id;
                                    Pr[r].objects.set(e, t), a.delete(e)
                                }
                                for (const e of a) {
                                    const t = Pr[r].objects.get(e);
                                    Nt(l, t, Er + Dr) && Pr[r].objects.delete(e)
                                }
                                for (const e of s) {
                                    let t = Nr.filter.get(e);
                                    t = _r(t);
                                    const n = Nr.limit.get(e),
                                        s = Nr.bookmark.get(e),
                                        o = Nr.sort.get(e);
                                    s && (t = zr(t, o, s)), Nr.value.set(e, Rr(r, t, o, n)), Nr.fulfilled.set(e, Er), Nr.fulfilling.delete(e)
                                }
                            })))
                        }
                        return e && Z.redraw(), Promise.all(t)
                    })).catch((e => {
                        Tt("error", e.message)
                    }))
                }(n)
            }, Z(ws, s, r)
        },
        onmatch: null
    };
    return n.onmatch = (e, n) => (Tr(Date.now()), t.init ? new Promise((r => {
        t.init(e).then((e => {
            e ? (Xi = e, r()) : Z.route.set("/")
        })).catch((e => {
            !window.username && e.message.indexOf("authorized") >= 0 && (Tt("error", e.message), Z.route.set("/login", {
                continue: n
            })), Xi = {
                error: e.message
            }, r()
        }))
    })) : (Xi = null, null)), n
}
Z.route(document.body, "/overview", {
    "/wizard": ea("wizard", bs),
    "/login": ea("login", eo),
    "/overview": ea("overview", io),
    "/devices": ea("devices", Eo),
    "/devices/:id": ea("devices", Do),
    "/faults": ea("faults", Ro),
    "/admin": {
        onmatch: () => {
            for (const e of Zi)
                if (window.authorizer.hasAccess(e, 2)) return Z.route.set(`/admin/${e}`), null;
            return null
        }
    },
    "/admin/presets": ea("presets", ei),
    "/admin/provisions": ea("provisions", ci),
    "/admin/virtualParameters": ea("virtualParameters", yi),
    "/admin/files": ea("files", Ci),
    "/admin/config": ea("config", Ii),
    "/admin/users": ea("users", Gi),
    "/admin/permissions": ea("permissions", Wi)
});
export {
    e as c
};
//# sourceMappingURL=app.js.map