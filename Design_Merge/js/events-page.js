/* ----------------------------------------------------------------
	Events page (events.html)
	The calendar on the left (same picker as the home page EVENTS, built
	with jquery.calendario.js) and the type tabs above the list (#events-filter,
	Canvas .grid-filter markup) filter the masonry list (#portfolio, laid out
	by Canvas's Isotope) together: an event shows when it matches both.
	Each .portfolio-item gives its run as data-event-start / data-event-end
	(YYYY-MM-DD) and its type as a pf-* class.
	  - click a date        → events running on that day
	  - Today / This Week   → events running today / this week
	  - All Time            → every event — what the page opens with
	  - click the same date or tab again → any date
	  - type tab            → that type (Show All = any type)
	Matching events are listed newest first (by start date), 15 a page,
	with the same page buttons as news.html (.list-pagination, drawn by
	GlitchPagination.buttons in js/pagination.js). Changing a filter goes
	back to page 1.
	Days with at least one event get a dot. Mon/Tue columns are hidden in
	CSS (gallery closed), same as the home page.
-----------------------------------------------------------------*/
jQuery(function($) {
	var $grid = $('#portfolio');
	var $calendarGrid = $('#event-calendar-grid');
	var $filter = $('#events-filter');
	var $empty = $('#events-empty');

	if (!$grid.length || !$calendarGrid.length || !$.fn.calendario) return;

	function parseISODate(str) {
		if (!str) return null;
		var parts = str.split('-');
		return new Date(+parts[0], +parts[1] - 1, +parts[2]);
	}

	function startOfDay(d) {
		var n = new Date(d);
		n.setHours(0, 0, 0, 0);
		return n;
	}

	function formatDate(d) {
		var mm = d.getMonth() + 1, dd = d.getDate();
		return d.getFullYear() + '.' + (mm < 10 ? '0' : '') + mm + '.' + (dd < 10 ? '0' : '') + dd;
	}

	// Each event's run, read once
	var events = $grid.children('.portfolio-item').map(function() {
		return {
			el: this,
			start: parseISODate($(this).attr('data-event-start')),
			end: parseISODate($(this).attr('data-event-end'))
		};
	}).get();

	function runsOn(ev, date) {
		return ev.start && ev.end && date >= ev.start && date <= ev.end;
	}

	function overlaps(ev, from, to) {
		return ev.start && ev.end && ev.start <= to && ev.end >= from;
	}

	var PER_PAGE = 15; // 每頁 15 則（同最新消息）

	// Current filters: a date test (null = any date) and a type selector
	var dateMatch = null, dateEmpty = '', typeFilter = '*', page = 1;

	var buttons = GlitchPagination.buttons('.list-pagination', function(p) {
		page = p;
		apply();
		$('html, body').animate({ scrollTop: $grid.offset().top - 150 }, 400);
	});

	// Show only the events that pass both filters — the current page of them
	function apply() {
		var matches = events.filter(function(ev) {
			return (!dateMatch || dateMatch(ev)) && (typeFilter === '*' || $(ev.el).is(typeFilter));
		}).sort(function(a, b) { return (b.start || 0) - (a.start || 0); });
		var pages = Math.max(1, Math.ceil(matches.length / PER_PAGE));
		page = Math.min(page, pages);
		var shownEls = matches.slice((page - 1) * PER_PAGE, page * PER_PAGE).map(function(ev) { return ev.el; });
		buttons.show(page, pages);
		// Isotope runs the filter through jQuery's .is() — the item is `this`
		$grid.isotope({ filter: function() { return shownEls.indexOf(this) > -1; } });
		// date-specific message only when no type is picked (otherwise that
		// date may well have events, just of another type)
		$empty.toggleClass('d-none', matches.length > 0)
			.text(typeFilter === '*' && dateEmpty ? dateEmpty : '沒有符合的活動 No matching events');
	}

	function showEvents(match, emptyMessage) {
		dateMatch = match;
		dateEmpty = emptyMessage || '';
		page = 1;
		apply();
	}

	function showAll() {
		showEvents(null);
	}

	// Type tabs — same markup/active class as Canvas's grid-filter, handled
	// here (no data-container) so they combine with the date
	$filter.on('click', 'a', function(e) {
		e.preventDefault();
		$filter.find('li').removeClass('activeFilter');
		$(this).parent('li').addClass('activeFilter');
		typeFilter = $(this).attr('data-filter');
		page = 1;
		apply();
	});

	// Dots under the days of the shown month that have an event
	function monthDots(month /* 1-12 */, year) {
		var data = {}, days = new Date(year, month, 0).getDate();
		for (var day = 1; day <= days; day++) {
			var d = new Date(year, month - 1, day);
			if (events.some(function(ev) { return runsOn(ev, d); })) {
				data[(month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + '-' + year] = '•';
			}
		}
		return data;
	}

	function setActiveTab(which) {
		$('.event-calendar-tab').removeClass('active');
		if (which) $('.event-calendar-tab[data-quick="' + which + '"]').addClass('active');
	}

	var selectedDate = null;

	var calendar = $calendarGrid.calendario({
		startIn: 1, // Monday first; Mon/Tue columns hidden via CSS
		events: 'click',
		caldata: monthDots(new Date().getMonth() + 1, new Date().getFullYear()),
		onDayClick: function($cell, data, dateProps) {
			if (!dateProps.day || $cell.find('span.fc-date.fc-emptydate').length) return;

			var clicked = new Date(dateProps.year, dateProps.month - 1, dateProps.day);
			$calendarGrid.find('.fc-selected').removeClass('fc-selected');
			setActiveTab(null);

			if (selectedDate && selectedDate.getTime() === clicked.getTime()) {
				selectedDate = null;
				showAll();
				return;
			}

			selectedDate = clicked;
			$cell.addClass('fc-selected');
			showEvents(function(ev) { return runsOn(ev, clicked); },
				formatDate(clicked) + ' 沒有活動 No events on this date');
		}
	});

	function updateMonth() {
		calendar.setData(monthDots(calendar.getMonth(), calendar.getYear()), true);
		$('#event-calendar-month').text(calendar.getMonthName() + ' ' + calendar.getYear());
		if (selectedDate && calendar.getMonth() - 1 === selectedDate.getMonth() && calendar.getYear() === selectedDate.getFullYear()) {
			calendar.getCell(selectedDate.getDate()).addClass('fc-selected');
		}
	}

	$('#event-calendar-month').text(calendar.getMonthName() + ' ' + calendar.getYear());
	$('.event-calendar-prev').on('click', function() { calendar.gotoPreviousMonth(updateMonth); });
	$('.event-calendar-next').on('click', function() { calendar.gotoNextMonth(updateMonth); });

	$('.event-calendar-tab').on('click', function() {
		var quick = $(this).data('quick');
		var wasActive = $(this).hasClass('active');

		selectedDate = null;
		$calendarGrid.find('.fc-selected').removeClass('fc-selected');

		if (wasActive) {
			setActiveTab(null);
			showAll();
			return;
		}

		setActiveTab(quick);
		var today = startOfDay(new Date());

		if (quick === 'today') {
			calendar.gotoMonth(today.getMonth() + 1, today.getFullYear(), function() {
				updateMonth();
				calendar.getCell(today.getDate()).addClass('fc-today-marker');
			});
			showEvents(function(ev) { return runsOn(ev, today); },
				'今天沒有活動 No events today');
		} else if (quick === 'week') {
			var offset = today.getDay() === 0 ? -6 : 1 - today.getDay(); // back to Monday
			var weekStart = new Date(today);
			weekStart.setDate(today.getDate() + offset);
			var weekEnd = new Date(weekStart);
			weekEnd.setDate(weekStart.getDate() + 6);
			showEvents(function(ev) { return overlaps(ev, weekStart, weekEnd); },
				'本週沒有活動 No events this week');
		} else if (quick === 'all') {
			showEvents(null);
		}
	});

	// Open on All Time (its tab is marked active in the HTML) — once Canvas
	// has set up Isotope on the list, so it keeps Canvas's masonry settings
	var wait = setInterval(function() {
		if (!$grid.data('isotope')) return;
		clearInterval(wait);
		showEvents(null);
	}, 100);
});
