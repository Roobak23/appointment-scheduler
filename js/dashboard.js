let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
const tableBody = document.getElementById("tableBody");

document.getElementById("updateBtn").onclick = filter;

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach((a, i) => {
    tableBody.innerHTML += `
      <tr>
        <td>${a.patient}</td>
        <td>${a.doctor}</td>
        <td>${a.hospital}</td>
        <td>${a.specialty}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>
          <button onclick="deleteAppointment(${i})">🗑</button>
        </td>
      </tr>`;
  });
}

function filter() {
  const p = patientSearch.value.toLowerCase();
  const d = doctorSearch.value.toLowerCase();
  const f = fromDate.value;
  const t = toDate.value;

  const filtered = appointments.filter(a =>
    a.patient.toLowerCase().includes(p) &&
    a.doctor.toLowerCase().includes(d) &&
    (!f || a.date >= f) &&
    (!t || a.date <= t)
  );

  renderTable(filtered);
}

function deleteAppointment(i) {
  appointments.splice(i, 1);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  renderTable(appointments);
}

renderTable(appointments);
