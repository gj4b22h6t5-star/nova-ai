const chat = document.getElementById("chat");
const form = document.getElementById("form");
const input = document.getElementById("input");

function message(text, type) {
  const div = document.createElement("div");
  div.className = "message " + type;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

message("Yo 👋 I'm Nova. Connect me to your AI backend to get started.", "ai");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  message(text, "user");

  const API = "https://YOUR-DOMAIN.com/api/chat";

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();
    message(data.reply || "No response received.", "ai");

  } catch (error) {
    message("Backend isn't connected yet.", "ai");
  }
});
