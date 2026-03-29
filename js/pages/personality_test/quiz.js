// ================== QUESTIONS ==================
const questions = [

  // ================= 🎤 SPEAKER =================

  // STORY (เล่าเรื่อง = emotion + visualization)
  { text:"เมื่อฉันเล่าเรื่อง คนฟังมักแสดงอารมณ์ร่วม (เช่น หัวเราะ เงียบ หรืออินตาม)", type:"story", weight:2 },
  { text:"ฉันมักใช้เหตุการณ์จริงหรือภาพเปรียบเทียบเพื่อให้คนเข้าใจสิ่งที่ฉันพูด", type:"story", weight:1 },
  { text:"เวลาพูด ฉันมักเน้นข้อมูลมากกว่าการเล่าเรื่องหรือสร้างอารมณ์", type:"story", reverse:true },

  // DEBATE (logic + pressure thinking)
  { text:"เมื่อมีคนเห็นต่าง ฉันสามารถโต้แย้งด้วยเหตุผลโดยไม่เสียความมั่นใจ", type:"debate", weight:2 },
  { text:"ฉันสามารถหาจุดอ่อนของเหตุผลคนอื่นได้อย่างรวดเร็ว", type:"debate", weight:1 },
  { text:"ฉันมักหลีกเลี่ยงสถานการณ์ที่ต้องแสดงความคิดเห็นขัดแย้งกับผู้อื่น", type:"debate", reverse:true },

  // ANALYST (structure + clarity)
  { text:"ฉันสามารถอธิบายเรื่องยากให้คนอื่นเข้าใจได้เป็นขั้นตอนอย่างชัดเจน", type:"analyst", weight:2 },
  { text:"ก่อนพูด ฉันมักเรียบเรียงสิ่งที่จะพูดเป็นลำดับในหัวก่อนเสมอ", type:"analyst", weight:1 },
  { text:"ฉันมักพูดไปเรื่อย ๆ โดยไม่ได้จัดโครงสร้างความคิดให้ชัดเจน", type:"analyst", reverse:true },

  // PERSUADE (influence + audience awareness)
  { text:"ฉันสามารถปรับวิธีพูดให้เหมาะกับคนแต่ละแบบเพื่อให้เขาคล้อยตาม", type:"persuade", weight:2 },
  { text:"ฉันมักพูดโดยมีเป้าหมายชัดเจนว่าต้องการให้ผู้ฟังคิดหรือทำอะไร", type:"persuade", weight:1 },
  { text:"ฉันพูดในสิ่งที่คิด โดยไม่ได้สนใจว่าคนฟังจะรู้สึกหรือเปลี่ยนความคิดหรือไม่", type:"persuade", reverse:true },

  // FORMAL (professional + control)
  { text:"ฉันสามารถควบคุมน้ำเสียง ภาษา และท่าทางให้เหมาะสมกับสถานการณ์ทางการได้", type:"formal", weight:2 },
  { text:"ฉันให้ความสำคัญกับภาพลักษณ์และความน่าเชื่อถือเวลาพูดต่อหน้าคนอื่น", type:"formal", weight:1 },
  { text:"ฉันมักพูดแบบสบาย ๆ โดยไม่ค่อยปรับให้เหมาะกับสถานการณ์ที่เป็นทางการ", type:"formal", reverse:true },

  // FUN (engagement + energy)
  { text:"เมื่อฉันพูด ฉันสามารถทำให้บรรยากาศสนุกและคนมีส่วนร่วมได้", type:"fun", weight:2 },
  { text:"ฉันชอบโต้ตอบกับผู้ฟัง เช่น ถาม-ตอบ เล่นมุก หรือดึงคนเข้ามามีส่วนร่วม", type:"fun", weight:1 },
  { text:"ฉันรู้สึกไม่สบายใจเมื่อเป็นจุดสนใจของคนจำนวนมาก", type:"fun", reverse:true },


  // ================= 🏠 HOUSE =================

  // DESTINITE (vanguard) — เน้นทีม + ใจสู้ (3 ข้อ)
  { text:"ฉันให้ความสำคัญกับความสามัคคีและความสัมพันธ์ภายในทีมมากกว่าความสำเร็จของตัวเอง", type:"vanguard", weight:2 }, // ทีมมาก่อน
  { text:"เมื่อทีมเจอสถานการณ์ยากลำบาก ฉันพร้อมสู้ไปกับทีมและไม่ยอมแพ้ง่าย ๆ", type:"vanguard", weight:1 }, // ใจสู้
  { text:"ฉันมักเลือกหลีกเลี่ยงปัญหาหรือปล่อยให้คนอื่นรับมือแทน", type:"vanguard", reverse:true }, // ไม่สู้ = คะแนนน้อย

  // BOREALISE (planning + system + foresight)
  { text:"ก่อนลงมือทำ ฉันมักวิเคราะห์ทางเลือกและวางแผนล่วงหน้าอย่างละเอียด", type:"strategist", weight:2 },
  { text:"ฉันมักคิดถึงผลลัพธ์ระยะยาวและเตรียมแผนสำรองไว้เสมอ", type:"strategist", weight:1 },
  { text:"ฉันมักตัดสินใจจากสถานการณ์ตรงหน้า โดยไม่ได้วางแผนล่วงหน้า", type:"strategist", reverse:true },

  // SUPPERMIERE (growth + adaptability)
  { text:"ฉันพร้อมลองสิ่งใหม่ แม้จะยังไม่มั่นใจว่าทำได้ดีหรือไม่", type:"explorer", weight:2 },
  { text:"ฉันสามารถปรับตัวได้ดีเมื่อสถานการณ์เปลี่ยนแปลงโดยไม่คาดคิด", type:"explorer", weight:1 },
  { text:"ฉันรู้สึกไม่สบายใจเมื่อเจอสิ่งใหม่หรือสถานการณ์ที่ไม่คุ้นเคย", type:"explorer", reverse:true },

  // UTOPIS (social strategy + influence + presence)
  { text:"ฉันสามารถอ่านบรรยากาศและพฤติกรรมของคนรอบตัว เพื่อปรับตัวให้ได้เปรียบ", type:"spotlight", weight:2 },
  { text:"ฉันมักเลือกแสดงออกในจังหวะที่เหมาะสมเพื่อสร้างผลลัพธ์ที่ดีที่สุด", type:"spotlight", weight:1 },
  { text:"ฉันมักแสดงออกตามความรู้สึกทันที โดยไม่ค่อยคิดถึงผลลัพธ์ในสายตาคนอื่น", type:"spotlight", reverse:true }

];

