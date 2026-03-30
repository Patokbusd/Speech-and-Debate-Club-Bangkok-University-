/* ================================
   🔹 Video Slider
   ตั้งค่า Video Slider
================================== */
const slides = document.querySelectorAll(".video-slider video"); // เลือกวิดีโอทั้งหมดใน slider
const slider = document.querySelector(".video-slider"); // เลือก container หลักของ slider
let current = 0; // เก็บ index สไลด์ปัจจุบัน
let slideInterval; // ตัวแปรเก็บ interval autoplay
let startX = 0; // เก็บตำแหน่ง X ตอนเริ่มปัดนิ้ว
let isScrolling = false; // ใช้ป้องกันการ scroll รัวเกินไป

function showSlide(index) { // ฟังก์ชันสำหรับแสดงสไลด์ตาม index ที่ส่งมา
  slides[current].classList.remove("active"); // เอา class active ออกจากสไลด์ปัจจุบัน
  current = (index + slides.length) % slides.length; // คำนวณ index ใหม่แบบวนลูป
  slides[current].classList.add("active"); // ใส่ class active ให้สไลด์ใหม่
  slides[current].currentTime = 0; // รีเซ็ตเวลาเล่นวิดีโอให้เริ่มต้นใหม่
  slides[current].play(); // เล่นวิดีโอของสไลด์ใหม่
}

function nextSlide() { // ฟังก์ชันไปสไลด์ถัดไป
  showSlide(current + 1); // เรียก showSlide พร้อม index ถัดไป
}

function prevSlide() { // ฟังก์ชันย้อนกลับสไลด์ก่อนหน้า
  showSlide(current - 1); // เรียก showSlide พร้อม index ก่อนหน้า
}

function resetInterval() { // ฟังก์ชันรีเซ็ต autoplay เมื่อมี interaction
  clearInterval(slideInterval); // ล้าง interval เดิม
  slideInterval = setInterval(nextSlide, 7000); // ตั้ง autoplay ใหม่ทุก 7 วินาที
}

slider.addEventListener("click", (e) => { // ตรวจจับการคลิกบน slider
  const clickX = e.clientX - slider.getBoundingClientRect().left; // คำนวณตำแหน่งที่คลิกจากขอบซ้าย
  if (clickX < slider.clientWidth / 2) { // ถ้าคลิกฝั่งซ้ายครึ่งหนึ่งของ slider
    prevSlide(); // ไปสไลด์ก่อนหน้า
  } else { // ถ้าคลิกฝั่งขวา
    nextSlide(); // ไปสไลด์ถัดไป
  }
  resetInterval(); // รีเซ็ต autoplay หลังจากคลิก
});

slider.addEventListener("touchstart", (e) => { // ตรวจจับตอนเริ่มแตะหน้าจอ
  startX = e.touches[0].clientX; // บันทึกตำแหน่ง X ตอนเริ่มแตะ
});

slider.addEventListener("touchend", (e) => { // ตรวจจับตอนปล่อยนิ้ว
  const endX = e.changedTouches[0].clientX; // เก็บตำแหน่ง X ตอนปล่อยนิ้ว
  const diff = startX - endX; // คำนวณระยะที่ปัด
  if (diff > 50) { // ถ้าปัดไปทางซ้ายเกิน 50px
    nextSlide(); // ไปสไลด์ถัดไป
    resetInterval(); // รีเซ็ต autoplay
  }
  if (diff < -50) { // ถ้าปัดไปทางขวาเกิน 50px
    prevSlide(); // ไปสไลด์ก่อนหน้า
    resetInterval(); // รีเซ็ต autoplay
  }
});

slider.addEventListener("wheel", (e) => { // ตรวจจับการหมุนลูกกลิ้งเมาส์
  if (isScrolling) return; // ถ้ายังอยู่ในช่วงหน่วง ไม่ให้ทำงานซ้ำ
  isScrolling = true; // ตั้งสถานะว่ากำลัง scroll อยู่
  if (e.deltaY > 0) { // ถ้าหมุนลง
    nextSlide(); // ไปสไลด์ถัดไป
  } else { // ถ้าหมุนขึ้น
    prevSlide(); // ไปสไลด์ก่อนหน้า
  }
  resetInterval(); // รีเซ็ต autoplay
  setTimeout(() => { // ตั้งเวลาเพื่อปลดล็อกการ scroll
    isScrolling = false; // อนุญาตให้ scroll ใหม่ได้
  }, 800); // หน่วงเวลา 800ms เพื่อกันการเลื่อนรัว
});

