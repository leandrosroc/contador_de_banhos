const messages = [
    "Lembre-se de beber água 🥤",
    "Mantenha uma boa higiene 🧼",
    "Cuide da sua saúde 💪",
    "Economize água 💧",
    "Pratique exercícios 🏃‍♂️",
    "Durma bem hoje 😴",
    "Hidrate-se sempre 🚰",
    "Não se esqueça de se alongar 🧘‍♂️",
    "Lave as mãos sempre que possível 🧴",
    "Não se esqueça de se alimentar 🍎",
    "Mantenha sua mente saudável 🧠",
    "Cuide da sua postura 🦾",
    "Evite ficar muito tempo na mesma posição 🦵",
    "Pratique a gratidão 🙏",
];

const marqueeContent = document.querySelector('.marquee-content');
let currentIndex = 0;

function updateMessage() {
  marqueeContent.style.opacity = '0';
  
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % messages.length;
    marqueeContent.textContent = messages[currentIndex];
    marqueeContent.style.animation = 'none';
    marqueeContent.offsetHeight;
    marqueeContent.style.animation = 'marquee 15s linear infinite';
    marqueeContent.style.opacity = '1';
  }, 1500);
}

marqueeContent.textContent = messages[0];
marqueeContent.style.opacity = '1';

setInterval(updateMessage, 8000);
document.addEventListener('DOMContentLoaded', () => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(savedUserName)}`
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('counterContainer').style.display = 'block';
            document.getElementById('userName').textContent = savedUserName;
            document.getElementById('showerCount').textContent = data.count;
            loadRanking();
        });
    }
});

function loadRanking() {
    fetch('ranking.php')
    .then(response => response.json())
    .then(data => {
        const rankingBody = document.getElementById('rankingBody');
        rankingBody.innerHTML = '';
        
        data.forEach((user, index) => {
            const row = document.createElement('tr');
            const position = index + 1;
            let medal = '';
            
            if (position === 1) medal = '<span class="medal medal-1">🥇</span>';
            else if (position === 2) medal = '<span class="medal medal-2">🥈</span>';
            else if (position === 3) medal = '<span class="medal medal-3">🥉</span>';
            
            row.innerHTML = `
                <td>${medal}${position}º</td>
                <td>${user.name}</td>
                <td>${user.count}</td>
            `;
            rankingBody.appendChild(row);
        });
    });
}

function login() {
    const name = document.getElementById('nameInput').value;
    if (!name) return;
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(name)}`
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('userName', name);
        
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('counterContainer').style.display = 'block';
        document.getElementById('userName').textContent = name;
        document.getElementById('showerCount').textContent = data.count;
        loadRanking();
    });
}

function incrementShower() {
    const name = document.getElementById('userName').textContent;
    
    fetch('increment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(name)}`
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('showerCount').textContent = data.count;
        loadRanking();
    });
}
loadRanking();