document.addEventListener("DOMContentLoaded", () => {
  // ถ้าไม่มี container ในหน้า → สร้างอัตโนมัติ
  if (!document.getElementById("chatbot-container")) {
    const div = document.createElement("div");
    div.id = "chatbot-container";
    div.innerHTML = `
      <div id="chat-header">💬 Chat with us</div>
      <div id="chat-output"></div>
      <div id="chat-input-container">
        <input id="chat-input" type="text" placeholder="Type your message...">
        <button id="send-btn">Send</button>
      </div>
    `;
    document.body.appendChild(div);
  }

  const output = document.getElementById("chat-output");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  // เก็บคำถาม-คำตอบ
  const qa = {
    "hi": "Hello! How can I help you today?",
    "weekend": "Yes, we are open on weekends!",
    "refund": "Yes, we offer refunds within 30 days.",
    "how do i request a refund": "Yes, we offer refunds within 30 days.",
    "do you charge for credit cards": "We do not charge a fee for credit card payments.",
    "what time that you open": "We are open every day from 10:00 to 21:00.",
    "location": "We are located at Floor G, Fashion Plus Zone, Central Plaza Rayong, Choeng Noen Subdistrict, Mueang Rayong District, Rayong 21000",
    "do you accept mobile payments": "Yes, we accept mobile payments such as Apple Pay, Google Pay, and QR Code.",
    "do you provide delivery service": "Yes, we provide delivery. Delivery usually takes 2–3 business days.",
    "can i track my order": "Yes, you can track your order using the tracking number we send after shipment.",
    "what products do you recommend": "We recommend our best-selling items such as sunglasses, blue light glasses, and stylish optical frames.",
    "do you have new arrivals": "Yes, we regularly update our collection with new arrivals. Please check our 'New In' section on the website.",
    "what are your best sellers": "Our best sellers include classic aviator sunglasses, anti-blue light glasses, and lightweight reading glasses.",
    "do you have discounts or promotions": "Yes, we offer seasonal promotions and special discounts. Please check our promotions page or ask our staff for current deals.",
    "do you sell kids products": "Yes, we have a variety of kids' glasses that are safe, durable, and comfortable."

};

  function addMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("chat-message", sender);
    message.innerHTML = text;
    output.appendChild(message);
    output.scrollTo({ top: output.scrollHeight, behavior: "smooth" });
  }

  function handleMessage() {
    const userText = input.value.trim().toLowerCase();
    if (userText === "") return;

    addMessage(`<b>You:</b> ${input.value}`, "user");

    let response = "Sorry, I don’t understand.";
    for (const key in qa) {
      if (userText.includes(key)) {
        response = qa[key];
        break;
      }
    }

    setTimeout(() => {
      addMessage(`<b>Bot:</b> ${response}`, "bot");
    }, 500);

    input.value = "";
  }

  sendBtn.addEventListener("click", handleMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleMessage();
  });
});
// chatbot.js (ปรับส่วน header ให้มีปุ่มย่อ/ขยาย)
if (!document.getElementById("chatbot-container")) {
  const div = document.createElement("div");
  div.id = "chatbot-container";
  div.innerHTML = `
    <div id="chat-header">
      💬 Chat with us
      <span id="toggle-btn">−</span>
    </div>
    <div id="chat-output"></div>
    <div id="chat-input-container">
      <input id="chat-input" type="text" placeholder="Type your message...">
      <button id="send-btn">Send</button>
    </div>
  `;
  document.body.appendChild(div);
}

const output = document.getElementById("chat-output");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const toggleBtn = document.getElementById("toggle-btn");

// ฟังก์ชันย่อ/ขยายหน้าต่าง
toggleBtn.addEventListener("click", () => {
  const chatBody = [output, document.getElementById("chat-input-container")];
  chatBody.forEach(el => {
    el.style.display = (el.style.display === "none") ? "block" : "none";
  });
  toggleBtn.textContent = (toggleBtn.textContent === "−") ? "+" : "−";
});
