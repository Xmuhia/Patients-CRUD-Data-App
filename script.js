const patientForm = document.querySelector('#patient-form');
const patientList = document.querySelector('#patient-list');
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const insNumberInput = document.querySelector('#ins-number');
const genderInput = document.querySelector('#gender');
const dobInput = document.querySelector('#dob');

let selectedRow = null;

// Show Alerts
function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');
  const main = document.querySelector('.main');
  container.insertBefore(div, main);

  setTimeout(() => div.remove(), 3000);
}

// Clear Data
function clearData() {
  firstNameInput.value = '';
  lastNameInput.value = '';
  insNumberInput.value = '';
  genderInput.value = '';
  dobInput.value = '';
}

// Add or Edit Data
function addOrUpdateData() {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const insNumber = insNumberInput.value;
  const gender = genderInput.value;
  const dob = dobInput.value;

  if (firstName === '' || lastName === '' || insNumber === '' || gender === '' || dob === '') {
    showAlert('Please Fill in all fields!', 'danger');
  } else {
    if (selectedRow === null) {
      // Add new row
      const newRow = `
        <tr>
          <td>${firstName}</td>
          <td>${lastName}</td>
          <td>${dob}</td>
          <td>${gender}</td>
          <td>${insNumber}</td>
          <td class="buttons">
            <a href="#" class="edit edit-button"><i class='bx bxs-edit'></i>Edit</a>
            <a href="#" class="delete delete-button"><i class='bx bxs-trash'></i>Delete</a>
          </td>
        </tr>
      `;

      patientList.innerHTML += newRow;
      selectedRow = null;
      showAlert('Patient Added!', 'success');
    } else {
      // Edit existing row
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = lastName;
      selectedRow.children[2].textContent = dob;
      selectedRow.children[3].textContent = gender;
      selectedRow.children[4].textContent = insNumber;
      selectedRow = null;
      showAlert('Patient Info Edited', 'success');
    }

    clearData();
  }
}

// Event listeners
patientForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addOrUpdateData();
});

patientList.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('edit') || target.classList.contains('bxs-edit')) {
    selectedRow = target.closest('tr');
    const [firstName, lastName, dob, gender, insNumber] = selectedRow.children;
    firstNameInput.value = firstName.textContent;
    lastNameInput.value = lastName.textContent;
    dobInput.value = dob.textContent;
    genderInput.value = gender.textContent;
    insNumberInput.value = insNumber.textContent;
  } else if (target.classList.contains('delete') || target.classList.contains('bxs-trash')) {
    const rowToDelete = target.closest('tr');
    rowToDelete.remove();
    showAlert('Patient Data Deleted', 'danger');
  }
});
