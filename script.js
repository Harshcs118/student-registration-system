document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const recordsTable = document.getElementById("recordsTable").getElementsByTagName("tbody")[0];
    let students = JSON.parse(localStorage.getItem("students")) || [];

    const renderTable = () => {
        recordsTable.innerHTML = "";
        students.forEach((student, index) => {
            const row = recordsTable.insertRow();
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="actionbutton" onclick="editStudent(${index})">Edit</button>
                    <button class="actionbutton" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
        });
    };

    const saveStudents = () => {
        localStorage.setItem("students", JSON.stringify(students));
        renderTable();
    };

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const isValidContact = (contact) => {
        const re = /^[0-9]{10}$/;
        return re.test(contact);
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = form.studentName.value.trim();
        const id = form.studentID.value.trim();
        const email = form.email.value.trim();
        const contact = form.contactNo.value.trim();

        if (!name || !id || !email || !contact) {
            alert("All fields are required.");
            return;
        }

        if (isNaN(id)) {
            alert("Student ID must be a number.");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Invalid email format.");
            return;
        }

        if (!isValidContact(contact)) {
            alert("Contact number must be a 10-digit number.");
            return;
        }

        students.push({ name, id, email, contact });
        saveStudents();
        form.reset();
    });

    window.editStudent = (index) => {
        const student = students[index];
        form.studentName.value = student.name;
        form.studentID.value = student.id;
        form.email.value = student.email;
        form.contactNo.value = student.contact;
        students.splice(index, 1);
    };

    window.deleteStudent = (index) => {
        students.splice(index, 1);
        saveStudents();
    };

    renderTable();
});
