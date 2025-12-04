// Sansürlenmesi gereken kelimeleri koruma
const SANSURLU_METIN = "XXXXXX"; 

// 10 Soru Dizisi (DEĞİŞMEDİ)
const questions = [
    {
        question: "En çok hangi siyasi partiye kendinizi yakın görüyorsunuz",
        options: ["Ak parti", "Logosunda AMpul olan parti", "Akp", "Yoksa başka bir şey mi bekliyordun😡?"],
        feedback: "Harika seçim devam edelim"
    },
    {
        question: "Dadaşlarla ünlü şehrimiz hangisidir",
        options: ["Paris", "Londra", "Erzurum", "Lügneş"],
        feedback: "LibabLügneşRisaymıyız?"
    },
    {
        question: "Sizce Kürdistan var mı? yoksa bir hayalden ibaret mi?",
        options: ["Kesinlikle var", "Kesinlikle yok", "", "I have no idea"], 
        feedback: "Harika seçim devam edelim"
    },
    {
        question: "Sizce en tatlı köpek ırkı hangisi ?",
        options: ["Pug", "Puggy", "Piggy", "Dobys"],
        feedback: "Harika seçim devam edelim"
    },
    {
        question: "Hangi AYT matematik test kitabısınız?",
        options: ["3D", "Barış", "Bilgi sarmal", "Paraf"],
        feedback: "Harika seçim devam edelim"
    },
    {
        question: "Herkesi \"Öldüm diye kandırdım (büyük şaka)\" diyen kişi kimdir",
        options: ["Kılıçdaroğlu", "Ruhi Çenet", "Moruk(ateist olan)", "Blok3"],
        feedback: "Harika seçim devam edelim"
    },
    {
        question: `Pastaya oturup ${SANSURLU_METIN} yemek mi yoksa ${SANSURLU_METIN} oturup pastayı yemek mi`,
        options: ["Pastaya oturmak", `${SANSURLU_METIN} oturmak`, "İkisine de oturmak", "İkisini de yemek"],
        feedback: "Harika seçim devam edelim"
    },
    {
        question: "Bir sabah uyandığınızda boyunuzun 206 cm olduğunu görürseniz napardınız?",
        options: ["Bu olayı hemen rehberlik hocama anlatırım", "Bu benim ders çalışmama engel değil", "Kendi ülkemi kurarım", "PocikerimSentarcı"],
        feedback: "Harika seçim devam edelim"
    },
    {
        question: "لماذا أصبحت مهتمًا بهذا المقال وترجمته؟",
        options: ["ماذا", "ماذا تعتقد يا ابني"], 
        feedback: "Harika seçim devam edelim"
    },
    {
        question: "Testi beğendiniz mi??",
        options: ["Evet", "Evet", "Evet", "Evet"],
        feedback: "" 
    }
];

// 5 Rastgele Sonuç Kombinasyonu (YENİ VİDEO EKLENDİ)
const results = [
    { 
        title: "Siz %100 Vergimansiniz", 
        type: 'image', 
        media: 'fotograf1.png', 
        audio: 'muzik1.mp3',
        korkuncFont: false
    },
    { 
        title: "Siz kesinlikle ben türk milliyetçisiyim arkadaş adamsınız", 
        type: 'video', 
        media: 'video1.mp4', 
        audio: null,
        korkuncFont: false
    },
    { 
        title: "PocikerimSentarcıHazretleri", 
        type: 'video', 
        media: 'video2.mp4', 
        audio: null,
        korkuncFont: true 
    },
    { 
        title: "Siz arda turan sad edit ile %100 uyuşuyorsunuz", 
        type: 'video', 
        media: 'video3.mp4', 
        audio: null,
        korkuncFont: false
    },
    // YENİ EKLEME
    { 
        title: "Ya Sen birtanesin", 
        type: 'video', 
        media: 'video4.mp4', 
        audio: null,
        korkuncFont: false
    }
];

let currentQuestionIndex = 0;
let selectedAnswerIndex = null; 

