<?php

function wpr_theme_setup()
{
    add_theme_support('post-thumbnails');

    register_nav_menus([]);

    add_theme_support('post-formats', array('aside', 'gallery'));
}

add_action('after_setup_theme', 'wpr_theme_setup');

function wp_menu_route()
{

    return wp_get_nav_menus();
}

add_action('rest_api_init', function () {
    register_rest_route('webivert/v1', '/menu/', array(
        'methods' => 'GET',
        'callback' => 'wp_menu_route',
    ));
});

function wp_menu_single(WP_REST_Request $request)
{

    $menuID = $request->get_param("id"); // Get the menu from the ID
    $menu_items = wp_get_nav_menu_items($menuID);

    if (!empty($menu_items)) {

        foreach ($menu_items as $item) {

            // Only grab page IDs

            $page_ids[] = [
                "id" => $item->ID,
                "object_id" => $item->object_id,
                "menu_item_parent" => $item->menu_item_parent,
                "title" => $item->title,
                "type" => $item->object,
                "url" => $item->url
            ];
            // $page_ids[] = $item;
        }
    }
    return $page_ids;
}

add_action('rest_api_init', function () {
    register_rest_route('webivert/v1', '/menu/(?P<id>[\d]+)', array(
        'methods' => 'GET',
        'callback' => 'wp_menu_single',
    ));
});



function set_excerpt_length()
{
    return 45;
}

add_filter("excerpt_length", "set_excerpt_length");

add_action('rest_api_init', function () {
    register_rest_field('post', 'comment_count', [
        'get_callback' => function ($post) {
            return (int) wp_count_comments($post['id'])->approved;
        },
        'schema'       => [
            'description' => 'List number of comments attached to this post.',
            'type'        => 'integer',
        ],
    ]);
});
