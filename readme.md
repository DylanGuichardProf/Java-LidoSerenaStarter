# Contexte

Le restaurant de plage italien **Serena** à besoin de vous ! Devant l'affluence grandissante de son étalissement, la direction a décidé de se doter d'un systeme de gestion pour les reservations et la caisse. Le but étant de simplifier la prise de commande, éviter les erreurs de reservation et pouvoir générer des statistiques afin de mieux piloter le restaurant.

Les employés seront équipés de tablettes pour la prise de commande et de reservation, la partie interface à déja été réalisé par une autre équipe (fourni par moi). Celui ci génère des JSON à la volé que le système devra traiter.

Dans ce cadre la direction fait appel à vous pour créer un systeme léger et robuste en JAVA. Votre rôle consiste donc à créer un programme qui traitera les JSON reçus du front, les stocker et les archiver, dans le but de gérer les payement et générer des statistiques.

# Prérequis technique
- Un **IDE** (IntelliJ, Eclipse, VSCode)
- Installer un **JDK** si besoin
  - Disponible sur le site d’[Oracle](https://www.oracle.com/fr/java/technologies/downloads/#jdk22-windows).
  - Noter le chemin ou vous l’installez
  - Ajouter le à vos *variable d’environnement* sous le nom JDK_HOME
  - Redémarrez votre IDE
- Créer un nouveau projet JAVA (de préférence avec Maven)
- Ajoutez la dépendence ***json-simple*** à votre projet, vous en aurez besoin

Si vous avez un quelconque problème avec l'une de ses étapes **NE RESTEZ PAS BLOQUÉ**, vous pouvez me demander de l'aide je suis là pour ça.

# Note technique
Dans le but de simplifier notre projet le *front* (interface que je vous **fourni**) et le *back* (application java à créer) ne sont pas liés. Le front vous permettra de générer des JSON que vous viendrez copier coller dans votre projet pour faire vos tests.

Toujours dans le but de simplifier, nous n'enregistrons **pas** les données en BDD mais simplement dans des fichiers JSON pour qu'ils soient exploités plus facilement.

# Objectifs
Le programme à 3 objectifs pricipaux :
1) Ajouter les reservation à venir et archiver les anciennes
   - Les réservations sont prise en ligne
   - Le systeme recoit un fichier JSON pour chaque réservation
   - A chaque fois que le programme est lancé il doit :
     - Enregistrer les reservations dans un fichier global (nommé *current.json*)
     - Archiver les reservations passées dans un fichier *archive.json* (y compris celles se trouvant dans le fichier *current.json*)
     - Supprimer les fichiers JSON contenant les réservations enregistrées

2) Enregistrer les consommations des clients et calculer l'addition d'une table
   - Les commandes arrivent par table (un fichier JSON par table, le fichier est nommé avec le numéro de la table) 
   - Quand les clients viennent à la caisse on lance le programme de caisse
     - Celui ci demande le numéro de la table
     - Selon le numéro choisi le programme récupère le fichier JSON correspondant 
     - Le programme affiche le résumé de ce qui à été commandé et calcul l'addition
   - On en profite pour archiver le payement avec tout ce que la table à consommé (on en fera des stats ensuite).

3) Permettre une caisse de secours (saisie en ligne de commande)
   - En cas de panne de notre systeme d'interface nous avons aussi besoin d'une solution de backup
   - On doit permettre de saisir les commandes d'une table en ligne de commande
   - Pour simplifier la saisie et éviter les erreurs le programme devra proposer les choix avec des numéros (exemple: 1-Pâtes 2-Pizza 3-Plat)
   - A la fin de la saisie le programme affiche le résumé de ce qui à été commandé
   - Puis il calcul le prix et archive les consomation comme pour un payement réalisé avec l'interface.


