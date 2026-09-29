// Sequence of Animated Greetings
const greetings = [
  { greeting: "Hello.", subtext: "Welcome to my portfolio space." },
  { greeting: "Namaste.", subtext: "Glad to have you here." },
  { greeting: "Hola.", subtext: "Preparing developer showcase..." },
  { greeting: "Welcome.", subtext: "Hemasundhar Thatikonda · .NET & Dynamics 365" }
];

const welcomeModal = document.getElementById('appleWelcomeModal');
const dynamicGreeting = document.getElementById('dynamicGreeting');
const dynamicSubtext = document.getElementById('dynamicSubtext');
const progressBar = document.getElementById('introProgressBar');
const enterBtn = document.getElementById('enterPortfolioBtn');

let greetingIndex = 0;
let progress = 0;
let isDismissed = false;

function dismissWelcome() {
  if (isDismissed) return;
  isDismissed = true;
  welcomeModal.classList.add('fade-out');
  setTimeout(() => {
    welcomeModal.style.display = 'none';
  }, 800);
}

// Progress Bar Timer
const progressInterval = setInterval(() => {
  if (isDismissed) {
    clearInterval(progressInterval);
    return;
  }
  progress += 2;
  if (progressBar) progressBar.style.width = `${progress}%`;

  if (progress >= 100) {
    clearInterval(progressInterval);
    setTimeout(dismissWelcome, 300);
  }
}, 70);

// Animated Text Flip
const greetingInterval = setInterval(() => {
  if (isDismissed) {
    clearInterval(greetingInterval);
    return;
  }
  greetingIndex++;
  if (greetingIndex < greetings.length) {
    dynamicGreeting.style.opacity = '0';
    dynamicGreeting.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      dynamicGreeting.textContent = greetings[greetingIndex].greeting;
      dynamicSubtext.textContent = greetings[greetingIndex].subtext;
      dynamicGreeting.style.opacity = '1';
      dynamicGreeting.style.transform = 'translateY(0)';
    }, 250);
  } else {
    clearInterval(greetingInterval);
  }
}, 850);

if (enterBtn) {
  enterBtn.addEventListener('click', dismissWelcome);
}

// Dark / Light Mode Switch
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  if (theme === 'light') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

// Email Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = encodeURIComponent(document.getElementById('senderName').value);
    const email = encodeURIComponent(document.getElementById('senderEmail').value);
    const subject = encodeURIComponent(document.getElementById('msgSubject').value);
    const message = encodeURIComponent(document.getElementById('msgBody').value);

    const notice = document.getElementById('mailFeedback');
    if (notice) notice.style.display = 'block';

    const bodyText = `Sender Name: ${decodeURIComponent(name)}%0D%0AEmail: ${decodeURIComponent(email)}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    const mailtoUrl = `mailto:tatikondahemasundhar@gmail.com?subject=${subject}&body=${bodyText}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  });
}

// WhatsApp Direct Submission
const whatsappBtn = document.getElementById('whatsappActionBtn');
if (whatsappBtn) {
  whatsappBtn.addEventListener('click', function () {
    const name = document.getElementById('senderName').value.trim();
    const subject = document.getElementById('msgSubject').value.trim();
    const message = document.getElementById('msgBody').value.trim();

    if (!message && !name) {
      alert('Please provide your name and a brief message first.');
      return;
    }

    const text = encodeURIComponent(`Hello Hemasundhar,\n\nName: ${name}\nSubject: ${subject}\nMessage: ${message}`);
    window.open(`https://wa.me/917978417349?text=${text}`, '_blank');
  });
}