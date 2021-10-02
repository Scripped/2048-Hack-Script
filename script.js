function KeyboardInputManager() {
    this.events = {}, window.navigator.msPointerEnabled ? (this.eventTouchstart = "MSPointerDown", this.eventTouchmove = "MSPointerMove", this.eventTouchend = "MSPointerUp") : (this.eventTouchstart = "touchstart", this.eventTouchmove = "touchmove", this.eventTouchend = "touchend"), this.listen()
}

function HTMLActuator() {
    this.tileContainer = document.querySelector(".tile-container"), this.scoreContainer = document.querySelector(".score-container"), this.bestContainer = document.querySelector(".best-container"), this.messageContainer = document.querySelector(".game-message"), this.score = 0
}

function Grid(e, t) {
    this.size = e, this.cells = t ? this.fromState(t) : this.empty()
}

function Tile(e, t) {
    this.x = e.x, this.y = e.y, this.value = 2048, this.previousPosition = null, this.mergedFrom = null
}

function LocalStorageManager() {
    this.bestScoreKey = "bestScore", this.gameStateKey = "gameState", this.noticeClosedKey = "noticeClosed", this.cookieNoticeClosedKey = "cookieNoticeClosed";
    var e = this.localStorageSupported();
    this.storage = e ? window.localStorage : window.fakeStorage
}

function GameManager(e, t, i, o) {
    this.size = e, this.inputManager = new t, this.storageManager = new o, this.actuator = new i, this.startTiles = 2, this.inputManager.on("move", this.move.bind(this)), this.inputManager.on("restart", this.restart.bind(this)), this.inputManager.on("keepPlaying", this.keepPlaying.bind(this)), this.setup()
}

