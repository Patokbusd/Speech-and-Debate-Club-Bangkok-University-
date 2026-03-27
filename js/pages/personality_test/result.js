// ===== กัน error ถ้าเข้าหน้านี้ตรงๆ =====
let scores = JSON.parse(localStorage.getItem("scores")); // ดึงคะแนนจาก localStorage
if(!scores){ // ถ้าไม่มีคะแนน
  window.location.href = "quiz.html"; // เด้งกลับไปทำ quiz
}

// ===== ดึง element =====
const resultText = document.getElementById("result"); // ช่องชื่อผลลัพธ์
const descText = document.getElementById("desc"); // ช่องคำอธิบาย
const chart = document.getElementById("chart"); // ช่องกราฟ

// ===== แยกหมวด =====
const speakerKeys = ["story","debate","analyst","persuade","formal","fun"]; // ประเภทนักพูด
const houseKeys = ["vanguard","strategist","explorer","spotlight"]; // ประเภทบ้าน

// ===== ฟังก์ชันเรียงคะแนน =====
function sortScores(keys){ // รับ key array
  return keys
    .map(k => ({ key:k, score:scores[k] })) // แปลงเป็น object {key,score}
    .sort((a,b) => b.score - a.score); // เรียงจากมากไปน้อย
}

// ===== หาอันดับ =====
let speakerRank = sortScores(speakerKeys); // เรียงนักพูด
let houseRank = sortScores(houseKeys); // เรียงบ้าน

let primarySpeaker = speakerRank[0]; // นักพูดอันดับ 1
let secondarySpeaker = speakerRank[1]; // นักพูดอันดับ 2

let primaryHouse = houseRank[0]; // บ้านหลัก
let secondaryHouse = houseRank[1]; // บ้านรอง

// ===== ธีมสีบ้าน =====
const houseTheme = {
  vanguard: "#e74c3c",     // 🔥 สีแดง
  strategist: "#3498db",   // 🧠 สีฟ้า
  explorer: "#2ecc71",     // 🌱 สีเขียว
  spotlight: "#9b59b6"     // ✨ สีม่วง
};

// ===== เปลี่ยนพื้นหลังแบบ gradient =====
document.body.style.background = `linear-gradient(135deg, ${houseTheme[primaryHouse.key]}, #000)`; // ไล่สีสวยๆ

// ===== ระดับความชัด =====
function getLevel(a,b){ // รับคะแนน 2 อันดับ
  let diff = a - b; // หาส่วนต่าง
  if(diff >= 8) return "ชัดเจนมาก"; // ต่างเยอะ
  if(diff >= 4) return "ค่อนข้างชัด"; // ต่างปานกลาง
  return "ผสมผสาน"; // ใกล้กัน
}

let speakerLevel = getLevel(primarySpeaker.score, secondarySpeaker.score); // ระดับนักพูด
let houseLevel = getLevel(primaryHouse.score, secondaryHouse.score); // ระดับบ้าน

// ===== mapping ชื่อ =====
const speakerMap = {
  story:"นักเล่าเรื่อง",
  debate:"นักโต้วาที",
  analyst:"นักวิเคราะห์",
  persuade:"นักโน้มน้าว",
  formal:"พิธีกรทางการ",
  fun:"พิธีกรสายเอนเตอร์เทน"
};

const houseMap = {
  vanguard:"🔥 Destinite",     // บ้านผู้นำ
  strategist:"🧠 Borealise",   // บ้านวางแผน
  explorer:"🌱 Suppermiere",   // บ้านพัฒนา
  spotlight:"✨ Utopis"        // บ้านสังคม
};

// ===== คำอธิบาย =====
const speakerDesc = {

  story:`คุณเป็นนักเล่าเรื่องโดยธรรมชาติ คุณมีความสามารถในการถ่ายทอดประสบการณ์ ความรู้สึก และเหตุการณ์ต่าง ๆ ให้กลายเป็นเรื่องราวที่มีชีวิต ผู้ฟังไม่ได้แค่เข้าใจสิ่งที่คุณพูด แต่รู้สึกไปกับมัน

คุณมักจะเชื่อมโยงเนื้อหากับอารมณ์ ทำให้คนฟังอินและจดจำได้ง่าย จุดแข็งของคุณคือการสร้างภาพในหัวของผู้ฟัง และการใช้จังหวะในการเล่าเรื่องอย่างมีเสน่ห์

หากคุณพัฒนาโครงสร้างการเล่าเรื่องให้ชัดเจนยิ่งขึ้น คุณจะกลายเป็นนักพูดที่ทรงพลังอย่างมาก`,

  debate:`คุณเป็นนักคิดเชิงเหตุผลที่โดดเด่น คุณสามารถวิเคราะห์ประเด็น แยกแยะข้อมูล และโต้แย้งอย่างมีตรรกะ

คุณไม่กลัวความเห็นต่าง และสามารถยืนหยัดในมุมมองของตัวเองได้อย่างมั่นใจ จุดแข็งของคุณคือความเฉียบคมในการคิดและการตอบโต้

หากคุณเพิ่มการสื่อสารด้านอารมณ์เข้าไป คุณจะเป็นนักพูดที่ทั้งคมและเข้าถึงผู้ฟังได้อย่างแท้จริง`,

  analyst:`คุณเป็นคนที่มีความคิดเป็นระบบ สามารถนำเรื่องที่ซับซ้อนมาอธิบายให้เข้าใจง่าย

คุณมีความสามารถในการจัดระเบียบข้อมูล และสื่อสารอย่างชัดเจน ทำให้ผู้ฟังรู้สึกมั่นใจในสิ่งที่คุณพูด

หากคุณเพิ่มความสนุกหรือการเล่าเรื่องเข้าไป คุณจะเป็นนักพูดที่ทั้งเข้าใจง่ายและน่าฟัง`,

  persuade:`คุณมีความสามารถในการโน้มน้าวและเปลี่ยนความคิดของผู้ฟัง

คุณเข้าใจว่าผู้ฟังต้องการอะไร และสามารถสื่อสารเพื่อให้เกิดผลลัพธ์ได้ จุดแข็งของคุณคือการพูดอย่างมีเป้าหมาย

หากคุณรักษาความจริงใจไว้ได้ คุณจะเป็นนักพูดที่มีอิทธิพลอย่างมาก`,

  formal:`คุณมีบุคลิกที่น่าเชื่อถือ สุภาพ และเป็นมืออาชีพ

คุณสามารถควบคุมเวทีและบรรยากาศในงานทางการได้ดี ผู้ฟังรู้สึกมั่นใจเมื่อคุณเป็นผู้พูด

หากคุณเพิ่มความยืดหยุ่นและความเป็นกันเอง คุณจะยิ่งโดดเด่นมากขึ้น`,

  fun:`คุณมีพลังในการสร้างบรรยากาศและทำให้ผู้ฟังสนุก

คุณเป็นคนที่เข้าถึงง่าย เป็นธรรมชาติ และทำให้เวทีมีชีวิต จุดแข็งของคุณคือการสร้าง engagement

หากคุณพัฒนาโครงสร้างการพูดให้ชัดเจน คุณจะเป็นนักพูดที่ครบเครื่องมาก`
};

