( function( $, History ) {

	if ( !History.enabled ) {
		return false;
	}

	var $wrap = $( "#wrap" );

	$wrap.on( "click", ".page-link", function( event ) {

		event.preventDefault();

		if ( window.location === this.href ) {
			return;
		}

		var pageTitle = ( this.title ) ? this.title : this.textContent;
			pageTitle = ( this.getAttribute( "rel" ) === "home" ) ? pageTitle : pageTitle + " — Acme";

		History.pushState( null, pageTitle, this.href );
	} );

	History.Adapter.bind( window, "statechange", function( event ) { // Note: We are using statechange instead of popstate

		var regex = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
		var state = History.getState();

		$.get( state.url, function( res ) {

			var $res = $( res );

			$.each( $res, function( index, elem ) {
				if ( "wrap" !== elem.id ) {
					return;
				}
				$wrap.html( $( elem ).html() );
			} );
		} );
	} );

} )( jQuery, window.History );
