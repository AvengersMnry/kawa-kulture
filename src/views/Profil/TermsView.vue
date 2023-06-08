<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button text="Retour" default-href="/tabs/tab4"></ion-back-button>
        </ion-buttons>
        <ion-title>Informations légales</ion-title>
      </ion-toolbar>
    </ion-header>

    <p class="ion-text-center">
      <small><strong>Dernière mise à jour : 27 Mai 2023.</strong></small>
    </p>
    <ion-content>
      <ion-list class="ion-text-center">
        <ion-list-header>
          <ion-label class="ion-no-margin ion-no-padding ion-margin-vertical"
            >Mentions légales</ion-label
          >
        </ion-list-header>
        <ion-item class="ion-margin-horizontal">
          <ion-text>
            <em>
              <p>
                Responsable de l'application : Kawa Kulture 1, Rue de l'Examen
                75002 Paris
              </p>
              <p>Contact : Marie Maunoury</p>
              <p>Adresse e-mail : marie_maunoury@hotmail.fr</p>
              <p>
                Numéro d'enregistrement fictif : 123456789 (à titre d'exemple)
              </p>
              <p>Numéro de TVA fictif : FR123456789 (à titre d'exemple)</p>
            </em>
          </ion-text>
        </ion-item>
      </ion-list>

      <ion-list class="ion-text-center">
        <ion-list-header>
          <ion-label class="ion-no-margin ion-no-padding ion-margin-vertical"
            >C.G.U</ion-label
          >
        </ion-list-header>
        <ion-item class="ion-margin-horizontal">
          <ion-text>
            <em
              ><p>
                Les Conditions Générales d'Utilisation (CGU) de l'application
                mobile Kawa Kulture régissent l'utilisation de l'application.
              </p>
              <p>
                En utilisant l'application, les utilisateurs acceptent les CGU.
                L'application offre des informations sur les cultures mondiales
                et permet aux utilisateurs de créer un compte et d'interagir.
                Les utilisateurs doivent s'inscrire et fournir des informations
                précises. L'utilisation de l'application doit être légale et
                respecter les droits d'autrui.
              </p>
              <p>
                Les utilisateurs sont responsables du contenu qu'ils publient et
                accordent à Kawa Kulture une licence pour utiliser ce contenu.
                La protection des données personnelles est assurée conformément
                à la Politique de Confidentialité. Le contenu de l'application
                est protégé par des droits de propriété intellectuelle. Kawa
                Kulture décline toute responsabilité pour les dommages résultant
                de l'utilisation de l'application. Les CGU peuvent être
                modifiées et les utilisateurs sont invités à les consulter
                régulièrement. Les CGU sont régies par la loi applicable et tout
                litige sera soumis à la juridiction compétente.
              </p>
              <p>
                Pour toute question, contactez Kawa Kulture à l'adresse
                indiquée.
              </p></em
            ></ion-text
          >
        </ion-item>
      </ion-list>

      <ion-list class="ion-text-center">
        <ion-list-header>
          <ion-label class="ion-no-margin ion-no-padding ion-margin-vertical"
            >Cookies & Politique de confidentialité</ion-label
          >
        </ion-list-header>
        <ion-item class="ion-margin">
          <ion-text>
            <em>
              <ul>
                <li>
                  La Politique de Confidentialité de l'application mobile Kawa
                  Kulture régit la collecte, l'utilisation et la divulgation des
                  informations des utilisateurs.
                </li>
                <li>
                  Les informations collectées peuvent inclure des données
                  d'identification, des informations de compte, des données de
                  localisation et des informations sur l'appareil.
                </li>
                <li>
                  Les informations sont utilisées pour fournir et améliorer les
                  services de l'application, personnaliser l'expérience
                  utilisateur, répondre aux demandes et assurer la sécurité de
                  l'application.
                </li>
                <li>
                  Les informations personnelles peuvent être partagées avec des
                  tiers dans certaines circonstances spécifiques.
                </li>
                <li>
                  Des mesures de sécurité sont mises en place pour protéger les
                  informations, mais aucun système n'est totalement sécurisé.
                </li>
                <li>
                  Les utilisateurs ont le droit d'accéder, de mettre à jour, de
                  corriger ou de supprimer leurs informations personnelles,
                  ainsi que de retirer leur consentement.
                </li>
                <li>
                  Des liens vers des sites tiers peuvent être présents dans
                  l'application, et les utilisateurs sont encouragés à consulter
                  les politiques de confidentialité de ces sites.
                </li>
                <li>
                  La Politique de Confidentialité peut être sujette à des
                  modifications.
                </li>
              </ul>
            </em>
          </ion-text>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
export default {};
</script>

<style>
ion-list-header {
  --background: #24593e;
  --color: #fff;

  --border-width: 0 0 4px 0;
  --border-color: #da7f2b;
  --border-style: double;
}

li {
  list-style: decimal;
}
</style>
