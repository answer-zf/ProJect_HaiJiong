(function() {
    window.PREMIUM_APP = window.PREMIUM_APP || {};

    window.PREMIUM_APP.util = window.PREMIUM_APP.util || {};

    window.PREMIUM_APP.view = window.PREMIUM_APP.view || {};

    (function() {
        var console;
        console = {
            log: function() {
                return arguments;
            },
            debug: function() {
                return arguments;
            },
            error: function() {
                return arguments;
            },
            info: function() {
                return arguments;
            }
        };
        window.console = window.console || console;
    })();

    (function() {
        var str;
        str = void 0;
        if (navigator.userAgent.indexOf("MSIE") !== -1) {
            str = window.navigator.appVersion.toLowerCase();
            if (str.indexOf("msie 8.") !== -1 || str.indexOf("msie 7.") !== -1) {
                window.PREMIUM_APP.view.isOldIE = true;
            } else {
                window.PREMIUM_APP.view.isOldIE = false;
            }
        } else {
            window.PREMIUM_APP.view.isOldIE = false;
        }
    })();


    /*
     namespace
     */

    PREMIUM_APP.namespace = function(ns_string, prop_name, instance) {
        var i, j, parent, parts, ref;
        if (prop_name == null) {
            prop_name = null;
        }
        if (instance == null) {
            instance = null;
        }
        parts = ns_string.split('.');
        parent = this;
        i = 0;
        for (i = j = 0, ref = parts.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
            if (typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
            if (prop_name !== null && instance !== null) {
                if (i === parts.length - 1) {
                    parent[String(prop_name)] = instance;
                }
            }
        }
        return parent;
    };

}).call(this);

(function() {
    var _addClass, _doc_element, _find, _handleOrientation, _hasClass, _isFBAN, _orientation_event, _removeClass, _supports_orientation, _user_agent;

    window.device = {};

    _doc_element = window.document.documentElement;

    _user_agent = window.navigator.userAgent.toLowerCase();

    device.ios = function() {
        return device.iphone() || device.ipod() || device.ipad();
    };

    device.iphone = function() {
        return _find('iphone');
    };

    device.ipod = function() {
        return _find('ipod');
    };

    device.ipad = function() {
        return _find('ipad');
    };

    device.android = function() {
        return _find('android');
    };

    device.androidPhone = function() {
        return device.android() && _find('mobile');
    };

    device.androidTablet = function() {
        return device.android() && !_find('mobile');
    };

    device.blackberry = function() {
        return _find('blackberry') || _find('bb10') || _find('rim');
    };

    device.blackberryPhone = function() {
        return device.blackberry() && !_find('tablet');
    };

    device.blackberryTablet = function() {
        return device.blackberry() && _find('tablet');
    };

    device.windows = function() {
        return _find('windows');
    };

    device.windowsPhone = function() {
        return device.windows() && _find('phone');
    };

    device.windowsTablet = function() {
        return device.windows() && _find('touch');
    };

    device.fxos = function() {
        return _find('(mobile; rv:') || _find('(tablet; rv:');
    };

    device.fxosPhone = function() {
        return device.fxos() && _find('mobile');
    };

    device.fxosTablet = function() {
        return device.fxos() && _find('tablet');
    };

    device.mobile = function() {
        return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone();
    };

    device.tablet = function() {
        return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
    };

    device.portrait = function() {
        return Math.abs(window.orientation) !== 90;
    };

    device.landscape = function() {
        return Math.abs(window.orientation) === 90;
    };

    device.facebookApp = function() {
        return _find('fban');
    };

    device.twitterApp = function() {
        return _find('twitter');
    };

    _find = function(needle) {
        return _user_agent.indexOf(needle) !== -1;
    };

    _hasClass = function(class_name) {
        var regex;
        regex = new RegExp(class_name, 'i');
        return _doc_element.className.match(regex);
    };

    _addClass = function(class_name) {
        if (!_hasClass(class_name)) {
            return _doc_element.className += " " + class_name;
        }
    };

    _removeClass = function(class_name) {
        if (_hasClass(class_name)) {
            return _doc_element.className = _doc_element.className.replace(class_name, "");
        }
    };

    if (device.ios()) {
        if (device.ipad()) {
            _addClass("ios ipad tablet");
        } else if (device.iphone()) {
            _addClass("ios iphone mobile");
        } else if (device.ipod()) {
            _addClass("ios ipod mobile");
        }
        if (device.facebookApp()) {
            _addClass("facebook-app");
        }
        if (device.twitterApp()) {
            _addClass("twitter-app");
        }
    } else if (device.android()) {
        if (device.androidTablet()) {
            _addClass("android tablet");
        } else {
            _addClass("android mobile");
        }
    } else if (device.blackberry()) {
        if (device.blackberryTablet()) {
            _addClass("blackberry tablet");
        } else {
            _addClass("blackberry mobile");
        }
    } else if (device.windows()) {
        if (device.windowsTablet()) {
            _addClass("windows tablet");
        } else if (device.windowsPhone()) {
            _addClass("windows mobile");
        } else {
            _addClass("desktop");
        }
    } else if (device.fxos()) {
        if (device.fxosTablet()) {
            _addClass("fxos tablet");
        } else {
            _addClass("fxos mobile");
        }
    } else {
        _addClass("desktop");
    }

    _handleOrientation = function() {
        if (device.landscape()) {
            _removeClass("portrait");
            return _addClass("landscape");
        } else {
            _removeClass("landscape");
            return _addClass("portrait");
        }
    };

    _supports_orientation = "onorientationchange" in window;

    _orientation_event = _supports_orientation ? "orientationchange" : "resize";

    _isFBAN = navigator.userAgent.indexOf("FBAN") >= 0;

    if (_isFBAN === false) {
        if (window.addEventListener) {
            window.addEventListener(_orientation_event, _handleOrientation, false);
            if (_user_agent.indexOf("android 2.3") >= 0) {
                window.addEventListener("resize", _handleOrientation, false);
            }
        } else if (window.attachEvent) {
            window.attachEvent(_orientation_event, _handleOrientation);
        } else {
            window[_orientation_event] = _handleOrientation;
        }
    }

    _handleOrientation();

}).call(this);

(function() {


}).call(this);


/*
 * SHARE
 *
 *
 */

(function() {
    PREMIUM_APP.namespace('view').ShareArea = Backbone.View.extend({
        events: {
            'click .share_facebook': 'onFacebookBtn',
            'click .share_twitter': 'onTwitterBtn',
            'click .share_line': 'onLineBtn'
        },

        /**
         * ???瑷??
         *
         */
        initialize: function() {},

        /**
         * Facebook
         *
         */
        onFacebookBtn: function(event) {
            var $tag, url;
            event.preventDefault();
            $tag = $(event.currentTarget);
            url = encodeURIComponent($tag.data('url'));
            window.open('http://www.facebook.com/sharer/sharer.php?u=' + url, 'facebookwindow', 'width=580,height=380,scrollbars=no');
        },

        /**
         * Twitter
         *
         */
        onTwitterBtn: function(event) {
            var $tag, hash, text, url;
            event.preventDefault();
            $tag = $(event.currentTarget);
            url = encodeURIComponent($tag.data('url'));
            text = encodeURIComponent($tag.data('text'));
            hash = encodeURIComponent($tag.data('hashtags') || '');
            window.open('https://twitter.com/intent/tweet?&text=' + text + '&url=' + url + '&hashtags=' + hash, 'twitterwindow', 'width=580,height=380,scrollbars=no');
        },

        /**
         * Line
         *
         */
        onLineBtn: function(event) {
            var $tag, text;
            event.preventDefault();
            $tag = $(event.currentTarget);
            text = encodeURIComponent($tag.data('text'));
            window.open('http://line.me/R/msg/text/?' + text, 'linewindow');
        }
    });

}).call(this);




(function() {
    PREMIUM_APP.namespace('view').ScrollFade = (function($) {
        var $effects, $window, _exports, _onScroll, init;
        $effects = null;
        $window = null;
        init = function() {
            $effects = $('.effect');
            $window = $(window);
            if ($effects.length === 0) {
                return;
            }
            $window.on("scroll", _onScroll);
            _onScroll();
        };


        _onScroll = function() {
            var scroll, windowHeight;
            scroll = $window.scrollTop();
            windowHeight = $window.height();
            $effects.each(function() {
                var imgPos;
                imgPos = $(this).offset().top;
                if (scroll > imgPos - windowHeight + windowHeight / 5) {
                    if (!$(this).hasClass('appear')) {
                        $(this).addClass('appear');
                    }
                } else {

                }
            });
        };
        _exports = {
            init: init
        };
        return _exports;
    })(jQuery);

}).call(this);




(function() {
    PREMIUM_APP.namespace("view").PageTopBtn = Backbone.View.extend({
        events: {
            "click a": "onClick"
        },

        /**
         * constructor
         *
         */
        initialize: function() {},


        onClick: function() {
            this.scrollTo(0);
            return false;
        },


        scrollTo: function(_destY, _time, _ease) {
            var deferred;
            if (_time == null) {
                _time = 1000;
            }
            if (_ease == null) {
                _ease = "easeOutExpo";
            }
            deferred = $.Deferred();
            if (_destY < 0) {
                _destY = 0;
            }
            $("html, body").stop().velocity('stop').velocity("scroll", {
                duration: _time,
                offset: _destY,
                easing: _ease,
                complete: function() {
                    deferred.resolve();
                }
            });
            return deferred.promise();
        }
    });

}).call(this);




(function() {
    PREMIUM_APP.namespace("model").Scroll = Backbone.Model.extend({
        defaults: {
            scrollTop: 0,
            screenHeight: 0,
            screenWidth: 0,
            current: ""
        },

        /**
         * constructor
         *
         */
        initialize: function() {
            this.resizeTimer = NaN;
            _.bindAll(this, "getScrollTop");
            this.getScrollTop();
            setInterval(this.getScrollTop, 100);
            $(window).on("resize", (function(_this) {
                return function() {
                    if (isNaN(_this.resizeTimer) === false) {
                        clearTimeout(_this.resizeTimer);
                    }
                    _this.resizeTimer = setTimeout(function() {
                        _this.resizeTimer = NaN;
                        _this.getScrollTop();
                    }, 100);
                };
            })(this));
        },

        /**
         * 浣?疆????? 楂? ???
         *
         */
        getScrollTop: function() {
            this.set({
                scrollTop: document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset,
                screenHeight: window.innerHeight || document.documentElement.clientHeight,
                screenWidth: window.innerWidth || document.documentElement.clientWidth
            });
        }
    });

}).call(this);


/**
 *
 * ??vent??
 *
 */

(function() {
    PREMIUM_APP.namespace("event").common = {
        "HOWTO_OPEN": "HOWTO_OPEN",
        "ABOUT_OPEN": "ABOUT_OPEN",
        "LOADING_COMPLETE": "LOADING_COMPLETE"
    };

}).call(this);


/*
 * Header Menu
 *
 *
 */

(function() {
    PREMIUM_APP.namespace('view').HeaderMenu = Backbone.View.extend({
        events: {
            "click .navi_top a": "onNaviTop",
            "click .navi_about a": "onNaviAbout",
            "click .navi_recipes a": "onNaviRecipes",
            "click .navi_product a": "onNaviProduct"
        },

        /**
         * ???瑷??
         *
         */
        initialize: function() {
            var ua;
            _.bindAll(this, 'onScroll', 'onResize');
            this.isIndex = $("#container").data('page') === 'index';
            this.isPC = true;
            this.breakpoint = 640;
            this.menuHeight = 0;
            this._isAndroid = false;
            ua = navigator.userAgent.toLowerCase();
            this._isAndroid = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1);
            this.$window = $(window);
            this.$parent = this.$el.parent();
            this.$naviButton = this.$el.find('.navi_button');
            this.$closeButton = this.$el.find('.menu_close_btn');
            this.$naviButton.on('click', (function(_this) {
                return function(event) {
                    event.preventDefault();
                    _this.$el.toggleClass('opened');
                    $(".navi_inner").slideDown("fast");
                    _this.onClose();
                };
            })(this));
            this.$closeButton.on('click', (function(_this) {
                return function(event) {
                    event.preventDefault();
                    if (_this.$el.hasClass('opened')) {
                        _this.$el.removeClass('opened');
                        $(".navi_inner").slideUp("fast");
                        _this.onClose();
                    }
                };
            })(this));
            if (this.isIndex) {
                this.$window.on("scroll", this.onScroll);
                $('body').on('touchmove', this.onScroll);
                $(window).on('resize', this.onResize);
            } else {
                this.$el.addClass('fixed');
                this.$el.addClass('white-base');
                this.$el.css({
                    top: 0
                });
            }
            this.onResize();
        },

        /**
         *
         *
         */
        onScroll: function() {
            var scrollTop;
            scrollTop = this.$window.scrollTop();
            if (this.isPC) {
                if (scrollTop > this.menuHeight) {
                    if (!this.$el.hasClass('fixed')) {
                        this.$el.addClass('fixed');
                        this.$el.addClass('white-base');
                    }
                } else {
                    if (this.$el.hasClass('fixed')) {
                        this.$el.removeClass('fixed');
                        this.$el.removeClass('white-base');
                        this.$el.removeClass('slide-up');
                        if (!this.$el.hasClass('opened')) {
                            this.reprepend();
                        }
                    }
                }
                this.limit = window.innerHeight * 0.25;
                if (scrollTop > this.limit) {
                    if (!this.$el.hasClass('slide-down')) {
                        this.$el.addClass('slide-down');
                        this.$el.removeClass('slide-up');
                    }
                } else {
                    if (this.$el.hasClass('slide-down')) {
                        this.$el.removeClass('slide-down');
                        this.$el.addClass('slide-up');
                    }
                }
            } else {
                if (scrollTop > this.menuHeight) {
                    if (!this.$el.hasClass('fixed')) {
                        this.$el.addClass('fixed');
                        this.$el.addClass('slide-down');
                        this.$el.addClass('white-base');
                    }
                } else {
                    if (this.$el.hasClass('fixed')) {
                        this.$el.removeClass('fixed');
                        this.$el.removeClass('slide-down');
                        this.$el.removeClass('white-base');
                        if (!this.$el.hasClass('opened')) {
                            this.reprepend();
                        }
                    }
                }
            }
        },

        /**
         * ?°??ャ????????ㄣ?
         *
         */
        onClose: function() {
            if (!this.$el.hasClass('opened')) {
                this.reprepend();
            }
        },

        /**
         * ?°??ャ???Κ???缃???淬?
         * 锛??????????ndroid妯?????????х甫浣?疆??????锛?
         */
        reprepend: function() {
            if (this._isAndroid) {
                this.$el.prependTo(this.$parent);
            }
        },

        /**
         * ????ゃ???
         *
         */
        onResize: function() {
            var innerWidth;
            innerWidth = window.innerWidth;
            if (innerWidth > this.breakpoint) {
                this.menuHeight = 69;
                this.isPC = true;
            } else {
                this.menuHeight = 88 * 0.5;
                this.isPC = false;
            }
        },

        /**
         *
         *
         */
        onNaviTop: function() {
            if (this.isIndex) {
                this.$closeButton.trigger('click');
                this.goto(0);
                return false;
            }
        },

        /**
         *
         *
         */
        onNaviAbout: function() {
            this.$closeButton.trigger('click');
            PREMIUM_APP.mediator.common.trigger(PREMIUM_APP.event.common.ABOUT_OPEN);
            return false;
        },

        /**
         *
         *
         */
        onNaviRecipes: function() {
            if (this.isIndex) {
                this.$closeButton.trigger('click');
                this.goto('recipe_section');
                return false;
            }
        },

        /**
         *
         *
         */
        onNaviProduct: function() {
            if (this.isIndex) {
                this.$closeButton.trigger('click');
                this.goto('product_section');
                return false;
            }
        },

        /**
         * 琛??????板?ゃ?澶??
         *
         */
        goto: function(_target, _options) {
            var dest;
            if (_options == null) {
                _options = {};
            }
            dest = 0;
            if (isNaN(_target) === true) {
                dest = $("#" + _target).eq(0).offset().top;
            } else {
                dest = _target;
            }
            return this.scrollTo(dest, _options.time, _options.ease);
        },

        /**
         * ?广???????濮?
         *
         */
        scrollTo: function(_destY, _time, _ease) {
            var deferred;
            if (_time == null) {
                _time = 1000;
            }
            if (_ease == null) {
                _ease = "easeOutExpo";
            }
            deferred = $.Deferred();
            if (_destY < 0) {
                _destY = 0;
            }
            $("html, body").stop().velocity('stop').velocity("scroll", {
                duration: _time,
                offset: _destY,
                easing: _ease,
                complete: function() {
                    deferred.resolve();
                }
            });
            return deferred.promise();
        }
    });

}).call(this);