// DOM Elementleri (DEĞİŞMEDİ)
const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-button');
const finishButton = document.getElementById('finish-button');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const feedbackMessage = document.getElementById('feedback-message');
const resultTitle = document.getElementById('result-title');
const resultContent = document.getElementById('result-content');
const resultAudio = document.getElementById('result-audio');
const themeToggleButton = document.getElementById('theme-toggle');

// ===================================
// TEMA FONKSİYONLARI (DEĞİŞMEDİ)
// ===================================

function applyTheme(isDark) {
    document.body.classList.remove('light-theme', 'dark-theme');
    if (isDark) {
        document.body.classList.add('dark-theme');
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>'; 
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-theme');
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>'; 
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    applyTheme(!isDark);
}

// ===================================
// TEST MANTIĞI (DEĞİŞMEDİ)
// ===================================

function loadQuestion() {
    selectedAnswerIndex = null; 
    feedbackMessage.style.display = 'none';
    nextButton.style.display = 'none';
    finishButton.style.display = 'none';
    
    const currentQuestion = questions[currentQuestionIndex];
    
    let html = `<div id="question-text">${currentQuestionIndex + 1}. ${currentQuestion.question}</div>`;
    html += '<ul class="options-list">';

    currentQuestion.options.forEach((option, index) => {
        const optionLetter = String.fromCharCode(65 + index);
        const optionContent = (option.trim() === "") ? `${optionLetter}: ` : `${optionLetter}) ${option}`;

        if (option.trim() === "") {
             html += `<li class="option-item option-empty" data-index="${index}">${optionContent}</li>`;
        } else {
             html += `<li class="option-item" data-index="${index}">${optionContent}</li>`;
        }
    });
    
    html += '</ul>';
    
    questionContainer.innerHTML = html;
    
    document.querySelectorAll('.option-item').forEach(item => {
        if (!item.classList.contains('option-empty')) {
            item.addEventListener('click', selectOption);
        }
    });
}

function selectOption(event) {
    document.querySelectorAll('.option-item').forEach(item => {
        item.classList.remove('selected');
    });

    event.currentTarget.classList.add('selected');
    selectedAnswerIndex = parseInt(event.currentTarget.dataset.index);

    const feedback = questions[currentQuestionIndex].feedback;
    if (currentQuestionIndex < questions.length - 1 && feedback) {
        feedbackMessage.textContent = feedback;
        feedbackMessage.style.display = 'block';
    }

    if (currentQuestionIndex < questions.length - 1) {
        nextButton.style.display = 'block';
    } else {
        finishButton.style.display = 'block';
    }
}

function nextQuestion() {
    if (selectedAnswerIndex === null) return;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizSection.classList.add('hidden');
    resultSection.classList.remove('hidden');

    // Random seçim şimdi 6 sonuç arasından yapılıyor (results.length = 6)
    const randomIndex = Math.floor(Math.random() * results.length); 
    const selectedResult = results[randomIndex];

    resultTitle.textContent = selectedResult.title;
    if (selectedResult.korkuncFont) {
        resultTitle.classList.add('korkunc-font');
    } else {
        resultTitle.classList.remove('korkunc-font');
    }

    if (selectedResult.type === 'image') {
        resultContent.innerHTML = `<img src="${selectedResult.media}" alt="${selectedResult.title}">`;
        if (selectedResult.audio) {
            resultAudio.src = selectedResult.audio;
            resultAudio.play().catch(e => console.error("Müzik çalma hatası:", e)); 
        }
    } else if (selectedResult.type === 'video') {
        resultAudio.pause();
        resultAudio.src = "";
        resultContent.innerHTML = `<video src="${selectedResult.media}" autoplay loop controls></video>`;
    }
}

// Olay dinleyicileri
nextButton.addEventListener('click', nextQuestion);
finishButton.addEventListener('click', showResult);
themeToggleButton.addEventListener('click', toggleTheme);

// Başlangıç İşlemleri
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        applyTheme(savedTheme === 'dark');
    } else {
        applyTheme(true); // Varsayılan Dark Mode
    }

    loadQuestion();
};
