// voice.js - Voice command functionality
function initVoiceCommands() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
  document.getElementById('voice-btn')?.addEventListener('click', () => {
    recognition.start();
  });
  
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
    console.log('Voice input:', transcript);
  };
}

document.addEventListener('DOMContentLoaded', initVoiceCommands);
