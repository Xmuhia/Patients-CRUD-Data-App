let selectedRow = null;

// SHOW ALERTS
function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const main = document.querySelector('.main');
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector('.alert').remove(), 3000)
}

// CLEAR DATA
function clearData() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#ins-number").value = "";
  document.querySelector("#gender").value = "";
  document.querySelector("#dob").value = "";
}

// ADD DATA
document.querySelector('#patient-form').addEventListener('submit', (e) => {
  e.preventDefault();

  //GET FORM VALUE
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const insNumber = document.querySelector("#ins-number").value;
  const gender = document.querySelector("#gender").value;
  const dob = document.querySelector("#dob").value;

  //VALIDATE
  if(firstName == "" || lastName == "" || insNumber == "" || gender == "" || dob == ""){
    showAlert("Please Fill in all fields!", "danger")
  }
  else{
    if(selectedRow == null){
      const list = document.querySelector("#patient-list");

      list.innerHTML += `
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
     <tr>
      `;
      selectedRow = null;
      showAlert('Patient Added!', 'success');
    }
    else{
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = lastName;
      selectedRow.children[2].textContent = dob;
      selectedRow.children[3].textContent = gender;
      selectedRow.children[4].textContent = insNumber;
      selectedRow = null;
      showAlert('Patients Info Edited', 'success');
   
    }
   clearData();
  }
});

// EDIT DATA
document.querySelector('#patient-list').addEventListener('click', (e) => {
  target = e.target;
  if(target.classList.contains("edit")){
    selectedRow = target.parentElement.parentElement;
    document.querySelector('#firstName').value = selectedRow.children[0].textContent;
    document.querySelector('#lastName').value = selectedRow.children[1].textContent;
    document.querySelector('#dob').value = selectedRow.children[2].textContent;
    document.querySelector('#gender').value = selectedRow.children[3].textContent;
    document.querySelector('#insNumber').value = selectedRow.children[4].textContent;
  }
  if(target.classList.contains("bxs-edit")){
    selectedRow = target.parentElement.parentElement.parentElement;
    document.querySelector('#firstName').value = selectedRow.children[0].textContent;
    document.querySelector('#lastName').value = selectedRow.children[1].textContent;
    document.querySelector('#dob').value = selectedRow.children[2].textContent;
    document.querySelector('#gender').value = selectedRow.children[3].textContent;
    document.querySelector('#insNumber').value = selectedRow.children[4].textContent;
  }
});
 

// DELETE DATA
document.querySelector("#patient-list").addEventListener('click', (e) => {
  target = e.target;
  if(target.classList.contains("delete")){
    target.parentElement.parentElement.remove();
    showAlert("Patients Data Deleted", "danger")
  }
  if(target.classList.contains("bxs-trash")){
    target.parentElement.parentElement.parentElement.remove();
    showAlert("Patients Data Deleted!", "danger")
  }
 });