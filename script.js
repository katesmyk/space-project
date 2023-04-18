function openModal(mode) {
  const modal = document.querySelector("#add-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalFooter = document.querySelector("#modal-footer");

  modalFooter.innerHTML = "";
  if (mode === "add") {
      modalTitle.innerText = "Add Planet";
      const addButton = document.createElement("button");
      addButton.innerText = "Add Planet";
      addButton.className = "modal__button button--blue";
      addButton.onclick = addProduct;
      modalFooter.appendChild(addButton);
    } else if (mode === "edit") {
      modalTitle.innerText = "Edit Planet";
      const saveButton = document.createElement("button");
      saveButton.innerText = "Save Changes";
      saveButton.className = "modal__button button--blue";
      saveButton.onclick = editProduct;
      modalFooter.appendChild(saveButton);
    }
  
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.querySelector("#add-modal");
  modal.style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.querySelector("#add-modal");
  if (event.target == modal) {
    closeModal();
  }
}


