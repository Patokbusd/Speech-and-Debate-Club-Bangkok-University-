/* =========================================================
   🔹 Navbar Scroll Effect
   เปลี่ยนลักษณะ Navbar เมื่อมีการเลื่อนหน้าเว็บ
   ========================================================= */

// ตรวจจับเหตุการณ์ scroll ของหน้าต่าง
window.addEventListener('scroll', function () {

  const navbar = document.querySelector('.navbar'); // เลือก element ที่มี class .navbar

  if (!navbar) return; // ถ้าไม่มี navbar ในหน้านี้ ให้หยุดทำงานทันที (กัน error)

  // ถ้าเลื่อนลงมากกว่า 50px จากด้านบน
  if (window.scrollY > 50) {
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
document.addEventListener('DOMContentLoaded', function () {

  const hamburger = document.getElementById('hamburger'); // ปุ่ม hamburger
  const menu = document.getElementById('menu'); // เมนูด้านข้าง
  const overlay = document.getElementById('overlay'); // พื้นหลัง overlay
  const body = document.body; // อ้างอิง body

  // ถ้าไม่มีเมนูในหน้านี้ ให้หยุด (กัน error)
  if (!hamburger || !menu || !overlay) return;

  /* ---------------------------
     เมื่อคลิกปุ่ม hamburger
  --------------------------- */
  hamburger.addEventListener('click', function () {

    menu.classList.toggle('active'); // เปิด/ปิด เมนู
    overlay.classList.toggle('active'); // เปิด/ปิด overlay
    this.classList.toggle('active'); // เปลี่ยนสถานะปุ่ม hamburger
    body.classList.toggle('menu-open'); // ป้องกัน scroll ขณะเมนูเปิด

  });


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
