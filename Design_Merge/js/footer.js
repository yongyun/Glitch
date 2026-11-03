// ===== Footer（全站共用）=====
// 每一頁的 <footer id="footer"> 是空的，內容都由這個檔案放進去；改 footer 只改這裡。
// 只改反引號 ` 中間的 HTML。背景全站統一滿版藍色（見 custom.css #footer）
document.getElementById('footer').innerHTML = /*html*/ `

<div class="container">
<div class="footer-panel">
<div class="container mw-md">

	<!-- Footer Widgets
	============================================= -->
	<div class="footer-widgets-wrap mb-lg-3 pt-lg-4">
		<div class="row align-items-center justify-content-between gx-lg-5 gy-5">
			<div class="col-md-6">
				<h4 class="display-3 fw-semibold ls-n3">Get In Touch</h4>
				<a href="mailto:Ingo@glitch.com" class="button button-large footer-email-button px-4 py-4 w-100"><div class="d-flex "><span><strong>Email Us</strong>: Ingo@glitch.com</span><i class="bi bi-envelope-at fs-4 ms-auto"></i></div></a>
				<h4 class="fs-5 fw-semibold mb-0 mt-4 ms-4">臺中市西區柳川東路二段58號</h4>
				<h4 class="fs-5 fw-semibold mb-0 mt-2 ms-4">Ingo@glitch.com</h4>
			</div>
			<div class="col-md-6">
				<div class="row">
					<div class="col-6">
						<div class="widget widget_links widget-li-noicon">
							<ul>
								<li class="mb-3"><a class="fs-4 magnetic-hover h-color-facebook fw-medium" href="events.html"><span>展覽<i class="bi-arrow-up-right ms-2 fs-5"></i></span></a></li>
								<li class="mb-3"><a class="fs-4 magnetic-hover fw-medium h-color-instagram" href="news.html"><span>最新消息<i class="bi-arrow-up-right ms-2 fs-5"></i></span></a></li>
								<li class="mb-3"><a class="fs-4 magnetic-hover fw-medium h-color-twitter" href="press.html"><span>媒體報導<i class="bi-arrow-up-right ms-2 fs-5"></i></span></a></li>
								<li class="mb-3"><a class="fs-4 magnetic-hover fw-medium h-color-linkedin" href="tshuan.html"><span>@@川<i class="bi-arrow-up-right ms-2 fs-5"></i></span></a></li>
							</ul>

						</div>
					</div>

					<div class="col-6">
						<div class="widget widget_links widget-li-noicon">
							<ul>
								<li class="mb-3"><a class="fs-4 magnetic-hover fw-medium h-color-dribbble" href="explore.html"><span>Explore計劃<i class="bi-arrow-up-right ms-2 fs-5"></i></span></a></li>
								<li class="mb-3"><a class="fs-4 magnetic-hover fw-medium h-color-whatsapp" href="collaboration.html"><span>合作<i class="bi-arrow-up-right ms-2 fs-5"></i></span></a></li>
								<li class="mb-3"><a class="fs-4 magnetic-hover fw-medium h-text-dark" href="about.html"><span>關於毛刺<i class="bi-arrow-up-right ms-2 fs-5"></i></span></a></li>
								<li class="mb-3"><a class="fs-4 magnetic-hover fw-medium h-text-primary" href="creators.html"><span>創作者<i class="bi-arrow-up-right ms-2 fs-5"></i></span></a></li>
							</ul>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div><!-- .footer-widgets-wrap end -->

	<!-- Copyrights
	============================================= -->
	<div id="copyrights" class="bg-transparent border-top">
		<div class="row g-3">
			<div class="col-lg-6 text-center text-lg-start text-contrast-500">
				Copyrights &copy; 2026 All Rights Reserved by Glitch.
			</div>

		</div>
	</div><!-- #copyrights end -->

</div>
</div><!-- .footer-panel end -->
</div>

`;
