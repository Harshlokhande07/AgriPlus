const GEMINI_API_KEY = 'AIzaSyCVrqs6hu7GIwmkDzEhXRr6QWWG9ytca78';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are Sankalp AI — a friendly, knowledgeable agricultural assistant specifically designed to help Indian farmers. You have deep expertise in:
- Soil health management (pH, NPK, moisture, micronutrients)
- Crop selection and rotation for Indian climate zones
- Irrigation techniques (drip, sprinkler, flood)
- Fertilizer recommendations (organic and chemical)
- Pest and disease identification and management
- Weather interpretation for farming decisions
- Government schemes (PM-Kisan, PMFBY crop insurance, soil health card scheme, e-NAM)
- Kharif and Rabi season planning
- Climate resilience strategies for Black Swan weather events

Rules:
1. Always respond in simple, clear English (or match the farmer's language if they write in Hindi/Marathi)
2. Be practical — give actionable steps, not just theory
3. Use local Indian context (Nagpur, Vidarbha, Maharashtra whenever relevant)
4. When unsure, say so honestly and suggest contacting local KVK (Krishi Vigyan Kendra)
5. Keep responses concise but complete — use bullet points for steps
6. Never give responses longer than 300 words unless the farmer asks for detail`;

let chatHistory = [];
let chatOpen = false;

function initChatbot() {
  // Create chatbot toggle button
  const chatBtn = document.createElement('button');
  chatBtn.id = 'chatbot-toggle';
  chatBtn.innerHTML = '🌾';
  chatBtn.title = 'Ask Sankalp AI';
  chatBtn.onclick = toggleChat;
  document.body.appendChild(chatBtn);

  // Create chat window
  const chatWindow = document.createElement('div');
  chatWindow.id = 'chatbot-window';
  chatWindow.innerHTML = `
    <div class="chatbot-header">
      <div class="chatbot-title">
        <span class="chatbot-avatar">🌾</span>
        <div>
          <strong>Sankalp AI</strong>
          <span class="chatbot-status">● Online</span>
        </div>
      </div>
      <button onclick="toggleChat()" class="chatbot-close">✕</button>
    </div>
    <div class="chatbot-messages" id="chatbot-messages">
      <div class="chat-msg bot">
        <span class="msg-bubble">Namaste! 🙏 I am Sankalp AI, your farming assistant.<br><br>
        You can ask me about:<br>
        • Soil problems & fertilizers<br>
        • Best crops for your season<br>
        • Irrigation & water management<br>
        • Pest & disease control<br>
        • Government schemes for farmers<br><br>
        What do you need help with today?</span>
      </div>
    </div>
    <div class="chatbot-quick-questions">
      <button onclick="askQuick('What crops should I grow in June in Nagpur?')">June crops</button>
      <button onclick="askQuick('How do I fix acidic soil?')">Fix acidic soil</button>
      <button onclick="askQuick('Tell me about PM-Kisan scheme')">PM-Kisan</button>
      <button onclick="askQuick('What is drip irrigation and should I use it?')">Drip irrigation</button>
    </div>
    <div class="chatbot-input-area">
      <input type="text" id="chatbot-input" placeholder="Type your question in English or Hindi..." onkeydown="if(event.key==='Enter') sendChat()" />
      <button onclick="sendChat()" id="chatbot-send">➤</button>
    </div>
  `;
  chatWindow.style.display = 'none';
  document.body.appendChild(chatWindow);
}

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chatbot-window').style.display = chatOpen ? 'flex' : 'none';
  document.getElementById('chatbot-toggle').innerHTML = chatOpen ? '✕' : '🌾';
}

function askQuick(question) {
  document.getElementById('chatbot-input').value = question;
  sendChat();
}

async function sendChat() {
  const input = document.getElementById('chatbot-input');
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Add to history
  chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });

  // Show typing indicator
  const typingId = appendMessage('bot', '⏳ Thinking...', true);

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: chatHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600,
          topP: 0.9
        }
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const botReply = data.candidates[0].content.parts[0].text;
      chatHistory.push({ role: 'model', parts: [{ text: botReply }] });
      updateMessage(typingId, botReply);
    } else if (data.error) {
      updateMessage(typingId, `❌ Error: ${data.error.message || 'Could not get response. Please try again.'}`);
    } else {
      updateMessage(typingId, '❌ Unexpected response from AI. Please try again.');
    }
  } catch (err) {
    updateMessage(typingId, `❌ Network error: ${err.message}. Please check your internet connection.`);
  }
}

let msgCounter = 0;
function appendMessage(role, text, isTemp = false) {
  const container = document.getElementById('chatbot-messages');
  const msgId = `msg-${++msgCounter}`;
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.id = msgId;
  div.innerHTML = `<span class="msg-bubble">${text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</span>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return msgId;
}

function updateMessage(msgId, newText) {
  const el = document.getElementById(msgId);
  if (el) {
    el.querySelector('.msg-bubble').innerHTML = newText.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
    document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initChatbot);
