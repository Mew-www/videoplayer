
    let listing = [];

     // get auto-generated page
    $.get('http://62.78.180.5/streamprojekti/').then(function (html) {
        // create tempovrary DOM element
        let document = $(html);

        document.find('a[href$=".mov"]').each(function () {
            // console.log($(this).attr("href"));
            //console.log($(this).parent().next().html());
            //console.log($(this).parent().next().next().html());
             //slice pilko alaviiva ja piste lopusta eli (kaikki paitsi viimeinen)
            let splitter1 = $(this).attr("href").split("-");
            let joining1 = splitter1.join(" ");
            console.log(joining1);

            let movie = {
                name: joining1,
                last_modified: $(this).parent().next().html(),
                size: $(this).parent().next().next().html()
            };
            listing.push(movie);






        });

        let div1 = $( "<div class='movie-wrapper'></div>" );
        $("#videolist").append(div1);


        for(let i = 0; i < listing.length; i++) {
           /* console.log(listing[i].name);
            console.log(listing[i]);
            */


            div1.append("<div class='movie-element'>"+
                    listing[i].name +
                    "<div class='movie-info'>" + listing[i].last_modified + "</div>" +
                "</div>");
            //$("#videolist").append( listing[i].name );


        }

        //let splitter = listing.split("-");

        //näkyy kaikki leffat
               // "</li><li>jotain2</li></ol>");


        //console.log(listing[2]);
       // $("#videolist").append("<ol><li>"[i]"</li><li>jotain2</li></ol>");
    });
