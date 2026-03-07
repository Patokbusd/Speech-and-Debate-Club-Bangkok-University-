Promise.all([ // โหลดไฟล์ JSON ทั้งหมดพร้อมกัน
  fetch("../../data/committee.json").then(res => res.json()), // โหลด committee
  fetch("../../data/mc.json").then(res => res.json()), // โหลด mc
  fetch("../../data/debater.json").then(res => res.json()) // โหลด debater
]).then(([committeeData, mcData, debaterData]) => { // เมื่อโหลดเสร็จ

  const dataMap = { // รวมข้อมูลไว้ใน object เดียว
    committee: committeeData, // ข้อมูล committee
    mc: mcData, // ข้อมูล mc
    debater: debaterData // ข้อมูล debater
  };

  renderSection("committee", dataMap); // แสดง committee
  renderSection("mc", dataMap); // แสดง mc
  renderSection("debater", dataMap); // แสดง debater

}).catch(err => { // ถ้าโหลดไม่สำเร็จ
  console.error("โหลดข้อมูลสมาชิกไม่สำเร็จ:", err); // แสดง error
});

function renderSection(group, dataMap) { // ฟังก์ชันสร้าง section สมาชิกทั้งหมด

  const container = document.getElementById(`${group}-list`); // หา div สำหรับแสดงสมาชิก
  const selectBox = document.querySelector(`.custom-select[data-group="${group}"]`); // หา dropdown ของกลุ่มนั้น
  const selected = selectBox.querySelector(".select-selected"); // กล่องที่แสดงปีปัจจุบัน
  const items = selectBox.querySelector(".select-items"); // กล่องตัวเลือกปี

  const groupData = dataMap[group]; // ดึงข้อมูลของกลุ่ม
  const years = Object.keys(groupData).sort((a,b) => b - a); // เรียงปีมากไปน้อย

  selected.textContent = years[0]; // ตั้งค่าเริ่มต้นเป็นปีล่าสุด
  renderMembers(group, years[0], dataMap); // แสดงสมาชิกปีล่าสุด

  items.innerHTML = ""; // ล้างตัวเลือกเก่า

  years.forEach(year => { // วนสร้างตัวเลือกปี
    const div = document.createElement("div"); // สร้าง div ใหม่
    div.textContent = year; // ใส่ข้อความปี
    div.addEventListener("click", () => { // เมื่อคลิกปี
      selected.textContent = year; // เปลี่ยนปีที่เลือก
      renderMembers(group, year, dataMap); // แสดงสมาชิกตามปี
      items.style.display = "none"; // ซ่อน dropdown
    });
    items.appendChild(div); // เพิ่มเข้า select-items
  });

  selected.addEventListener("click", () => { // เมื่อคลิก select box
    items.style.display = items.style.display === "block" ? "none" : "block"; // toggle เปิด/ปิด
  });

}

function renderMembers(group, year, dataMap) { // ฟังก์ชันสร้างการ์ดสมาชิก

  const container = document.getElementById(`${group}-list`); // หา container
  const groupData = dataMap[group]; // ดึงข้อมูลกลุ่ม
  const members = groupData[year]; // ดึงสมาชิกตามปี

  container.innerHTML = ""; // ล้างข้อมูลก่อนกันซ้ำ

  members.forEach((member, index) => { // วนลูปสมาชิกแต่ละคน

    container.innerHTML += `
      <a href="member-detail.html?group=${group}&year=${year}&id=${index}" class="member-card-link"> <!-- ลิงก์ไปหน้า profile -->
        <div class="member-card"> <!-- กล่องการ์ด -->
          <img src="${member.image}" alt="${member.name}"> <!-- รูปสมาชิก -->
          <h3>${member.name}</h3> <!-- ชื่อ -->
          <p>${member.position}</p> <!-- ตำแหน่ง -->
        </div> <!-- ปิด card -->
      </a> <!-- ปิดลิงก์ -->
    `; // จบ template string

  });

}