/*
 * Footer Menu
 *
 *
 */

(function() {
    PREMIUM_APP.namespace('view').FooterMenu = Backbone.View.extend({

        /**
         * ???瑷??
         *
         */
        initialize: function() {
            this.$el.find('.toggle').on('click', function() {
                var $ul, num, spd;
                num = $(this).next().find('li').length;
                $(this).toggleClass('active');
                $ul = $(this).next();
                if ($(this).hasClass('active')) {
                    spd = 130 * num;
                } else {
                    spd = 200;
                }
                $ul.slideToggle(spd);
            });
        }
    });

}).call(this);


/**
 * ?????????ｃ???????璞°??┿?
 * ?汇?????┿?????裤???娇?ㄣ???
 * ??iew??
 *
 */

(function() {
    PREMIUM_APP.namespace("view").AbstractModal = Backbone.View.extend({

        /**
         * constructor
         *
         */
        initialize: function() {
            this.$window = $(window);
            this.$modalOverlay = $("#modal_overlay");
            this.$btnClose = this.$el.find(".close_btn");
            this.$detail = this.$el.find(".modal_detail");
            _.bindAll(this, "openModal", "closeModal", "_openModalWindow", "onBtnClose", "onOpen", "onFadeIn");
        },

        /**
         * ???????????
         *
         */
        openModal: function() {
            this._openModalWindow().done((function(_this) {
                return function() {
                    var yPos;
                    yPos = _this.model.get("scrollTop");
                    _this.$detail.addClass("show");
                    _this.$btnClose.addClass("show");
                    _this.onFadeIn();
                    _this.$detail.css({
                        top: yPos,
                        opacity: 0
                    }).velocity("stop").velocity({
                        opacity: 1
                    }, {
                        mobileHA: false,
                        duration: 500,
                        easing: "easeOutQuad",
                        complete: _this.onOpen
                    });
                };
            })(this));
        },

        /**
         * overlay????с?????冲?浜??
         *
         */
        onFadeIn: function() {},

        /**
         * ??????瀹????
         *
         */
        onOpen: function() {},

        /**
         * ????笺?瀹????
         *
         */
        onClose: function() {},

        /**
         * ?????????????
         *
         */
        closeModal: function() {
            var f;
            this.$btnClose.off("click", this.onBtnClose);
            this.$modalOverlay.off("click", this.onBtnClose);
            this.$detail.removeClass("show");
            this.$btnClose.removeClass("show");
            this.$detail.css({
                display: 'none'
            });
            f = this.$detail.offset();
            this.$detail.css({
                display: 'block'
            });
            this.$modalOverlay.velocity("stop").velocity({
                opacity: 0
            }, {
                mobileHA: false,
                duration: 1000,
                easing: "easeOutQuad",
                complete: (function(_this) {
                    return function() {
                        _this.$modalOverlay.css({
                            display: "none"
                        });
                        _this.$el.removeClass("show");
                        _this.onClose();
                    };
                })(this)
            });
        },

        /**
         * ?????????????с?????炽????
         *
         */
        _openModalWindow: function() {
            var deferred;
            deferred = $.Deferred();
            this.$el.addClass("show");
            this.$modalOverlay.css({
                display: "block",
                opacity: 0
            }).velocity("stop").velocity({
                opacity: 0.9
            }, {
                duration: 500,
                easing: "easeOutQuad",
                complete: function() {
                    deferred.resolve();
                }
            });
            this.$btnClose.on("click", this.onBtnClose);
            this.$modalOverlay.on("click", this.onBtnClose);
            return deferred.promise();
        },

        /**
         * ????笺?????炽???????
         *
         */
        onBtnClose: function() {
            this.closeModal();
        }
    });


    /**
     * ?层??? ???????
     * ??iew??
     *
     */

    PREMIUM_APP.namespace("view").HowtoModal = PREMIUM_APP.view.AbstractModal.extend({

        /**
         * constructor
         *
         */
        initialize: function() {
            this.$fade = this.$el.find('.fade');
            PREMIUM_APP.view.AbstractModal.prototype.initialize.apply(this);
            this.listenTo(PREMIUM_APP.mediator.common, PREMIUM_APP.event.common.HOWTO_OPEN, this.openModal);
        },
        onOpen: function() {
            this.$fade.addClass('appear');
        },
        onClose: function() {
            this.$fade.removeClass('appear');
        }
    });


    /**
     * ABOUT ???????
     * ??iew??
     *
     */

    PREMIUM_APP.namespace("view").AboutModal = PREMIUM_APP.view.AbstractModal.extend({

        /**
         * constructor
         *
         */
        initialize: function() {
            this.$fade = this.$el.find('.fade');
            PREMIUM_APP.view.AbstractModal.prototype.initialize.apply(this);
            this.listenTo(PREMIUM_APP.mediator.common, PREMIUM_APP.event.common.ABOUT_OPEN, this.openModal);
        },
        onOpen: function() {
            this.$fade.addClass('appear');
        },
        onClose: function() {
            this.$fade.removeClass('appear');
        }
    });

}).call(this);