# Règle de gestion
Le restaurants à quelques petites règle qu'il faut suivre pour ce projet :
- Un menu avec une boisson alcoolisé comprend un supplément de 2€
- Les dates sont en français au format "*dd/MM/yyyy HH:mm*"
- Les reservations à venir doivent être enregistrés dans un fichier *current.json*, celles passées dans un fichier *archive.json*, les 2 fichiers doivent être dans un dossier *reservation*
- Les payements archivés doivent être enregistrés dans un fichier *archive.json* dans un dossier *payement*
  - Ces payements doivent être archivé par date
  - Le fichier contient donc un Objet JSON avec des dates et chaque date est une liste contenant plusieurs payement (voir template *archivePayment.json*)
- Les codes des menus sont pensé tel que :
  - "Pi" = Pizza
  - "Pa" = Pastas
  - "S" = Secondi (Plat principal en italien)
  - "B" = Bibite (Boisson en italien)
  - "D" = Dessert
  - Un menu SB signifie donc *"Secondi + Bibite"*, PiBD = *"Pizza + Bibite + Dessert"*
  

# Prodiuits
Le restaurant donne la liste des produits avec leurs prix et particularités en JSON (voir *products.json*). 

Tous les **produits** ont en commun d'avoir un ***nom*** et un ***prix***

- Il y a pour le moment 4 types de produits :
  - Plats (*Dish*)
    - à un type (*PIZZA*, *PASTA*, *SECONDI*, *CONTORNI*)
  - Boissons (*Drink*)
    - peut être alcoolisé ou non
  - Desserts (*Dessert*)
    - à un type (*GELATO*, *CLASSICO*)
  - Menu (*Meal*)
    - un code
    - un plat
    - une boisson
    - un dessert (optionnel)
    - un supplément (0 par défaut)

Cette liste contient les détails de chaque produit. Par soucis de performance vous remarquerez que les commandes envoyé par le *front* ne contiennent elles, que les informations nécéssaires (voir *exPaymement.json*). Cependant nous souhaitons que pour de l'archivage toutes les informations soient présente afin de les exploiter facilement sur l'interface (voir *archivePaymement.json*).

# Contraintes technique
Le programme doit être réaliser en Java. Le but de l'exercice est d'utiliser la **POO** (**P**rogrammation **O**rientée **O**bjet), il faudra donc créer des classes et les utiliser de manière cohérente. Utiliser l'**héritage** et le **polymorphisme** est fortement recommandé.

Le ***main*** de l'application doit être le plus simple possible, il doit refleter clairement le cheminement d'un utilisateur. 

Pour rendre votre code plus lisible n'hésitez pas à utiliser une ou plusieurs *classes utilitaire* (nommé **ToolBox** par exemple). Ces classes peuvent contenir des **constantes** ou des **méthode** indépendente décorélés de la partie fonctionnelle de l'appli. Par exemple récupérer le contenu d'un fichier ou formatter une date sont des fonctions assez générique pour être séparé des classes fonctionnelles de l'application.

Les types de plats et de dessert devront être des *enum* pour éviter les erreurs.

# Etapes (conséillées)
- Afficher un message à l'utilisateur
- Pouvoir lire ce que l'utilisateur saisie
- Controller ce que l'utilisateur saisi et **gérer les erreurs** (si il saisi n'importe quoi)
- Gestion des reservations
  - Lire un fichier JSON
  - Exploiter et modifier des objets JSON avec la dépendance *json-simple*
  - Ecrire un fichier JSON
  - Gérer le format de date
- Gestion des payements
  - Créer les classes des produits (hérité d'un parent)
  - Permettre l'instanciation à partir de JSON récupéré
  - Générer la liste de tous les produits au démarage de l'application
  - Génerer du JSON à partir de l'instance créé

# Conseils
- Prenez votre temps, un pas après l'autre, une fonctionnalité après l'autre
- Tester votre code TRES régulièrement
- Mettez des logs dans votre code
- Mettez des commentaires pour comprendre ce que vous avez fait
- Lisez vos erreurs et retrouvez l'origine avant d'aller sur internet
- **POSEZ MOI DES QUESTIONS**
- Utilisez intelligement les ressources à votre disposition (**ne copiez collez pas du code de chatGPT que vous ne comprenez pas**)
