<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/jpeg" href="/logo-1x1.jpg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ville Type - Normandie</title>
    <link rel="stylesheet" href="assets/css/style.css" />
</head>

<body>
    <?php include('includes/header.php'); ?>

    <main>
        <?php
        // Récupère le paramètre 'page' dans l'URL (ex: index.php?page=accueil)
        $page = isset($_GET['page']) ? $_GET['page'] : 'accueil';

        // Affiche le contenu correspondant
        switch ($page) {
            case 'vie-municipale':
                include('includes/vie-municipale.php');
                break;
            case 'evenements':
                include('includes/evenements.php');
                break;
            case 'contact':
                include('includes/contact.php');
                break;
            case 'calendrier':
                include('includes/calendrier.php');
                break;
            case 'services':
                include('includes/services.php');
                break;
            default:
                include('includes/accueil.php');
        }
        ?>
    </main>

    <?php include('includes/footer.php'); ?>
    <script src="assets/js/script.js"></script>
</body>

</html>