window.addEventListener("load", () => { // เมื่อหน้าเว็บโหลดเสร็จ
  slides[current].play(); // เล่นวิดีโอแรก
  slideInterval = setInterval(nextSlide, 7000); // เริ่ม autoplay ทุก 7 วินาที

});



/* =========================================================
   ❗️Scroll Animation เล่นซ้ำ + Blur❗️
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const contentMain = document.querySelector(".content-main"); // เลือก section

  if (!contentMain) return; // ถ้าไม่มี section นี้ให้หยุด

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        contentMain.classList.add("show"); // เข้า viewport → เล่น
      } else {
        contentMain.classList.remove("show"); // ออก viewport → รีเซ็ต
      }

    });

  }, {
    threshold: 0.40 // เห็นประมาณ 40% แล้วค่อยทำงาน
  });

  observer.observe(contentMain); // เริ่มสังเกต

});



/* =========================================================
   🔥 แสดง 3 ข่าวล่าสุดในหน้า Home
   ใช้โครงสร้างเดียวกับ news.js 100%
   ========================================================= */

import { fetchJSON, formatDate } from "/Speech-and-Debate-Club-Bangkok-University-/js/utils.js"; // ใช้ util เดียวกัน

const NEWS_LIMIT = 3; // หน้า Home แสดงแค่ 3 ข่าว

document.addEventListener("DOMContentLoaded", init);

async function init() {
    try {

        /* โหลดข่าวจากไฟล์ json */
        const data = await fetchJSON("/Speech-and-Debate-Club-Bangkok-University-/data/news.json");

        const newsArray = Array.isArray(data) ? data : data.news;

        if (!Array.isArray(newsArray)) {
            throw new Error("โครงสร้าง news.json ไม่ถูกต้อง");
        }

        /* เรียงข่าวล่าสุดก่อน */
        const sortedNews = newsArray.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        /* เอาแค่ 3 ข่าวล่าสุด */
        const latestNews = sortedNews.slice(0, NEWS_LIMIT);

        renderNews(latestNews);

    } catch (error) {
        console.error("โหลดข่าวหน้า Home ไม่สำเร็จ:", error);
    }
}


/* =========================
   แสดงข่าว
========================= */
function renderNews(newsArray) {

    const container = document.getElementById("news-list");
    if (!container) return;

    container.innerHTML = newsArray.map(news => `
        <a href="pages/news/news-detail.html?id=${news.id}" class="news-card">
            
            <!-- รูปข่าว -->
            <img src="${news.image}" alt="${news.title}">

            <!-- หัวข้อข่าว -->
            <h3>${news.title}</h3>

            <!-- วันที่ -->
            <p class="news-date">${formatDate(news.date)}</p>

            <!-- สรุปข่าว -->
            <p class="news-summary">${news.summary}</p>

            <!-- ปุ่มอ่านเพิ่มเติม -->
            <span class="read-more">
                ดูเพิ่มเติม →
            </span>

        </a>
    `).join("");

    animateCards();
}


/* =========================
   Animation เหมือนหน้า news
========================= */
function animateCards() {

    document.querySelectorAll(".news-card").forEach((card, index) => {

        setTimeout(() => {
            card.classList.add("show");
        }, index * 120); // หน่วงทีละใบ

    });

}




/* ================================
   🔹 Swiper Initialization
   ตั้งค่าและเปิดใช้งาน Swiper Slider
================================== */

