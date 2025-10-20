
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, set, get, remove, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyACQN9qR0HeHSkC5JLR7kVIaJcuraMJzIk",
  authDomain: "scan-qr-681e1.firebaseapp.com",
  databaseURL: "https://scan-qr-681e1-default-rtdb.firebaseio.com",
  projectId: "scan-qr-681e1",
  storageBucket: "scan-qr-681e1.firebasestorage.app",
  messagingSenderId: "432167953441",
  appId: "1:432167953441:web:f2238d89cb06536c6f2f60",
  measurementId: "G-XBHTXTH9PX"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
window.checkIn = function() {
  const name = document.getElementById('name').value.trim();
  const statusEl = document.getElementById('status');
 
  if (!name) {
    statusEl.innerText = "⚠️ กรุณากรอกชื่อก่อน";
    statusEl.className = "error";
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const time = new Date().toLocaleTimeString('th-TH');
set(ref(db, 'attendance/' + today + '/' + name), {
    time: time
  })
  .then(() => {
    statusEl.innerText = `✅ เช็คชื่อสำเร็จ: ${name} เวลา ${time}`;
    statusEl.className = "success";
    document.getElementById('name').value = "";
  })
  .catch((error) => {
    console.error(error);
    statusEl.innerText = "❌ เกิดข้อผิดพลาดในการเช็คชื่อ";
    statusEl.className = "error";
  });
};
