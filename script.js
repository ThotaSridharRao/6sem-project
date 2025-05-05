document.addEventListener("DOMContentLoaded", function () {
    const imageUploadInput = document.getElementById("image-upload");
    const uploadButton = document.querySelector(".upload-btn");
    const removeButton = document.querySelector(".remove-btn");
    const fileInput = document.querySelector("#image-upload");
    const dropArea = document.getElementById("drop-area");
  
    let uploadedImage = null;
  
    // Handle image selection
    imageUploadInput.addEventListener("change", function (e) {
      uploadedImage = e.target.files[0];
      if (uploadedImage) {
        // Clear drop area content
        dropArea.innerHTML = "";
  
        // Preview image
        const imgPreview = document.createElement("img");
        imgPreview.src = URL.createObjectURL(uploadedImage);
        imgPreview.alt = "Uploaded Image Preview";
        imgPreview.classList.add("preview-image");
        dropArea.appendChild(imgPreview);
      }
    });
  
    // Handle the "Upload Image" button click
    uploadButton.addEventListener("click", async function () {
      if (!uploadedImage) {
        alert("Please select an image first.");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", uploadedImage);
  
      // Send image to backend API
      try {
        const response = await fetch("https://plant-disease-backend-7ftj.onrender.com/predict", {
          method: "POST",
          body: formData
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // Remove previous prediction box if any
          const oldPrediction = dropArea.querySelector(".prediction-box");
          if (oldPrediction) oldPrediction.remove();
  
          // Create and show prediction
          const resultElement = document.createElement("div");
          resultElement.classList.add("prediction-box");
          resultElement.innerHTML = `
            <strong>Prediction:</strong> ${result.prediction}<br>
            <strong>Confidence:</strong> ${parseFloat(result.confidence).toFixed(2)}%
          `;
          dropArea.appendChild(resultElement);
        } else {
          alert("Error with the model: " + (result.error || "Unknown error"));
        }
      } catch (error) {
        console.error("Error during image upload:", error);
        alert("Failed to upload image. Please try again.");
      }
    });
  
    // Handle the "Remove Image" button click
    removeButton.addEventListener("click", function () {
      uploadedImage = null;
      fileInput.value = null;
  
      // Clear preview and result
      dropArea.innerHTML = `
        <img src="icons/mountains-sun-svgrepo-com.svg" class="upload-icon" />
        <div class="upload-hint">or, drag and drop an image here</div>
      `;
    });
  });
  