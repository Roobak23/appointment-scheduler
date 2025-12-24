const calendarEl = document.getElementById("calendar");
const monthLabel = document.getElementById("monthLabel");
const monthSelect = document.getElementById("monthSelect");
const modal = document.getElementById("modal");
const form = document.getElementById("form");
const tableBody = document.getElementById("tableBody");
const calendarPage = document.getElementById("calendarPage");
const dashboardPage = document.getElementById("dashboardPage");

let current = new Date();
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

/* PAGE SWITCH */
document.querySelectorAll(".nav-item").forEach(item => {
  item.onclick = () => {
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    calendarPage.classList.toggle("hidden", item.dataset.page !== "calendar");
    dashboardPage.classList.toggle("hidden", item.dataset.page !== "dashboard");
  };
});

/* SIDEBAR */
const collapseBtn = document.querySelector(".collapse");
const sidebar = document.querySelector(".sidebar");

collapseBtn.onclick = () => {
  sidebar.classList.toggle("collapsed");
  collapseBtn.textContent = sidebar.classList.contains("collapsed") ? "»" : "«";
};


/* CALENDAR */
function renderCalendar() {
  calendarEl.innerHTML = "";
  monthLabel.textContent = current.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d =>
    calendarEl.innerHTML += `<div class="day">${d}</div>`
  );

  const first = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
  const total = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();

  for (let i = 0; i < first; i++) {
    calendarEl.innerHTML += `<div class="cell"></div>`;
  }

  for (let d = 1; d <= total; d++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.innerHTML = `<b>${d}</b>`;

    const dateStr = `${current.getFullYear()}-${String(current.getMonth()+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

    appointments.filter(a => a.date === dateStr).forEach(a => {
      cell.innerHTML += `<div class="event">${a.patient} ${a.time}</div>`;
    });

    calendarEl.appendChild(cell);
  }
}

/* TABLE */
function renderTable() {
  tableBody.innerHTML = "";
  appointments.forEach(a => {
    tableBody.innerHTML += `
      <tr>
        <td>${a.patient}</td>
        <td>${a.doctor}</td>
        <td>${a.hospital}</td>
        <td>${a.specialty}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>${a.reason}</td>
      </tr>`;
  });
}

/* MODAL */
openModal.onclick = () => modal.classList.remove("hidden");
closeModal.onclick = cancelModal.onclick = () => modal.classList.add("hidden");

/* SAVE */
form.onsubmit = e => {
  e.preventDefault();

  appointments.push({
    patient: patient.value,
    doctor: doctorInput.value,
    hospital: hospital.value,
    specialty: specialty.value,
    date: dateInput.value,
    time: timeInput.value,
    reason: reason.value
  });

  localStorage.setItem("appointments", JSON.stringify(appointments));
  modal.classList.add("hidden");
  form.reset();

  renderCalendar();
  renderTable();
};

/* NAV */
prev.onclick = () => { current.setMonth(current.getMonth() - 1); renderCalendar(); };
next.onclick = () => { current.setMonth(current.getMonth() + 1); renderCalendar(); };
today.onclick = () => { current = new Date(); renderCalendar(); };
monthSelect.onchange = () => {
  if (monthSelect.value !== "") {
    current.setMonth(parseInt(monthSelect.value));
    renderCalendar();
    monthSelect.value = ""; // reset to Month ▼
  }
};


renderCalendar();
renderTable();
