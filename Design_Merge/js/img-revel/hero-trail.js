/*
 * Mouse-trail hero effect, ported from Glitch_Dark.html's assets/js/img-revel/
 * (index.js + imageTrail.js + image.js + utils.js), combined into a single
 * classic script instead of ES modules.
 *
 * Why: the original was four `type="module"` files using import/export.
 * Modules are fetched via the Fetch API, which browsers block under the
 * `file://` origin (no CORS headers on local files) — so opening the page
 * by double-clicking it, instead of through a local server, silently killed
 * the whole effect with no visible error beyond the console. A classic
 * script has no such restriction, so this works the same way whether the
 * page is opened directly from disk or served.
 *
 * Behavior is unchanged: relies on the global `gsap` and `imagesLoaded`
 * (loaded as classic scripts just before this one) and targets `.hero-trail`
 * (renamed from the original `.content` to avoid colliding with other
 * generically-named elements on the merged page).
 */
(function () {
	"use strict";

	// ---- utils.js ----
	function preloadImages(selector) {
		selector = selector || "img";
		return new Promise(function (resolve) {
			imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
		});
	}

	function lerp(a, b, n) {
		return (1 - n) * a + n * b;
	}

	function distance(x1, y1, x2, y2) {
		return Math.hypot(x2 - x1, y2 - y1);
	}

	function getMouseDistance(mousePos, lastMousePos) {
		return distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);
	}

	// ---- image.js ----
	function ImageEl(DOM_el) {
		this.DOM = { el: null, inner: null };
		this.defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
		this.timeline = null;
		this.rect = null;

		this.DOM.el = DOM_el;
		this.DOM.inner = this.DOM.el.querySelector(".content__img-inner");
		this.getRect();
		this.initEvents();
	}
	ImageEl.prototype.initEvents = function () {
		var self = this;
		this.resize = function () {
			gsap.set(self.DOM.el, self.defaultStyle);
			self.getRect();
		};
		this.DOM.el.addEventListener("resize", function () {
			self.resize();
		});
	};
	ImageEl.prototype.getRect = function () {
		this.rect = this.DOM.el.getBoundingClientRect();
	};

	// ---- imageTrail.js ----
	var mousePos = { x: 0, y: 0 };
	var cacheMousePos = { x: 0, y: 0 };
	var lastMousePos = { x: 0, y: 0 };

	function getPointerPos(ev) {
		var posx = 0;
		var posy = 0;
		if (!ev) ev = window.event;

		if (ev.touches) {
			if (ev.touches.length > 0) {
				posx = ev.touches[0].pageX;
				posy = ev.touches[0].pageY;
			}
		} else if (ev.clientX || ev.clientY) {
			var content = document.querySelector(".hero-trail");
			if (content) {
				var rect = content.getBoundingClientRect();
				posx = ev.clientX - rect.left;
				posy = ev.clientY - rect.top;
			}
		}
		return { x: posx, y: posy };
	}

	function handlePointerMove(ev) {
		ev.preventDefault();
		if (ev.touches && ev.touches.length > 0) {
			mousePos = getPointerPos(ev.touches[0]);
		} else {
			mousePos = getPointerPos(ev);
		}
	}

	window.addEventListener("mousemove", handlePointerMove);

	function ImageTrail(DOM_el) {
		this.DOM = { el: null };
		this.images = [];
		this.imagesTotal = 0;
		this.imgPosition = 0;
		this.zIndexVal = 1;
		this.activeImagesCount = 0;
		this.isIdle = true;
		this.threshold = 80;

		var self = this;
		this.DOM.el = DOM_el;
		this.images = Array.prototype.slice
			.call(this.DOM.el.querySelectorAll(".content__img"))
			.map(function (img) {
				return new ImageEl(img);
			});
		this.imagesTotal = this.images.length;

		this.onImageActivated = function () {
			self.activeImagesCount++;
			self.isIdle = false;
		};
		this.onImageDeactivated = function () {
			self.activeImagesCount--;
			if (self.activeImagesCount === 0) {
				self.isIdle = true;
			}
		};

		var onPointerMoveEv = function () {
			cacheMousePos = { x: mousePos.x, y: mousePos.y };
			requestAnimationFrame(function () {
				self.render();
			});
			window.removeEventListener("mousemove", onPointerMoveEv);
		};
		window.addEventListener("mousemove", onPointerMoveEv);
	}

	ImageTrail.prototype.render = function () {
		var self = this;
		var dist = getMouseDistance(mousePos, lastMousePos);

		cacheMousePos.x = lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.1);
		cacheMousePos.y = lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.1);

		if (dist > this.threshold) {
			this.showNextImage();
			lastMousePos = mousePos;
		}

		if (this.isIdle && this.zIndexVal !== 1) {
			this.zIndexVal = 1;
		}

		requestAnimationFrame(function () {
			self.render();
		});
	};

	ImageTrail.prototype.showNextImage = function () {
		var self = this;
		++this.zIndexVal;
		this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;

		var img = this.images[this.imgPosition];
		gsap.killTweensOf(img.DOM.el);

		img.timeline = gsap
			.timeline({
				onStart: function () {
					self.onImageActivated();
				},
				onComplete: function () {
					self.onImageDeactivated();
				},
			})
			.fromTo(
				img.DOM.el,
				{
					opacity: 1,
					scale: 1,
					zIndex: this.zIndexVal,
					x: cacheMousePos.x - img.rect.width / 2,
					y: cacheMousePos.y - img.rect.height / 2,
				},
				{
					duration: 0.4,
					ease: "power1",
					x: mousePos.x - img.rect.width / 2,
					y: mousePos.y - img.rect.height / 2,
				},
				0
			)
			.to(
				img.DOM.el,
				{
					duration: 0.4,
					ease: "power3",
					opacity: 0,
					scale: 0.2,
				},
				0.4
			);
	};

	// ---- index.js ----
	preloadImages(".content__img-inner").then(function () {
		document.body.classList.remove("loading");
		var content = document.querySelector(".hero-trail");
		if (content) {
			new ImageTrail(content);
		}
	});
})();
