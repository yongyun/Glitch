/* ----------------------------------------------------------------
	Event post hero (events-post.html)
	The hero is pinned for a while (CSS: sticky stage inside a tall
	section). As you scroll through it, the image slides in from covering
	the right third to covering the whole screen; the text over the image
	shows inverted (a copy of the text inside the image layer, blended with
	"difference").
	Progress 0 → 1 is written to --hero-edge on the section: the image's
	left edge, in % of the width (66.67 → 0).
-----------------------------------------------------------------*/
(function() {
	var hero = document.getElementById('event-hero');
	if (!hero) return;

	// Copy the text into the invert layer (HTML only holds it once)
	var text = hero.querySelector('.event-hero-text');
	var invert = hero.querySelector('.event-hero-invert');
	invert.appendChild(text.cloneNode(true));

	var START = 100 * 2 / 3; // image starts covering the right third
	var ticking = false;

	function update() {
		ticking = false;
		var scrollable = hero.offsetHeight - window.innerHeight;
		var progress = scrollable > 0 ? -hero.getBoundingClientRect().top / scrollable : 1;
		progress = Math.min(1, Math.max(0, progress));
		hero.style.setProperty('--hero-edge', (START * (1 - progress)).toFixed(2));
	}

	function onScroll() {
		if (!ticking) {
			ticking = true;
			window.requestAnimationFrame(update);
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	update();
})();
