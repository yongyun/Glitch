document.getElementById('site-menu').innerHTML = /*html*/ `

<ul class="menu-container">
	<li class="menu-item mega-menu mega-menu-full">
		<a class="menu-link" href="#"><div>事件<i class="bi- uil uil-plus"></i></div></a>
		<div class="mega-menu-content mega-menu-style-2">
			<div class="container">
				<div class="row">
					<div class="sub-menu-container mega-menu-column col-12">

						<div class="d-flex justify-content-center align-items-md-center py-4 py-md-3">
							<div class="col-lg-6">
								<ul class="mega-menu-links">
									<li class="target-link-active" data-target="#target-all">
										<a href="#">事件</a>
									</li>
									<li data-target="#target-necklace">
										<a href="news.html">最新消息</a>
									</li>
									<li data-target="#target-bracelets">
										<a href="#">媒體報導</a>
									</li>
								</ul>
							</div>
							<div class="d-none d-lg-flex col-lg-5 col-xl-4 target-content">
								<div class="target-active" id="target-all">
									<img src="img/comic-thumbnail.png" alt="">
								</div>
								<div class="" id="target-necklace">
									<img src="img/ctrl-c-v-thumbnail.png" alt="">
								</div>
								<div class="" id="target-bracelets">
									<img src="img/room-in-room-out-thumbnail.png" alt="">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</li>
	<li class="menu-item mega-menu mega-menu-full">
		<a class="menu-link" href="#"><div>單元 <i class="bi- uil uil-plus"></i></div></a>
		<div class="mega-menu-content mega-menu-style-2">
			<div class="container">
				<div class="row">
					<div class="sub-menu-container mega-menu-column col-12">
						<div class="d-flex justify-content-center align-items-md-center py-4">
							<ul class="mega-menu-links">
								<li>
									<a href="#">@@川</a>
								</li>
								<li>
									<a href="#">Explore 計畫</a>
								</li>
								<li>
									<a href="#">合作</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</li>
	<li class="menu-item mega-menu mega-menu-full">
		<a class="menu-link" href="#"><div>關於<i class="bi- uil uil-plus"></i></div></a>
		<div class="mega-menu-content mega-menu-style-2">
			<div class="container">
				<div class="row">
					<div class="sub-menu-container mega-menu-column col-12">
						<div class="d-flex justify-content-center align-items-md-center py-4">
							<ul class="mega-menu-links">
								<li>
									<a href="about.html">關於毛刺</a>
								</li>
								<li>
									<a href="#">創作者</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</li>
	<li class="menu-item mega-menu mega-menu-full">
		<a class="menu-link" href="#"><div>雜貨店<i class="bi- uil uil-plus"></i></div></a>
		<div class="mega-menu-content mega-menu-style-2">
			<div class="container">
				<div class="row">
					<div class="sub-menu-container mega-menu-column col-12">
						<div class="d-flex justify-content-center align-items-md-center py-4">
							<ul class="mega-menu-links">
								<li>
									<a href="manga.html">漫畫倉庫</a>
								</li>
								<li>
									<a href="Publications.html">毛刺出版品</a>
								</li>
								<li>
									<a href="goods.html">周邊商品</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</li>
	<li class="menu-item">
		<a class="menu-link" href="#"><div>觀點</div></a>
	</li>
</ul>
<!-- Alternate Mobile Menu -->
<ul class="menu-container mobile-primary-menu">
	<li class="menu-item">
		<a class="menu-link" href="#"><div>事件 <i class="bi- uil uil-plus"></i></div></a>
		<ul class="sub-menu-container">
			<li class="menu-item">
				<a href="#" class="menu-link">事件</a>
			</li>
			<li class="menu-item">
				<a href="news.html" class="menu-link">最新消息</a>
			</li>
			<li class="menu-item">
				<a href="#" class="menu-link">媒體報導</a>
			</li>
		</ul>
	</li>
	<li class="menu-item">
		<a class="menu-link" href="#"><div>單元 <i class="bi- uil uil-plus"></i></div></a>
		<ul class="sub-menu-container">
			<li class="menu-item">
				<a href="#" class="menu-link">@@川</a>
			</li>
			<li class="menu-item">
				<a href="#" class="menu-link">Explore 計畫</a>
			</li>
			<li class="menu-item">
				<a href="#" class="menu-link">合作</a>
			</li>
		</ul>
	</li>
	<li class="menu-item">
		<a class="menu-link" href="#"><div>關於 <i class="bi- uil uil-plus"></i></div></a>
		<ul class="sub-menu-container">
			<li class="menu-item">
				<a href="about.html" class="menu-link">關於毛刺</a>
			</li>
			<li class="menu-item">
				<a href="#" class="menu-link">創作者</a>
			</li>
		</ul>
	</li>
	<li class="menu-item">
		<a class="menu-link" href="#"><div>雜貨店 <i class="bi- uil uil-plus"></i></div></a>
		<ul class="sub-menu-container">
			<li class="menu-item">
				<a href="manga.html" class="menu-link">漫畫倉庫</a>
			</li>
			<li class="menu-item">
				<a href="Publications.html" class="menu-link">毛刺出版品</a>
			</li>
			<li class="menu-item">
				<a href="goods.html" class="menu-link">周邊商品</a>
			</li>
		</ul>
	</li>
	<li class="menu-item">
		<a class="menu-link" href="#"><div>觀點</div></a>
	</li>
</ul>
<!-- 手機版選單最下方：找我（自動從下面那段複製過來）+ 中文 -->
<div class="mobile-menu-footer">
	<a href="#" class="lang-switch-link">ENG</a>
</div>

`;


// ===== 右上角按鈕（「中文」左邊）=====
// 只改反引號 ` 中間的 HTML。「找我」是按鈕文字，href="#" 是連結
document.getElementById('site-header-button').innerHTML = /*html*/ `

<a href="#" class="button button-shadow button-shadow-effect border border-width-2 border-dark header-button">找我</a>

`;

// 手機版選單最下方也放一顆一樣的「找我」（自動複製上面那顆，不用另外改）
document.querySelector('.mobile-menu-footer').prepend(
	document.querySelector('#site-header-button .header-button').cloneNode(true)
);

// ===== 中文 / ENG 切換（按鈕顯示「按了會切去的語言」，預設中文頁面所以顯示 ENG）=====
// 想在英文模式換字的地方，在 HTML 加上 data-en="英文字" 即可，例如：
// <div data-en="Drag">拖移</div>
document.addEventListener('click', function (e) {
	var link = e.target.closest('.lang-switch-link');
	if (!link) return;
	e.preventDefault();
	var toEnglish = link.textContent.trim() === 'ENG';
	document.querySelectorAll('.lang-switch-link').forEach(function (el) {
		el.textContent = toEnglish ? '中文' : 'ENG';
	});
	document.querySelectorAll('[data-en]').forEach(function (el) {
		if (!el.hasAttribute('data-zh')) el.setAttribute('data-zh', el.textContent);
		el.textContent = toEnglish ? el.getAttribute('data-en') : el.getAttribute('data-zh');
	});
});