/**
 * config
 *
 *
 */

(function() {
    PREMIUM_APP.config = {
        IS_DEVELOP: false
    };

}).call(this);


/**
 * 骞撮舰瑾????〃绀烘??裤??????OOKIE???瀛?
 *
 */

(function() {
    PREMIUM_APP.namespace("data").indexCookie = (function($) {
        var INDEX_KEY, load, options, save;
        INDEX_KEY = "INDEX_KEY";
        options = {
            expires: 365,
            path: "/"

            /**
             * Cookie???瀛????
             *
             */
        };
        save = function() {
            if (!PREMIUM_APP.config.IS_DEVELOP) {
                $.cookie(INDEX_KEY, "true", options);
            }
        };

        /**
         * Cookie???????裤?????恒?
         *
         */
        load = function() {
            var result;
            result = true;
            if (!PREMIUM_APP.config.IS_DEVELOP) {
                result = $.cookie(INDEX_KEY);
            }
            return result;
        };
        return {
            save: save,
            load: load
        };
    })(jQuery);

}).call(this);


/*
 *  ???????炽?绲?????ABOUT?????????????????
 *
 *
 */

(function() {
    PREMIUM_APP.namespace('view').AboutOpener = Backbone.View.extend({

        /**
         * constructor
         *
         */
        initialize: function() {
            this.listenTo(PREMIUM_APP.mediator.common, PREMIUM_APP.event.common.LOADING_COMPLETE, this.check);
        },
        check: function() {
            var isAlready;
            isAlready = PREMIUM_APP.data.indexCookie.load();
            if (isAlready === "true") {

            } else {
                PREMIUM_APP.data.indexCookie.save();
                PREMIUM_APP.mediator.common.trigger(PREMIUM_APP.event.common.ABOUT_OPEN);
            }
        }
    });

}).call(this);


