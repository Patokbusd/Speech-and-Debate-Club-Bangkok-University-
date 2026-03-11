/* =========================================================
   🔹 Navbar Scroll Effect
   เปลี่ยนลักษณะ Navbar เมื่อมีการเลื่อนหน้าเว็บ
   ========================================================= */

// ตรวจจับเหตุการณ์ scroll ของหน้าต่าง
window.addEventListener('scroll', function () {

  const navbar = document.querySelector('.navbar'); // เลือก element ที่มี class .navbar

  if (!navbar) return; // ถ้าไม่มี navbar ในหน้านี้ ให้หยุดทำงานทันที (กัน error)

  // ถ้าเลื่อนลงมากกว่า 50px จากด้านบน
  if (window.scrollY > window.innerHeight * 0.3) {
    navbar.classList.add('scrolled'); // เพิ่ม class 'scrolled'
  } else { 
    navbar.classList.remove('scrolled'); // เอา class 'scrolled' ออก
  }

});




/* =========================================================
   🔹 Hamburger Menu + Overlay Control
   ควบคุมการเปิดปิดเมนูมือถือ
   ========================================================= */

// รอให้ DOM โหลดเสร็จก่อนทำงาน
document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  function handleScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("touchmove", handleScroll, { passive: true }); // สำหรับ iPad / mobile



  /* ---------------------------
     เมื่อคลิกที่ overlay
  --------------------------- */
  overlay.addEventListener('click', function () {

    menu.classList.remove('active'); // ปิดเมนู
    overlay.classList.remove('active'); // ปิด overlay
    hamburger.classList.remove('active'); // รีเซ็ตปุ่ม hamburger
    body.classList.remove('menu-open'); // เปิด scroll กลับมา

  });


  /* ---------------------------
     ปิดเมนูเมื่อคลิกลิงก์ในเมนู
  --------------------------- */
  document.querySelectorAll('.menu a').forEach(link => {

    link.addEventListener('click', () => {

      menu.classList.remove('active'); // ปิดเมนู
      overlay.classList.remove('active'); // ปิด overlay
      hamburger.classList.remove('active'); // รีเซ็ตปุ่ม
      body.classList.remove('menu-open'); // เปิด scroll

    });

  });

});
