!(function () {
    var e,
        t = {
            38259: function (e, t, n) {
                "use strict";
                var r = n(27378),
                    a = n(31542),
                    o = n(71791),
                    l = n(93694),
                    c = n(24942),
                    i = n(35870),
                    u = n(73450),
                    s = "GET_RECORDS_START",
                    d = "GET_RECORDS_SUCCESS",
                    m = "GET_RECORDS_FAILURE",
                    p = "GET_STAT_START",
                    f = "GET_STAT_SUCCESS",
                    v = "GET_STAT_FAILURE",
                    E = "CLEAR_RECORDS",
                    g = "ADD_EMPTY_MOVIE_RECORD",
                    y = "ADD_EMPTY_TVSERIES_RECORD",
                    h = "UPDATE_RECORD_START",
                    w = "UPDATE_RECORD_SUCCESS",
                    Z = "UPDATE_RECORD_FAILURE",
                    O = "DELETE_RECORD_START",
                    S = "DELETE_RECORD_SUCCESS",
                    b = "DELETE_RECORD_FAILURE",
                    C = "DELETE_EMPTY_RECORD",
                    _ = "POPULATE_MOVIES_AUTOSUGGEST_START",
                    k = "POPULATE_MOVIES_AUTOSUGGEST_SUCCESS",
                    T = "POPULATE_MOVIES_AUTOSUGGEST_FAILURE",
                    N = "POPULATE_TV_AUTOSUGGEST_START",
                    R = "POPULATE_TV_AUTOSUGGEST_SUCCESS",
                    x = "POPULATE_TV_AUTOSUGGEST_FAILURE",
                    A = "ADD_RECORD_START",
                    P = "ADD_RECORD_SUCCESS",
                    I = "ADD_RECORD_FAILURE",
                    D = "ORDER_RECORDS_BY",
                    j = "AUTHENTICATION_CLEAR",
                    L = "AUTHENTICATION_START",
                    U = "AUTHENTICATION_SUCCESS",
                    M = "AUTHENTICATION_FAILURE",
                    F = "GET_USERS_START",
                    V = "GET_USERS_SUCCESS",
                    B = "GET_USERS_FAILURE",
                    Y = "CLEAR_USERS",
                    G = "UPDATE_USER_SUCCESS",
                    H = "UPDATE_USER_FAILURE";
                function K() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                    return {
                        _id: "0",
                        viewdate: null,
                        posterpath: null,
                        title: null,
                        releaseYear: null,
                        originalTitle: null,
                        director: null,
                        rating: null,
                        type: e,
                        isEmptyRecord: !0,
                        userId: null,
                        id: null,
                        backdrop_path: null,
                        genres: null,
                        overview: null,
                        production_countries: null,
                        reViewed: !1,
                        notFinished: !1,
                        position: null,
                    };
                }
                function z(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t &&
                            (r = r.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable;
                            })),
                            n.push.apply(n, r);
                    }
                    return n;
                }
                function W(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2
                            ? z(Object(n), !0).forEach(function (t) {
                                  (0, u.Z)(e, t, n[t]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                            : z(Object(n)).forEach(function (t) {
                                  Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(n, t)
                                  );
                              });
                    }
                    return e;
                }
                var q,
                    J = {data: null, isLoading: !1, error: null},
                    $ = function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : J,
                            t = arguments.length > 1 ? arguments[1] : void 0;
                        switch (t.type) {
                            case j:
                                return J;
                            case L:
                                return {data: null, isLoading: !0, error: null};
                            case U:
                                return {
                                    data: W(
                                        W({}, t.payload),
                                        {},
                                        {
                                            years:
                                                t.payload.years.length > 0
                                                    ? t.payload.years
                                                    : [new Date().getFullYear().toString()],
                                        }
                                    ),
                                    isLoading: !1,
                                    error: null,
                                };
                            case M:
                                return {
                                    data: null,
                                    isLoading: !1,
                                    error: {message: t.payload.message},
                                };
                            case G:
                                return {
                                    data: W(W({}, e.data), t.payload),
                                    isLoading: !1,
                                    error: null,
                                };
                            case H:
                                return {
                                    data: W({}, e.data),
                                    isLoading: !1,
                                    error: {message: t.payload.response.data.message},
                                };
                            default:
                                return e;
                        }
                    },
                    Q = n(98784),
                    X = {data: null, isLoading: !1, error: null},
                    ee = function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : X,
                            t = arguments.length > 1 ? arguments[1] : void 0;
                        switch (t.type) {
                            case Y:
                                return X;
                            case F:
                                return {data: null, isLoading: !0, error: null};
                            case V:
                                return {data: t.payload, isLoading: !1, error: null};
                            case B:
                                return {
                                    data: null,
                                    isLoading: !1,
                                    error: {message: t.payload.response.data.message},
                                };
                            case G:
                                for (
                                    var n = (0, Q.cloneDeep)(e.data), r = n.items, a = 0;
                                    a < r.length;
                                    a++
                                ) {
                                    var o = r[a];
                                    if (o._id === t.payload._id) {
                                        o.favouriteMovies = t.payload.favouriteMovies;
                                        break;
                                    }
                                }
                                return {data: n, isLoading: !1, error: null};
                            default:
                                return e;
                        }
                    },
                    te = n(86250);
                function ne(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t &&
                            (r = r.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable;
                            })),
                            n.push.apply(n, r);
                    }
                    return n;
                }
                function re(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2
                            ? ne(Object(n), !0).forEach(function (t) {
                                  (0, u.Z)(e, t, n[t]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                            : ne(Object(n)).forEach(function (t) {
                                  Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(n, t)
                                  );
                              });
                    }
                    return e;
                }
                !(function (e) {
                    (e.MOVIE = "movie"), (e.TV_SERIES = "tvseries");
                })(q || (q = {}));
                var ae = {data: null, isLoading: !1, error: null},
                    oe = function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ae,
                            t = arguments.length > 1 ? arguments[1] : void 0;
                        switch (t.type) {
                            case g:
                                return re(
                                    re({}, e),
                                    {},
                                    {
                                        data: [re(re({}, K()), {}, {type: q.MOVIE})].concat(
                                            (0, te.Z)(e.data)
                                        ),
                                    }
                                );
                            case y:
                                return re(
                                    re({}, e),
                                    {},
                                    {
                                        data: [re(re({}, K()), {}, {type: q.TV_SERIES})].concat(
                                            (0, te.Z)(e.data)
                                        ),
                                    }
                                );
                            case P:
                                for (
                                    var n = [
                                            re(
                                                re({}, t.payload),
                                                {},
                                                {viewdate: new Date(t.payload.viewdate)}
                                            ),
                                        ],
                                        r = 1;
                                    r < e.data.length;
                                    r++
                                )
                                    n.push(e.data[r]);
                                return {data: n, isLoading: !1, error: null};
                            case I:
                                return {
                                    data: re({}, e.data),
                                    isLoading: !1,
                                    error: {
                                        status: t.payload.response.status,
                                        message: t.payload.response.data.message,
                                    },
                                };
                            case D:
                                return e;
                            case h:
                                return re(re({}, e), {}, {isLoading: !0});
                            case w:
                                var a = e.data
                                    .map(function (e) {
                                        return e._id === t.payload.data._id
                                            ? re(
                                                  re({}, t.payload.data),
                                                  {},
                                                  {viewdate: new Date(t.payload.data.viewdate)}
                                              )
                                            : e;
                                    })
                                    .sort(function (e, t) {
                                        return t.viewdate - e.viewdate;
                                    });
                                return {isLoading: !1, data: a, error: null};
                            case Z:
                                return {error: null, isLoading: !1, data: null};
                            case O:
                                return re(re({}, e), {}, {isLoading: !0});
                            case S:
                                var o = (0, Q.filter)(e.data, function (e) {
                                    return e._id !== t.payload;
                                });
                                return {isLoading: !1, data: o, error: null};
                            case b:
                                return {error: null, isLoading: !1, data: null};
                            case C:
                                return re(
                                    re({}, e),
                                    {},
                                    {
                                        data: (0, Q.filter)(e.data, function (e) {
                                            return "0" !== e._id;
                                        }),
                                    }
                                );
                            case s:
                                return re(re({}, e), {}, {isLoading: !0});
                            case d:
                                var l = (0, Q.map)(t.payload, function (e) {
                                    return re(re({}, e), {}, {viewdate: new Date(e.viewdate)});
                                });
                                return {isLoading: !1, data: l, error: null};
                            case m:
                                return {error: t.payload, isLoading: !1, data: null};
                            case E:
                                return {data: null, isLoading: !1, error: null};
                            default:
                                return e;
                        }
                    },
                    le = [],
                    ce = function () {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : le,
                            t = arguments.length > 1 ? arguments[1] : void 0;
                        switch (t.type) {
                            case _:
                                return e;
                            case k:
                                return t.payload.data.results;
                            case T:
                            case N:
                                return e;
                            case R:
                                return t.payload.data.results;
                            case x:
                                return e;
                            case P:
                                return [];
                            default:
                                return e;
                        }
                    };
                function ie(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t &&
                            (r = r.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable;
                            })),
                            n.push.apply(n, r);
                    }
                    return n;
                }
                function ue(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2
                            ? ie(Object(n), !0).forEach(function (t) {
                                  (0, u.Z)(e, t, n[t]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                            : ie(Object(n)).forEach(function (t) {
                                  Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(n, t)
                                  );
                              });
                    }
                    return e;
                }
                var se = {data: null, isLoading: !1, error: null};
                var de = (0, l.UY)({
                        user: $,
                        users: ee,
                        records: oe,
                        emptyRecordTMDbItems: ce,
                        stat: function () {
                            var e =
                                    arguments.length > 0 && void 0 !== arguments[0]
                                        ? arguments[0]
                                        : se,
                                t = arguments.length > 1 ? arguments[1] : void 0;
                            switch (t.type) {
                                case p:
                                    return ue(ue({}, e), {}, {isLoading: !0});
                                case f:
                                    return {data: t.payload.data, isLoading: !1, error: null};
                                case v:
                                    return {error: null, isLoading: !1, data: null};
                                default:
                                    return e;
                            }
                        },
                    }),
                    me = de,
                    pe = (n(55319), n(58604), n(4289)),
                    fe = n(69635),
                    ve = n(34837),
                    Ee = n(66855),
                    ge = n(29603),
                    ye = function (e) {
                        return r.createElement(
                            "svg",
                            (0, ge.Z)(
                                {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "88",
                                    height: "88",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    className: "feather feather-film",
                                },
                                e
                            ),
                            r.createElement("rect", {
                                x: "2",
                                y: "2",
                                width: "20",
                                height: "20",
                                rx: "2.18",
                                ry: "2.18",
                            }),
                            r.createElement("line", {x1: "7", y1: "2", x2: "7", y2: "22"}),
                            r.createElement("line", {x1: "17", y1: "2", x2: "17", y2: "22"}),
                            r.createElement("line", {x1: "2", y1: "12", x2: "22", y2: "12"}),
                            r.createElement("line", {x1: "2", y1: "7", x2: "7", y2: "7"}),
                            r.createElement("line", {x1: "2", y1: "17", x2: "7", y2: "17"}),
                            r.createElement("line", {x1: "17", y1: "17", x2: "22", y2: "17"}),
                            r.createElement("line", {x1: "17", y1: "7", x2: "22", y2: "7"})
                        );
                    },
                    he = function (e) {
                        return r.createElement(
                            "svg",
                            (0, ge.Z)(
                                {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "88",
                                    height: "88",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    className: "feather feather-star",
                                },
                                e
                            ),
                            r.createElement("polygon", {
                                points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
                            })
                        );
                    },
                    we = function (e) {
                        return r.createElement(
                            "svg",
                            (0, ge.Z)(
                                {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "88",
                                    height: "88",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    className: "feather feather-pie-chart",
                                },
                                e
                            ),
                            r.createElement("path", {d: "M21.21 15.89A10 10 0 1 1 8 2.83"}),
                            r.createElement("path", {d: "M22 12A10 10 0 0 0 12 2v10z"})
                        );
                    },
                    Ze = function () {
                        var e = (0, o.v9)(function (e) {
                                return e;
                            }).user,
                            t = null == e ? void 0 : e.data;
                        return r.createElement(
                            "div",
                            {className: "main"},
                            r.createElement(
                                "div",
                                {className: "main-hero"},
                                r.createElement("div", {className: "appname"}, "tracked"),
                                r.createElement(
                                    "div",
                                    {className: "description"},
                                    "Журнал для учёт просмотренных фильмов и сериалов"
                                ),
                                r.createElement(
                                    "div",
                                    {className: "start-button"},
                                    t
                                        ? r.createElement(
                                              ve.Z,
                                              {
                                                  as: pe.rU,
                                                  to: "/diary/".concat(e.data.userId),
                                                  key: "diary",
                                              },
                                              "Мой журнал"
                                          )
                                        : r.createElement(
                                              ve.Z,
                                              {as: pe.rU, to: "/login", key: "login"},
                                              "Начать"
                                          )
                                )
                            ),
                            r.createElement(
                                "div",
                                {className: "main-items"},
                                r.createElement(
                                    Ee.Z,
                                    {className: "items", columns: 3, textAlign: "center"},
                                    r.createElement(
                                        Ee.Z.Row,
                                        null,
                                        r.createElement(
                                            Ee.Z.Column,
                                            null,
                                            r.createElement(ye, {className: "item-icon"}),
                                            r.createElement(
                                                "div",
                                                {className: "item-title"},
                                                "Фильмы"
                                            ),
                                            r.createElement(
                                                "div",
                                                {className: "item-description"},
                                                "Отмечайте просмотренные фильмы и сериалы."
                                            )
                                        ),
                                        r.createElement(
                                            Ee.Z.Column,
                                            null,
                                            r.createElement(he, {className: "item-icon"}),
                                            r.createElement(
                                                "div",
                                                {className: "item-title"},
                                                "Оценки"
                                            ),
                                            r.createElement(
                                                "div",
                                                {className: "item-description"},
                                                "Ставьте оценки."
                                            )
                                        ),
                                        r.createElement(
                                            Ee.Z.Column,
                                            null,
                                            r.createElement(we, {className: "item-icon"}),
                                            r.createElement(
                                                "div",
                                                {className: "item-title"},
                                                "Статистика"
                                            ),
                                            r.createElement(
                                                "div",
                                                {className: "item-description"},
                                                "Просматривайте статистику ваших просмотров."
                                            )
                                        )
                                    )
                                )
                            )
                        );
                    },
                    Oe = n(41476),
                    Se = n(63697),
                    be = n(57135),
                    Ce = n.n(be),
                    _e = n(14206),
                    ke = n.n(_e),
                    Te = "37662c76ffc19e5cd1b95f37d77155fc",
                    Ne = "https://api.themoviedb.org/3";
                function Re(e) {
                    return ke().get(
                        "".concat(Ne, "/movie/").concat(e, "/credits?api_key=").concat(Te)
                    );
                }
                var xe = "http://image.tmdb.org/t/p/w92",
                    Ae = "TRACKED_USER_DATA",
                    Pe = [q.MOVIE, q.TV_SERIES],
                    Ie = new Date().getFullYear(),
                    De = {sortBy: "-viewdate", year: Ie, types: Pe};
                function je(e) {
                    var t = {userId: e};
                    return ke().get("/api/user/profile", {params: t});
                }
                function Le(e) {
                    return ke().post("/api/record", e);
                }
                function Ue(e, t) {
                    return ke().put("/api/record/".concat(e), t);
                }
                function Me(e) {
                    return ke().put("/api/record/update", e);
                }
                function Fe(e) {
                    return ke().delete("/api/record/".concat(e));
                }
                function Ve(e, t) {
                    var n = {userId: e};
                    return (
                        t.sortBy && (n.sortBy = t.sortBy),
                        t.year && (n.year = t.year),
                        t.types && (n.types = t.types),
                        ke().get("/api/record", {params: n})
                    );
                }
                function Be(e, t) {
                    var n = {userId: e, year: t};
                    return ke().get("/api/stat", {params: n});
                }
                function Ye(e) {
                    var t = e.userId,
                        n = e.limit,
                        r = void 0 === n ? 10 : n,
                        a = e.page,
                        o = {userId: t, limit: r, page: void 0 === a ? 0 : a};
                    return ke().get("/api/user", {params: o});
                }
                function Ge(e) {
                    return ke().put("/api/user/profile", e);
                }
                ke().interceptors.request.use(function (e) {
                    var t = JSON.parse(localStorage.getItem(Ae));
                    return t && (e.headers.Authorization = "Bearer " + t.token), e;
                });
                var He = [
                    "Января",
                    "Февраля",
                    "Марта",
                    "Апреля",
                    "Мая",
                    "Июня",
                    "Июля",
                    "Августа",
                    "Сентября",
                    "Октября",
                    "Ноября",
                    "Декабря",
                ];
                function Ke() {
                    var e = new Date();
                    return e.setHours(0, 0, 0, 0), e;
                }
                function ze(e, t, n) {
                    var r, a;
                    return {
                        userId: e,
                        id: t.id,
                        viewdate: Ke(),
                        posterpath: t.poster_path,
                        title: t.title,
                        releaseYear: t.release_date.substring(0, 4),
                        originalTitle: t.original_title,
                        rating: 0,
                        type: q.MOVIE,
                        backdrop_path: t.backdrop_path,
                        genres: t.genres,
                        overview: t.overview,
                        production_countries: (0, Q.map)(t.production_countries, function (e) {
                            return e.iso_3166_1;
                        }),
                        director: [
                            null === (r = n.crew) ||
                            void 0 === r ||
                            null ===
                                (a = r.find(function (e) {
                                    return "Director" === e.job;
                                })) ||
                            void 0 === a
                                ? void 0
                                : a.name,
                        ],
                        reViewed: !1,
                        notFinished: !1,
                        cast: n.cast,
                        crew: n.crew,
                        position: "0",
                    };
                }
                function We(e, t) {
                    return {
                        userId: e,
                        id: t.id,
                        viewdate: Ke(),
                        posterpath: t.poster_path,
                        title: t.name,
                        releaseYear: t.first_air_date.substring(0, 4),
                        originalTitle: t.original_name,
                        rating: 0,
                        type: q.TV_SERIES,
                        backdrop_path: t.backdrop_path,
                        genres: t.genres,
                        overview: t.overview,
                        production_countries: t.origin_country,
                        director: (0, Q.map)(t.created_by, function (e) {
                            return e.name;
                        }),
                        reViewed: !1,
                        notFinished: !1,
                        season: "1",
                        inProduction: t.in_production,
                        numberOfSeasons: t.number_of_seasons,
                        position: "0",
                    };
                }
                function qe(e) {
                    return function (t) {
                        return (
                            t({type: _}),
                            (function (e) {
                                return ke().get(
                                    ""
                                        .concat(Ne, "/search/movie?api_key=")
                                        .concat(Te, "&language=ru-RU&query=")
                                        .concat(e, "&page=1&include_adult=false")
                                );
                            })(e).then(
                                function (e) {
                                    return t({type: k, payload: e});
                                },
                                function (e) {
                                    return t({type: T, payload: e});
                                }
                            )
                        );
                    };
                }
                function Je(e) {
                    return function (t) {
                        return (
                            t({type: N}),
                            (function (e) {
                                return ke().get(
                                    ""
                                        .concat(Ne, "/search/tv?api_key=")
                                        .concat(Te, "&language=ru-RU&query=")
                                        .concat(e, "&page=1&include_adult=false")
                                );
                            })(e).then(
                                function (e) {
                                    return t({
                                        type: R,
                                        payload: e,
                                        meta: {debounce: {time: 300, leading: !1}},
                                    });
                                },
                                function (e) {
                                    return t({type: x, payload: e});
                                }
                            )
                        );
                    };
                }
                function $e(e, t) {
                    return (function () {
                        var n = (0, Oe.Z)(
                            Ce().mark(function n(r) {
                                var a;
                                return Ce().wrap(
                                    function (n) {
                                        for (;;)
                                            switch ((n.prev = n.next)) {
                                                case 0:
                                                    return (
                                                        r({type: h}),
                                                        (n.prev = 1),
                                                        (n.next = 4),
                                                        Ue(e, t)
                                                    );
                                                case 4:
                                                    return (
                                                        (a = n.sent),
                                                        r({type: w, payload: a}),
                                                        n.abrupt("return", a)
                                                    );
                                                case 9:
                                                    throw (
                                                        ((n.prev = 9),
                                                        (n.t0 = n.catch(1)),
                                                        r({type: Z, payload: n.t0}),
                                                        n.t0)
                                                    );
                                                case 13:
                                                case "end":
                                                    return n.stop();
                                            }
                                    },
                                    n,
                                    null,
                                    [[1, 9]]
                                );
                            })
                        );
                        return function (e) {
                            return n.apply(this, arguments);
                        };
                    })();
                }
                function Qe(e, t) {
                    return (function () {
                        var n = (0, Oe.Z)(
                            Ce().mark(function n(r) {
                                var a, o, l, c, i, u;
                                return Ce().wrap(
                                    function (n) {
                                        for (;;)
                                            switch ((n.prev = n.next)) {
                                                case 0:
                                                    return (
                                                        r({type: s}),
                                                        (n.prev = 1),
                                                        (n.next = 4),
                                                        Ve(e, t)
                                                    );
                                                case 4:
                                                    (a = n.sent),
                                                        r({type: d, payload: a.data}),
                                                        (n.next = 15);
                                                    break;
                                                case 8:
                                                    (n.prev = 8),
                                                        (n.t0 = n.catch(1)),
                                                        (c = n.t0.response),
                                                        (i =
                                                            null !==
                                                                (o =
                                                                    null == c
                                                                        ? void 0
                                                                        : c.data.message) &&
                                                            void 0 !== o
                                                                ? o
                                                                : n.t0.message),
                                                        (u =
                                                            null !==
                                                                (l =
                                                                    null == c
                                                                        ? void 0
                                                                        : c.status) && void 0 !== l
                                                                ? l
                                                                : n.t0.status),
                                                        r({
                                                            type: m,
                                                            payload: {message: i, status: u},
                                                        });
                                                case 15:
                                                case "end":
                                                    return n.stop();
                                            }
                                    },
                                    n,
                                    null,
                                    [[1, 8]]
                                );
                            })
                        );
                        return function (e) {
                            return n.apply(this, arguments);
                        };
                    })();
                }
                function Xe(e) {
                    var t = e.email,
                        n = e.password;
                    return (function () {
                        var e = (0, Oe.Z)(
                            Ce().mark(function e(r) {
                                var a, o, l, c, i, u;
                                return Ce().wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return (
                                                        r({type: L}),
                                                        (e.prev = 1),
                                                        (e.next = 4),
                                                        (s = {email: t, password: n}),
                                                        ke().post("/api/user/login", s)
                                                    );
                                                case 4:
                                                    return (
                                                        (a = e.sent),
                                                        r({type: U, payload: a.data}),
                                                        localStorage.setItem(
                                                            Ae,
                                                            JSON.stringify({
                                                                userId: a.data.userId,
                                                                token: a.data.token,
                                                            })
                                                        ),
                                                        e.abrupt("return", a)
                                                    );
                                                case 10:
                                                    (e.prev = 10),
                                                        (e.t0 = e.catch(1)),
                                                        (c = e.t0.response),
                                                        (i =
                                                            null !==
                                                                (o =
                                                                    null == c
                                                                        ? void 0
                                                                        : c.data.message) &&
                                                            void 0 !== o
                                                                ? o
                                                                : e.t0.message),
                                                        (u =
                                                            null !==
                                                                (l =
                                                                    null == c
                                                                        ? void 0
                                                                        : c.status) && void 0 !== l
                                                                ? l
                                                                : e.t0.status),
                                                        r({
                                                            type: M,
                                                            payload: {message: i, status: u},
                                                        });
                                                case 17:
                                                case "end":
                                                    return e.stop();
                                            }
                                        var s;
                                    },
                                    e,
                                    null,
                                    [[1, 10]]
                                );
                            })
                        );
                        return function (t) {
                            return e.apply(this, arguments);
                        };
                    })();
                }
                function et(e) {
                    var t = e.email,
                        n = e.password,
                        r = e.username;
                    return (function () {
                        var e = (0, Oe.Z)(
                            Ce().mark(function e(a) {
                                var o, l, c, i, u, s;
                                return Ce().wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return (
                                                        a({type: L}),
                                                        (e.prev = 1),
                                                        (e.next = 4),
                                                        (d = {email: t, password: n, username: r}),
                                                        ke().post("/api/user", d)
                                                    );
                                                case 4:
                                                    return (
                                                        (o = e.sent),
                                                        a({type: U, payload: o.data}),
                                                        localStorage.setItem(
                                                            Ae,
                                                            JSON.stringify({
                                                                userId: o.data.userId,
                                                                token: o.data.token,
                                                            })
                                                        ),
                                                        e.abrupt("return", o)
                                                    );
                                                case 10:
                                                    (e.prev = 10),
                                                        (e.t0 = e.catch(1)),
                                                        (i = e.t0.response),
                                                        (u =
                                                            null !==
                                                                (l =
                                                                    null == i
                                                                        ? void 0
                                                                        : i.data.message) &&
                                                            void 0 !== l
                                                                ? l
                                                                : e.t0.message),
                                                        (s =
                                                            null !==
                                                                (c =
                                                                    null == i
                                                                        ? void 0
                                                                        : i.status) && void 0 !== c
                                                                ? c
                                                                : e.t0.status),
                                                        a({
                                                            type: M,
                                                            payload: {message: u, status: s},
                                                        });
                                                case 17:
                                                case "end":
                                                    return e.stop();
                                            }
                                        var d;
                                    },
                                    e,
                                    null,
                                    [[1, 10]]
                                );
                            })
                        );
                        return function (t) {
                            return e.apply(this, arguments);
                        };
                    })();
                }
                function tt(e) {
                    var t = e.userId,
                        n = e.page;
                    return (function () {
                        var e = (0, Oe.Z)(
                            Ce().mark(function e(r) {
                                var a;
                                return Ce().wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return (
                                                        r({type: F}),
                                                        (e.prev = 1),
                                                        (e.next = 4),
                                                        Ye({userId: t, page: n})
                                                    );
                                                case 4:
                                                    return (
                                                        (a = e.sent),
                                                        r({type: V, payload: a.data}),
                                                        e.abrupt("return", a)
                                                    );
                                                case 9:
                                                    throw (
                                                        ((e.prev = 9),
                                                        (e.t0 = e.catch(1)),
                                                        r({type: B, payload: e.t0}),
                                                        e.t0)
                                                    );
                                                case 13:
                                                case "end":
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[1, 9]]
                                );
                            })
                        );
                        return function (t) {
                            return e.apply(this, arguments);
                        };
                    })();
                }
                function nt(e) {
                    return (function () {
                        var t = (0, Oe.Z)(
                            Ce().mark(function t(n) {
                                var r;
                                return Ce().wrap(
                                    function (t) {
                                        for (;;)
                                            switch ((t.prev = t.next)) {
                                                case 0:
                                                    return (
                                                        n({type: "UPDATE_USER_START"}),
                                                        (t.prev = 1),
                                                        (t.next = 4),
                                                        Ge(e)
                                                    );
                                                case 4:
                                                    return (
                                                        (r = t.sent),
                                                        n({type: G, payload: r.data}),
                                                        t.abrupt("return", r)
                                                    );
                                                case 9:
                                                    throw (
                                                        ((t.prev = 9),
                                                        (t.t0 = t.catch(1)),
                                                        n({type: H, payload: t.t0}),
                                                        t.t0)
                                                    );
                                                case 13:
                                                case "end":
                                                    return t.stop();
                                            }
                                    },
                                    t,
                                    null,
                                    [[1, 9]]
                                );
                            })
                        );
                        return function (e) {
                            return t.apply(this, arguments);
                        };
                    })();
                }
                var rt = function (e) {
                        var t = (0, r.useState)(e),
                            n = (0, Se.Z)(t, 2),
                            a = n[0],
                            o = n[1];
                        return [
                            a,
                            function () {
                                return o(!a);
                            },
                        ];
                    },
                    at = n(77891),
                    ot = n(44277),
                    lt = n(21527),
                    ct = n(60059);
                function it(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t &&
                            (r = r.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable;
                            })),
                            n.push.apply(n, r);
                    }
                    return n;
                }
                function ut(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2
                            ? it(Object(n), !0).forEach(function (t) {
                                  (0, u.Z)(e, t, n[t]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                            : it(Object(n)).forEach(function (t) {
                                  Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(n, t)
                                  );
                              });
                    }
                    return e;
                }
                var st = function () {
                        var e,
                            t,
                            n,
                            a,
                            l,
                            c = (0, fe.k6)(),
                            i =
                                null === (e = (0, fe.TH)().state) || void 0 === e
                                    ? void 0
                                    : e.prevLocation,
                            s = (0, r.useState)({email: "", password: "", username: ""}),
                            d = (0, Se.Z)(s, 2),
                            m = d[0],
                            p = d[1],
                            f = rt(!0),
                            v = (0, Se.Z)(f, 2),
                            E = v[0],
                            g = v[1],
                            y = (0, o.I0)(),
                            h = (0, o.v9)(function (e) {
                                return e;
                            }).user;
                        E
                            ? ((t = "Войти в свой аккаунт"),
                              (n = "Войти"),
                              (a = "Нет аккаунта?"),
                              (l = "Регистрация"))
                            : ((t = "Регистрация"),
                              (n = "Создать аккаунт"),
                              (a = "Есть аккаунт?"),
                              (l = "Войти"));
                        var w,
                            Z = function (e) {
                                p(ut(ut({}, m), {}, (0, u.Z)({}, e.target.name, e.target.value)));
                            },
                            O = (function () {
                                var e = (0, Oe.Z)(
                                    Ce().mark(function e() {
                                        return Ce().wrap(function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (e.next = 2), y(E ? Xe(m) : et(m));
                                                    case 2:
                                                        e.sent && c.push(i || "/");
                                                    case 4:
                                                    case "end":
                                                        return e.stop();
                                                }
                                        }, e);
                                    })
                                );
                                return function () {
                                    return e.apply(this, arguments);
                                };
                            })();
                        return r.createElement(
                            Ee.Z,
                            {className: "login", textAlign: "center"},
                            r.createElement(
                                Ee.Z.Column,
                                {style: {maxWidth: 450}},
                                r.createElement(ot.Z, {size: "large"}, t),
                                r.createElement(
                                    lt.Z,
                                    {size: "large"},
                                    r.createElement(
                                        ct.Z,
                                        null,
                                        r.createElement(lt.Z.Input, {
                                            fluid: !0,
                                            icon: "at",
                                            iconPosition: "left",
                                            placeholder: "E-mail",
                                            value: m.email,
                                            name: "email",
                                            onChange: Z,
                                        }),
                                        r.createElement(lt.Z.Input, {
                                            fluid: !0,
                                            icon: "lock",
                                            iconPosition: "left",
                                            placeholder: "Пароль",
                                            type: "password",
                                            value: m.password,
                                            name: "password",
                                            onChange: Z,
                                        }),
                                        !E &&
                                            r.createElement(lt.Z.Input, {
                                                fluid: !0,
                                                icon: "user",
                                                iconPosition: "left",
                                                placeholder: "Имя пользователя",
                                                value: m.username,
                                                name: "username",
                                                onChange: Z,
                                            }),
                                        r.createElement(
                                            ve.Z,
                                            {fluid: !0, size: "large", onClick: O},
                                            n
                                        )
                                    )
                                ),
                                (null == h ? void 0 : h.error) &&
                                    (null != h && h.error
                                        ? r.createElement(at.Z, {
                                              negative: !0,
                                              content: r.createElement(
                                                  "p",
                                                  null,
                                                  null === (w = h.error) || void 0 === w
                                                      ? void 0
                                                      : w.message
                                              ),
                                          })
                                        : null),
                                r.createElement(
                                    at.Z,
                                    null,
                                    a,
                                    " ",
                                    r.createElement(
                                        "a",
                                        {
                                            href: "#",
                                            onClick: function (e) {
                                                e.preventDefault(), g(), y({type: j});
                                            },
                                        },
                                        l
                                    )
                                )
                            )
                        );
                    },
                    dt = n(89172),
                    mt = n(76381),
                    pt = n(92986),
                    ft = function (e) {
                        var t = e.errorMessage;
                        return r.createElement(
                            dt.Z,
                            null,
                            r.createElement(
                                "div",
                                {className: "mt20"},
                                r.createElement(
                                    at.Z,
                                    {negative: !0},
                                    r.createElement(at.Z.Header, null, "Ошибка"),
                                    r.createElement("p", null, t)
                                )
                            )
                        );
                    },
                    vt = n(17556),
                    Et = function () {
                        return r.createElement(
                            "div",
                            {className: "loading-overlay"},
                            r.createElement(vt.Z, {active: !0})
                        );
                    },
                    gt = function (e) {
                        var t = e.isLoading,
                            n = e.errorMessage,
                            a = e.children,
                            l = (0, o.v9)(function (e) {
                                return e;
                            }).user.isLoading;
                        return t || l
                            ? r.createElement(Et, null)
                            : n
                            ? r.createElement(ft, {errorMessage: n})
                            : a();
                    },
                    yt = function () {
                        var e = (0, o.I0)(),
                            t = (0, o.v9)(function (e) {
                                return e;
                            }).users,
                            n = t.data,
                            a = t.isLoading,
                            l = t.error,
                            c = (0, r.useState)(0),
                            i = (0, Se.Z)(c, 2),
                            u = i[0],
                            s = i[1],
                            d = (0, r.useState)(0),
                            m = (0, Se.Z)(d, 2),
                            p = m[0],
                            f = m[1];
                        return (
                            (0, r.useEffect)(
                                function () {
                                    return (
                                        e(tt({page: u})),
                                        function () {
                                            e({type: Y});
                                        }
                                    );
                                },
                                [u]
                            ),
                            (0, r.useEffect)(
                                function () {
                                    n && f(Math.ceil(n.total / n.limit));
                                },
                                [n]
                            ),
                            r.createElement(
                                gt,
                                {isLoading: a, errorMessage: null == l ? void 0 : l.message},
                                function () {
                                    return r.createElement(
                                        dt.Z,
                                        {className: "users"},
                                        r.createElement(
                                            ot.Z,
                                            {as: "h2", size: "large"},
                                            "Пользователи"
                                        ),
                                        r.createElement(
                                            mt.Z,
                                            {singleLine: !0},
                                            r.createElement(
                                                mt.Z.Header,
                                                null,
                                                r.createElement(
                                                    mt.Z.Row,
                                                    null,
                                                    r.createElement(
                                                        mt.Z.HeaderCell,
                                                        null,
                                                        "Пользователь"
                                                    )
                                                )
                                            ),
                                            r.createElement(
                                                mt.Z.Body,
                                                null,
                                                null == n
                                                    ? void 0
                                                    : n.items.map(function (e) {
                                                          return r.createElement(
                                                              mt.Z.Row,
                                                              {key: e._id},
                                                              r.createElement(
                                                                  mt.Z.Cell,
                                                                  null,
                                                                  r.createElement(
                                                                      pe.rU,
                                                                      {
                                                                          to: "/profile/".concat(
                                                                              e._id
                                                                          ),
                                                                          key: "profile",
                                                                      },
                                                                      e.username
                                                                  )
                                                              )
                                                          );
                                                      })
                                            )
                                        ),
                                        r.createElement(pt.Z, {
                                            defaultActivePage: u + 1,
                                            totalPages: p,
                                            onPageChange: function (e, t) {
                                                s(Number(t.activePage) - 1);
                                            },
                                        })
                                    );
                                }
                            )
                        );
                    },
                    ht = n(93669),
                    wt = n(74083),
                    Zt = function (e) {
                        var t = e.selectedYear,
                            n = e.onSelect,
                            a = (function (e) {
                                for (
                                    var t = e
                                            ? [{key: "total", value: 0, text: "За всё время"}]
                                            : [],
                                        n = Ie;
                                    n >= 2010;
                                    n--
                                )
                                    t.push({key: n.toString(), value: n, text: n.toString()});
                                return t;
                            })(e.showAllOption),
                            o =
                                a.find(function (e) {
                                    return e.value === t;
                                }) || a[0];
                        return r.createElement(wt.Z, {
                            inline: !0,
                            options: a,
                            value: o.value,
                            onChange: n,
                        });
                    },
                    Ot = n(88611),
                    St = n.n(Ot),
                    bt = function (e) {
                        var t,
                            n = e.searchAction,
                            a = e.onSuggestionSelected,
                            l = e.titlePropName,
                            c = e.releasePropName,
                            i = e.placeholder,
                            u = (0, o.I0)(),
                            s = (0, o.v9)(function (e) {
                                return e.emptyRecordTMDbItems;
                            }),
                            d =
                                null ===
                                    (t = (0, o.v9)(function (e) {
                                        return e.user;
                                    }).data) || void 0 === t
                                    ? void 0
                                    : t.userId,
                            m = (0, r.useState)(""),
                            p = (0, Se.Z)(m, 2),
                            f = p[0],
                            v = p[1],
                            E = {
                                placeholder: i,
                                value: f,
                                onChange: function (e, t) {
                                    if ("type" === t.method) {
                                        var r = e.target.value;
                                        v(r), r.length > 2 && u(n(r));
                                    }
                                },
                                autoFocus: !0,
                            };
                        return r.createElement(St(), {
                            onSuggestionsFetchRequested: Q.noop,
                            onSuggestionsClearRequested: Q.noop,
                            onSuggestionSelected: function (e, t) {
                                var n = t.suggestion;
                                v(n[l]), a(n, d);
                            },
                            suggestions: s,
                            getSuggestionValue: function (e) {
                                return e[l];
                            },
                            renderSuggestion: function (e) {
                                var t,
                                    n = e[c]
                                        ? "(".concat(
                                              null === (t = e[c]) || void 0 === t
                                                  ? void 0
                                                  : t.substring(0, 4),
                                              ")"
                                          )
                                        : "";
                                return r.createElement(
                                    "div",
                                    {className: "suggestion-item", id: e.id.toString()},
                                    e[l] + " " + n
                                );
                            },
                            inputProps: E,
                            multiSection: null,
                        });
                    },
                    Ct = n(96546),
                    _t = n(2523),
                    kt = n(42627),
                    Tt = n(10448),
                    Nt = function (e) {
                        var t = e.header,
                            n = e.text,
                            a = e.onClose,
                            o = e.onNegative,
                            l = e.onPositive;
                        return r.createElement(
                            Tt.Z,
                            {size: "mini", open: !0, onClose: a},
                            r.createElement(Tt.Z.Header, null, t),
                            r.createElement(Tt.Z.Content, null, r.createElement("p", null, n)),
                            r.createElement(
                                Tt.Z.Actions,
                                null,
                                r.createElement(ve.Z, {negative: !0, onClick: o}, "Нет"),
                                r.createElement(
                                    ve.Z,
                                    {
                                        positive: !0,
                                        onClick: function () {
                                            l(), a();
                                        },
                                    },
                                    "Да"
                                )
                            )
                        );
                    },
                    Rt = n(22648),
                    xt = n.n(Rt),
                    At = n(49593),
                    Pt = function (e, t) {
                        var n = (0, r.useState)(e),
                            a = (0, Se.Z)(n, 2),
                            o = a[0],
                            l = a[1];
                        return [
                            o,
                            function (e) {
                                l(e), t(e);
                            },
                        ];
                    },
                    It = function (e) {
                        return r.createElement(
                            "svg",
                            (0, ge.Z)(
                                {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "24",
                                    height: "24",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    className: "feather feather-x feather-icon",
                                },
                                e
                            ),
                            r.createElement("line", {x1: "18", y1: "6", x2: "6", y2: "18"}),
                            r.createElement("line", {x1: "6", y1: "6", x2: "18", y2: "18"})
                        );
                    },
                    Dt = (n(1993), n(55957)),
                    jt = function (e) {
                        var t,
                            n = e._id,
                            a = e.viewdate,
                            l = e.posterpath,
                            c = e.title,
                            i = e.releaseYear,
                            u = e.originalTitle,
                            s = e.director,
                            d = e.genres,
                            m = e.rating,
                            p = e.type,
                            f = e.production_countries,
                            v = e.season,
                            E = e.position,
                            g = e.isReadOnly,
                            y = "0" === n,
                            h = p === q.MOVIE,
                            w = !h,
                            Z = (0, o.I0)(),
                            _ = rt(!1),
                            k = (0, Se.Z)(_, 2),
                            T = k[0],
                            N = k[1],
                            R = rt(!1),
                            x = (0, Se.Z)(R, 2),
                            D = x[0],
                            j = x[1],
                            L = rt(!1),
                            U = (0, Se.Z)(L, 2),
                            M = U[0],
                            F = U[1],
                            V = rt(!1),
                            B = (0, Se.Z)(V, 2),
                            Y = B[0],
                            G = B[1],
                            H = Pt(a, function (e) {
                                return Z($e(n, {viewdate: e}));
                            }),
                            K = (0, Se.Z)(H, 2),
                            z = K[0],
                            W = K[1],
                            J = Pt(m, function (e) {
                                return Z($e(n, {rating: e}));
                            }),
                            $ = (0, Se.Z)(J, 2),
                            Q = $[0],
                            X = $[1],
                            ee = Pt(v, function (e) {
                                return Z($e(n, {season: e}));
                            }),
                            te = (0, Se.Z)(ee, 2),
                            ne = te[0],
                            re = te[1],
                            ae = function () {
                                return Z({type: C});
                            };
                        return r.createElement(
                            r.Fragment,
                            null,
                            r.createElement(
                                ct.Z,
                                {className: "record ".concat(h ? "blue-bg" : "violet-bg"), id: n},
                                r.createElement(
                                    Ee.Z,
                                    {verticalAlign: "middle"},
                                    r.createElement(
                                        Ee.Z.Column,
                                        {
                                            width: 2,
                                            textAlign: "center",
                                            className: "column-viewdate",
                                        },
                                        (function () {
                                            if (y) return null;
                                            if (D) {
                                                var e = function (e) {
                                                    var t = e.value,
                                                        n = e.onClick,
                                                        a = e.onChange,
                                                        o = e.onBlur;
                                                    return r.createElement(ht.Z, {
                                                        className: "datepicker-input",
                                                        value: t,
                                                        onClick: n,
                                                        onChange: a,
                                                        onBlur: o,
                                                    });
                                                };
                                                return r.createElement(xt(), {
                                                    dateFormat: "d MMMM",
                                                    locale: At.Z,
                                                    selected: z,
                                                    onChange: function (e) {
                                                        g || (W(e), j());
                                                    },
                                                    customInput: r.createElement(e),
                                                    onBlur: j,
                                                });
                                            }
                                            return r.createElement(
                                                "span",
                                                {
                                                    title: "Нажите дважды, чтобы изменить",
                                                    onClick: j,
                                                },
                                                ((n = He[(t = a).getMonth()]),
                                                (o = String(t.getDate())
                                                    .padStart(2, "0")
                                                    .replace(/^0+/, "")),
                                                "".concat(o, " ").concat(n))
                                            );
                                            var t, n, o;
                                        })()
                                    ),
                                    r.createElement(
                                        Ee.Z.Column,
                                        {width: 2, textAlign: "center"},
                                        y
                                            ? null
                                            : r.createElement(Ct.Z, {
                                                  src: "".concat(xe, "/").concat(l),
                                                  size: "tiny",
                                              })
                                    ),
                                    r.createElement(
                                        Ee.Z.Column,
                                        {width: 8, className: "column-title"},
                                        (function () {
                                            if (y) {
                                                var e = h
                                                    ? {
                                                          searchAction: (0, Dt.Z)(qe, 300, {
                                                              leading: !1,
                                                          }),
                                                          onSuggestionSelected: function (e, t) {
                                                              return Z(
                                                                  (function (e, t) {
                                                                      return (function () {
                                                                          var n = (0, Oe.Z)(
                                                                              Ce().mark(function n(
                                                                                  r
                                                                              ) {
                                                                                  var a,
                                                                                      o,
                                                                                      l,
                                                                                      c,
                                                                                      i,
                                                                                      u;
                                                                                  return Ce().wrap(
                                                                                      function (n) {
                                                                                          for (;;)
                                                                                              switch (
                                                                                                  (n.prev =
                                                                                                      n.next)
                                                                                              ) {
                                                                                                  case 0:
                                                                                                      return (
                                                                                                          r(
                                                                                                              {
                                                                                                                  type: A,
                                                                                                              }
                                                                                                          ),
                                                                                                          (n.prev = 1),
                                                                                                          (n.next = 4),
                                                                                                          Promise.all(
                                                                                                              [
                                                                                                                  ((s =
                                                                                                                      e),
                                                                                                                  ke().get(
                                                                                                                      ""
                                                                                                                          .concat(
                                                                                                                              Ne,
                                                                                                                              "/movie/"
                                                                                                                          )
                                                                                                                          .concat(
                                                                                                                              s,
                                                                                                                              "?api_key="
                                                                                                                          )
                                                                                                                          .concat(
                                                                                                                              Te,
                                                                                                                              "&language=ru-RU"
                                                                                                                          )
                                                                                                                  )),
                                                                                                                  Re(
                                                                                                                      e
                                                                                                                  ),
                                                                                                              ]
                                                                                                          )
                                                                                                      );
                                                                                                  case 4:
                                                                                                      return (
                                                                                                          (a =
                                                                                                              n.sent),
                                                                                                          (o =
                                                                                                              (0,
                                                                                                              Se.Z)(
                                                                                                                  a,
                                                                                                                  2
                                                                                                              )),
                                                                                                          (l =
                                                                                                              o[0]),
                                                                                                          (c =
                                                                                                              o[1]),
                                                                                                          (i =
                                                                                                              ze(
                                                                                                                  t,
                                                                                                                  l.data,
                                                                                                                  c.data
                                                                                                              )),
                                                                                                          (n.next = 11),
                                                                                                          Le(
                                                                                                              i
                                                                                                          )
                                                                                                      );
                                                                                                  case 11:
                                                                                                      (u =
                                                                                                          n.sent),
                                                                                                          r(
                                                                                                              {
                                                                                                                  type: P,
                                                                                                                  payload:
                                                                                                                      u.data,
                                                                                                              }
                                                                                                          ),
                                                                                                          (n.next = 19);
                                                                                                      break;
                                                                                                  case 15:
                                                                                                      throw (
                                                                                                          ((n.prev = 15),
                                                                                                          (n.t0 =
                                                                                                              n.catch(
                                                                                                                  1
                                                                                                              )),
                                                                                                          r(
                                                                                                              {
                                                                                                                  type: I,
                                                                                                                  payload:
                                                                                                                      n.t0,
                                                                                                              }
                                                                                                          ),
                                                                                                          n.t0)
                                                                                                      );
                                                                                                  case 19:
                                                                                                  case "end":
                                                                                                      return n.stop();
                                                                                              }
                                                                                          var s;
                                                                                      },
                                                                                      n,
                                                                                      null,
                                                                                      [[1, 15]]
                                                                                  );
                                                                              })
                                                                          );
                                                                          return function (e) {
                                                                              return n.apply(
                                                                                  this,
                                                                                  arguments
                                                                              );
                                                                          };
                                                                      })();
                                                                  })(e.id, t)
                                                              );
                                                          },
                                                          titlePropName: "title",
                                                          releasePropName: "release_date",
                                                          placeholder: "Найти фильм...",
                                                      }
                                                    : {
                                                          searchAction: (0, Dt.Z)(Je, 300, {
                                                              leading: !1,
                                                          }),
                                                          onSuggestionSelected: function (e, t) {
                                                              return Z(
                                                                  (function (e, t) {
                                                                      return (function () {
                                                                          var n = (0, Oe.Z)(
                                                                              Ce().mark(function n(
                                                                                  r
                                                                              ) {
                                                                                  var a, o, l;
                                                                                  return Ce().wrap(
                                                                                      function (n) {
                                                                                          for (;;)
                                                                                              switch (
                                                                                                  (n.prev =
                                                                                                      n.next)
                                                                                              ) {
                                                                                                  case 0:
                                                                                                      return (
                                                                                                          r(
                                                                                                              {
                                                                                                                  type: A,
                                                                                                              }
                                                                                                          ),
                                                                                                          (n.prev = 1),
                                                                                                          (n.next = 4),
                                                                                                          (c =
                                                                                                              e),
                                                                                                          ke().get(
                                                                                                              ""
                                                                                                                  .concat(
                                                                                                                      Ne,
                                                                                                                      "/tv/"
                                                                                                                  )
                                                                                                                  .concat(
                                                                                                                      c,
                                                                                                                      "?api_key="
                                                                                                                  )
                                                                                                                  .concat(
                                                                                                                      Te,
                                                                                                                      "&language=ru-RU"
                                                                                                                  )
                                                                                                          )
                                                                                                      );
                                                                                                  case 4:
                                                                                                      return (
                                                                                                          (a =
                                                                                                              n.sent),
                                                                                                          (o =
                                                                                                              We(
                                                                                                                  t,
                                                                                                                  a.data
                                                                                                              )),
                                                                                                          (n.next = 8),
                                                                                                          Le(
                                                                                                              o
                                                                                                          )
                                                                                                      );
                                                                                                  case 8:
                                                                                                      (l =
                                                                                                          n.sent),
                                                                                                          r(
                                                                                                              {
                                                                                                                  type: P,
                                                                                                                  payload:
                                                                                                                      l.data,
                                                                                                              }
                                                                                                          ),
                                                                                                          (n.next = 16);
                                                                                                      break;
                                                                                                  case 12:
                                                                                                      throw (
                                                                                                          ((n.prev = 12),
                                                                                                          (n.t0 =
                                                                                                              n.catch(
                                                                                                                  1
                                                                                                              )),
                                                                                                          r(
                                                                                                              {
                                                                                                                  type: I,
                                                                                                                  payload:
                                                                                                                      n.t0,
                                                                                                              }
                                                                                                          ),
                                                                                                          n.t0)
                                                                                                      );
                                                                                                  case 16:
                                                                                                  case "end":
                                                                                                      return n.stop();
                                                                                              }
                                                                                          var c;
                                                                                      },
                                                                                      n,
                                                                                      null,
                                                                                      [[1, 12]]
                                                                                  );
                                                                              })
                                                                          );
                                                                          return function (e) {
                                                                              return n.apply(
                                                                                  this,
                                                                                  arguments
                                                                              );
                                                                          };
                                                                      })();
                                                                  })(e.id, t)
                                                              );
                                                          },
                                                          titlePropName: "name",
                                                          releasePropName: "first_air_date",
                                                          placeholder: "Найти сериал...",
                                                      };
                                                return r.createElement(bt, e);
                                            }
                                            return r.createElement(
                                                r.Fragment,
                                                null,
                                                r.createElement(
                                                    "div",
                                                    {className: "title"},
                                                    "".concat(c, " (").concat(i, ")"),
                                                    w
                                                        ? !g && Y
                                                            ? r.createElement(ht.Z, {
                                                                  className:
                                                                      "edit-mode-season-info",
                                                                  value: ne,
                                                                  autoFocus: !0,
                                                                  onChange: function (e) {
                                                                      return re(e.target.value);
                                                                  },
                                                                  onFocus: function (e) {
                                                                      return e.currentTarget.select();
                                                                  },
                                                                  onBlur: G,
                                                                  size: "mini",
                                                              })
                                                            : r.createElement(
                                                                  "span",
                                                                  {onClick: G},
                                                                  ", " + v + " сезон"
                                                              )
                                                        : null
                                                ),
                                                r.createElement(
                                                    "div",
                                                    {className: "additional-info"},
                                                    r.createElement(
                                                        "span",
                                                        null,
                                                        u,
                                                        " ",
                                                        r.createElement(
                                                            "span",
                                                            {className: "director"},
                                                            "".concat(h ? "реж." : "создатели"),
                                                            " ",
                                                            s.join(", ")
                                                        )
                                                    )
                                                ),
                                                r.createElement(
                                                    "div",
                                                    {className: "genre"},
                                                    d
                                                        .map(function (e) {
                                                            return e.name;
                                                        })
                                                        .join(", ")
                                                )
                                            );
                                        })()
                                    ),
                                    r.createElement(
                                        Ee.Z.Column,
                                        {width: 2, textAlign: "center"},
                                        y
                                            ? null
                                            : f.map(function (e) {
                                                  return r.createElement(_t.Z, {key: e, name: e});
                                              })
                                    ),
                                    r.createElement(
                                        Ee.Z.Column,
                                        {width: 2, textAlign: "center"},
                                        M
                                            ? r.createElement(ht.Z, {
                                                  className: "edit-mode-rating",
                                                  value: Q,
                                                  autoFocus: !0,
                                                  onChange: function (e) {
                                                      var t = +e.target.value;
                                                      if (isNaN(t) || t < 1 || t > 10) return null;
                                                      g || X(t);
                                                  },
                                                  onFocus: function (e) {
                                                      return e.currentTarget.select();
                                                  },
                                                  onBlur: F,
                                              })
                                            : r.createElement(
                                                  "span",
                                                  {
                                                      title: "Нажите, чтобы изменить",
                                                      className: "rating ".concat(
                                                          0 === m ? "red" : ""
                                                      ),
                                                      onClick: F,
                                                  },
                                                  m
                                              )
                                    )
                                ),
                                !g &&
                                    ((t = []).push(
                                        r.createElement(It, {
                                            key: "icon",
                                            title: "удалить запись",
                                            onClick: y ? ae : N,
                                        })
                                    ),
                                    r.createElement("span", {className: "icons-panel"}, t)),
                                g &&
                                    r.createElement(
                                        kt.Z,
                                        {circular: !0, className: "position", color: "orange"},
                                        E
                                    )
                            ),
                            T &&
                                r.createElement(Nt, {
                                    header: "Удаление записи",
                                    text: "Вы уверены, что хотите удалить запись?",
                                    onClose: N,
                                    onNegative: N,
                                    onPositive: function () {
                                        return Z(
                                            ((e = n),
                                            (function () {
                                                var t = (0, Oe.Z)(
                                                    Ce().mark(function t(n) {
                                                        return Ce().wrap(
                                                            function (t) {
                                                                for (;;)
                                                                    switch ((t.prev = t.next)) {
                                                                        case 0:
                                                                            return (
                                                                                n({type: O}),
                                                                                (t.prev = 1),
                                                                                (t.next = 4),
                                                                                Fe(e)
                                                                            );
                                                                        case 4:
                                                                            n({
                                                                                type: S,
                                                                                payload: e,
                                                                            }),
                                                                                (t.next = 11);
                                                                            break;
                                                                        case 7:
                                                                            throw (
                                                                                ((t.prev = 7),
                                                                                (t.t0 = t.catch(1)),
                                                                                n({
                                                                                    type: b,
                                                                                    payload: t.t0,
                                                                                }),
                                                                                t.t0)
                                                                            );
                                                                        case 11:
                                                                        case "end":
                                                                            return t.stop();
                                                                    }
                                                            },
                                                            t,
                                                            null,
                                                            [[1, 7]]
                                                        );
                                                    })
                                                );
                                                return function (e) {
                                                    return t.apply(this, arguments);
                                                };
                                            })())
                                        );
                                        var e;
                                    },
                                })
                        );
                    };
                function Lt(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t &&
                            (r = r.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable;
                            })),
                            n.push.apply(n, r);
                    }
                    return n;
                }
                function Ut(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2
                            ? Lt(Object(n), !0).forEach(function (t) {
                                  (0, u.Z)(e, t, n[t]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                            : Lt(Object(n)).forEach(function (t) {
                                  Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(n, t)
                                  );
                              });
                    }
                    return e;
                }
                function Mt(e, t) {
                    return parseInt(e.position) < parseInt(t.position)
                        ? -1
                        : parseInt(e.position) > parseInt(t.position)
                        ? 1
                        : 0;
                }
                var Ft = function (e, t) {
                        var n = t ? q.MOVIE : q.TV_SERIES;
                        return e.filter(function (e) {
                            return e.type === n;
                        });
                    },
                    Vt = function (e) {
                        var t = e.match,
                            n = (0, o.I0)(),
                            a = t.params.id,
                            l = (0, o.v9)(function (e) {
                                return e;
                            }),
                            c = l.records,
                            i = c.data,
                            u = c.isLoading,
                            p = c.error,
                            f = l.user.data,
                            v = (0, r.useState)(!0),
                            g = (0, Se.Z)(v, 2),
                            y = g[0],
                            h = g[1],
                            w = (0, r.useState)(null),
                            Z = (0, Se.Z)(w, 2),
                            O = Z[0],
                            S = Z[1],
                            b = (0, r.useState)(!1),
                            C = (0, Se.Z)(b, 2),
                            _ = C[0],
                            k = C[1],
                            T = (0, r.useState)(Ie),
                            N = (0, Se.Z)(T, 2),
                            R = N[0],
                            x = N[1],
                            A = (0, Q.isEmpty)(O),
                            P =
                                !A &&
                                (null == i
                                    ? void 0
                                    : i.some(function (e) {
                                          return (
                                              e.position && e.type === (y ? q.MOVIE : q.TV_SERIES)
                                          );
                                      }));
                        (0, r.useEffect)(
                            function () {
                                var e = Ut(Ut({}, De), {}, {year: R});
                                return (
                                    n(Qe(a, e)),
                                    function () {
                                        n({type: E});
                                    }
                                );
                            },
                            [n, a, R]
                        ),
                            (0, r.useEffect)(
                                function () {
                                    S(i);
                                },
                                [i]
                            );
                        var I = function (e) {
                                var t = e.currentTarget.closest("tr").dataset.id,
                                    n = O.find(function (e) {
                                        return e._id === t;
                                    });
                                n.isSelected = !n.isSelected;
                                var r = O.map(function (e) {
                                    return e._id === t ? n : e;
                                });
                                S(r);
                            },
                            D = function (e) {
                                e.preventDefault();
                                for (
                                    var t = [],
                                        r = e.currentTarget
                                            .closest(".results")
                                            .getElementsByClassName("position"),
                                        a = {},
                                        o = 0;
                                    o < r.length;
                                    o++
                                ) {
                                    var l = r[o].getElementsByTagName("input")[0].value,
                                        c = r[o];
                                    a[c.dataset.id] = l;
                                }
                                Ft(i, y).forEach(function (e) {
                                    var n = e._id;
                                    e.position !== a[n] &&
                                        t.push({
                                            _id: n,
                                            position: a[n],
                                            viewdate: new Date(new Date().setFullYear(R)),
                                            userId: f.userId,
                                        });
                                }),
                                    _ && k(!1),
                                    n(
                                        (function (e) {
                                            return (function () {
                                                var t = (0, Oe.Z)(
                                                    Ce().mark(function t(n) {
                                                        var r;
                                                        return Ce().wrap(
                                                            function (t) {
                                                                for (;;)
                                                                    switch ((t.prev = t.next)) {
                                                                        case 0:
                                                                            return (
                                                                                n({type: s}),
                                                                                (t.prev = 1),
                                                                                (t.next = 4),
                                                                                Me(e)
                                                                            );
                                                                        case 4:
                                                                            return (
                                                                                (r = t.sent),
                                                                                n({
                                                                                    type: d,
                                                                                    payload: r.data,
                                                                                }),
                                                                                t.abrupt(
                                                                                    "return",
                                                                                    r
                                                                                )
                                                                            );
                                                                        case 9:
                                                                            throw (
                                                                                ((t.prev = 9),
                                                                                (t.t0 = t.catch(1)),
                                                                                n({
                                                                                    type: m,
                                                                                    payload: t.t0,
                                                                                }),
                                                                                t.t0)
                                                                            );
                                                                        case 13:
                                                                        case "end":
                                                                            return t.stop();
                                                                    }
                                                            },
                                                            t,
                                                            null,
                                                            [[1, 9]]
                                                        );
                                                    })
                                                );
                                                return function (e) {
                                                    return t.apply(this, arguments);
                                                };
                                            })();
                                        })(t)
                                    );
                            },
                            j = function () {
                                k(!0);
                            };
                        return r.createElement(
                            gt,
                            {isLoading: u, errorMessage: null == p ? void 0 : p.message},
                            function () {
                                return r.createElement(
                                    dt.Z,
                                    {className: "results"},
                                    r.createElement(ot.Z, {as: "h2", size: "large"}, "Итоги"),
                                    r.createElement(Zt, {
                                        selectedYear: R,
                                        onSelect: function (e, t) {
                                            return x(t.value);
                                        },
                                    }),
                                    "   ",
                                    r.createElement(
                                        "span",
                                        {
                                            className: "record-filter ".concat(
                                                y ? "" : "not-selected"
                                            ),
                                            onClick: function () {
                                                return h(!0);
                                            },
                                            title: "Показать фильмы",
                                        },
                                        "Фильмы"
                                    ),
                                    "   ",
                                    r.createElement(
                                        "span",
                                        {
                                            className: "record-filter ".concat(
                                                y ? "not-selected" : ""
                                            ),
                                            onClick: function () {
                                                return h(!1);
                                            },
                                            title: "Показать сериалы",
                                        },
                                        "Сериалы"
                                    ),
                                    "   ",
                                    P && !_
                                        ? r.createElement(
                                              r.Fragment,
                                              null,
                                              Ft(i, y)
                                                  .filter(function (e) {
                                                      return e.position;
                                                  })
                                                  .sort(Mt)
                                                  .map(function (e) {
                                                      return r.createElement(
                                                          jt,
                                                          (0, ge.Z)({isReadOnly: !0, key: e._id}, e)
                                                      );
                                                  }),
                                              r.createElement(
                                                  "a",
                                                  {href: "#", onClick: j},
                                                  "Редактировать"
                                              )
                                          )
                                        : A
                                        ? r.createElement(
                                              r.Fragment,
                                              null,
                                              r.createElement(
                                                  at.Z,
                                                  {info: !0},
                                                  r.createElement(
                                                      "p",
                                                      null,
                                                      "В вашем журнале нет ни одной записи за текущий год."
                                                  )
                                              ),
                                              r.createElement(
                                                  pe.rU,
                                                  {to: "/diary/".concat(f.userId), key: "diary"},
                                                  "Перейти к журналу"
                                              )
                                          )
                                        : r.createElement(
                                              r.Fragment,
                                              null,
                                              r.createElement(
                                                  at.Z,
                                                  {info: !0},
                                                  r.createElement(
                                                      "p",
                                                      null,
                                                      'Расcтавьте позиции в таблице ниже и нажмите кнопку "Сохранить"'
                                                  )
                                              ),
                                              !(0, Q.isEmpty)(O) &&
                                                  r.createElement(
                                                      mt.Z,
                                                      {className: "results-table", celled: !0},
                                                      r.createElement(
                                                          mt.Z.Header,
                                                          null,
                                                          r.createElement(
                                                              mt.Z.Row,
                                                              null,
                                                              r.createElement(
                                                                  mt.Z.HeaderCell,
                                                                  null,
                                                                  "Позиция"
                                                              ),
                                                              r.createElement(
                                                                  mt.Z.HeaderCell,
                                                                  null,
                                                                  "Наименование"
                                                              ),
                                                              r.createElement(
                                                                  mt.Z.HeaderCell,
                                                                  null,
                                                                  "Оценка"
                                                              )
                                                          )
                                                      ),
                                                      r.createElement(
                                                          mt.Z.Body,
                                                          null,
                                                          Ft(O, y).map(function (e) {
                                                              return r.createElement(
                                                                  mt.Z.Row,
                                                                  {
                                                                      "data-id": e._id,
                                                                      key: e._id,
                                                                      onClick: I,
                                                                      className: "".concat(
                                                                          e.isSelected
                                                                              ? "selected"
                                                                              : ""
                                                                      ),
                                                                  },
                                                                  r.createElement(
                                                                      mt.Z.Cell,
                                                                      {collapsing: !0},
                                                                      r.createElement(ht.Z, {
                                                                          "data-id": e._id,
                                                                          className: "position",
                                                                          maxLength: "2",
                                                                          onClick: function (e) {
                                                                              return e.stopPropagation();
                                                                          },
                                                                          onChange: function (t) {
                                                                              k(!0);
                                                                              var n = (0, te.Z)(O),
                                                                                  r = n.findIndex(
                                                                                      function (t) {
                                                                                          return (
                                                                                              t._id ===
                                                                                              e._id
                                                                                          );
                                                                                      }
                                                                                  ),
                                                                                  a = Ut(
                                                                                      Ut(
                                                                                          {},
                                                                                          n.find(
                                                                                              function (
                                                                                                  t
                                                                                              ) {
                                                                                                  return (
                                                                                                      t._id ===
                                                                                                      e._id
                                                                                                  );
                                                                                              }
                                                                                          )
                                                                                      ),
                                                                                      {},
                                                                                      {
                                                                                          position:
                                                                                              t
                                                                                                  .target
                                                                                                  .value,
                                                                                      }
                                                                                  );
                                                                              (n[r] = a), S(n);
                                                                          },
                                                                          value: e.position,
                                                                      })
                                                                  ),
                                                                  r.createElement(
                                                                      mt.Z.Cell,
                                                                      null,
                                                                      e.title
                                                                  ),
                                                                  r.createElement(
                                                                      mt.Z.Cell,
                                                                      {
                                                                          className:
                                                                              0 === e.rating
                                                                                  ? "red"
                                                                                  : "",
                                                                      },
                                                                      e.rating
                                                                  )
                                                              );
                                                          })
                                                      )
                                                  ),
                                              r.createElement(
                                                  "a",
                                                  {href: "#", onClick: D},
                                                  "Сохранить"
                                              )
                                          )
                                );
                            }
                        );
                    };
                function Bt(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t &&
                            (r = r.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable;
                            })),
                            n.push.apply(n, r);
                    }
                    return n;
                }
                function Yt(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2
                            ? Bt(Object(n), !0).forEach(function (t) {
                                  (0, u.Z)(e, t, n[t]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                            : Bt(Object(n)).forEach(function (t) {
                                  Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(n, t)
                                  );
                              });
                    }
                    return e;
                }
                var Gt = function (e) {
                        var t = e.match,
                            n = (0, o.I0)(),
                            a = t.params.id,
                            l = (0, o.v9)(function (e) {
                                return e;
                            }),
                            c = l.records,
                            i = c.data,
                            u = c.error,
                            s = l.user.data,
                            d = (0, r.useState)(!0),
                            m = (0, Se.Z)(d, 2),
                            p = m[0],
                            f = m[1],
                            v = (0, r.useState)(!0),
                            h = (0, Se.Z)(v, 2),
                            w = h[0],
                            Z = h[1],
                            O = (0, r.useState)(De),
                            S = (0, Se.Z)(O, 2),
                            b = S[0],
                            C = S[1],
                            _ = (0, Q.some)(i, function (e) {
                                return e.isEmptyRecord;
                            }),
                            k = (0, Q.filter)(i, function (e) {
                                var t = e.type;
                                return !e.isEmptyRecord && t === q.MOVIE;
                            }).length,
                            T = (0, Q.filter)(i, function (e) {
                                var t = e.type;
                                return !e.isEmptyRecord && t === q.TV_SERIES;
                            }).length;
                        (0, r.useEffect)(
                            function () {
                                return (
                                    n(Qe(a, b)),
                                    function () {
                                        n({type: E});
                                    }
                                );
                            },
                            [n, a, b]
                        );
                        var N = (0, Q.filter)(i, function (e) {
                            return !(!p || e.type !== q.MOVIE) || !(!w || e.type !== q.TV_SERIES);
                        });
                        return r.createElement(
                            gt,
                            {
                                isLoading: (0, Q.isNull)(i),
                                errorMessage: null == u ? void 0 : u.message,
                            },
                            function () {
                                return r.createElement(
                                    dt.Z,
                                    {className: "diary"},
                                    r.createElement(
                                        ot.Z,
                                        {as: "h2", size: "large"},
                                        "Журнал пользователя"
                                    ),
                                    r.createElement(
                                        Ee.Z,
                                        {columns: "2", verticalAlign: "middle"},
                                        r.createElement(
                                            Ee.Z.Column,
                                            null,
                                            r.createElement(Zt, {
                                                selectedYear: b.year,
                                                onSelect: function (e, t) {
                                                    return C(
                                                        Yt(Yt({}, b), {}, {year: Number(t.value)})
                                                    );
                                                },
                                            }),
                                            "   ",
                                            r.createElement(
                                                "span",
                                                {
                                                    className: "record-filter ".concat(
                                                        p ? "" : "not-selected"
                                                    ),
                                                    onClick: function () {
                                                        return f(!p);
                                                    },
                                                    title: p ? "Скрыть фильмы" : "Показать фильмы",
                                                },
                                                "Фильмы (",
                                                k,
                                                ")"
                                            ),
                                            "   ",
                                            r.createElement(
                                                "span",
                                                {
                                                    className: "record-filter ".concat(
                                                        w ? "" : "not-selected"
                                                    ),
                                                    onClick: function () {
                                                        return Z(!w);
                                                    },
                                                    title: w
                                                        ? "Скрыть сериалы"
                                                        : "Показать сериалы",
                                                },
                                                "Сериалы (",
                                                T,
                                                ")"
                                            ),
                                            "   "
                                        ),
                                        r.createElement(
                                            Ee.Z.Column,
                                            {textAlign: "right"},
                                            s.userId === a &&
                                                r.createElement(
                                                    r.Fragment,
                                                    null,
                                                    r.createElement("span", null, "Добавить"),
                                                    "   ",
                                                    r.createElement(
                                                        ve.Z,
                                                        {
                                                            disabled: _,
                                                            onClick: function () {
                                                                return n({type: g});
                                                            },
                                                        },
                                                        "Фильм"
                                                    ),
                                                    r.createElement(
                                                        ve.Z,
                                                        {
                                                            disabled: _,
                                                            onClick: function () {
                                                                return n({type: y});
                                                            },
                                                        },
                                                        "Сериал"
                                                    )
                                                )
                                        )
                                    ),
                                    N.map(function (e) {
                                        return r.createElement(jt, (0, ge.Z)({key: e._id}, e));
                                    }),
                                    0 === N.length &&
                                        r.createElement(
                                            at.Z,
                                            {info: !0},
                                            r.createElement(
                                                at.Z.Header,
                                                null,
                                                "В вашем журнале пока нет ни одной записи для выбранного года"
                                            ),
                                            r.createElement(
                                                "p",
                                                null,
                                                "Добавьте запись о просмотренном фильме или сериале"
                                            )
                                        )
                                );
                            }
                        );
                    },
                    Ht = n(52607),
                    Kt = n(9911),
                    zt = n(5609),
                    Wt = n(5015),
                    qt = n(38724),
                    Jt = n(32529),
                    $t = n(26299),
                    Qt = n(52734),
                    Xt = n(25180),
                    en = n(58640),
                    tn = n(38638),
                    nn = n(55936),
                    rn = n(64420);
                function an(e) {
                    var t = (function () {
                        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                        if (Reflect.construct.sham) return !1;
                        if ("function" == typeof Proxy) return !0;
                        try {
                            return (
                                Boolean.prototype.valueOf.call(
                                    Reflect.construct(Boolean, [], function () {})
                                ),
                                !0
                            );
                        } catch (e) {
                            return !1;
                        }
                    })();
                    return function () {
                        var n,
                            r = (0, rn.Z)(e);
                        if (t) {
                            var a = (0, rn.Z)(this).constructor;
                            n = Reflect.construct(r, arguments, a);
                        } else n = r.apply(this, arguments);
                        return (0, nn.Z)(this, n);
                    };
                }
                var on = (function (e) {
                        (0, tn.Z)(n, e);
                        var t = an(n);
                        function n() {
                            return (0, Xt.Z)(this, n), t.apply(this, arguments);
                        }
                        return (
                            (0, en.Z)(n, [
                                {
                                    key: "render",
                                    value: function () {
                                        var e = this.props,
                                            t = e.x,
                                            n = e.y,
                                            a = e.payload;
                                        return r.createElement(
                                            "g",
                                            {transform: "translate(".concat(t, ",").concat(n, ")")},
                                            r.createElement(
                                                "text",
                                                {
                                                    x: 30,
                                                    y: -11,
                                                    dy: 16,
                                                    className: "small",
                                                    textAnchor: "end",
                                                    fill: "#666",
                                                    transform: "rotate(90)",
                                                },
                                                a.value
                                            )
                                        );
                                    },
                                },
                            ]),
                            n
                        );
                    })(r.PureComponent),
                    ln = function (e) {
                        var t = e.onClick;
                        return r.createElement(
                            "div",
                            {className: "card empty-card", onClick: t},
                            r.createElement(
                                "svg",
                                {
                                    className: "plus",
                                    width: "54",
                                    height: "54",
                                    viewBox: "0 0 54 54",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                },
                                r.createElement("path", {
                                    d: "M27 11.25V42.75",
                                    stroke: "#DFDFE4",
                                    strokeWidth: "4.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                }),
                                r.createElement("path", {
                                    d: "M11.25 27H42.75",
                                    stroke: "#DFDFE4",
                                    strokeWidth: "4.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                })
                            )
                        );
                    },
                    cn = function (e) {
                        var t = e.header,
                            n = e.content,
                            a = e.onClose,
                            o = e.onSuccess,
                            l = e.successText,
                            c = e.successDisabled,
                            i = e.hideCancel;
                        return r.createElement(
                            Tt.Z,
                            {onClose: a, open: !0, closeOnDimmerClick: !1},
                            r.createElement(Tt.Z.Header, null, t),
                            r.createElement(Tt.Z.Content, null, n),
                            r.createElement(
                                Tt.Z.Actions,
                                null,
                                !i && r.createElement(ve.Z, {onClick: a}, "Отмена"),
                                r.createElement(
                                    ve.Z,
                                    {onClick: o, disabled: c, positive: !0},
                                    l || "Ок"
                                )
                            )
                        );
                    },
                    un = function (e) {
                        var t = e.onClose,
                            n = e.index,
                            a = (0, r.useState)(null),
                            l = (0, Se.Z)(a, 2),
                            c = l[0],
                            i = l[1],
                            u = (0, o.v9)(function (e) {
                                return e;
                            }).users.data,
                            s = u ? u.items[0] : null,
                            d = (0, o.I0)(),
                            m = r.createElement(
                                r.Fragment,
                                null,
                                r.createElement(
                                    "div",
                                    {className: "falvourite-movie-search"},
                                    r.createElement(bt, {
                                        searchAction: (0, Dt.Z)(qe, 300, {leading: !1}),
                                        onSuggestionSelected: function (e) {
                                            return i(e);
                                        },
                                        titlePropName: "title",
                                        releasePropName: "release_date",
                                        placeholder: "Найти фильм...",
                                    })
                                ),
                                c &&
                                    r.createElement(
                                        "div",
                                        {className: "movie-info"},
                                        r.createElement(Ct.Z, {
                                            src: "".concat(xe, "/").concat(c.poster_path),
                                            size: "tiny",
                                        }),
                                        r.createElement(
                                            "div",
                                            {className: "title"},
                                            ""
                                                .concat(c.title, " (")
                                                .concat(new Date(c.release_date).getFullYear(), ")")
                                        )
                                    )
                            );
                        return r.createElement(cn, {
                            content: m,
                            header: "Выберите фильм",
                            onClose: t,
                            onSuccess: function () {
                                var e = {
                                        id: c.id,
                                        title: c.title,
                                        poster_path: c.poster_path,
                                        release_date: c.release_date,
                                        position: n,
                                    },
                                    r = (0, te.Z)(null == s ? void 0 : s.favouriteMovies);
                                r.push(e), d(nt({favouriteMovies: r})), t();
                            },
                            successText: "Добавить",
                            successDisabled: !c,
                        });
                    },
                    sn = n(85018),
                    dn = function (e) {
                        var t,
                            n = e.movie,
                            a = e.index,
                            o = e.onRemove,
                            l = e.disabled,
                            c = (0, r.useState)(!1),
                            i = (0, Se.Z)(c, 2),
                            u = i[0],
                            s = i[1],
                            d = rt(!1),
                            m = (0, Se.Z)(d, 2),
                            p = m[0],
                            f = m[1];
                        return (
                            (t = n
                                ? r.createElement(
                                      "div",
                                      {className: "favourite-movie-poster"},
                                      r.createElement(sn.Z, {
                                          name: "remove circle",
                                          onClick: f,
                                          title: "удалить",
                                          className: "remove-icon",
                                      }),
                                      r.createElement(Ct.Z, {
                                          onError: function (e) {
                                              (e.target.onerror = null),
                                                  (e.target.src = "../src/Assets/empty.png");
                                          },
                                          src: "".concat(xe, "/").concat(n.poster_path),
                                          title: ""
                                              .concat(n.title, " (")
                                              .concat(new Date(n.release_date).getFullYear(), ")"),
                                      })
                                  )
                                : r.createElement(ln, {
                                      onClick: function () {
                                          l || s(!0);
                                      },
                                  })),
                            r.createElement(
                                r.Fragment,
                                null,
                                t,
                                u &&
                                    r.createElement(un, {
                                        onClose: function () {
                                            return s(!1);
                                        },
                                        index: a,
                                    }),
                                p &&
                                    r.createElement(Nt, {
                                        header: "Удаление записи",
                                        text: "Вы уверены, что хотите удалить запись?",
                                        onClose: f,
                                        onNegative: f,
                                        onPositive: o,
                                    })
                            )
                        );
                    },
                    mn = function (e) {
                        var t = e.active,
                            n = e.payload,
                            a = e.label;
                        return t
                            ? r.createElement(
                                  "div",
                                  {className: "custom-tooltip"},
                                  r.createElement(
                                      "p",
                                      {className: "label"},
                                      "Фильмов в жанре ".concat(a, ": ").concat(n[0].value)
                                  )
                              )
                            : null;
                    },
                    pn = function (e) {
                        var t = e.active,
                            n = e.payload,
                            a = e.label;
                        return t
                            ? r.createElement(
                                  "div",
                                  {className: "custom-tooltip"},
                                  r.createElement(
                                      "p",
                                      {className: "label"},
                                      "Фильмов производства ".concat(a, ": ").concat(n[0].value)
                                  )
                              )
                            : null;
                    },
                    fn = function (e) {
                        var t = e.match,
                            n = (0, o.I0)(),
                            a = t.params.id,
                            l = (0, o.v9)(function (e) {
                                return e;
                            }),
                            c = l.users,
                            i = c.data,
                            s = c.isLoading,
                            d = c.error,
                            m = l.stat,
                            E = m.data,
                            g = m.isLoading,
                            y = m.error,
                            h = l.user.data,
                            w = i ? i.items[0] : null,
                            Z = (null == E ? void 0 : E.marksData) || [],
                            O = (0, r.useState)(0),
                            S = (0, Se.Z)(O, 2),
                            b = S[0],
                            C = S[1];
                        (0, r.useEffect)(function () {
                            return (
                                n(tt({userId: a})),
                                function () {
                                    n({type: Y});
                                }
                            );
                        }, []),
                            (0, r.useEffect)(
                                function () {
                                    n(
                                        (function (e, t) {
                                            return (function () {
                                                var n = (0, Oe.Z)(
                                                    Ce().mark(function n(r) {
                                                        var a;
                                                        return Ce().wrap(
                                                            function (n) {
                                                                for (;;)
                                                                    switch ((n.prev = n.next)) {
                                                                        case 0:
                                                                            return (
                                                                                r({type: p}),
                                                                                (n.prev = 1),
                                                                                (n.next = 4),
                                                                                Be(e, t)
                                                                            );
                                                                        case 4:
                                                                            return (
                                                                                (a = n.sent),
                                                                                r({
                                                                                    type: f,
                                                                                    payload: a,
                                                                                }),
                                                                                n.abrupt(
                                                                                    "return",
                                                                                    a
                                                                                )
                                                                            );
                                                                        case 9:
                                                                            throw (
                                                                                ((n.prev = 9),
                                                                                (n.t0 = n.catch(1)),
                                                                                r({
                                                                                    type: v,
                                                                                    payload: n.t0,
                                                                                }),
                                                                                n.t0)
                                                                            );
                                                                        case 13:
                                                                        case "end":
                                                                            return n.stop();
                                                                    }
                                                            },
                                                            n,
                                                            null,
                                                            [[1, 9]]
                                                        );
                                                    })
                                                );
                                                return function (e) {
                                                    return n.apply(this, arguments);
                                                };
                                            })();
                                        })(a, b)
                                    );
                                },
                                [b]
                            );
                        var _,
                            k = [],
                            T = (0, Q.map)(null == w ? void 0 : w.favouriteMovies, function (e) {
                                return (0, u.Z)({}, e.position, e);
                            });
                        T && (_ = Object.assign.apply(Object, [{}].concat((0, te.Z)(T))));
                        for (
                            var N = function (e) {
                                    var t;
                                    k.push(
                                        r.createElement(dn, {
                                            movie: null === (t = _) || void 0 === t ? void 0 : t[e],
                                            index: e,
                                            onRemove: function () {
                                                var t =
                                                    null == w
                                                        ? void 0
                                                        : w.favouriteMovies.filter(function (t) {
                                                              return t.position !== e;
                                                          });
                                                n(nt({favouriteMovies: t}));
                                            },
                                            disabled: a !== (null == h ? void 0 : h.userId),
                                        })
                                    );
                                },
                                R = 0;
                            R < 10;
                            R++
                        )
                            N(R);
                        return r.createElement(
                            gt,
                            {
                                isLoading: s || g,
                                errorMessage:
                                    (null == d ? void 0 : d.message) ||
                                    (null == y ? void 0 : y.message),
                            },
                            function () {
                                return r.createElement(
                                    dt.Z,
                                    {className: "profile"},
                                    r.createElement(
                                        ot.Z,
                                        {as: "h2", size: "large"},
                                        "Профиль пользователя"
                                    ),
                                    r.createElement(
                                        ct.Z,
                                        null,
                                        r.createElement(
                                            Ee.Z,
                                            {className: "profile-data"},
                                            r.createElement(
                                                Ee.Z.Column,
                                                {width: 4},
                                                r.createElement(Ct.Z, {
                                                    className: "profile-data-image",
                                                    src: "../src/Assets/matthew.png",
                                                    circular: !0,
                                                }),
                                                r.createElement(
                                                    "div",
                                                    {className: "title"},
                                                    "".concat(null == w ? void 0 : w.username)
                                                ),
                                                r.createElement(
                                                    "div",
                                                    {className: "additional"},
                                                    "Russia, Tver"
                                                ),
                                                r.createElement(
                                                    "div",
                                                    {className: "label"},
                                                    "В этом году"
                                                ),
                                                r.createElement(
                                                    "div",
                                                    {className: "counter"},
                                                    r.createElement(
                                                        "div",
                                                        {className: "total"},
                                                        (null == E
                                                            ? void 0
                                                            : E.recordsCurrentYearCount.movies) +
                                                            (null == E
                                                                ? void 0
                                                                : E.recordsCurrentYearCount
                                                                      .tvseries)
                                                    ),
                                                    r.createElement(
                                                        "div",
                                                        {className: "divided"},
                                                        r.createElement(
                                                            "div",
                                                            null,
                                                            null == E
                                                                ? void 0
                                                                : E.recordsCurrentYearCount.movies,
                                                            " фильмов"
                                                        ),
                                                        r.createElement(
                                                            "div",
                                                            null,
                                                            null == E
                                                                ? void 0
                                                                : E.recordsCurrentYearCount
                                                                      .tvseries,
                                                            " сериалов"
                                                        )
                                                    )
                                                ),
                                                r.createElement(
                                                    "div",
                                                    {className: "label"},
                                                    "За всё время"
                                                ),
                                                r.createElement(
                                                    "div",
                                                    {className: "counter"},
                                                    r.createElement(
                                                        "div",
                                                        {className: "total"},
                                                        (null == E
                                                            ? void 0
                                                            : E.recordsTotalCount.movies) +
                                                            (null == E
                                                                ? void 0
                                                                : E.recordsTotalCount.tvseries)
                                                    ),
                                                    r.createElement(
                                                        "div",
                                                        {className: "divided"},
                                                        r.createElement(
                                                            "div",
                                                            null,
                                                            null == E
                                                                ? void 0
                                                                : E.recordsTotalCount.movies,
                                                            " фильмов"
                                                        ),
                                                        r.createElement(
                                                            "div",
                                                            null,
                                                            null == E
                                                                ? void 0
                                                                : E.recordsTotalCount.tvseries,
                                                            " сериалов"
                                                        )
                                                    )
                                                ),
                                                r.createElement(
                                                    "div",
                                                    null,
                                                    r.createElement(
                                                        pe.rU,
                                                        {to: "/diary/".concat(a)},
                                                        "Смотреть журнал"
                                                    )
                                                )
                                            ),
                                            r.createElement(
                                                Ee.Z.Column,
                                                {width: 12},
                                                r.createElement("div", null, "Любимые фильмы"),
                                                r.createElement("div", {className: "grid-panel"}, k)
                                            )
                                        )
                                    ),
                                    r.createElement(
                                        Ee.Z,
                                        null,
                                        r.createElement(
                                            Ee.Z.Row,
                                            null,
                                            r.createElement(Ee.Z.Column, {width: 4}),
                                            r.createElement(
                                                Ee.Z.Column,
                                                {width: 8, textAlign: "center"},
                                                r.createElement(
                                                    "h1",
                                                    null,
                                                    r.createElement(Zt, {
                                                        showAllOption: !0,
                                                        selectedYear: b,
                                                        onSelect: function (e, t) {
                                                            return C(Number(t.value));
                                                        },
                                                    })
                                                ),
                                                r.createElement(
                                                    "h3",
                                                    null,
                                                    "".concat(
                                                        Z.reduce(function (e, t) {
                                                            return e + t.markCount;
                                                        }, 0)
                                                    ),
                                                    " ",
                                                    "оценок"
                                                ),
                                                r.createElement(
                                                    Kt.h,
                                                    {width: "100%", height: 200},
                                                    r.createElement(
                                                        zt.v,
                                                        {margin: {top: 30}, data: Z},
                                                        r.createElement(
                                                            Wt.$,
                                                            {dataKey: "markCount", fill: "#5CE0E6"},
                                                            r.createElement(qt.e, {
                                                                dataKey: "markCount",
                                                                position: "top",
                                                            })
                                                        ),
                                                        r.createElement(Jt.K, {dataKey: "mark"})
                                                    )
                                                )
                                            ),
                                            r.createElement(Ee.Z.Column, {width: 4})
                                        ),
                                        r.createElement(
                                            Ee.Z.Row,
                                            null,
                                            r.createElement(
                                                Ee.Z.Column,
                                                {width: 8},
                                                r.createElement("h3", null, "Жанры"),
                                                r.createElement(
                                                    Kt.h,
                                                    {width: "100%", height: 300},
                                                    r.createElement(
                                                        zt.v,
                                                        {
                                                            width: 600,
                                                            height: 300,
                                                            data: null == E ? void 0 : E.genresData,
                                                            layout: "vertical",
                                                            margin: {top: 5, bottom: 5},
                                                        },
                                                        r.createElement(Jt.K, {type: "number"}),
                                                        r.createElement($t.B, {
                                                            type: "category",
                                                            dataKey: "name",
                                                            interval: 0,
                                                            width: 150,
                                                        }),
                                                        r.createElement(Qt.u, {
                                                            content: function (e) {
                                                                var t = e.active,
                                                                    n = e.payload,
                                                                    a = e.label;
                                                                return r.createElement(mn, {
                                                                    active: t,
                                                                    payload: n,
                                                                    label: a,
                                                                });
                                                            },
                                                        }),
                                                        r.createElement(Wt.$, {
                                                            dataKey: "value",
                                                            fill: "#19C2FA",
                                                        })
                                                    )
                                                )
                                            ),
                                            r.createElement(
                                                Ee.Z.Column,
                                                {width: 8, textAlign: "center"},
                                                r.createElement("h3", null, "Страны"),
                                                r.createElement(
                                                    Kt.h,
                                                    {width: "100%", height: 300},
                                                    r.createElement(
                                                        zt.v,
                                                        {
                                                            width: 600,
                                                            height: 300,
                                                            data:
                                                                null == E
                                                                    ? void 0
                                                                    : E.countriesData,
                                                            layout: "vertical",
                                                            margin: {top: 5, bottom: 5},
                                                        },
                                                        r.createElement(Jt.K, {type: "number"}),
                                                        r.createElement($t.B, {
                                                            type: "category",
                                                            dataKey: "countryName",
                                                            interval: 0,
                                                            width: 150,
                                                        }),
                                                        r.createElement(Qt.u, {
                                                            content: function (e) {
                                                                var t = e.active,
                                                                    n = e.payload,
                                                                    a = e.label;
                                                                return r.createElement(pn, {
                                                                    active: t,
                                                                    payload: n,
                                                                    label: a,
                                                                });
                                                            },
                                                        }),
                                                        r.createElement(Wt.$, {
                                                            dataKey: "countryCount",
                                                            fill: "#FA1955",
                                                        })
                                                    )
                                                )
                                            )
                                        ),
                                        r.createElement(
                                            Ee.Z.Row,
                                            {columns: 3},
                                            r.createElement(
                                                Ee.Z.Column,
                                                null,
                                                r.createElement("h3", null, "Режиссёры"),
                                                r.createElement(
                                                    Ht.Z,
                                                    {ordered: !0},
                                                    null == E
                                                        ? void 0
                                                        : E.directorsData.map(function (e) {
                                                              return r.createElement(
                                                                  Ht.Z.Item,
                                                                  {
                                                                      key: ""
                                                                          .concat(e.director)
                                                                          .concat(e.directorCount),
                                                                  },
                                                                  ""
                                                                      .concat(e.director, " (")
                                                                      .concat(e.directorCount, ")")
                                                              );
                                                          })
                                                )
                                            ),
                                            r.createElement(
                                                Ee.Z.Column,
                                                null,
                                                r.createElement("h3", null, "Актёры"),
                                                r.createElement(
                                                    Ht.Z,
                                                    {ordered: !0},
                                                    null == E
                                                        ? void 0
                                                        : E.actorsData.map(function (e, t) {
                                                              return r.createElement(
                                                                  Ht.Z.Item,
                                                                  {key: t},
                                                                  ""
                                                                      .concat(e.actor, " (")
                                                                      .concat(e.actorCount, ")")
                                                              );
                                                          })
                                                )
                                            ),
                                            r.createElement(
                                                Ee.Z.Column,
                                                null,
                                                r.createElement("h3", null, "Актрисы"),
                                                r.createElement(
                                                    Ht.Z,
                                                    {ordered: !0},
                                                    null == E
                                                        ? void 0
                                                        : E.actressesData.map(function (e, t) {
                                                              return r.createElement(
                                                                  Ht.Z.Item,
                                                                  {key: t},
                                                                  ""
                                                                      .concat(e.actress, " (")
                                                                      .concat(e.actressCount, ")")
                                                              );
                                                          })
                                                )
                                            )
                                        ),
                                        r.createElement(
                                            Ee.Z.Row,
                                            null,
                                            r.createElement(
                                                Ee.Z.Column,
                                                null,
                                                r.createElement("h3", null, "Год выпуска"),
                                                r.createElement(
                                                    Kt.h,
                                                    {width: "100%", height: 200},
                                                    r.createElement(
                                                        zt.v,
                                                        {
                                                            margin: {top: 30},
                                                            data: null == E ? void 0 : E.yearsData,
                                                        },
                                                        r.createElement(
                                                            Wt.$,
                                                            {dataKey: "yearCount", fill: "#5CE0E6"},
                                                            r.createElement(qt.e, {
                                                                dataKey: "yearCount",
                                                                position: "top",
                                                            })
                                                        ),
                                                        r.createElement(Jt.K, {
                                                            dataKey: "year",
                                                            interval: 0,
                                                            height: 100,
                                                            tick: function (e) {
                                                                var t = e.x,
                                                                    n = e.y,
                                                                    a = e.payload;
                                                                return r.createElement(on, {
                                                                    x: t,
                                                                    y: n,
                                                                    payload: a,
                                                                });
                                                            },
                                                        })
                                                    )
                                                )
                                            )
                                        )
                                    )
                                );
                            }
                        );
                    },
                    vn = n(83721),
                    En = ["component", "path", "isAuthenticated"],
                    gn = function (e) {
                        var t = e.component,
                            n = e.path,
                            a = e.isAuthenticated,
                            o = (0, vn.Z)(e, En);
                        return r.createElement(
                            fe.AW,
                            (0, ge.Z)({path: n}, o, {
                                render: function (e) {
                                    return a
                                        ? r.createElement(t, e)
                                        : r.createElement(fe.l_, {
                                              to: {
                                                  pathname: "/login",
                                                  state: {
                                                      prevLocation: location.pathname,
                                                      errorMessage: "Войдите или зарегистрируйтесь",
                                                  },
                                              },
                                          });
                                },
                            })
                        );
                    },
                    yn = function () {
                        var e,
                            t = (0, o.I0)(),
                            n = JSON.parse(localStorage.getItem(Ae)),
                            r = !1;
                        return (
                            n &&
                                n.token &&
                                ((r = !0),
                                t(
                                    ((e = n.userId),
                                    (function () {
                                        var t = (0, Oe.Z)(
                                            Ce().mark(function t(n) {
                                                var r, a, o, l, c, i;
                                                return Ce().wrap(
                                                    function (t) {
                                                        for (;;)
                                                            switch ((t.prev = t.next)) {
                                                                case 0:
                                                                    return (
                                                                        n({type: L}),
                                                                        (t.prev = 1),
                                                                        (t.next = 4),
                                                                        je(e)
                                                                    );
                                                                case 4:
                                                                    return (
                                                                        (r = t.sent),
                                                                        n({
                                                                            type: U,
                                                                            payload: r.data,
                                                                        }),
                                                                        t.abrupt("return", r)
                                                                    );
                                                                case 9:
                                                                    (t.prev = 9),
                                                                        (t.t0 = t.catch(1)),
                                                                        (l = t.t0.response),
                                                                        (c =
                                                                            null !==
                                                                                (a =
                                                                                    null == l
                                                                                        ? void 0
                                                                                        : l.data
                                                                                              .message) &&
                                                                            void 0 !== a
                                                                                ? a
                                                                                : t.t0.message),
                                                                        (i =
                                                                            null !==
                                                                                (o =
                                                                                    null == l
                                                                                        ? void 0
                                                                                        : l.status) &&
                                                                            void 0 !== o
                                                                                ? o
                                                                                : t.t0.status),
                                                                        n({
                                                                            type: M,
                                                                            payload: {
                                                                                message: c,
                                                                                status: i,
                                                                            },
                                                                        });
                                                                case 16:
                                                                case "end":
                                                                    return t.stop();
                                                            }
                                                    },
                                                    t,
                                                    null,
                                                    [[1, 9]]
                                                );
                                            })
                                        );
                                        return function (e) {
                                            return t.apply(this, arguments);
                                        };
                                    })())
                                )),
                            r
                        );
                    },
                    hn = function () {
                        var e,
                            t = yn(),
                            n =
                                null === (e = (0, fe.TH)().state) || void 0 === e
                                    ? void 0
                                    : e.errorMessage;
                        return r.createElement(
                            r.Fragment,
                            null,
                            n && r.createElement(ft, {errorMessage: n}),
                            r.createElement(
                                fe.rs,
                                null,
                                r.createElement(fe.AW, {path: "/", exact: !0, component: Ze}),
                                r.createElement(fe.AW, {path: "/login", component: st}),
                                r.createElement(gn, {
                                    path: "/users",
                                    isAuthenticated: t,
                                    component: yt,
                                }),
                                r.createElement(gn, {
                                    path: "/results/:id",
                                    isAuthenticated: t,
                                    component: Vt,
                                }),
                                r.createElement(gn, {
                                    path: "/diary/:id",
                                    isAuthenticated: t,
                                    component: Gt,
                                }),
                                r.createElement(gn, {
                                    path: "/profile/:id",
                                    isAuthenticated: t,
                                    component: fn,
                                })
                            )
                        );
                    },
                    wn = function () {
                        var e = (0, r.useState)(!1),
                            t = (0, Se.Z)(e, 2),
                            n = t[0],
                            a = t[1],
                            l = (0, o.v9)(function (e) {
                                return e;
                            }).user,
                            c = (0, o.I0)(),
                            i = (0, fe.k6)(),
                            u = !!l.data,
                            s = (function () {
                                var e = (0, Oe.Z)(
                                    Ce().mark(function e() {
                                        return Ce().wrap(function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (
                                                            (e.next = 2),
                                                            c(
                                                                (localStorage.removeItem(Ae),
                                                                {type: j})
                                                            )
                                                        );
                                                    case 2:
                                                        i.push("/");
                                                    case 3:
                                                    case "end":
                                                        return e.stop();
                                                }
                                        }, e);
                                    })
                                );
                                return function () {
                                    return e.apply(this, arguments);
                                };
                            })();
                        return r.createElement(
                            "div",
                            {className: "header-app"},
                            r.createElement(
                                "span",
                                {className: "logo"},
                                r.createElement(
                                    pe.rU,
                                    {to: "/", key: "main"},
                                    r.createElement("span", null, "tracked")
                                )
                            ),
                            u
                                ? r.createElement(
                                      r.Fragment,
                                      null,
                                      r.createElement(
                                          "span",
                                          {className: "menu ".concat(n ? "responsive" : "")},
                                          r.createElement(
                                              pe.rU,
                                              {to: "/users", key: "users"},
                                              "пользователи"
                                          ),
                                          r.createElement(
                                              pe.rU,
                                              {
                                                  to: "/results/".concat(l.data.userId),
                                                  key: "results",
                                              },
                                              "итоги"
                                          ),
                                          r.createElement(
                                              pe.rU,
                                              {to: "/diary/".concat(l.data.userId), key: "diary"},
                                              "журнал просмотров"
                                          ),
                                          r.createElement(
                                              pe.rU,
                                              {
                                                  to: "/profile/".concat(l.data.userId),
                                                  key: "profile",
                                              },
                                              "".concat(l.data.username)
                                          ),
                                          r.createElement("a", {onClick: s}, "выйти")
                                      ),
                                      r.createElement(sn.Z, {
                                          name: "bars",
                                          onClick: function () {
                                              return a(!n);
                                          },
                                          title: "меню",
                                          className: "burger",
                                      })
                                  )
                                : r.createElement(
                                      "span",
                                      {className: "menu"},
                                      r.createElement(pe.rU, {to: "/login", key: "login"}, "войти")
                                  )
                        );
                    },
                    Zn = function () {
                        return r.createElement(
                            "div",
                            {className: "footer"},
                            r.createElement("div", {className: "copyright"}, "tracked🎥2020")
                        );
                    },
                    On = function () {
                        return r.createElement(
                            pe.VK,
                            null,
                            r.createElement(wn, null),
                            r.createElement(hn, null),
                            r.createElement(Zn, null)
                        );
                    },
                    Sn = (0, l.MT)(me, (0, c.Uo)((0, l.md)(i.Z)));
                a.render(
                    r.createElement(o.zt, {store: Sn}, r.createElement(On, null)),
                    document.getElementById("app")
                );
            },
            55319: function () {},
        },
        n = {};
    function r(e) {
        var a = n[e];
        if (void 0 !== a) return a.exports;
        var o = (n[e] = {id: e, loaded: !1, exports: {}});
        return t[e].call(o.exports, o, o.exports, r), (o.loaded = !0), o.exports;
    }
    (r.m = t),
        (e = []),
        (r.O = function (t, n, a, o) {
            if (!n) {
                var l = 1 / 0;
                for (s = 0; s < e.length; s++) {
                    (n = e[s][0]), (a = e[s][1]), (o = e[s][2]);
                    for (var c = !0, i = 0; i < n.length; i++)
                        (!1 & o || l >= o) &&
                        Object.keys(r.O).every(function (e) {
                            return r.O[e](n[i]);
                        })
                            ? n.splice(i--, 1)
                            : ((c = !1), o < l && (l = o));
                    if (c) {
                        e.splice(s--, 1);
                        var u = a();
                        void 0 !== u && (t = u);
                    }
                }
                return t;
            }
            o = o || 0;
            for (var s = e.length; s > 0 && e[s - 1][2] > o; s--) e[s] = e[s - 1];
            e[s] = [n, a, o];
        }),
        (r.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return r.d(t, {a: t}), t;
        }),
        (r.d = function (e, t) {
            for (var n in t)
                r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {enumerable: !0, get: t[n]});
        }),
        (r.g = (function () {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" == typeof window) return window;
            }
        })()),
        (r.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (r.r = function (e) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}),
                Object.defineProperty(e, "__esModule", {value: !0});
        }),
        (r.nmd = function (e) {
            return (e.paths = []), e.children || (e.children = []), e;
        }),
        (function () {
            var e = {179: 0};
            r.O.j = function (t) {
                return 0 === e[t];
            };
            var t = function (t, n) {
                    var a,
                        o,
                        l = n[0],
                        c = n[1],
                        i = n[2],
                        u = 0;
                    for (a in c) r.o(c, a) && (r.m[a] = c[a]);
                    if (i) var s = i(r);
                    for (t && t(n); u < l.length; u++)
                        (o = l[u]), r.o(e, o) && e[o] && e[o][0](), (e[l[u]] = 0);
                    return r.O(s);
                },
                n = (self.webpackChunk = self.webpackChunk || []);
            n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
        })(),
        r.O(void 0, [429], function () {
            return r(71202);
        });
    var a = r.O(void 0, [429], function () {
        return r(38259);
    });
    a = r.O(a);
})();