/*
 *  howto???????〃绀烘?????ゃ?????ャ????涓??瑕?????????????????涓????
 *
 *
 */

(function() {
    PREMIUM_APP.namespace('view').Underlay = Backbone.View.extend({

        /**
         * constructor
         *
         */
        initialize: function() {
            _.bindAll(this, 'onScroll');
            this.$window = $(window);
            this.$window.on("scroll", this.onScroll);
            this.onScroll();
        },

        /**
         * ?广???????
         *
         */
        onScroll: function() {
            var scrollTop;
            scrollTop = this.$window.scrollTop();
            if (scrollTop > window.innerHeight) {
                this.$el.addClass('active');
            } else {
                this.$el.removeClass('active');
            }
        }
    });

}).call(this);


/*
 *
 *
 *
 */

(function() {
    PREMIUM_APP.namespace('view').ProductSection = Backbone.View.extend({
        events: {
            "click .btn_howto": "onHowtoBtn"
        },

        /**
         * ???瑷??
         *
         */
        initialize: function() {},
        onHowtoBtn: function() {
            PREMIUM_APP.mediator.common.trigger(PREMIUM_APP.event.common.HOWTO_OPEN);
        }
    });

}).call(this);


/**
 * ???????告??舵????瀛????ODEL
 * ??odel??
 *
 */

