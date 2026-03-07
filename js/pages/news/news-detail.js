import { getQueryParam, formatDate } from "../../utils.js";

const newsId = getQueryParam("id"); // ดึง id จาก URL เช่น ?id=1

const titleEl = document.getElementById("news-title");
const dateEl = document.getElementById("news-date");
const coverEl = document.getElementById("news-cover");
const contentEl = document.getElementById("news-content");

async function loadNewsDetail() {
  try {
    const res = await fetch("../../data/news.json");
    const data = await res.json();

    // รองรับทั้งกรณีเป็น array ตรง ๆ หรือมี key ครอบ
    const newsArray = Array.isArray(data) ? data : data.news;

    if (!Array.isArray(newsArray)) {
      throw new Error("โครงสร้าง news.json ไม่ถูกต้อง");
    }

    // ค้นหาข่าวตาม id
    const newsItem = newsArray.find(item => item.id == newsId);

    if (!newsItem) {
      titleEl.textContent = "ไม่พบข่าว";
      return;
    }

    // ใส่ข้อมูลลงหน้าเว็บ
    titleEl.textContent = newsItem.title;
    dateEl.textContent = formatDate(newsItem.date);
    coverEl.src = newsItem.image;      // ใช้ image ให้ตรงกับ news.js
    coverEl.alt = newsItem.title;      // เพิ่ม alt ให้ถูกต้อง
    contentEl.innerHTML = newsItem.content || ""; // กัน undefined

    // เปลี่ยน title บนแท็บ
    document.title = newsItem.title + " | Speech & Debate Club";

  } catch (error) {
    titleEl.textContent = "เกิดข้อผิดพลาดในการโหลดข่าว";
    console.error("โหลดข่าว detail ไม่สำเร็จ:", error);
  }
}

loadNewsDetail();
