// ดึง query parameter จาก URL เช่น ?id=3
export function getQueryParam(param) { 
  const urlParams = new URLSearchParams(window.location.search); 
  return urlParams.get(param); 
}

// เรียงข่าวตามวันที่ใหม่ → เก่า
export function sortByDateDesc(data) { 
  return data.sort((a, b) => new Date(b.date) - new Date(a.date)); 
}

// แปลงวันที่ให้อ่านง่าย
export function formatDate(dateString) { 
  const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
  return new Date(dateString).toLocaleDateString('th-TH', options); 
}

// โหลดไฟล์ JSON
export async function fetchJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
