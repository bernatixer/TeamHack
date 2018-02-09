# TeamHack
### Organize your groups. Fast, easy and perfect for Hackathons!

* Features:
  * See your team's code live
  * Chat inside the website
  

## How to deploy TeamHack

Download the files `git clone https://github.com/bernatixer/TeamHack.git`

Now, enter the directory: `cd TeamHack`

We have to download the dependencies, `npm install`

We need a firebase API (key)[https://firebase.google.com/], once you have one, you can put it on te file 'public/app.js' at line 58, you also need to modify lines 59 and 60.

Well done, je just need to open the server, just run:
```
node index.js
```
(EXTRA) En cas que volguem tenir el servei de segon pla, podem executar la següent sentencia de comandes:
```
sudo apt-get install screen -y
screen -S easyzone
node index.js
(Teclejem Ctrl+A+D)
```

## Licence MIT
