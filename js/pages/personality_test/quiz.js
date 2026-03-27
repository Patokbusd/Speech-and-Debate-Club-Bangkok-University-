// ================== QUESTIONS ==================
const questions = [

  // ================= 🎤 SPEAKER =================

  // STORY
  { text:"ฉันสามารถเล่าเรื่องให้คนฟังรู้สึกอินและเห็นภาพตามได้", type:"story", weight:2 },
  { text:"เวลาพูด ฉันมักใช้ตัวอย่างหรือประสบการณ์จริงประกอบ", type:"story", weight:1 },
  { text:"ฉันไม่ค่อยถนัดการเล่าเรื่องยาว ๆ ให้คนฟัง", type:"story", reverse:true },

  // DEBATE
  { text:"ฉันสามารถโต้แย้งความคิดเห็นที่ไม่เห็นด้วยได้อย่างมั่นใจ", type:"debate", weight:2 },
  { text:"ฉันชอบวิเคราะห์ข้อดีข้อเสียของแต่ละมุมมอง", type:"debate", weight:1 },
  { text:"ฉันหลีกเลี่ยงการโต้เถียงหรือถกเถียงกับคนอื่น", type:"debate", reverse:true },

  // ANALYST
  { text:"ฉันสามารถอธิบายเรื่องซับซ้อนให้เข้าใจง่ายเป็นขั้นตอน", type:"analyst", weight:2 },
  { text:"ฉันชอบจัดระเบียบความคิดก่อนจะพูด", type:"analyst", weight:1 },
  { text:"ฉันมักพูดแบบไม่ค่อยมีโครงสร้างชัดเจน", type:"analyst", reverse:true },

  // PERSUADE
  { text:"ฉันสามารถทำให้คนอื่นคล้อยตามสิ่งที่ฉันพูดได้", type:"persuade", weight:2 },
  { text:"ฉันรู้ว่าควรใช้คำพูดแบบไหนให้เหมาะกับแต่ละคน", type:"persuade", weight:1 },
  { text:"ฉันไม่ค่อยสนใจว่าจะโน้มน้าวคนอื่นได้หรือไม่", type:"persuade", reverse:true },

  // FORMAL
  { text:"ฉันสามารถพูดในงานทางการได้อย่างมั่นใจและเหมาะสม", type:"formal", weight:2 },
  { text:"ฉันให้ความสำคัญกับภาพลักษณ์และความสุภาพเวลาพูด", type:"formal", weight:1 },
  { text:"ฉันไม่ค่อยใส่ใจเรื่องมารยาทหรือความเป็นทางการในการพูด", type:"formal", reverse:true },

  // FUN
  { text:"ฉันสามารถสร้างบรรยากาศให้คนรอบตัวสนุกได้", type:"fun", weight:2 },
  { text:"ฉันชอบโต้ตอบหรือเล่นกับผู้ฟังเวลาพูด", type:"fun", weight:1 },
  { text:"ฉันไม่ค่อยชอบเป็นจุดสนใจของคนจำนวนมาก", type:"fun", reverse:true },


  // ================= 🏠 HOUSE =================

  // DESTINITE (vanguard)
  { text:"ฉันมักเป็นคนที่ตัดสินใจหรือพาทีมไปข้างหน้า", type:"vanguard", weight:2 },
  { text:"ฉันให้ความสำคัญกับทีมและความสามัคคี", type:"vanguard", weight:1 },
  { text:"ฉันไม่ชอบรับบทเป็นผู้นำ", type:"vanguard", reverse:true },

  // BOREALISE (strategist)
  { text:"ฉันมักวางแผนก่อนลงมือทำเสมอ", type:"strategist", weight:2 },
  { text:"ฉันคิดถึงผลลัพธ์ระยะยาวก่อนตัดสินใจ", type:"strategist", weight:1 },
  { text:"ฉันมักตัดสินใจแบบไม่คิดล่วงหน้า", type:"strategist", reverse:true },

  // SUPPERMIERE (explorer)
  { text:"ฉันพร้อมลองสิ่งใหม่และเรียนรู้จากมัน", type:"explorer", weight:2 },
  { text:"ฉันสามารถปรับตัวกับสถานการณ์ใหม่ได้ดี", type:"explorer", weight:1 },
  { text:"ฉันไม่ชอบการเปลี่ยนแปลง", type:"explorer", reverse:true },

  // UTOPIS (spotlight)
  { text:"ฉันรู้สึกมีพลังเมื่อได้อยู่ท่ามกลางผู้คน", type:"spotlight", weight:2 },
  { text:"ฉันสามารถสร้างความสัมพันธ์กับคนอื่นได้ง่าย", type:"spotlight", weight:1 },
  { text:"ฉันรู้สึกเหนื่อยเมื่ออยู่ในสังคมนาน ๆ", type:"spotlight", reverse:true }

];