(function() {
    PREMIUM_APP.namespace("model").RecipesModel = Backbone.Model.extend({
        defaults: {
            category: '',
            tag: '',
            sort: ''
        },

        /**
         * ???瑷??
         *
         */
        initialize: function() {}
    });

}).call(this);


/*
 *
 *
 *
 */

(function() {
    PREMIUM_APP.namespace('view').RecipesView = Backbone.View.extend({
        events: {
            'click .categories_select a': 'onCategoryClick',
            'click .tags_select a': 'onTagClick',
            'click .sort_select a': 'onSortClick',
            'click .pagination a.left': 'onArrowLeft',
            'click .pagination a.right': 'onArrowRight'
        },

        /**
         * ???瑷??
         *
         */
        initialize: function() {
            _.bindAll(this, 'onCategoryChange');
            this.$categories_select = this.$el.find('.categories_select');
            this.tags_select = this.$el.find('.tags_select');
            this.$sort_select = this.$el.find('.sort_select');
            this.$recipe_list = this.$el.find('.recipe_list');
            this.listenTo(this.model, 'change:category', this.onCategoryChange);
            this.listenTo(this.model, 'change:tag', this.onTagChange);
            this.listenTo(this.model, 'change:sort', this.onSortChange);
            this.model.set('category', 'all');
            this.model.set('sort', 'newness');
        },
        onCategoryClick: function(event) {
            var category;
            category = $(event.currentTarget).data('category');
            this.model.set('category', category);
        },
        onTagClick: function(event) {
            var currentTag, tag;
            tag = $(event.currentTarget).data('tag');
            currentTag = this.model.get('tag');
            if (tag === currentTag) {
                this.model.set('tag', '');
            } else {
                this.model.set('tag', tag);
            }
        },
        onSortClick: function(event) {
            var sort;
            sort = $(event.currentTarget).data('sort');
            this.model.set('sort', sort);
        },
        onCategoryChange: function() {
            var category;
            category = this.model.get('category');
            this.$categories_select.find('a').removeClass('current');
            this.$categories_select.find('[data-category=' + category + ']').addClass('current');
        },
        onTagChange: function() {
            var tag;
            tag = this.model.get('tag');
            this.tags_select.find('a').removeClass('current');
            if (tag !== '') {
                this.tags_select.find('[data-tag=' + tag + ']').addClass('current').removeClass('grayout');
                this.tags_select.find('a').not(".current").addClass('grayout');
            } else {
                this.tags_select.find('a').removeClass('grayout');
            }
        },
        onSortChange: function() {
            var sort;
            sort = this.model.get('sort');
            this.$sort_select.find('a').removeClass('current');
            this.$sort_select.find('[data-sort=' + sort + ']').addClass('current');
        },
        onArrowLeft: function() {},
        onArrowRight: function() {},
        changeAnimation: function() {
            var $a, count, num;
            $a = this.$recipe_list.find('a');
            num = $a.length;
            TweenMax.killAll();
            count = 0;
            while (count < num) {
                $a.eq(count).css({
                    opacity: 0
                });
                TweenMax.fromTo($a.eq(count), 1.6 - 0.2 * (count + 1), {
                    opacity: 0,
                    'margin-left': 20 + 4 * (count + 1)
                }, {
                    opacity: 1,
                    'margin-left': '0',
                    ease: Expo.easeOut,
                    delay: count * 0.1
                });
                count++;
            }
        }
    });

}).call(this);


