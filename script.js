let mood = "";
let currentStep = 0;
const questions = [
    { q: "BRAIN LOAD EXCEEDING 70%?", a: ["YES", "CRITICAL", "NO"] },
    { q: "CALIBRATE NEURAL PEACE?", a: ["START", "LATER"] }
];

function goNext(from, to, m = null) {
    if(m) mood = m;
    document.getElementById(from).classList.remove('active');
    document.getElementById(to).classList.add('active');
    if(to === 'step-2') startQuiz();
}

function startQuiz() {
    const box = document.getElementById('q-options'); box.innerHTML = "";
    if(currentStep >= questions.length) return goNext('step-2', 'step-3');
    
    document.getElementById('q-text').innerText = questions[currentStep].q;
    questions[currentStep].a.forEach(opt => {
        const b = document.createElement('button');
        b.className = "bold-btn"; b.innerText = opt;
        b.onclick = () => { currentStep++; startQuiz(); };
        box.appendChild(b);
    });
}

function openVault(amt) { goNext('step-3', 'payment-vault'); }

function finalSuccess() {
    alert("PAYMENT RECEIVED! OPENING PORTAL...");
    goNext('payment-vault', 'step-4');
    document.getElementById('video-mount').innerHTML = `<iframe width="100%" height="250" src="https://www.youtube.com/embed/O-6f5wQXSu8" frameborder="0" allowfullscreen style="border-radius:20px"></iframe>`;
}

// BOT LOGIC
function toggleBot() { document.getElementById('ai-companion').classList.toggle('bot-box-min'); }
function botSpeak() {
    const inp = document.getElementById('bot-in');
    const logs = document.getElementById('bot-logs');
    if(!inp.value) return;
    logs.innerHTML += `<p><b>YOU:</b> ${inp.value}</p>`;
    const v = inp.value.toLowerCase();
    inp.value = "";
    setTimeout(() => {
        let r = "I am processing. Please stay calm.";
        if(v.includes("hello")) r = "HELLO HUMAN. FEELBOT AT YOUR SERVICE.";
        if(v.includes("bkl") || v.includes("bc")) r = "Hostility detected. Initiating peace protocols.";
        logs.innerHTML += `<p style="color:blue"><b>BOT:</b> ${r}</p>`;
        logs.scrollTop = logs.scrollHeight;
    }, 600);
}