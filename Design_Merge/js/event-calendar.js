/* ----------------------------------------------------------------
	Events Calendar
	Filters the #oc-product carousel by exhibition date using
	jquery.calendario.js. Gallery is closed Mon/Tue, so those two
	columns are hidden in CSS (event-calendar.css rules in custom.css).
-----------------------------------------------------------------*/
// Captured before any $(document).ready handler runs (this script tag sits
// at the end of body), so it grabs the carousel's original markup before
// Owl Carousel wraps it into .owl-stage/.owl-item.
var __eventCalendarOriginalMarkup = (function() {
	var el = document.getElementById('oc-product');
	return el ? el.innerHTML : '';
})();

jQuery(function($) {
	var $calendarRoot = $('#event-calendar');
	var $carousel = $('#oc-product');

	if (!$calendarRoot.length || !$carousel.length || !__eventCalendarOriginalMarkup || !$.fn.calendario) {
		return;
	}

	// Parse the pristine card list once, with their date ranges.
	var allCards = (function() {
		var $tmp = $('<div>').html(__eventCalendarOriginalMarkup);
		return $tmp.children('.product').map(function() {
			return {
				html: this.outerHTML,
				start: parseISODate($(this).attr('data-event-start')),
				end: parseISODate($(this).attr('data-event-end'))
			};
		}).get();
	})();

	function parseISODate(str) {
		if (!str) return null;
		var parts = str.split('-');
		return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
	}

	function startOfDay(d) {
		var n = new Date(d);
		n.setHours(0, 0, 0, 0);
		return n;
	}

	function reinitOwlCarousel() {
		if (window.SEMICOLON && SEMICOLON.Modules && typeof SEMICOLON.Modules.carousel === 'function') {
			SEMICOLON.Modules.carousel('#oc-product');
		} else if ($.fn.owlCarousel) {
			$carousel.owlCarousel({
				nav: false,
				dots: false,
				loop: false,
				margin: 30,
				responsive: { 0: { items: 1 }, 576: { items: 2 }, 768: { items: 3 }, 992: { items: 3 }, 1200: { items: 3 } }
			});
		}
	}

	function renderCarousel(matchFn, emptyMessage) {
		if ($carousel.hasClass('owl-loaded')) {
			$carousel.trigger('destroy.owl.carousel');
		}
		$carousel.empty();
		var visible = 0;
		allCards.forEach(function(card) {
			if (!matchFn || matchFn(card)) {
				$carousel.append(card.html);
				visible++;
			}
		});
		if (visible === 0) {
			$carousel.append(
				'<div class="product text-center w-100 py-5"><p class="mb-0 op-06">' +
				(emptyMessage || '這個日期沒有活動 No events on this date') +
				'</p></div>'
			);
		}
		reinitOwlCarousel();
	}

	function matchDate(date) {
		return function(card) {
			return card.start && card.end && date >= card.start && date <= startOfDay(card.end);
		};
	}

	function matchRange(rangeStart, rangeEnd) {
		return function(card) {
			return card.start && card.end && card.start <= rangeEnd && card.end >= rangeStart;
		};
	}

	function setActiveTab(which) {
		$('.event-calendar-tab').removeClass('active');
		if (which) $('.event-calendar-tab[data-quick="' + which + '"]').addClass('active');
	}

	// Days within the displayed month that have at least one overlapping
	// exhibition get a small dot marker under the date number.
	function buildMonthCaldata(month /* 1-12 */, year) {
		var caldata = {}, daysInMonth = new Date(year, month, 0).getDate();
		for (var day = 1; day <= daysInMonth; day++) {
			var d = new Date(year, month - 1, day);
			var hasEvent = allCards.some(function(card) {
				return card.start && card.end && d >= card.start && d <= startOfDay(card.end);
			});
			if (hasEvent) {
				var mm = month < 10 ? '0' + month : '' + month;
				var dd = day < 10 ? '0' + day : '' + day;
				caldata[mm + '-' + dd + '-' + year] = '•';
			}
		}
		return caldata;
	}

	var selectedDate = null;
	var $grid = $('#event-calendar-grid');

	var calendar = $grid.calendario({
		startIn: 1, // Monday first; Mon/Tue columns hidden via CSS
		events: 'click',
		caldata: buildMonthCaldata(new Date().getMonth() + 1, new Date().getFullYear()),
		onDayClick: function($cell, data, dateProps) {
			if (!dateProps.day || $cell.find('span.fc-date.fc-emptydate').length) return;

			var clicked = new Date(dateProps.year, dateProps.month - 1, dateProps.day);

			$grid.find('.fc-selected').removeClass('fc-selected');
			setActiveTab(null);

			if (selectedDate && selectedDate.getTime() === clicked.getTime()) {
				selectedDate = null;
				renderCarousel(null);
				return;
			}

			selectedDate = clicked;
			$cell.addClass('fc-selected');
			renderCarousel(matchDate(clicked), '這個日期沒有活動 No events on this date');
		}
	});

	function updateMonthLabel() {
		$('#event-calendar-month').text(calendar.getMonthName() + ' ' + calendar.getYear());
	}

	function reapplySelectionHighlight() {
		if (!selectedDate) return;
		if (calendar.getMonth() - 1 === selectedDate.getMonth() && calendar.getYear() === selectedDate.getFullYear()) {
			calendar.getCell(selectedDate.getDate()).addClass('fc-selected');
		}
	}

	updateMonthLabel();

	$('.event-calendar-prev').on('click', function() {
		calendar.gotoPreviousMonth(function() {
			calendar.setData(buildMonthCaldata(calendar.getMonth(), calendar.getYear()), true);
			updateMonthLabel();
			reapplySelectionHighlight();
		});
	});

	$('.event-calendar-next').on('click', function() {
		calendar.gotoNextMonth(function() {
			calendar.setData(buildMonthCaldata(calendar.getMonth(), calendar.getYear()), true);
			updateMonthLabel();
			reapplySelectionHighlight();
		});
	});

	$('.event-calendar-tab').on('click', function() {
		var quick = $(this).data('quick');
		var isActive = $(this).hasClass('active');

		selectedDate = null;
		$grid.find('.fc-selected').removeClass('fc-selected');

		if (isActive) {
			// Clicking the active tab again clears the filter.
			setActiveTab(null);
			renderCarousel(null);
			return;
		}

		setActiveTab(quick);
		var today = startOfDay(new Date());

		if (quick === 'today') {
			calendar.gotoMonth(today.getMonth() + 1, today.getFullYear(), function() {
				calendar.setData(buildMonthCaldata(calendar.getMonth(), calendar.getYear()), true);
				updateMonthLabel();
				calendar.getCell(today.getDate()).addClass('fc-today-marker');
			});
			renderCarousel(matchDate(today), '今天沒有活動 No events today');
		} else if (quick === 'week') {
			var day = today.getDay(); // 0 = Sunday
			var mondayOffset = day === 0 ? -6 : 1 - day;
			var weekStart = new Date(today);
			weekStart.setDate(today.getDate() + mondayOffset);
			var weekEnd = new Date(weekStart);
			weekEnd.setDate(weekStart.getDate() + 6);
			renderCarousel(matchRange(weekStart, weekEnd), '本週沒有活動 No events this week');
		}
	});
});