/**
 *
 * ??vent??
 *
 */

(function() {
    PREMIUM_APP.namespace("event").index = {
        "ON_RESIZE": "ON_RESIZE"
    };

}).call(this);


/*
 *
 *
 *
 */

(function() {
    PREMIUM_APP.namespace('view').NewsTicker = Backbone.View.extend({

        /**
         * ???瑷??
         *
         */
        initialize: function() {
            $(this.$el.find('ul')).slick({
                autoplay: true,
                autoplaySpeed: 5000,
                prevArrow: this.$el.find('.arrow_left'),
                nextArrow: this.$el.find('.arrow_right'),
                speed: 800,
                cssEase: 'ease-out',
                useTransform: true
            });
        }
    });

}).call(this);


/*
 *
 *
 *
 */

(function() {
    PREMIUM_APP.namespace('view').MainVisual = Backbone.View.extend({

        /**
         * ???瑷??
         *
         */
        initialize: function() {
            var count;
            this.imageList = [];
            this.$slideshow = this.$el.find('.slideshow');
            this.$ul = this.$slideshow.find('ul');
            this.$li = this.$ul.find('li');
            this.max = this.$li.length;
            this.index = 0;
            this.$slideshow.find('.slide').each(function() {
                var src, url;
                src = $(this).data('src');
                url = "url(" + src + ") center center no-repeat";
                $(this).css({
                    'background': url,
                    'background-size': 'cover',
                    'width': '100%',
                    'height': '100%'
                });
            });
            count = 0;
            while (count < this.max) {
                this.imageList[count] = $(this.$li.eq(this.max - count - 1));
                count++;
            }
            this.$window = $(window);
            this.$window.on('resize', (function(_this) {
                return function() {
                    _this.onResize();
                };
            })(this));
            this.timer = setInterval((function(_this) {
                return function() {
                    _this.onTimer();
                };
            })(this), 3000);
            this.onResize();
        },
        onResize: function() {
            var windowHeight;
            windowHeight = this.$window.height();
            this.$el.css({
                height: windowHeight + 'px'
            });
            this.$li.find('.image').css({
                height: windowHeight + 'px'
            });
            PREMIUM_APP.mediator.index.trigger(PREMIUM_APP.event.index.ON_RESIZE, windowHeight);
        },
        onTimer: function() {
            this.changeImage();
        },
        changeImage: function() {
            if (!document.hasFocus()) {
                return;
            }
            this.$current = this.imageList[this.index];
            this.index++;
            if (this.index === this.max) {
                this.index = 0;
            }
            this.$current.velocity({
                height: '0%'
            }, {
                duration: 2000,
                easing: 'easeOutQuart',
                begin: function() {},
                complete: (function(_this) {
                    return function() {
                        _this.reset();
                    };
                })(this)
            });
        },
        reset: function() {
            this.$current.css({
                height: '100%'
            });
            return this.$current.prependTo(this.$ul);
        }
    });

}).call(this);


