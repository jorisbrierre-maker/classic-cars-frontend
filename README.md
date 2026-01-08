# Classic Cars Management System

Ce projet est une application web complète de gestion de voitures classiques, permettant de consulter, d'ajouter et de supprimer des véhicules via une interface dynamique communiquant avec une API REST.

## Liens du projet
- **Interface (Frontend) :** [https://jorisbrierre-maker.github.io/classic-cars-frontend/](https://jorisbrierre-maker.github.io/classic-cars-frontend/)
- **API (Backend) :** [https://car-api-3t8y.onrender.com](https://car-api-3t8y.onrender.com)

> **Note importante :** L'API est hébergée sur la version gratuite de Render. Le serveur s'endort après une période d'inactivité. Lors de la première requête (connexion ou chargement), il peut y avoir un délai de 30 à 60 secondes pour que le service "se réveille". Merci de votre patience.

## Comment tester le projet ?

### 1. Création d'un compte (Obligatoire)
Pour des raisons de sécurité, vous devez d'abord créer votre propre identifiant via un outil comme **Postman**  :

1. Effectuez une requête **POST** à l'adresse suivante : 
   `https://car-api-3t8y.onrender.com/auth/register`
2. Dans l'onglet **Headers**, ajoutez :
   - Key: `Content-Type`
   - Value: `application/json`
3. Dans l'onglet **Body**, choisissez **raw** (JSON) et insérez vos identifiants :
   ```json
   {
       "username": "votre_identifiant",
       "password": "votre_mot_de_passe"
   }
4.  Cliquez sur Send. Une fois la réponse positive reçue, votre compte est créé.
