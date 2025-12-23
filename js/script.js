let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let currentDate = new Date();
let editIndex = null;

const modal = document.getElementById("modal");
const form = document.getElementById("appointmentForm");

document.getElementById("openModalBtn").onclick = () => openModal();
document.getElementById("closeModal").onclick = closeModal;

function openModal(date = "") {
  modal.style.display = "flex";
  if (date) document.getElementById("date").value = date;
}

function closeModal() {
  modal.style.display = "none";
  form.reset();
  editIndex = null;
}

form.onsubmit = e => {
  e.preventDefault();

  const appt = {
    patient: patient.value,
    doctor: doctor.value,
    hospital: hospital.value,
    specialty: specialty.value,
    date: date.value,
    time: time.value,
    reason: reason.value
  };

  editIndex !== null ? appointments[editIndex] = appt : appointments.push(appt);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  closeModal();
  render();
};

function render() {
  renderCalendar();
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";

  const y = currentDate.getFullYear();
  const m = currentDate.getMonth();
  document.getElementById("monthYear").textContent =
    currentDate.toLocaleString("default", { month: "long" }) + " " + y;

  const firstDay = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    grid.innerHTML += `<div class="calendar-day"></div>`;
  }

  for (let d = 1; d <= days; d++) {
    const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const cell = document.createElement("div");
    cell.className = "calendar-day";
    cell.innerHTML = `<strong>${d}</strong>`;

    appointments.filter(a => a.date === dateStr).forEach(a => {
      cell.innerHTML += `<div class="appointment">${a.time} ${a.patient}</div>`;
    });

    cell.onclick = () => openModal(dateStr);
    grid.appendChild(cell);
  }
}

document.getElementById("prevMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  render();
};

document.getElementById("nextMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  render();
};

render();
