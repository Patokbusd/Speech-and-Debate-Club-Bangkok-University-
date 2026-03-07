import { fetchJSON, formatDate } from "../../utils.js";

const NEWS_PER_PAGE = 6;
let visibleCount = NEWS_PER_PAGE;
let allNews = [];
let filteredNews = [];

// รอ DOM โหลดก่อน
document.addEventListener("DOMContentLoaded", init);

async function init() {
    try {
        const data = await fetchJSON("/Speech-and-Debate-Club-Bangkok-University-/data/news.json");
        const newsArray = Array.isArray(data) ? data : data.news;

        if (!Array.isArray(newsArray)) {
            throw new Error("โครงสร้าง news.json ไม่ถูกต้อง");
        }

        // เรียงข่าวล่าสุดก่อน
        allNews = newsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        filteredNews = [...allNews];

        renderNews();

        const skeleton = document.getElementById("skeleton");
        if (skeleton) skeleton.style.display = "none";

    } catch (error) {
        console.error("โหลดข่าวไม่สำเร็จ:", error);
    }
}


// =========================
// แสดงข่าว
// =========================
function renderNews() {

    const container = document.getElementById("news-list");
    const loadMoreBtn = document.getElementById("load-more");

    if (!container) return;

    const newsToShow = filteredNews.slice(0, visibleCount);

    if (!newsToShow.length) {
        container.innerHTML = "<p>ยังไม่มีข่าวในหมวดนี้</p>";
        if (loadMoreBtn) loadMoreBtn.style.display = "none";
        return;
    }

    container.innerHTML = newsToShow.map(news => `
        <a href="news-detail.html?id=${news.id}" class="news-card">
            <img src="${news.image}" alt="${news.title}">
            <h3>${news.title}</h3>
            <p class="news-date">${formatDate(news.date)}</p>
            <p class="news-summary">${news.summary}</p>

            <span class="read-more">
                ดูเพิ่มเติม →
            </span>
        </a>
    `).join("");

    // ซ่อนปุ่มถ้าแสดงครบแล้ว
    if (loadMoreBtn) {
        loadMoreBtn.style.display =
            visibleCount >= filteredNews.length ? "none" : "block";
    }

    animateCards();
}


// =========================
// ปุ่ม Load More
// =========================
document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "load-more") {
        visibleCount += NEWS_PER_PAGE;
        renderNews();
    }
});


// =========================
// Animation
// =========================
function animateCards() {
    document.querySelectorAll(".news-card").forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("show");
        }, index * 100);
    });
}


// =========================
// Filter
// =========================
const filterButtons = document.querySelectorAll(".news-filter button");

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            const category = button.dataset.category;

            if (category === "all") {
                filteredNews = [...allNews];
            } else {
                filteredNews = allNews.filter(news => news.category === category);
            }

            visibleCount = NEWS_PER_PAGE;
            renderNews();

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
}
