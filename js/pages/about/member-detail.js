const params = new URLSearchParams(window.location.search); // อ่านค่าจาก URL
const group = params.get("group"); // ดึงค่า group
const year = params.get("year"); // ดึงค่า year
const id = params.get("id"); // ดึงค่า id

Promise.all([ // โหลดไฟล์ JSON ทั้งหมด
  fetch("../../data/committee.json").then(res => res.json()), // โหลด committee
  fetch("../../data/mc.json").then(res => res.json()), // โหลด mc
  fetch("../../data/debater.json").then(res => res.json()) // โหลด debater
]).then(([committeeData, mcData, debaterData]) => { // เมื่อโหลดเสร็จ

  const dataMap = { // รวมข้อมูลไว้ใน object เดียว
    committee: committeeData,
    mc: mcData,
    debater: debaterData
  };

  const member = dataMap[group][year][id]; // ดึงข้อมูลสมาชิกตาม group year id

  const container = document.getElementById("member-detail"); // หา div แสดงผล

  if (!member) { // ถ้าไม่พบข้อมูล
    container.innerHTML = "<h2>ไม่พบข้อมูลสมาชิก</h2>"; // แสดงข้อความ error
    return; // หยุดทำงาน
  }

  container.innerHTML = ` 
    <div class="member-detail-card"> <!-- กล่องหลัก -->
      <img src="${member.image}" alt="${member.name}" class="detail-img"> <!-- รูป -->
      <h2>${member.name}</h2> <!-- ชื่อ -->
      <h4>${member.position}</h4> <!-- ตำแหน่ง -->
      <div class="detail-content">
        ${member.description ? member.description : ""} <!-- รายละเอียด (ถ้ามี) -->
      </div>
      <a href="javascript:history.back()" class="back-btn">ย้อนกลับ</a> <!-- ปุ่มย้อนกลับ -->
    </div>
  `; // จบ template

}).catch(err => { // ถ้าโหลดไม่สำเร็จ
  console.error("โหลดข้อมูลไม่สำเร็จ:", err); // แสดง error
});
