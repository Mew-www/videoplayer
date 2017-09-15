jwplayer('videoplayer').setup({
  file: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg",
  height: 360,
  width: 640,
});

let dummy_movie_object = {
  title: "american-made-trailer-1_h1080p.mov",
  description: "This has lots of kittens in it!",
  sources: [
    {file: 'http://62.78.180.5/streamprojekti/american-made-trailer-1_h1080p.mov', label: 'Full HD'},
    {file: 'http://62.78.180.5/streamprojekti/american-made-trailer-1_h480p.mov', label: 'Low quality'}
  ]
};

function changeTest() {
  jwplayer('videoplayer').load([dummy_movie_object]);
}