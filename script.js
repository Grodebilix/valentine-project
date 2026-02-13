// 1. DÉCLARATION DES VARIABLES
const captchaCheck = document.getElementById('captcha-check');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const btnNon = document.getElementById('btn-non');
const btnOui = document.getElementById('btn-oui');
const finalStep = document.getElementById('step-3');

let totalMovement = 0;
let scaleFactor = 1;
const proximity = 150;

// 2. RÉINITIALISATION AU CHARGEMENT (On ne touche PAS à la position ici !)
window.addEventListener('load', () => {
    if(captchaCheck) captchaCheck.checked = false;
    console.log("Système prêt. Bouton 'Non' en attente au centre.");
});

// 3. LOGIQUE DU CAPTCHA (Transition Étape 1 -> 2)
captchaCheck.addEventListener('change', function() {
    if (this.checked) {
        setTimeout(() => {
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
        }, 800); 
    }
});

// 4. LE CERVEAU DE L'APPLICATION (Mouvements de souris)
document.addEventListener('mousemove', (event) => {
    
    // A. CROISSANCE DU BOUTON OUI
    if (!step2.classList.contains('hidden')) {
        totalMovement += 2;
        scaleFactor = Math.min(3, 1 + (totalMovement / 1000));
        btnOui.style.transform = `scale(${scaleFactor})`;

        if (totalMovement > 100) {
            btnOui.classList.add('vibrating');
            const speed = Math.max(0.1, 0.5 - (totalMovement / 5000));
            btnOui.style.animationDuration = `${speed}s`;
        }
    }

    // B. FUITE DU BOUTON NON
    const rect = btnNon.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const diffX = event.clientX - btnCenterX;
    const diffY = event.clientY - btnCenterY;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

    if (distance < proximity) {
        // ACTIVATION DU MODE FUITE (Seulement au premier mouvement proche)
        if (btnNon.style.position !== 'fixed') {
            btnNon.style.left = rect.left + 'px';
            btnNon.style.top = rect.top + 'px';
            btnNon.style.position = 'fixed';
        }

        const angle = Math.atan2(diffY, diffX);
        const pushDistance = 150;
        
        let newX = rect.left - Math.cos(angle) * pushDistance;
        let newY = rect.top - Math.sin(angle) * pushDistance;

        // Sécurité bords d'écran avec rebond
        const pad = 30;
        if (newX < pad) newX = pad + 150;
        if (newX > window.innerWidth - rect.width - pad) newX = window.innerWidth - rect.width - pad - 150;
        if (newY < pad) newY = pad + 150;
        if (newY > window.innerHeight - rect.height - pad) newY = window.innerHeight - rect.height - pad - 150;

        btnNon.style.left = `${newX}px`;
        btnNon.style.top = `${newY}px`;
    }
});

// 5. CÉLÉBRATION FINALE
btnOui.addEventListener('click', () => {
    step2.classList.add('hidden');
    finalStep.classList.remove('hidden');

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#fe019a', '#ffffff']
    });

    const victoryMusic = new Audio('votre-fichier.mp3');
    victoryMusic.play().catch(e => console.log("Musique non chargée."));
});