/*
 *
 *
 *
 */

(function() {
    PREMIUM_APP.namespace('view').TitleSection = Backbone.View.extend({
        events: {
            'click .product': 'onProductClick'
        },

        /**
         * ???瑷??
         *
         */
        initialize: function() {
            this.listenTo(PREMIUM_APP.mediator.index, PREMIUM_APP.event.index.ON_RESIZE, this.onResize);
        },
        onResize: function(_windowHeight) {
            this.$el.css({
                height: _windowHeight + 'px'
            });
        },
        onProductClick: function() {
            this.goto('product_section');
            return false;
        },

        /**
         * 琛??????板?ゃ?澶??
         *
         */
        goto: function(_target, _options) {
            var dest;
            if (_options == null) {
                _options = {};
            }
            dest = 0;
            if (isNaN(_target) === true) {
                dest = $("#" + _target).eq(0).offset().top;
            } else {
                dest = _target;
            }
            return this.scrollTo(dest, _options.time, _options.ease);
        },

        /**
         * ?广???????濮?
         *
         */
        scrollTo: function(_destY, _time, _ease) {
            var deferred;
            if (_time == null) {
                _time = 1000;
            }
            if (_ease == null) {
                _ease = "easeOutExpo";
            }
            deferred = $.Deferred();
            if (_destY < 0) {
                _destY = 0;
            }
            $("html, body").stop().velocity('stop').velocity("scroll", {
                duration: _time,
                offset: _destY,
                easing: _ease,
                complete: function() {
                    deferred.resolve();
                }
            });
            return deferred.promise();
        }
    });

}).call(this);


