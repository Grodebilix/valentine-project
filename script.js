// 1. Sélection des éléments du DOM (Document Object Model)
const captchaCheck = document.getElementById('captcha-check');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const btnNon = document.getElementById('btn-non');
const btnOui = document.getElementById('btn-oui');

window.onload = () => {
    // On force la case à se décocher à chaque rechargement de page
    captchaCheck.checked = false;
    // On s'assure que le bouton "Non" est bien à sa place initiale
    btnNon.style.position = 'static'; 
};

// 2. Écoute de l'événement sur la checkbox
captchaCheck.addEventListener('change', function() {
    if (this.checked) {
        // On simule un petit temps de réflexion "humain"
        setTimeout(() => {
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
        }, 800); 
    }
});

// 3. La logique du bouton "fuyard"
btnNon.addEventListener('mouseover', function() {
    // Calcul des limites de l'écran pour éviter que le bouton ne sorte de la page
    const maxX = window.innerWidth - btnNon.offsetWidth;
    const maxY = window.innerHeight - btnNon.offsetHeight;

    // Génération de positions aléatoires
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Application de la nouvelle position en mode "absolu"
    btnNon.style.position = 'absolute';
    btnNon.style.left = randomX + 'px';
    btnNon.style.top = randomY + 'px';
});

// On définit le seuil de proximité (150 pixels)
const proximityThreshold = 150;

document.addEventListener('mousemove', (event) => {
    // 1. Obtenir la position du centre du bouton
    const rect = btnNon.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    // 2. Obtenir la position de la souris
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 3. Calculer la distance entre la souris et le bouton
    const diffX = mouseX - btnCenterX;
    const diffY = mouseY - btnCenterY;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

    // 4. Si la souris est trop proche...
    if (distance < proximityThreshold) {
        // On calcule le vecteur de fuite (la direction opposée)
        // On normalise le mouvement pour qu'il soit constant
        const force = (proximityThreshold - distance) / proximityThreshold; 
        const moveX = (diffX / distance) * force * 300; // 300 est la puissance de poussée
        const moveY = (diffY / distance) * force * 300;

        // 5. On calcule la nouvelle position
        let newX = btnCenterX - moveX - rect.width / 2;
        let newY = btnCenterY - moveY - rect.height / 2;

        // 6. Sécurité : On s'assure que le bouton ne sort pas de l'écran
        const padding = 20;
        newX = Math.max(padding, Math.min(window.innerWidth - rect.width - padding, newX));
        newY = Math.max(padding, Math.min(window.innerHeight - rect.height - padding, newY));

        // 7. On applique la position
        btnNon.style.position = 'fixed'; // On utilise fixed pour un positionnement par rapport à la fenêtre
        btnNon.style.left = `${newX}px`;
        btnNon.style.top = `${newY}px`;
    }
});

btnOui.addEventListener('click', () => {
    console.log("Étape 1 : Le bouton Oui a été cliqué !"); // Ce message doit apparaître dans la console

    step2.classList.add('hidden');
    console.log("Étape 2 : Step 2 devrait être caché.");

    const finalStep = document.getElementById('step-3');
    console.log("Étape 3 : Ciblage du Step 3 :", finalStep); // Si ça affiche 'null', c'veut dire que l'ID est faux

    if (finalStep) {
        finalStep.classList.remove('hidden');
        console.log("Étape 4 : Classe hidden supprimée du Step 3.");
    } else {
        console.error("ERREUR : L'élément avec l'ID 'step-3' n'a pas été trouvé dans le HTML !");
    }
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#fe019a', '#ffffff']
    });
     // 3. On tente la musique (si ça plante ici, le reste sera déjà affiché)
     const victoryMusic = new Audio('votre-fichier.mp3');
     victoryMusic.play().catch(e => console.log("Musique bloquée ou introuvable"));
});

// 1. Initialisation des variables de croissance
let totalMovement = 0;
let scaleFactor = .6;

document.addEventListener('mousemove', (event) => {
    // --- (Gardez ici votre code existant pour le bouton "Non") ---
    
    // 2. Calcul du mouvement accumulé
    // On ajoute un petit incrément à chaque mouvement de souris
    totalMovement += 5; 

    // 3. Calcul de la nouvelle taille (on limite à un maximum pour ne pas envahir l'écran !)
    // Math.min(maximum, valeur) permet de "clamer" la croissance
    scaleFactor = Math.min(3, 1 + (totalMovement / 1000));

    // 4. Application du style au bouton "Oui"
    btnOui.style.transform = `scale(${scaleFactor})`;

    // 5. Gestion de la vibration
    // Si le mouvement dépasse un seuil, on active l'animation de vibration
    if (totalMovement > 100) {
        btnOui.classList.add('vibrating');
        // On peut même accélérer la vibration en fonction du mouvement
        const speed = Math.max(0.1, 0.5 - (totalMovement / 5000));
        btnOui.style.animationDuration = `${speed}s`;
    }
});