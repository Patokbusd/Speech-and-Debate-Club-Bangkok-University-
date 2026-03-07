// ================================
// โหลดไฟล์ JSON ทั้งหมดพร้อมกัน
// ================================

Promise.all([ // เริ่มโหลดไฟล์ทั้งหมดพร้อมกัน
  fetch("../../data/committee.json").then(res => res.json()), // โหลดข้อมูล committee และแปลงเป็น JSON
  fetch("../../data/mc.json").then(res => res.json()), // โหลดข้อมูล mc และแปลงเป็น JSON
  fetch("../../data/debater.json").then(res => res.json()) // โหลดข้อมูล debater และแปลงเป็น JSON
])
.then(([committeeData, mcData, debaterData]) => { // เมื่อโหลดเสร็จจะได้ข้อมูลทั้ง 3 ไฟล์

  const dataMap = { // รวมข้อมูลทั้งหมดไว้ใน object เดียว
    committee: committeeData, // เก็บข้อมูล committee
    mc: mcData, // เก็บข้อมูล mc
    debater: debaterData // เก็บข้อมูล debater
  };

  renderPreview("committee", dataMap); // แสดง preview ของ committee
  renderPreview("mc", dataMap); // แสดง preview ของ mc
  renderPreview("debater", dataMap); // แสดง preview ของ debater

})
.catch(err => { // ถ้าโหลดไฟล์ไม่สำเร็จ
  console.error("โหลดข้อมูลสมาชิกไม่สำเร็จ:", err); // แสดง error ใน console
});


// ================================
// ฟังก์ชันสร้างการ์ด preview
// ================================

function renderPreview(group, dataMap) { // รับชื่อกลุ่มและข้อมูลทั้งหมด

  const container = document.getElementById(`${group}-preview`); // หา div สำหรับแสดงการ์ด
  if (!container) return; // ถ้าไม่เจอ container ให้หยุดทำงานทันที

  const groupData = dataMap[group]; // ดึงข้อมูลของกลุ่มนั้น
  const years = Object.keys(groupData).sort((a, b) => b - a); // เรียงปีจากมากไปน้อย
  const latestYear = years[0]; // เลือกปีล่าสุด

  container.innerHTML = ""; // ล้างข้อมูลเก่าก่อนป้องกันซ้ำ

  // วนลูปสมาชิกในปีล่าสุด
  groupData[latestYear].forEach((member, index) => {

    container.innerHTML += `
      <a href="member-detail.html?group=${group}&year=${latestYear}&id=${index}" class="member-card-link"> <!-- ลิงก์ไปหน้าโปรไฟล์เต็ม (แก้ path แล้ว ไม่ 404) -->
        
        <div class="member-card"> <!-- กล่องการ์ดสมาชิก -->
          
          <img 
            src="${member.image}" 
            alt="${member.name}" 
            onerror="this.src='../../asset/img/default-member.jpg'"> <!-- ถ้ารูปเสียให้ใช้รูปสำรอง -->
          
          <h3>${member.name}</h3> <!-- ชื่อสมาชิก -->
          
          <p>${member.position}</p> <!-- ตำแหน่งสมาชิก -->

        </div> <!-- ปิด member-card -->

      </a> <!-- ปิดลิงก์ -->

    `; // จบ template string

  }); // จบ forEach

} // จบฟังก์ชัน renderPreview