const houseDesc = {

  vanguard:`Destinite คือบ้านของผู้ที่มีจิตวิญญาณของผู้นำ

คุณเป็นคนที่กล้าตัดสินใจ กล้ารับผิดชอบ และยืนหยัดเพื่อสิ่งที่ถูกต้อง คุณให้ความสำคัญกับทีมและความสัมพันธ์

เมื่อถึงเวลาสำคัญ คุณคือคนที่ทุกคนหันมาหา`,

  strategist:`Borealise คือบ้านของนักวางแผน

คุณเป็นคนที่คิดเป็นระบบ วิเคราะห์ก่อนลงมือ และมองการณ์ไกล คุณเลือกทางที่ดีที่สุดเสมอ

คุณอาจไม่พูดมาก แต่ทุกการตัดสินใจของคุณมีเหตุผลรองรับ`,

  explorer:`Suppermiere คือบ้านของนักพัฒนา

คุณเป็นคนที่ไม่หยุดนิ่ง พร้อมเรียนรู้ และปรับตัวได้ดี คุณเชื่อว่าความพยายามสำคัญกว่าความสมบูรณ์แบบ

คุณมีศักยภาพในการเติบโตได้อย่างไม่จำกัด`,

  spotlight:`Utopis คือบ้านของผู้มีเสน่ห์

คุณเป็นคนที่เข้าสังคมเก่ง เข้าใจผู้คน และสร้างบรรยากาศที่ดีได้เสมอ

คุณสามารถเชื่อมโยงผู้คนเข้าด้วยกัน และเป็นพลังบวกในทุกสถานการณ์`
};

// ===== TITLE =====
let title = `🎤 คุณคือ: ${speakerMap[primarySpeaker.key]}
🏠 บ้าน: ${houseMap[primaryHouse.key]}`; // แสดงตัวหลัก

// ===== DESCRIPTION =====
let description = `
คุณเป็น ${speakerMap[primarySpeaker.key]} อย่าง${speakerLevel}
${speakerDesc[primarySpeaker.key]}

คุณยังมีความเป็น ${speakerMap[secondarySpeaker.key]}
${speakerDesc[secondarySpeaker.key]}

---

บุคลิกของคุณอยู่ใน ${houseMap[primaryHouse.key]} (${houseLevel})
${houseDesc[primaryHouse.key]}

และยังมีลักษณะของ ${houseMap[secondaryHouse.key]}
${houseDesc[secondaryHouse.key]}

---

คุณเป็นคนที่มีศักยภาพสูงในการพัฒนาเป็นนักพูดที่โดดเด่นในอนาคต 🎤✨
`;

// ===== เอฟเฟกต์พิมพ์ =====
let i = 0; // ตัวนับ
function typeEffect(){ // ฟังก์ชันพิมพ์ทีละตัว
  if(i < title.length){ // ถ้ายังไม่ครบ
    resultText.innerHTML += title.charAt(i); // เพิ่มทีละตัว
    resultText.style.opacity = 1; // ทำให้ค่อยๆปรากฏ
    i++; // เพิ่ม index
    setTimeout(typeEffect, 25); // หน่วงเวลา
  } else {
    descText.innerText = description; // แสดงคำอธิบาย
    createChart(); // สร้างกราฟ
  }
}

setTimeout(typeEffect, 500); // หน่วงก่อนเริ่ม

// ===== สร้างกราฟ =====
function createChart(){ // ฟังก์ชันสร้างกราฟ

  speakerKeys.forEach(key => { // loop ทุก type

    let maxScore = 20; // ✅ คะแนนเต็ม (แก้แล้ว)
    let percent = (scores[key] / maxScore) * 100; // คำนวณ %

    let bar = document.createElement("div"); // สร้าง div
    bar.className = "bar"; // ใส่ class

    bar.innerHTML = `
      <span>${speakerMap[key]}</span>
      <div class="bar-fill">
        <div class="bar-inner"></div>
      </div>
    `; // โครงสร้างกราฟ

    chart.appendChild(bar); // เพิ่มเข้า DOM

    setTimeout(()=>{ // animation
      bar.querySelector(".bar-inner").style.width = percent + "%"; // ความยาวแท่ง
      bar.querySelector(".bar-inner").style.background = houseTheme[primaryHouse.key]; // สีตามบ้าน
    },100);

  });

}