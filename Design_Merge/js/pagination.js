/* ----------------------------------------------------------------
	List pagination — news.html / press.html / perspectives.html / creators.html / 單元 lists
	(events.html uses only the page buttons, see GlitchPagination.buttons)

	GlitchPagination(list, nav, perPage, tabs)
	  list    : the list element; every direct child is one item (news / press
	            .entry, perspectives .explore-cell, creators / 單元 .portfolio-item)
	  nav     : the <nav> holding an empty <ul class="pagination">
	  perPage : items per page
	  tabs    : optional — a Canvas-style type filter (<ul class="grid-filter">
	            with data-filter links, but no data-container so Canvas leaves
	            it alone). Pages are then counted within the picked type, and
	            picking a type goes back to page 1.

	Month labels (.entry-date-section) don't count as items; one only shows
	on pages that have items from its month. Timeline lists laid out by
	Canvas's Isotope (.grid-container) switch pages with Isotope's filter so
	the left/right layout keeps working; plain lists just hide items.
	The nav stays hidden when everything fits on one page.

	At most 9 buttons on desktop (Previous 1 … 7 8 9 … 20 Next) and 7 on
	phones (← 1 … 8 … 20 →), however many pages there are.
-----------------------------------------------------------------*/

/* The page buttons on their own: GlitchPagination.buttons(nav, onPick)
   draws them into nav's <ul class="pagination"> and calls onPick(page)
   when one is clicked. Returns { show(current, total) } to (re)draw them;
   the nav is hidden while total < 2. */
GlitchPagination.buttons = function(nav, onPick) {
	var $ = jQuery;
	var $nav = $(nav);
	var $list = $nav.find('.pagination');
	var current = 1, total = 1;

	// Phones get a shorter row: arrows instead of Previous / Next, and only
	// the current page between first and last (max 7 buttons, ~53px each at
	// 375px wide). Desktop: up to 9 buttons, Previous / Next spelled out.
	var phone = window.matchMedia('(max-width: 767.98px)');

	// Page numbers to show: all of them when there are few, otherwise
	// first, last and the ones around the current page, with … between
	function pageList() {
		var showAll = phone.matches ? 5 : 7;
		var around = phone.matches ? 0 : 1;
		if (total <= showAll) return Array.from({ length: total }, function(_, i) { return i + 1; });
		var pages = [1], from = Math.max(2, current - around), to = Math.min(total - 1, current + around);
		if (from > 2) pages.push('…');
		for (var i = from; i <= to; i++) pages.push(i);
		if (to < total - 1) pages.push('…');
		pages.push(total);
		return pages;
	}

	// label: text, or an [html, aria-label] pair for the arrow buttons
	function item(label, page, state) {
		var $li = $('<li class="page-item"></li>').addClass(state || '');
		var $a = page
			? $('<a class="page-link" href="#"></a>').attr('data-page', page)
			: $('<span class="page-link"></span>');
		if (state === 'active') $a.attr('aria-current', 'page');
		if ($.isArray(label)) $a.html(label[0]).attr('aria-label', label[1]);
		else $a.text(label);
		return $li.append($a);
	}

	function render() {
		$nav.toggleClass('d-none', total < 2);
		var prev = phone.matches ? ['<i class="bi-arrow-left"></i>', 'Previous'] : 'Previous';
		var next = phone.matches ? ['<i class="bi-arrow-right"></i>', 'Next'] : 'Next';
		$list.empty()
			.append(item(prev, current - 1, current === 1 ? 'disabled' : ''))
			.append(pageList().map(function(p) {
				return p === '…' ? item('...', 0, 'disabled') : item(p, p, p === current ? 'active' : '');
			}))
			.append(item(next, current + 1, current === total ? 'disabled' : ''));
	}

	// Redraw when crossing the phone / desktop width
	if (phone.addEventListener) phone.addEventListener('change', render);
	else phone.addListener(render);

	$list.on('click', 'a.page-link', function(e) {
		e.preventDefault();
		var page = +$(this).attr('data-page');
		if (!page || page === current) return;
		onPick(page);
	});

	return {
		show: function(page, pages) {
			current = page;
			total = Math.max(1, pages);
			render();
		}
	};
};

function GlitchPagination(list, nav, perPage, tabs) {
	var $ = jQuery;
	var $posts = $(list);
	var useIsotope = $posts.hasClass('grid-container');
	var $tabs = $(tabs || []);
	var current = 1, total = 1, type = '*';

	// Give each item of the picked type its page number (others get 0, so
	// they never show), and each month label the pages it appears on
	function number() {
		var $label = null, count = 0;
		$posts.children().each(function() {
			var $el = $(this);
			if ($el.hasClass('entry-date-section')) {
				$label = $el.attr('data-pages', ' ');
				return;
			}
			if (type !== '*' && !$el.is(type)) {
				$el.attr('data-page', 0);
				return;
			}
			var page = Math.floor(count++ / perPage) + 1;
			$el.attr('data-page', page);
			if ($label && $label.attr('data-pages').indexOf(' ' + page + ' ') < 0) {
				$label.attr('data-pages', $label.attr('data-pages') + page + ' ');
			}
		});
		total = Math.max(1, Math.ceil(count / perPage));
	}
	number();
	if (total < 2 && !$tabs.length) return;

	function onPage(el, page) {
		var $el = $(el);
		return $el.hasClass('entry-date-section')
			? $el.attr('data-pages').indexOf(' ' + page + ' ') > -1
			: +$el.attr('data-page') === page;
	}

	var buttons = GlitchPagination.buttons(nav, function(page) {
		show(page);
		$('html, body').animate({ scrollTop: $posts.offset().top - 150 }, 400);
	});

	function show(page) {
		current = page;
		if (useIsotope) {
			// Isotope runs the filter through jQuery's .is() here (isJQueryFiltering),
			// which calls it as fn(index, element) with this = element — so take
			// the element from there, not from the first argument
			$posts.isotope({ filter: function() { return onPage(this, page); } });
		} else {
			$posts.children().each(function() {
				$(this).toggleClass('d-none', !onPage(this, page));
			});
		}
		buttons.show(current, total);
	}

	// Type tabs: same markup / active class as Canvas's grid-filter
	$tabs.on('click', 'a', function(e) {
		e.preventDefault();
		$tabs.find('li').removeClass('activeFilter');
		$(this).parent('li').addClass('activeFilter');
		type = $(this).attr('data-filter');
		number();
		show(1);
	});

	function start() {
		show(1);
	}
	if (!useIsotope) return start();

	// Wait for Canvas to set up Isotope on the list, then show page 1
	var wait = setInterval(function() {
		if (!$posts.data('isotope')) return;
		clearInterval(wait);
		start();
	}, 100);
}
