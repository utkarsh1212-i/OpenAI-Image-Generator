function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent  = ''
  document.querySelector('#image').src  = ''

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (!prompt) {
    alert("Please add some text");
    return;
  }
  generateImageRequest(prompt, size);
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
async function generateImageRequest(prompt, size) {
  try {
    showSpinner();
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("The Image Could Not be Generated");
    }
    const data = await response.json();

    const imageUrl = data.data;
    document.querySelector('#image').src = imageUrl

    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
