document.addEventListener("DOMContentLoaded", function () {
  // Image upload and removal functionality
  const imageInput = document.getElementById("image-upload");
  const inputArea = document.querySelector(".input-area");
  const uploadBtn = document.querySelector(".upload-btn");
  const removeBtn = document.querySelector(".remove-btn");

  // Save initial input area content for reset
  const originalUploadUI = inputArea.innerHTML;

  // Bind the file input listener
  function bindFileInputListener() {
    imageInput.addEventListener("change", function () {
      if (imageInput.files && imageInput.files[0]) {
        displayImage(imageInput.files[0]);
      }
    });
  }

  // Display the uploaded image
  function displayImage(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      inputArea.innerHTML = "";
      const imgPreview = document.createElement("img");
      imgPreview.src = e.target.result;
      imgPreview.alt = "Uploaded Preview";
      imgPreview.className = "image-preview";
      inputArea.appendChild(imgPreview);
    };
    reader.readAsDataURL(file);
  }

  // Initialize image input listener
  bindFileInputListener();

  // Drag and drop support
  inputArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    inputArea.classList.add("drag-over");
  });

  inputArea.addEventListener("dragleave", function () {
    inputArea.classList.remove("drag-over");
  });

  inputArea.addEventListener("drop", function (e) {
    e.preventDefault();
    inputArea.classList.remove("drag-over");
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      displayImage(droppedFile);
    }
  });

  // Remove image functionality
  removeBtn.addEventListener("click", function () {
    inputArea.innerHTML = originalUploadUI;
    bindFileInputListener(); // Rebind listener after restoring UI
  });

  // Placeholder for upload functionality
  uploadBtn.addEventListener("click", function () {
    alert("Upload functionality not implemented yet.");
  });

  // Sidebar functionality
  const sidebar = document.getElementById("sidebar");
  const menuIcon = document.querySelector(".menu-icon");
  const closeSidebar = document.getElementById("close-sidebar");

  // Open sidebar on menu icon click
  menuIcon.addEventListener("click", function () {
    sidebar.classList.add("sidebar-open");
  });

  // Close sidebar on '×' button click
  closeSidebar.addEventListener("click", function () {
    sidebar.classList.remove("sidebar-open");
  });

    const sidebarMenuItems = document.querySelectorAll(".sidebar-menu li");
  
    sidebarMenuItems.forEach(function (item) {
      item.addEventListener("click", function () {
        // Remove the active class from all items
        sidebarMenuItems.forEach(function (el) {
          el.classList.remove("active");
        });
  
        // Add the active class to the clicked item
        this.classList.add("active");
      });
    });
  
});
