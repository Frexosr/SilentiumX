document.addEventListener('DOMContentLoaded', () => {
    let lastModified = null;
    const ZIP_URL = '/SilentiumX-Tools-1.3.zip';
    const CHECK_INTERVAL = 5000; // Vérifier toutes les 5 secondes
  
    // Fonction pour vérifier la date de modification du fichier
    async function checkForUpdates() {
      try {
        const response = await fetch(ZIP_URL, { method: 'HEAD' });
        if (!response.ok) return;
  
        const currentModified = response.headers.get('last-modified');
        
        if (lastModified && currentModified !== lastModified) {
          showUpdateNotification();
        }
        
        lastModified = currentModified;
      } catch (error) {
        console.error('Erreur lors de la vérification de mise à jour:', error);
      }
    }
  
    // Fonction pour afficher la notification
    function showUpdateNotification() {
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 w-80 bg-gray-800 rounded-lg shadow-lg border-4 border-red-500 notification';
      
      notification.innerHTML = `
        <div class="p-4">
          <div class="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            <h3 class="text-lg font-bold text-gray-100">Mise à jour !</h3>
          </div>
          <p class="text-gray-300 mb-4">
            Une nouvelle version de SilentiumX Tool est disponible !
          </p>
          <button class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
            Obtenir Maintenant
          </button>
        </div>
      `;
  
      // Supprimer l'ancienne notification si elle existe
      const oldNotification = document.querySelector('.notification');
      if (oldNotification) {
        oldNotification.remove();
      }
  
      // Ajouter la notification au DOM
      document.body.appendChild(notification);
  
      // Jouer le son de notification
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play();
  
      // Ajouter l'événement click sur le bouton
      const button = notification.querySelector('button');
      button.addEventListener('click', () => {
        window.location.href = '/download.html';
      });
    }
  
    // Vérifier immédiatement au chargement
    checkForUpdates();
  
    // Configurer la vérification périodique
    setInterval(checkForUpdates, CHECK_INTERVAL);
  });
