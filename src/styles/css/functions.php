<?php

/**
 * broadsign functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package broadsign
 */

include(__DIR__ . "/broadsign-routes.php");

if (!defined('_S_VERSION')) {
	// Replace the version number of the theme on each release.
	define('_S_VERSION', '1.0.77');
}

if (!function_exists('broadsign_setup')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function broadsign_setup()
	{
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on broadsign, use a find and replace
		 * to change 'broadsign' to the name of your theme in all the template files.
		 */
		load_theme_textdomain('broadsign', get_template_directory() . '/languages');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'menu-1' => esc_html__('Primary', 'broadsign'),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'broadsign_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support('customize-selective-refresh-widgets');

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action('after_setup_theme', 'broadsign_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function broadsign_content_width()
{
	$GLOBALS['content_width'] = apply_filters('broadsign_content_width', 640);
}
add_action('after_setup_theme', 'broadsign_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function broadsign_widgets_init()
{
	register_sidebar(
		array(
			'name'          => esc_html__('Sidebar', 'broadsign'),
			'id'            => 'sidebar-1',
			'description'   => esc_html__('Add widgets here.', 'broadsign'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action('widgets_init', 'broadsign_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function broadsign_scripts()
{
	wp_enqueue_style('broadsign-style', get_stylesheet_uri(), array(), _S_VERSION);

	#$remote_styles_to_check = array(
	#	'https://broadsign.com/wp/styles.css',
	#	'https://broadsign.com/styles/wp.css',
	#	'https://broadsigndev.gatsbyjs.io/wp/styles.css',
	#	'https://broadsigndev.gatsbyjs.io/styles/wp.css',
	#);

	#foreach ($remote_styles_to_check as $url) {
	#	$headers = @get_headers($url);
	#	if (preg_match('/200 OK/', $headers[0]) === 1) {
	#		wp_enqueue_style( 'broadsign-style-from-gatsby', $url, array(), _S_VERSION );
	#	}
	#}

	wp_style_add_data('broadsign-style', 'rtl', 'replace');

	wp_enqueue_script('broadsign-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true);

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'broadsign_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Add functions written by and for Broadsign
 * e.g. add Coauthors to REST API, add promoboxes (mostly legacy),
 *      generate links from official router
 */
include(__DIR__ . "/broadsign-functions.php");


function dn_add_rss_image()
{
	global $post;

	$output = '';
	if (has_post_thumbnail($post->ID)) {
		$thumbnail_ID = get_post_thumbnail_id($post->ID);
		$thumbnail = wp_get_attachment_image_src($thumbnail_ID, 'full');

		$output .= '<media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" type="image/jpeg"';
		$output .= ' src="' . $thumbnail[0] . '"';
		$output .= ' width="' . $thumbnail[1] . '"';
		$output .= ' height="' . $thumbnail[2] . '"';
		$output .= ' ></media:content>';
	}
	echo $output;
}

add_action('rss2_item', 'dn_add_rss_image');

function smartwp_featured_image_in_rss_feed($content)
{
	global $post;

	if (is_feed()) {
		if (has_post_thumbnail($post->ID)) {
			$thumbnail_ID = get_post_thumbnail_id($post->ID);
			$thumbnail = wp_get_attachment_image_src($thumbnail_ID, 'full');

			$prepend .= '<div class="Hero"><img';
			$prepend .= ' src="' . $thumbnail[0] . '"';
			$prepend .= ' width="' . $thumbnail[1] . '"';
			$prepend .= ' height="' . $thumbnail[2] . '"';
			$prepend .= ' /></div>';
			$content = $prepend . $content;
		}
	}

	return $content;
}

add_filter('the_content', 'smartwp_featured_image_in_rss_feed');

/* add_action('init', 'redirect_to_uf');

function redirect_to_uf()
{
	if (!preg_match('/(wp-admin|login)/', $_SERVER['REQUEST_URI']) && !preg_match('/\.(jpg|png|gif|jpeg|webp|mp4|css|js|map)$/', $_SERVER['REQUEST_URI'])) {
		wp_redirect('https://resources.broadsign.com/blog' . $_SERVER['REQUEST_URI'], 301);
		exit;
	}
} */

function my_admin_styles()
{
	wp_enqueue_style('broadsign-styles-admin', get_stylesheet_directory_uri() . '/broadsign-styles-admin.css');
}
function my_admin_scripts()
{
	if (get_post_type() === "cta-tile") {
		wp_enqueue_script('broadsign-cta-tiles', get_template_directory_uri() . '/js/cta-tiles.js', array('jquery'), _S_VERSION, true);
	}
}
add_action('admin_enqueue_scripts', 'my_admin_styles');
add_action('admin_enqueue_scripts', 'my_admin_scripts');


function create_french_editor_role()
{
	add_role(
		'translator_fr',
		'French Translator',
		array(
			'read' => true,
			'edit_posts_fr' => true,
			'edit_others_posts_fr' => true,
			'edit_published_posts_fr' => true,
			'edit_private_posts_fr' => true,
			'create_posts_fr' => true,
			'publish_posts_fr' => true,
			'delete_posts_fr' => true,
			'delete_published_posts_fr' => true
		)
	);

	$french_editor = get_role('translator_fr');

	// Check if role was created successfully
	if (null !== $french_editor) {
		// Add Polylang Pro capabilities to French Editor role
		$french_editor->add_cap('edit_posts');
		$french_editor->add_cap('edit_posts_fr');
		$french_editor->add_cap('edit_others_posts_fr');
		$french_editor->add_cap('edit_published_posts_fr');
		$french_editor->add_cap('edit_private_posts_fr');
		$french_editor->add_cap('create_posts_fr');
		$french_editor->add_cap('publish_posts_fr');
		$french_editor->add_cap('delete_posts_fr');
		$french_editor->add_cap('delete_published_posts_fr');

		// Remove the create_posts capability
		$french_editor->remove_cap('create_posts');
	}
}

add_action('init', 'create_french_editor_role');

function custom_Benefits_meta_box()
{
	add_meta_box(
		'custom_Benefits', // unique ID
		'Custom Benefits', // title
		'custom_Benefits_callback', // callback function
		'post', // post type
		'normal', // position
		'high' // priority
	);
}


/*
TURN OFF FOR NOW SO I CAN FOCUS ON OTHER THINGS ; TO BE CONTINUED

function custom_Benefits_callback()
{
	global $post;

	echo '<div class="custom_Benefits">';
	echo '<div class="custom_Benefits_row">';
	echo '</div>';
	echo '<div class="custom_Benefits_section section_categories">';
	echo '<h4>Categories</h4>';
	wp_terms_checklist($post->ID, ["taxonomy" => "category"]);
	echo '</div>';
	echo '<div class="custom_Benefits_section section_verticals">';
	echo '<h4>Verticals</h4>';
	wp_terms_checklist($post->ID, ["taxonomy" => "verticals"]);
	echo '</div>';
	echo '<div class="custom_Benefits_section section_products">';
	echo '<h4>Products</h4>';
	wp_terms_checklist($post->ID, ["taxonomy" => "products"]);
	echo '</div>';
	echo '<div class="custom_Benefits_section section_geos">';
	echo '<h4>Geography</h4>';
	wp_terms_checklist($post->ID, ["taxonomy" => "geo"]);
	echo '</div>';
	echo '<div class="custom_Benefits_section section_tags">';
	echo '<h4>Tags</h4>';
	wp_terms_checklist($post->ID, ["taxonomy" => "post_tag"]);
	echo '</div>';
	echo '</div>';
}

add_action('add_meta_boxes', 'custom_Benefits_meta_box'); */


/*
SEE IF THIS CAN WORK TO GENERATE A TERMS LIST THAT USES THE TERM'S LABEL INSTEAD OF ITS ID

function my_custom_terms_checklist( $args, $post_id ) {
    $args['walker'] = new My_Custom_Terms_Checklist_Walker;
    return $args;
}
add_filter( 'wp_terms_checklist_args', 'my_custom_terms_checklist', 10, 2 );

class My_Custom_Terms_Checklist_Walker extends Walker {
    var $tree_type = 'category';
    var $db_fields = array ('parent' => 'parent', 'id' => 'term_id');

    function start_el( &$output, $category, $depth = 0, $args = array(), $id = 0 ) {
        extract($args);
        if ( empty($taxonomy) )
            $taxonomy = 'category';

        $name = 'tax_input[' . $taxonomy . ']';
        $label = esc_html( $category->name );

        $output .= '<li id="' . $taxonomy . '-' . $category->term_id . '">';
        $output .= '<label><input type="checkbox" name="' . $name . '[]" value="' . $label . '"';
        if ( is_array($popular_cats) && in_array($category->term_id, $popular_cats) )
            $output .= ' checked="checked"';
        $output .= ' /> ' . $label . '</label>';
    }
} */