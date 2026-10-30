/* ----------------------------------------------------------------
	Creator post IG section (creators-post.html)
	Keeps the IG ticker centred between the profile section and the IG
	images: the space under the ticker (down to the top of the highest
	image) is made equal to the space above it (from the bottom of the
	profile content), by setting the images container's padding-top.

	The images are moved by skrollr as the page scrolls, from their
	data-bottom-top transform (viewport bottom at the image's top) to their
	data-top-center one (viewport top at the image's middle). The spacing is
	worked out for the moment the ticker sits in the middle of the screen.
	Without skrollr (phones) the images don't move.
-----------------------------------------------------------------*/
(function() {
	var profile = document.querySelector('.creator-profile .row');
	var ticker = document.querySelector('.ig-ticker');
	if (!profile || !ticker) return;
	var wrap = ticker.nextElementSibling;           // .container
	var posts = wrap.querySelectorAll('[data-bottom-top][data-top-center]');
	if (!posts.length) return;

	// translateY in a skrollr value, e.g. "transform: translate(20px, -100px)" → -100
	function ty(value) {
		var m = /translate\(\s*[-\d.]+px\s*,\s*([-\d.]+)px/.exec(value || '');
		return m ? parseFloat(m[1]) : 0;
	}

	function docTop(el) {
		return el.getBoundingClientRect().top + window.pageYOffset;
	}

	// skrollr's shift of a post when the page is scrolled to `scroll`
	function shiftAt(el, scroll) {
		var s = window.skrollr && skrollr.get && skrollr.get();
		if (!s) return 0;
		// the scroll positions skrollr itself uses for the two keyframes
		var from = s.relativeToAbsolute(el, 'bottom', 'top');
		var to = s.relativeToAbsolute(el, 'top', 'center');
		var p = Math.min(1, Math.max(0, (scroll - from) / (to - from)));
		var a = ty(el.getAttribute('data-bottom-top')), b = ty(el.getAttribute('data-top-center'));
		return a + (b - a) * p;
	}

	function measure() {
		var tickerTop = docTop(ticker);
		var tickerBottom = tickerTop + ticker.offsetHeight;
		var above = tickerTop - (docTop(profile) + profile.offsetHeight);
		// scroll position with the ticker in the middle of the screen
		var scroll = (tickerTop + tickerBottom) / 2 - window.innerHeight / 2;
		// layout position of the posts (offsetTop ignores skrollr's transform)
		var parentTop = docTop(posts[0].offsetParent);
		var highest = Infinity;
		for (var i = 0; i < posts.length; i++) {
			var top = parentTop + posts[i].offsetTop;
			highest = Math.min(highest, top + shiftAt(posts[i], scroll));
		}
		return above - (highest - tickerBottom);  // how much padding to add
	}

	function update() {
		// a couple of passes: moving the posts changes where skrollr puts them
		for (var n = 0; n < 4; n++) {
			var current = parseFloat(getComputedStyle(wrap).paddingTop) || 0;
			var diff = measure();
			if (Math.abs(diff) < 0.5) break;
			wrap.style.paddingTop = Math.max(0, current + diff) + 'px';
		}
		if (window.skrollr && skrollr.get && skrollr.get()) skrollr.get().refresh();
	}

	window.addEventListener('load', update);
	window.addEventListener('resize', update);
})();
