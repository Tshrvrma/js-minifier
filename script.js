const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("fileInput");
const minifyBtn = document.getElementById("minifyBtn");
const statusText = document.getElementById("status");

let jsFile = null;
let fileName = "";

// Click to open file picker
dropZone.addEventListener("click", () => {
  fileInput.click();
});

// When file is selected
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  handleFile(file);
});

// Drag over
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

// Drag leave
dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

// File dropped
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");

  const file = e.dataTransfer.files[0];
  handleFile(file);
});

// Handle file
function handleFile(file) {
  if (!file || !file.name.endsWith(".js")) {
    statusText.textContent = "❌ Please upload a valid .js file";
    return;
  }

  jsFile = file;
  fileName = file.name.replace(".js", "");
  statusText.textContent = `✅ File loaded: ${file.name}`;
  minifyBtn.disabled = false;
}

// Minify and Download
minifyBtn.addEventListener("click", async () => {
  if (!jsFile) return;

  const reader = new FileReader();

  reader.onload = async function (e) {
    const code = e.target.result;

    try {
        const result = await Terser.minify(code, {
        compress: true,
        mangle: true
        });

      // Create downloadable files
      downloadFile(fileName + ".min.js", result.code);
      downloadFile(fileName + ".min.js.map", result.map);

      statusText.textContent = "✅ Minification complete. Files downloaded.";

    } catch (err) {
      statusText.textContent = "❌ Error: " + err.message;
    }
  };

  reader.readAsText(jsFile);
});

// Helper function to download file
function downloadFile(name, content) {
  const blob = new Blob([content], { type: "text/javascript" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
}