// ================== RANDOMIZE QUESTIONS ==================
questions.sort(() => Math.random() - 0.5); // สุ่มคำถาม (ไม่ต้อง assign ใหม่)

// ================== SCALE ==================
let scale = [
  { text:"มากที่สุด", value:5 },
  { text:"มาก", value:4 },
  { text:"ปานกลาง", value:3 },
  { text:"น้อย", value:2 },
  { text:"น้อยที่สุด", value:1 }
];

// ================== SHUFFLE ==================
function shuffle(arr){
  return arr.sort(()=>Math.random()-0.5); // สุ่มตัวเลือก
}

// ================== STATE ==================
let current = 0;
let answers = new Array(questions.length).fill(null);

// ================== DOM ==================
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const progress = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

// ================== LOAD ==================
function loadQuestion(){

  questionText.innerText = questions[current].text;
  progress.innerText = `ข้อ ${current+1} / ${questions.length}`;

  optionsDiv.innerHTML = "";

  // ✅ ไม่ต้อง shuffle แล้ว
  scale.forEach(opt=>{

    let checked = answers[current] === opt.value ? "checked" : "";

    let label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="opt" value="${opt.value}" ${checked}>
      <span>${opt.text}</span>
    `;

    optionsDiv.appendChild(label);
  });

  let percent = ((current+1)/questions.length)*100;
  document.getElementById("progressFill").style.width = percent+"%";
}

// ================== NEXT ==================
nextBtn.onclick = () => {

  let selected = document.querySelector("input[name=opt]:checked");
  if(!selected) return alert("กรุณาเลือกคำตอบ");

  answers[current] = parseInt(selected.value);

  current++;

  if(current < questions.length){
    loadQuestion();
  } else {
    calculateResult();
  }
};

// ================== BACK ==================
backBtn.onclick = () => {
  if(current > 0){
    current--;
    loadQuestion();
  }
};

// ================== CALCULATE ==================
function calculateResult(){

  let scores = {
    story:0, debate:0, analyst:0, persuade:0, formal:0, fun:0,
    vanguard:0, strategist:0, explorer:0, spotlight:0
  };

  let maxScores = {...scores};

  answers.forEach((ans,i)=>{
    let q = questions[i];
    let val = ans || 0; // กัน null

    if(q.reverse){
      val = 6 - val;
    }

    let weight = q.weight || 1;

    scores[q.type] += val * weight;
    maxScores[q.type] += 5 * weight;
  });

  // percent
  let percentScores = {};
  for(let key in scores){
    percentScores[key] = Math.round((scores[key]/maxScores[key])*100);
  }

  // save
  localStorage.setItem("scores", JSON.stringify(scores));
  localStorage.setItem("percentScores", JSON.stringify(percentScores));

  window.location.href = "result.html";
}

// ================== START ==================
document.addEventListener("DOMContentLoaded", () => {
  loadQuestion(); // โหลดหลัง DOM พร้อม
});