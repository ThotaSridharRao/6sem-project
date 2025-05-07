document.addEventListener("DOMContentLoaded", function () {
  const imageUploadInput = document.getElementById("image-upload");
  const uploadButton = document.querySelector(".upload-btn");
  const removeButton = document.querySelector(".remove-btn");
  const fileInput = document.querySelector("#image-upload");
  const dropArea = document.getElementById("drop-area");

  const preventionBox = document.querySelector(".preventionMethods");
  const preventionList = document.querySelector(".Methods");

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

  // Upload image and get prediction
  uploadButton.addEventListener("click", async function () {
    if (!uploadedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedImage);

    try {
      const response = await fetch("https://plant-disease-backend-7ftj.onrender.com/predict", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        // Remove old prediction
        const oldPrediction = dropArea.querySelector(".prediction-box");
        if (oldPrediction) oldPrediction.remove();

        // Create new prediction element
        const resultElement = document.createElement("div");
        resultElement.classList.add("prediction-box");
        resultElement.innerHTML = `
          <strong>Prediction:</strong> ${result.prediction}<br>
          <strong>Confidence:</strong> ${parseFloat(result.confidence).toFixed(2)}%
        `;
        dropArea.appendChild(resultElement);

        // Show prevention methods if prediction is early or late blight
        const disease = result.prediction.toLowerCase();
        if (disease.includes("late blight")) {
          preventionBox.style.display = "block";
          preventionList.innerHTML = `
            <ul>
              <li>Remove and destroy infected plants immediately.</li>
              <li>Apply fungicides approved for Late Blight control.</li>
              <li>Practice crop rotation and use resistant varieties next season.</li>
            </ul>
          `;
        } else if (disease.includes("early blight")) {
          preventionBox.style.display = "block";
          preventionList.innerHTML = `
            <ul>
              <li>Remove lower leaves showing spots to limit spread.</li>
              <li>Use copper-based or other appropriate fungicides.</li>
              <li>Improve spacing for better air circulation.</li>
            </ul>
          `;
        } else {
          preventionBox.style.display = "none";
          preventionList.innerHTML = "";
        }
      } else {
        alert("Error with the model: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("Failed to upload image. Please try again.");
    }
  });

  // Remove image and reset everything
  removeButton.addEventListener("click", function () {
    uploadedImage = null;

    // Reset file input to allow same image selection again
    const newInput = fileInput.cloneNode(true);
    fileInput.parentNode.replaceChild(newInput, fileInput);
    newInput.addEventListener("change", function (e) {
      imageUploadInput.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Clear drop area content
    dropArea.innerHTML = `
      <img src="icons/mountains-sun-svgrepo-com.svg" class="upload-icon" />
      <div class="upload-hint">or, drag and drop an image here</div>
    `;

    // Hide prevention methods
    preventionBox.style.display = "none";
    preventionList.innerHTML = "";
  });
});