// สร้างตัวแปร swiper และเรียกใช้งาน Swiper กับ element ที่มี class ชื่อ .mySwiper
const swiper = new Swiper(".mySwiper", { // เริ่มต้นตั้งค่า Swiper

  effect: "coverflow",              // ใช้เอฟเฟกต์แบบ 3D coverflow ทำให้การ์ดกลางเด่นที่สุด
  centeredSlides: true,             // บังคับให้สไลด์ที่ active อยู่ตรงกึ่งกลางเสมอ
  loop: true,                       // เปิดโหมดวนลูป เลื่อนสุดแล้วต่อกลับต้นได้

  autoplay: {                       // ✅ เพิ่มระบบเลื่อนอัตโนมัติ (ไม่กระทบโค้ดเดิม)
    delay: 7000,                    // หน่วงเวลา 7000ms (7 วินาที) ก่อนเลื่อนไปสไลด์ถัดไป
    disableOnInteraction: false,    // เมื่อผู้ใช้ลาก/คลิก สไลด์จะไม่หยุด autoplay
    pauseOnMouseEnter: true         // เมื่อเอาเมาส์ชี้บนสไลด์ จะหยุดชั่วคราว
  },                                // ปิด object ของ autoplay

  slidesPerView: "auto",            // จำนวนสไลด์ที่แสดงขึ้นอยู่กับขนาด width ใน CSS
  slideToClickedSlide: true,        // เมื่อคลิกการ์ดไหน จะเลื่อนไปการ์ดนั้นให้เป็น active
  speed: 1100,                      // ความเร็วในการเคลื่อนที่ของสไลด์ (ค่าสูง = เคลื่อนที่นุ่มขึ้น)
  touchRatio: 0.75,                 // ความไวตอนลากนิ้ว (ยิ่งน้อย = หนืดขึ้น)
  resistance: true,                 // เปิดแรงต้านเมื่อเลื่อนชนขอบ
  resistanceRatio: 5,               // ระดับความหนืดตอนชนขอบ (ยิ่งสูงยิ่งหนืด)
  followFinger: true,               // ให้สไลด์เคลื่อนตามนิ้วแบบ realtime ขณะลาก
  threshold: 5,                     // ระยะขั้นต่ำ (px) ก่อนเริ่มเปลี่ยนสไลด์ ป้องกันการขยับเล็ก ๆ

  mousewheel: {                     // ตั้งค่าการเลื่อนด้วยลูกกลิ้งเมาส์
    forceToAxis: true,              // บังคับให้เลื่อนเฉพาะแนวนอนเท่านั้น
    sensitivity: 0.6                // ความไวของลูกกลิ้ง (ลดลง = หนืดมากขึ้น)
  },                                // ปิด object ของ mousewheel

  longSwipesRatio: 0.1,             // อัตราส่วนระยะลากเพื่อเปลี่ยนสไลด์ (ต่ำ = เปลี่ยนง่าย)
  longSwipesMs: 50,                 // ระยะเวลา (ms) ที่ใช้วัดว่าเป็น long swipe ช่วยให้ snap นุ่มขึ้น

  coverflowEffect: {                // ตั้งค่ารายละเอียดเอฟเฟกต์ coverflow
    rotate: 0,                      // ไม่หมุนสไลด์ซ้ายขวา
    stretch: 0,                     // ไม่ยืดระยะห่างสไลด์
    depth: 150,                     // ความลึกในแกน Z (ยิ่งมากยิ่งดูมีมิติ)
    modifier: 2,                    // ความเข้มของเอฟเฟกต์ 3D
    slideShadows: false             // ปิดเงาด้านข้างของสไลด์
  },                                // ปิด object ของ coverflowEffect

  pagination: {                     // ตั้งค่าจุดแสดงตำแหน่งสไลด์ด้านล่าง
    el: ".swiper-pagination",       // ระบุ element ที่ใช้แสดง pagination
    clickable: true,                // ให้สามารถคลิกจุดเพื่อเปลี่ยนสไลด์ได้
  }                                 // ปิด object ของ pagination

});                                  // ปิด config object และจบการสร้าง Swiper




/* ================================
   🔹 สปอนเซอร์ (ทำให้เลื่อนไม่ขาด)
================================= */

document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("sponsorTrack");
  if(!track) return;

  const container = track.parentElement;

  // 🔥 clone ไปเรื่อย ๆ จน "ยาวพอ"
  while (track.scrollWidth < container.offsetWidth * 2) {
    track.innerHTML += track.innerHTML;
  }

  // เอาความกว้าง "ครึ่งแรก"
  const width = track.scrollWidth / 2;

  // ส่งให้ CSS
  track.style.setProperty('--scroll-width', width + 'px');

});


  