function runApplication() {
    new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
    var e = new LocalStorageManager,
        t = document.querySelector(".cookie-notice"),
        i = document.querySelector(".cookie-notice-dismiss-button");
    e.getCookieNoticeClosed() ? t.parentNode.removeChild(t) : i.addEventListener("click", (function() {
        t.parentNode.removeChild(t), e.setCookieNoticeClosed(!0), void 0 !== typeof gtag && gtag("event", "closed", {
            event_category: "cookie-notice"
        })
    }));
    var o = document.querySelector(".how-to-play-link"),
        n = document.querySelector(".game-explanation");
    o && n && o.addEventListener("click", (function() {
        n.scrollIntoView({
            behavior: "smooth",
            block: "center"
        }), n.addEventListener("animationend", (function() {
            n.classList.remove("game-explanation-highlighted")
        })), n.classList.add("game-explanation-highlighted")
    }));
    var a = document.querySelector(".start-playing-link"),
        r = document.querySelector(".game-container");
    a && r && a.addEventListener("click", (function() {
        r.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
    }))
}
Function.prototype.bind = Function.prototype.bind || function(e) {
        var t = this;
        return function(i) {
            i instanceof Array || (i = [i]), t.apply(e, i)
        }
    },
    function() {
        if (void 0 !== window.Element && !("classList" in document.documentElement)) {
            var e, t, i, o = Array.prototype,
                n = o.push,
                a = o.splice,
                r = o.join;
            s.prototype = {
                add: function(e) {
                    this.contains(e) || (n.call(this, e), this.el.className = this.toString())
                },
                contains: function(e) {
                    return -1 != this.el.className.indexOf(e)
                },
                item: function(e) {
                    return this[e] || null
                },
                remove: function(e) {
                    if (this.contains(e)) {
                        for (var t = 0; t < this.length && this[t] != e; t++);
                        a.call(this, t, 1), this.el.className = this.toString()
                    }
                },
                toString: function() {
                    return r.call(this, " ")
                },
                toggle: function(e) {
                    return this.contains(e) ? this.remove(e) : this.add(e), this.contains(e)
                }
            }, window.DOMTokenList = s, e = HTMLElement.prototype, t = "classList", i = function() {
                return new s(this)
            }, Object.defineProperty ? Object.defineProperty(e, t, {
                get: i
            }) : e.__defineGetter__(t, i)
        }

        function s(e) {
            this.el = e;
            for (var t = e.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0; i < t.length; i++) n.call(this, t[i])
        }
    }(),
    function() {
        for (var e = 0, t = ["webkit", "moz"], i = 0; i < t.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[i] + "CancelAnimationFrame"] || window[t[i] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
            var i = (new Date).getTime(),
                o = Math.max(0, 16 - (i - e)),
                n = window.setTimeout((function() {
                    t(i + o)
                }), o);
            return e = i + o, n
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }(), KeyboardInputManager.prototype.on = function(e, t) {
        this.events[e] || (this.events[e] = []), this.events[e].push(t)
    }, KeyboardInputManager.prototype.emit = function(e, t) {
        var i = this.events[e];
        i && i.forEach((function(e) {
            e(t)
        }))
    }, KeyboardInputManager.prototype.listen = function() {
        var e, t, i = this,
            o = {
                38: 0,
                39: 1,
                40: 2,
                37: 3,
                75: 0,
                76: 1,
                74: 2,
                72: 3,
                87: 0,
                68: 1,
                83: 2,
                65: 3
            };
        document.addEventListener("keydown", (function(e) {
            var t = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey,
                n = o[e.which];
            i.targetIsInput(e) || (t || void 0 !== n && (e.preventDefault(), i.emit("move", n)), t || 82 !== e.which || i.restart.call(i, e))
        })), this.bindButtonPress(".retry-button", this.restart), this.bindButtonPress(".restart-button", this.restart), this.bindButtonPress(".keep-playing-button", this.keepPlaying);
        var n = document.getElementsByClassName("game-container")[0];
        n.addEventListener(this.eventTouchstart, (function(o) {
            !window.navigator.msPointerEnabled && o.touches.length > 1 || o.targetTouches.length > 1 || i.targetIsInput(o) || (window.navigator.msPointerEnabled ? (e = o.pageX, t = o.pageY) : (e = o.touches[0].clientX, t = o.touches[0].clientY), o.preventDefault())
        }), {
            passive: !0
        }), n.addEventListener(this.eventTouchmove, (function(e) {
            e.preventDefault()
        }), {
            passive: !0
        }), n.addEventListener(this.eventTouchend, (function(o) {
            if (!(!window.navigator.msPointerEnabled && o.touches.length > 0 || o.targetTouches.length > 0 || i.targetIsInput(o))) {
                var n, a;
                window.navigator.msPointerEnabled ? (n = o.pageX, a = o.pageY) : (n = o.changedTouches[0].clientX, a = o.changedTouches[0].clientY);
                var r = n - e,
                    s = Math.abs(r),
                    c = a - t,
                    l = Math.abs(c);
                Math.max(s, l) > 10 && i.emit("move", s > l ? r > 0 ? 1 : 3 : c > 0 ? 2 : 0)
            }
        }))
    }, KeyboardInputManager.prototype.restart = function(e) {
        e.preventDefault(), this.emit("restart")
    }, KeyboardInputManager.prototype.keepPlaying = function(e) {
        e.preventDefault(), this.emit("keepPlaying")
    }, KeyboardInputManager.prototype.bindButtonPress = function(e, t) {
        var i = document.querySelector(e);
        i.addEventListener("click", t.bind(this)), i.addEventListener(this.eventTouchend, t.bind(this))
    }, KeyboardInputManager.prototype.targetIsInput = function(e) {
        return "input" === e.target.tagName.toLowerCase()
    }, HTMLActuator.prototype.actuate = function(e, t) {
        var i = this;
        window.requestAnimationFrame((function() {
            i.clearContainer(i.tileContainer), e.cells.forEach((function(e) {
                e.forEach((function(e) {
                    e && i.addTile(e)
                }))
            })), i.updateScore(t.score), i.updateBestScore(t.bestScore), t.terminated && (t.over ? i.message(!1) : t.won && i.message(!0))
        }))
    }, HTMLActuator.prototype.continueGame = function() {
        "undefined" != typeof gtag && gtag("event", "restart", {
            event_category: "game"
        }), this.clearMessage()
    }, HTMLActuator.prototype.clearContainer = function(e) {
        for (; e.firstChild;) e.removeChild(e.firstChild)
    }, HTMLActuator.prototype.addTile = function(e) {
        var t = this,
            i = document.createElement("div"),
            o = document.createElement("div"),
            n = e.previousPosition || {
                x: e.x,
                y: e.y
            },
            a = this.positionClass(n),
            r = ["tile", "tile-" + e.value, a];
        e.value > 2048 && r.push("tile-super"), this.applyClasses(i, r), o.classList.add("tile-inner"), o.textContent = e.value, e.previousPosition ? window.requestAnimationFrame((function() {
            r[2] = t.positionClass({
                x: e.x,
                y: e.y
            }), t.applyClasses(i, r)
        })) : e.mergedFrom ? (r.push("tile-merged"), this.applyClasses(i, r), e.mergedFrom.forEach((function(e) {
            t.addTile(e)
        }))) : (r.push("tile-new"), this.applyClasses(i, r)), i.appendChild(o), this.tileContainer.appendChild(i)
    }, HTMLActuator.prototype.applyClasses = function(e, t) {
        e.setAttribute("class", t.join(" "))
    }, HTMLActuator.prototype.normalizePosition = function(e) {
        return {
            x: e.x + 1,
            y: e.y + 1
        }
    }, HTMLActuator.prototype.positionClass = function(e) {
        return "tile-position-" + (e = this.normalizePosition(e)).x + "-" + e.y
    }, HTMLActuator.prototype.updateScore = function(e) {
        this.clearContainer(this.scoreContainer);
        var t = e - this.score;
        if (this.score = e, this.scoreContainer.textContent = this.score, t > 0) {
            var i = document.createElement("div");
            i.classList.add("score-addition"), i.textContent = "+" + t, this.scoreContainer.appendChild(i)
        }
    }, HTMLActuator.prototype.updateBestScore = function(e) {
        this.bestContainer.textContent = e
    }, HTMLActuator.prototype.message = function(e) {
        var t = e ? "game-won" : "game-over",
            i = e ? "You win!" : "Game over!";
        "undefined" != typeof gtag && gtag("event", "end", {
            event_category: "game",
            event_label: t,
            value: this.score
        }), this.messageContainer.classList.add(t), this.messageContainer.getElementsByTagName("p")[0].textContent = i
    }, HTMLActuator.prototype.clearMessage = function() {
        this.messageContainer.classList.remove("game-won"), this.messageContainer.classList.remove("game-over")
    }, Grid.prototype.empty = function() {
        for (var e = [], t = 0; t < this.size; t++)
            for (var i = e[t] = [], o = 0; o < this.size; o++) i.push(null);
        return e
    }, Grid.prototype.fromState = function(e) {
        for (var t = [], i = 0; i < this.size; i++)
            for (var o = t[i] = [], n = 0; n < this.size; n++) {
                var a = e[i][n];
                o.push(a ? new Tile(a.position, a.value) : null)
            }
        return t
    }, Grid.prototype.randomAvailableCell = function() {
        var e = this.availableCells();
        if (e.length) return e[Math.floor(Math.random() * e.length)]
    }, Grid.prototype.availableCells = function() {
        var e = [];
        return this.eachCell((function(t, i, o) {
            o || e.push({
                x: t,
                y: i
            })
        })), e
    }, Grid.prototype.eachCell = function(e) {
        for (var t = 0; t < this.size; t++)
            for (var i = 0; i < this.size; i++) e(t, i, this.cells[t][i])
    }, Grid.prototype.cellsAvailable = function() {
        return !!this.availableCells().length
    }, Grid.prototype.cellAvailable = function(e) {
        return !this.cellOccupied(e)
    }, Grid.prototype.cellOccupied = function(e) {
        return !!this.cellContent(e)
    }, Grid.prototype.cellContent = function(e) {
        return this.withinBounds(e) ? this.cells[e.x][e.y] : null
    }, Grid.prototype.insertTile = function(e) {
        this.cells[e.x][e.y] = e
    }, Grid.prototype.removeTile = function(e) {
        this.cells[e.x][e.y] = null
    }, Grid.prototype.withinBounds = function(e) {
        return e.x >= 0 && e.x < this.size && e.y >= 0 && e.y < this.size
    }, Grid.prototype.serialize = function() {
        for (var e = [], t = 0; t < this.size; t++)
            for (var i = e[t] = [], o = 0; o < this.size; o++) i.push(this.cells[t][o] ? this.cells[t][o].serialize() : null);
        return {
            size: this.size,
            cells: e
        }
    }, Tile.prototype.savePosition = function() {
        this.previousPosition = {
            x: this.x,
            y: this.y
        }
    }, Tile.prototype.updatePosition = function(e) {
        this.x = e.x, this.y = e.y
    }, Tile.prototype.serialize = function() {
        return {
            position: {
                x: this.x,
                y: this.y
            },
            value: this.value
        }
    }, window.fakeStorage = {
        _data: {},
        setItem: function(e, t) {
            return this._data[e] = String(t)
        },
        getItem: function(e) {
            return this._data.hasOwnProperty(e) ? this._data[e] : void 0
        },
        removeItem: function(e) {
            return delete this._data[e]
        },
        clear: function() {
            return this._data = {}
        }
    }, LocalStorageManager.prototype.localStorageSupported = function() {
        var e = "test",
            t = window.localStorage;
        try {
            return t.setItem(e, "1"), t.removeItem(e), !0
        } catch (e) {
            return !1
        }
    }, LocalStorageManager.prototype.getBestScore = function() {
        return this.storage.getItem(this.bestScoreKey) || 0
    }, LocalStorageManager.prototype.setBestScore = function(e) {
        this.storage.setItem(this.bestScoreKey, e)
    }, LocalStorageManager.prototype.getGameState = function() {
        var e = this.storage.getItem(this.gameStateKey);
        return e ? JSON.parse(e) : null
    }, LocalStorageManager.prototype.setGameState = function(e) {
        this.storage.setItem(this.gameStateKey, JSON.stringify(e))
    }, LocalStorageManager.prototype.clearGameState = function() {
        this.storage.removeItem(this.gameStateKey)
    }, LocalStorageManager.prototype.setNoticeClosed = function(e) {
        this.storage.setItem(this.noticeClosedKey, JSON.stringify(e))
    }, LocalStorageManager.prototype.getNoticeClosed = function() {
        return JSON.parse(this.storage.getItem(this.noticeClosedKey) || "false")
    }, LocalStorageManager.prototype.setCookieNoticeClosed = function(e) {
        this.storage.setItem(this.cookieNoticeClosedKey, JSON.stringify(e))
    }, LocalStorageManager.prototype.getCookieNoticeClosed = function() {
        return JSON.parse(this.storage.getItem(this.cookieNoticeClosedKey) || "false")
    }, GameManager.prototype.restart = function() {
        this.storageManager.clearGameState(), this.actuator.continueGame(), this.setup()
    }, GameManager.prototype.keepPlaying = function() {
        this.keepPlaying = !0, this.actuator.continueGame()
    }, GameManager.prototype.isGameTerminated = function() {
        return this.over || this.won && !this.keepPlaying
    }, GameManager.prototype.setup = function() {
        var e = this.storageManager.getGameState();
        e ? (this.grid = new Grid(e.grid.size, e.grid.cells), this.score = e.score, this.over = e.over, this.won = e.won, this.keepPlaying = e.keepPlaying) : (this.grid = new Grid(this.size), this.score = 0, this.over = !1, this.won = !1, this.keepPlaying = !1, this.addStartTiles()), this.actuate()
    }, GameManager.prototype.addStartTiles = function() {
        for (var e = 0; e < this.startTiles; e++) this.addRandomTile()
    }, GameManager.prototype.addRandomTile = function() {
        if (this.grid.cellsAvailable()) {
            var e = Math.random() < .9 ? 2 : 4,
                t = new Tile(this.grid.randomAvailableCell(), e);
            this.grid.insertTile(t)
        }
    }, GameManager.prototype.actuate = function() {
        this.storageManager.getBestScore() < this.score && this.storageManager.setBestScore(this.score), this.over ? this.storageManager.clearGameState() : this.storageManager.setGameState(this.serialize()), this.actuator.actuate(this.grid, {
            score: this.score,
            over: this.over,
            won: this.won,
            bestScore: this.storageManager.getBestScore(),
            terminated: this.isGameTerminated()
        })
    }, GameManager.prototype.serialize = function() {
        return {
            grid: this.grid.serialize(),
            score: this.score,
            over: this.over,
            won: this.won,
            keepPlaying: this.keepPlaying
        }
    }, GameManager.prototype.prepareTiles = function() {
        this.grid.eachCell((function(e, t, i) {
            i && (i.mergedFrom = null, i.savePosition())
        }))
    }, GameManager.prototype.moveTile = function(e, t) {
        this.grid.cells[e.x][e.y] = null, this.grid.cells[t.x][t.y] = e, e.updatePosition(t)
    }, GameManager.prototype.move = function(e) {
        var t = this;
        if (!this.isGameTerminated()) {
            var i, o, n = this.getVector(e),
                a = this.buildTraversals(n),
                r = !1;
            this.prepareTiles(), a.x.forEach((function(e) {
                a.y.forEach((function(a) {
                    if (i = {
                            x: e,
                            y: a
                        }, o = t.grid.cellContent(i)) {
                        var s = t.findFarthestPosition(i, n),
                            c = t.grid.cellContent(s.next);
                        if (c && c.value === o.value && !c.mergedFrom) {
                            var l = new Tile(s.next, 2 * o.value);
                            l.mergedFrom = [o, c], t.grid.insertTile(l), t.grid.removeTile(o), o.updatePosition(s.next), t.score += l.value, 2048 === l.value && (t.won = !0)
                        } else t.moveTile(o, s.farthest);
                        t.positionsEqual(i, o) || (r = !0)
                    }
                }))
            })), r && (this.addRandomTile(), this.movesAvailable() || (this.over = !0), this.actuate())
        }
    }, GameManager.prototype.getVector = function(e) {
        return {
            0: {
                x: 0,
                y: -1
            },
            1: {
                x: 1,
                y: 0
            },
            2: {
                x: 0,
                y: 1
            },
            3: {
                x: -1,
                y: 0
            }
        } [e]
    }, GameManager.prototype.buildTraversals = function(e) {
        for (var t = {
                x: [],
                y: []
            }, i = 0; i < this.size; i++) t.x.push(i), t.y.push(i);
        return 1 === e.x && (t.x = t.x.reverse()), 1 === e.y && (t.y = t.y.reverse()), t
    }, GameManager.prototype.findFarthestPosition = function(e, t) {
        var i;
        do {
            e = {
                x: (i = e).x + t.x,
                y: i.y + t.y
            }
        } while (this.grid.withinBounds(e) && this.grid.cellAvailable(e));
        return {
            farthest: i,
            next: e
        }
    }, GameManager.prototype.movesAvailable = function() {
        return this.grid.cellsAvailable() || this.tileMatchesAvailable()
    }, GameManager.prototype.tileMatchesAvailable = function() {
        for (var e, t = 0; t < this.size; t++)
            for (var i = 0; i < this.size; i++)
                if (e = this.grid.cellContent({
                        x: t,
                        y: i
                    }))
                    for (var o = 0; o < 4; o++) {
                        var n = this.getVector(o),
                            a = {
                                x: t + n.x,
                                y: i + n.y
                            },
                            r = this.grid.cellContent(a);
                        if (r && r.value === e.value) return !0
                    }
        return !1
    }, GameManager.prototype.positionsEqual = function(e, t) {
        return e.x === t.x && e.y === t.y
    }, window.requestAnimationFrame((function() {
        void 0 !== window.PokiSDK ? PokiSDK.init().then((function() {
            PokiSDK.gameLoadingStart(), PokiSDK.gameLoadingProgress({
                percentageDone: 1
            }), PokiSDK.gameLoadingFinished(), runApplication()
        })).catch((() => {
            runApplication()
        })) : runApplication()
    }));
