// ===== 搜尋結果頁（search.html）=====
// 讀網址上的 ?q=關鍵字，從 js/search-data.js 找出符合的項目，排成卡片
// 關鍵字可以用空白分隔多個字，全部都要對到才算符合（不分大小寫）

(function () {
	// 摘要長度：跟 Canvas 範本的英文摘要一樣長（約 160 個英文字母）
	// 中文字寬約是英文字母的兩倍，所以中文字算 2、英文/數字/符號算 1
	var EXCERPT_LENGTH = 160;

	var query = (new URLSearchParams(location.search).get('q') || '').trim();
	var grid = document.getElementById('search-results');
	var summary = document.getElementById('search-summary');

	// header 的搜尋欄帶入目前的關鍵字，方便再改（標題下方的搜尋列保持空白，顯示「搜尋其他內容」）
	var headerInput = document.querySelector('.top-search-form input');
	if (headerInput) headerInput.value = query;

	function escapeHTML(str) {
		return String(str).replace(/[&<>"']/g, function (c) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
		});
	}

	function truncate(text) {
		var width = 0;
		var chars = Array.from(text);
		for (var i = 0; i < chars.length; i++) {
			width += /[⺀-￯]/.test(chars[i]) ? 2 : 1;
			if (width > EXCERPT_LENGTH) return chars.slice(0, i).join('').replace(/[\s，。、：；,.]+$/, '') + '…';
		}
		return text;
	}

	function render(item) {
		var url = escapeHTML(item.url);
		return '' +
			'<div class="entry col-lg-3 col-md-4 col-sm-6 col-12">' +
				'<div class="grid-inner">' +
					'<div class="entry-image">' +
						'<a href="' + url + '"><img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.title) + '"></a>' +
					'</div>' +
					'<div class="entry-title">' +
						'<h2><a href="' + url + '">' + escapeHTML(item.title) + '</a></h2>' +
					'</div>' +
					(item.date ? '<div class="entry-meta"><ul><li>' + escapeHTML(item.date) + '</li></ul></div>' : '') +
					'<div class="entry-content">' +
						'<p>' + escapeHTML(truncate(item.excerpt)) + '</p>' +
						'<a href="' + url + '" class="button m-0 search-more-button">Read More<i class="bi-arrow-up-right ms-2"></i></a>' +
					'</div>' +
				'</div>' +
			'</div>';
	}

	if (!query) {
		summary.textContent = '請在上方的搜尋欄輸入關鍵字';
		return;
	}

	var terms = query.toLowerCase().split(/\s+/);
	var results = GLITCH_SEARCH_DATA.filter(function (item) {
		var haystack = [item.title, item.excerpt, item.type, item.date].join(' ').toLowerCase();
		return terms.every(function (t) { return haystack.indexOf(t) !== -1; });
	});

	summary.textContent = '「' + query + '」共 ' + results.length + ' 筆結果';
	grid.innerHTML = results.length
		? results.map(render).join('')
		: '<div class="col-12"><p class="mb-0">找不到符合的內容，換個關鍵字試試看。</p></div>';
})();
