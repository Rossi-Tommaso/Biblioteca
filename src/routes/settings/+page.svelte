<script>
    import { user } from "../../stores/authStore";
    import { base } from "$app/paths";
    import { logOut } from "../../stores/authStore";
  </script>
  
  <div class="content">
    <div class="profile-section">
      <div class="profile-header">
        <div class="avatar">
            <img src={$user?.photoURL ?? `${base}/profile_placeholder.png`} alt="Avatar di {$user.displayName}" />
        </div>
        <div class="user-info">
          <h2>{$user?.displayName || "Utente"}</h2>
          <p>{$user?.email || "Email non disponibile"}</p>
        </div>
      </div>
    </div>
  
    <div class="settings-section">
      <h2>Impostazioni</h2>
      <div class="settings-grid">
        <div class="settings-card">
          <h3>Profilo</h3>
          <p>Modifica le informazioni del tuo profilo.</p>
          <a href="{base}/settings/profile" class="action-link">Modifica</a>
        </div>
        <div class="settings-card">
          <h3>Privacy</h3>
          <p>Gestisci le impostazioni sulla privacy.</p>
          <a href="{base}/settings/privacy" class="action-link">Gestisci</a>
        </div>
        <div class="settings-card">
          <h3>Notifiche</h3>
          <p>Imposta le preferenze di notifica.</p>
          <a href="{base}/settings/notifications" class="action-link">Imposta</a>
        </div>
        <div class="settings-card">
          <h3>Logout</h3>
          <p>Esci dal tuo account.</p>
          <button class="action-link" on:click={async () => await logOut()}>Esci</button>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .content {
      max-width: 1200px;
      margin: 30px auto;
      padding: 20px;
    }
  
    .profile-section {
      text-align: center;
      margin-bottom: 40px;
    }
  
    .profile-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 20px;
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .avatar {
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 50%;
      border: 2px solid #6a11cb;
    }
  
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    .user-info h2 {
      font-size: 1.8rem;
      margin: 0;
    }
  
    .user-info p {
      margin: 5px 0;
      color: #666;
    }
  
    .settings-section h2 {
      margin-bottom: 20px;
      color: #333;
    }
  
    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
  
    .settings-card {
      background: #fff;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      text-align: center;
    }
  
    .settings-card:hover {
      transform: translateY(-5px);
    }
  
    .settings-card h3 {
      margin: 0 0 10px 0;
      font-size: 1.5rem;
    }
  
    .settings-card p {
      color: #666;
      margin-bottom: 15px;
    }
  
    .action-link {
      background: linear-gradient(45deg, #6a11cb, #ff8a65);
      color: #fff;
      padding: 10px 20px;
      border-radius: 8px;
      border: none;
      text-decoration: none;
      display: inline-block;
      font-size: 0.9rem;
      font-weight: bold;
      transition: background 0.3s ease;
    }
  
    .action-link:hover {
      background: linear-gradient(45deg, #ff8a65, #6a11cb);
    }
  </style>
  