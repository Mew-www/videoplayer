let pdfFilesDirectory = '/uploads/pdf/';

// get auto-generated page
$.ajax({url: pdfFilesDirectory}).then(function(html) {
    // create temporary DOM element
   let document = $(html);

    // find all links ending with .pdf
    document.find('a[href$=.pdf]').each(function() {
        let pdfName = $(this).text();
        let pdfUrl = $(this).attr('href');

        // do what you want here
    })
});
