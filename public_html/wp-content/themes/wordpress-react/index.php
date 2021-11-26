<!DOCTYPE html>
<html <?= language_attributes() ?>>

<head>
    <meta charset="<?= bloginfo("charset") ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= bloginfo("description") ?>">
    <title><?= bloginfo("name") ?> <?= is_front_page() ? bloginfo("description") : wp_title() ?></title>
    <link rel="stylesheet" href="<?= bloginfo('template_url') ?>/css/main-style.css" />
    <?= wp_head() ?>
    <style>
        html,
        body,
        #root {
            height: 100%;
        }

        #root {
            display: flex;
            flex-direction: column;
            position: relative;
        }
    </style>
</head>

<body>
    <div id="root"></div>
    <noscript>Your browser does not support JavaScript!</noscript>
    <?= wp_footer() ?>
    <script src="<?= bloginfo('template_url') ?>/js/app.bundle.js"></script>
</body>

</html>