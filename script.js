document.addEventListener("DOMContentLoaded", function () {
  const imageInput = document.getElementById("image-upload");
  const inputArea = document.querySelector(".input-area");

  // Replace content with image preview
  function displayImage(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Clear previous contents
      inputArea.innerHTML = "";

      const imgPreview = document.createElement("img");
      imgPreview.src = e.target.result;
      imgPreview.alt = "Uploaded Preview";
      imgPreview.className = "image-preview";

      inputArea.appendChild(imgPreview);
    };

    reader.readAsDataURL(file);
  }

  // File selection handler
  imageInput.addEventListener("change", function () {
    if (imageInput.files && imageInput.files[0]) {
      displayImage(imageInput.files[0]);
    }
  });

  // Optional: Drag and drop support
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
});
