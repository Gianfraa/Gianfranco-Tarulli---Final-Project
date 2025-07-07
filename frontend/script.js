document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});

// Saludo personalizado
document.getElementById("greetButton").addEventListener("click", async () => {
  const name = document.getElementById("greetInput").value;
  const response = await fetch(`/greet?name=${name}`);
  const data = await response.json();
  document.getElementById("greetResult").textContent = data.message;
});

// Agregar estudiante
document.getElementById("addStudentButton").addEventListener("click", async () => {
  const name = document.getElementById("newStudentName").value;

  if (!name) return alert("Ingresá un nombre");

  const response = await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });

  if (response.ok) {
    const newStudent = await response.json();
    alert(`Estudiante ${newStudent.name} agregado con ID ${newStudent.id}`);
    
    // Refrescar tabla automáticamente
    document.getElementById("loadButton").click();
  } else {
    alert("Error al agregar estudiante");
  }
});
