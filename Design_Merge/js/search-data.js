// ===== 搜尋資料（search.html 用）=====
// 網站是純 HTML，搜尋只會找這份清單裡的內容；新增文章/頁面時，在下面加一筆即可。
// 每一筆：
//   title   標題
//   date    日期（沒有就留空字串 ''）
//   image   圖片路徑
//   excerpt 內文摘要（搜尋結果頁會自動截短，可以直接貼整段）
//   url     點進去的頁面
//   type    分類（目前沒顯示，但搜尋得到，例如搜「漫畫」會找到 type 是漫畫的項目）
var GLITCH_SEARCH_DATA = [
	{
		title: '林珈伃個展《最遠的最短距離》',
		date: '2025.09.03 – 10.12',
		image: 'img/about-act.jpg',
		excerpt: '《最遠的最短距離》從一個簡單的問題出發：當我們搬進一個新的住處，要花多久，才會真正覺得那裡是「家」？林珈伃以三年間在台中、台北與東京之間搬遷的經驗為起點，收集了每一個住處留下的影像、物件與筆記。',
		url: 'events-post.html',
		type: '事件 展覽 當代藝術展演場'
	},
	{
		title: '消息標題 1',
		date: '2026.10.12',
		image: 'img/event1.png',
		excerpt: '毛刺 Glitch 將於十月推出全新展覽，邀請三位跨領域創作者，以影像、聲音與出版為媒介，討論當代生活中「距離」的各種樣貌。展期間同步舉辦座談與工作坊，歡迎一起參與。',
		url: 'news-post.html',
		type: '最新消息 展覽'
	},
	{
		title: 'Explore 計畫：文章標題',
		date: '2026.11.20',
		image: 'img/about-digital.jpg',
		excerpt: '拓撲學裡有一個概念叫做同胚：外表看起來不同的兩個形狀，只要能透過連續變形互相轉換，就被視為本質相同。這場對談借用這個概念，討論創作者之間、作品與觀眾之間，那些看不見卻真實存在的共通性。',
		url: 'explore-post.html',
		type: 'Explore 計畫 單元'
	},
	{
		title: '合作：文章標題',
		date: '2026.11.20',
		image: 'img/about-digital.jpg',
		excerpt: '拓撲學裡有一個概念叫做同胚：外表看起來不同的兩個形狀，只要能透過連續變形互相轉換，就被視為本質相同。這場對談借用這個概念，討論創作者之間、作品與觀眾之間，那些看不見卻真實存在的共通性。',
		url: 'collaboration-post.html',
		type: '合作 單元'
	},
	{
		title: '@@川：計畫名稱',
		date: '',
		image: 'img/hero2.jpg',
		excerpt: '《最遠的最短距離》從一個簡單的問題出發：當我們搬進一個新的住處，要花多久，才會真正覺得那裡是「家」？林珈伃以三年間在台中、台北與東京之間搬遷的經驗為起點，收集了每一個住處留下的影像、物件與筆記。',
		url: 'tshuan-post.html',
		type: '@@川 單元'
	},
	{
		title: '觀點：文章標題',
		date: '',
		image: 'img/hero2.jpg',
		excerpt: '《最遠的最短距離》從一個簡單的問題出發：當我們搬進一個新的住處，要花多久，才會真正覺得那裡是「家」？林珈伃以三年間在台中、台北與東京之間搬遷的經驗為起點，收集了每一個住處留下的影像、物件與筆記。',
		url: 'perspectives-post.html',
		type: '觀點'
	},
	{
		title: '張文豪 CHANG Wen-Hao',
		date: '',
		image: 'img/founder-chang.jpg',
		excerpt: '1994 年生於臺灣基隆，現工作與生活於臺北、臺中兩地。主要從事當代藝術策展、評論書寫、文化研究及藝術製作。2023 年與夥伴共同發起策展團體 Nn̄g Project，並創辦位於臺中的獨立藝術空間「毛刺 Glitch」。',
		url: 'creators-post.html',
		type: '創作者 創辦人 策展人'
	},
	{
		title: '賴詩涵 LAI Shih-Han',
		date: '',
		image: 'img/founder-lai.jpg',
		excerpt: '1998 年生於臺灣台中，長期投入文化品牌經營、創意策劃與跨領域製作，創辦「激浪特攻本部」、「@@川」等多個複合型品牌，持續探索藝術、設計與生活與文化消費之間的多元關係。',
		url: 'creators-post-2.html',
		type: '創作者 創辦人'
	},
	{
		title: '林珈伃 LIN Chia-Yu',
		date: '',
		image: 'img/creators/creator-2.jpg',
		excerpt: '（示意用假文字）這裡放藝術家的簡介，例如出生年份與成長背景、目前工作與生活的城市，以及主要的創作媒材。2025 年於毛刺空間當代藝術展演場 act 舉辦個展《最遠的最短距離》。',
		url: 'creators-post-3.html',
		type: '創作者 藝術家'
	},
	{
		title: '漫畫標題 1',
		date: '2026.10.01',
		image: 'img/comic-thumbnail.png',
		excerpt: '這裡放漫畫的內容簡介，可以寫故事大綱、創作背景，或是選書人的推薦理由，讓讀者在翻開之前先認識這本作品。',
		url: 'comics-post.html',
		type: '好ㄉ 漫畫'
	},
	{
		title: 'The New World 世界杯足球賽專刊專輯 2026',
		date: '2026.10.01',
		image: 'img/publications/wc-cover-ronaldo-angle.jpg',
		excerpt: '在複雜的歷史與國際處境中，台灣人不斷尋找能凝聚自我認同的文化錨點。在台灣，棒球經典賽曾證明，運動不只是競技，更能點燃集體情緒，形成台灣人少有的集體歸屬感。',
		url: 'publications-post.html',
		type: '好ㄉ 毛刺出版品'
	},
	{
		title: '商品名稱 1',
		date: '2026.10.01',
		image: 'img/GlitchIG1.png',
		excerpt: '這裡放商品介紹，可以寫設計理念、圖像來源，或是與毛刺相關的展覽、活動與合作背景。',
		url: 'goods-post.html',
		type: '好ㄉ 周邊'
	}
];
