
// get auto-generated page
$.get('http://62.78.180.5/streamprojekti/').then(function(html) {
    // create temporary DOM element
   let document = $(html);

    // find all links ending with .pdf
    document.find('a[href$=".wov"]').each(function() {
        let pdfName = $(this).text();
        let pdfUrl = $(this).attr('href');

        // do what you want here
    })
});