// ================== SCALE ==================
const scale = ["มากที่สุด","มาก","ปานกลาง","น้อย","น้อยที่สุด"]; // ตัวเลือกคำตอบ

// ================== STATE ==================
let current = 0; // ข้อปัจจุบัน
let answers = new Array(questions.length).fill(null); // เก็บคำตอบทุกข้อ

// ================== DOM ==================
const questionText = document.getElementById("questionText"); // กล่องคำถาม
const optionsDiv = document.getElementById("options"); // กล่องตัวเลือก
const progress = document.getElementById("progress"); // ข้อที่เท่าไร
const nextBtn = document.getElementById("nextBtn"); // ปุ่มถัดไป
const backBtn = document.getElementById("backBtn"); // ปุ่มย้อน
const questionBox = document.getElementById("questionBox"); // ใช้ animation

// ================== LOAD QUESTION ==================
function loadQuestion(){ // โหลดคำถาม
  questionText.innerText = questions[current].text; // แสดงคำถาม
  progress.innerText = `ข้อ ${current+1} / ${questions.length}`; // แสดงลำดับข้อ
  optionsDiv.innerHTML = ""; // ล้างตัวเลือก

  scale.forEach((s,i)=>{ // loop ตัวเลือก
    let val = 5 - i; // คะแนน
    let checked = answers[current] === val ? "checked" : ""; // restore คำตอบ

    let label = document.createElement("label"); // สร้าง label
    label.innerHTML = `<input type="radio" name="opt" value="${val}" ${checked}><span>${s}</span>`;
    optionsDiv.appendChild(label); // แสดง
  });

  // ===== progress bar =====
  let percent = ((current+1) / questions.length) * 100; // คำนวณ %
  document.getElementById("progressFill").style.width = percent + "%"; // อัปเดต bar
}

// ================== NEXT ==================
nextBtn.onclick = () => { // เมื่อกดถัดไป
  let selected = document.querySelector("input[name=opt]:checked"); // คำตอบที่เลือก
  if(!selected) return alert("กรุณาเลือกคำตอบ"); // กันไม่ตอบ

  let val = parseInt(selected.value); // แปลงเป็นตัวเลข
  answers[current] = val; // เก็บคำตอบ

  questionBox.classList.add("slide-out"); // เล่น animation ออก

  setTimeout(()=>{ // รอ animation
    current++; // ไปข้อถัดไป

    if(current < questions.length){ // ถ้ายังไม่จบ
      questionBox.classList.remove("slide-in","slide-out");
      questionBox.classList.add("slide-in");
      loadQuestion(); // โหลดข้อใหม่
    } else {

      let finalScores = { // object คะแนน
        story:0, debate:0, analyst:0, persuade:0, formal:0, fun:0,
        vanguard:0, strategist:0, explorer:0, spotlight:0
      };

      answers.forEach((ans, i) => { // loop ทุกข้อ
      let q = questions[i]; // ดึงคำถามข้อนั้น
      let type = q.type; // ประเภท

      let base = ans || 0; // ค่าคะแนนที่เลือก (1-5)+กันค่า null

      // ===== reverse scoring =====
      if(q.reverse){ // ถ้าเป็นคำถามกลับด้าน
        base = 6 - base; // กลับคะแนน เช่น 5→1
      }

      // ===== weight =====
      let weight = q.weight || 1; // ถ้าไม่มี weight ให้ =1

      let final = base * weight; // คูณน้ำหนัก

      finalScores[type] += final; // บวกคะแนน
    });

      localStorage.setItem("scores", JSON.stringify(finalScores)); // เก็บคะแนน
      localStorage.setItem("answers", JSON.stringify(answers)); // เก็บคำตอบ

      window.location.href = "result.html"; // ไปหน้า result
    }
  },300); // เวลา animation
};

// ================== BACK ==================
backBtn.onclick = () => { // เมื่อกดย้อน
  if(current > 0){ // ถ้าไม่ใช่ข้อแรก

    questionBox.classList.add("slide-out"); // animation ออก

    setTimeout(()=>{ // หน่วง
      current--; // ย้อนข้อ
      questionBox.classList.remove("slide-out"); // ลบ class
      questionBox.classList.add("slide-in"); // animation เข้า
      loadQuestion(); // โหลดใหม่
    },300);
  }
};

// ================== START ==================
loadQuestion(); // เริ่มต้นโหลดข้อแรก