## Prerequisite - Apache2 Web Server
You need a web server to contain your media files, this project presumes it is Apache2 with directory listing ON.

Debian/variant

```
sudo apt-get install apache2
```

```
mv mediafile.mp4 /var/www/html/
```

Also in case if you use this HTML, either from localhost, or from another server than where mediafiles reside,
then you need to add a .htaccess file amongst them, to enable CORS headers.

Contents to put in **/var/www/html/.htaccess**

```
Header set Access-Control-Allow-Origin "*"
```

then run command to restart apache2 (so it applies this new configuration)

```
sudo service apache2 restart
```

## Setting up development environment

Clone this entire repository using

```
git clone (the-link-found-from-github-page.git)
```

move to the created folder

```
cd videoplayer
```

and install node packages

```
npm install
```

## Generating the HTML/CSS/JS "distributable" from source code

While in /videoplayer -folder, run command

```
node ./node_modules/gulp/bin/gulp.js build
```

and it will generate "/dist" folder to your "/videplayer" folder.
All necessary files (aside from ones loaded from an internet CDN) are included in that /dist folder.

## Made by

* **Mew**
* **Jade**

### Licensed under MIT (do what you like but if you break stuff don't ask for me)

See [LICENSE](LICENSE) file for details