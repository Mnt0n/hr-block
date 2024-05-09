<?php
/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
 
function hr_register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
	
		return;
	}
    
	register_block_type( __DIR__ );
    
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'hr-block', 'default' );
	}

}
add_action( 'init', 'hr_register_block' );