/*
 *  INDEX
 *
 *
 */

(function() {
    window.PREMIUM_APP.view.index = (function($) {
        var init;
        init = function() {
            var recipesModel, scrollModel;
            PREMIUM_APP.namespace("mediator").common = _.extend({}, Backbone.Events);
            scrollModel = new PREMIUM_APP.model.Scroll();
            new PREMIUM_APP.view.HeaderMenu({
                el: "#header_menu"
            });
            new PREMIUM_APP.view.FooterMenu({
                el: "#footer_menu"
            });
            new PREMIUM_APP.view.HowtoModal({
                el: "#howto_modal",
                model: scrollModel
            });
            new PREMIUM_APP.view.AboutModal({
                el: "#about_modal",
                model: scrollModel
            });
            new PREMIUM_APP.view.PageTopBtn({
                el: "#page_top_btn"
            });
            PREMIUM_APP.namespace("mediator").index = _.extend({}, Backbone.Events);
            new PREMIUM_APP.view.TitleSection({
                el: "#title_section"
            });
            new PREMIUM_APP.view.MainVisual({
                el: "#mainvisual"
            });
            new PREMIUM_APP.view.NewsTicker({
                el: "#news_ticker"
            });
            recipesModel = new PREMIUM_APP.model.RecipesModel();
            new PREMIUM_APP.view.RecipesView({
                el: "#recipe_section",
                model: recipesModel
            });
            new PREMIUM_APP.view.ProductSection({
                el: "#product_section"
            });
            new PREMIUM_APP.view.AboutOpener();
            new PREMIUM_APP.view.Underlay({
                el: "#underlay"
            });
            $("#product_section").find('.parallax-window').parallax({
                zIndex: 1
            });
            if (device.mobile()) {
                return;
            }
            if (device.tablet()) {
                return;
            }
            if (device.facebookApp()) {
                return;
            }
            if (device.twitterApp()) {
                return;
            }
            skrollr.init({
                forceHeight: false
            });
        };
        return {
            init: init
        };
    })(jQuery);

    $(function() {
        PREMIUM_APP.view.index.init();
    });


    /*
     *  INDEX ????歌??胯炯?垮?浜??
     *
     *
     */

    jQuery.event.add(window, "load", function() {
        var loading;
        PREMIUM_APP.view.ScrollFade.init();
        loading = $("#window_loading");
        loading.velocity({
            opacity: 0
        }, {
            delay: 1000,
            duration: 500,
            complete: function() {
                PREMIUM_APP.mediator.common.trigger(PREMIUM_APP.event.common.LOADING_COMPLETE);
                $(this).remove();
            }
        });
    });

}).call(this);

