
class Tableau1 extends Phaser.Scene {


    preload() {
        this.load.image('circle','assets/rond.png')
        this.load.image('square','assets/carre.png')
    }


    create() {
        this.hauteur=500
        this.largeur=1000

        //Barre Haut
        this.haut=this.physics.add.image(0,0,'square').setOrigin( 0, 0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true)

        //Barre Bas
        this.bas=this.physics.add.image(0,this.hauteur-20,'square').setOrigin( 0, 0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true)


        //Balle

        this.balle=this.physics.add.image(this.largeur/2,this.hauteur/2,'circle').setOrigin(0,0)
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.1,1.1)
        this.balle.setVelocity(500)
        this.balle.body.setMaxVelocityY(500,500)



        //Raquette Droite

        this.droite=this.physics.add.image(this.largeur-20,this.hauteur/2,'square').setOrigin( 0, 0);
        this.droite.setDisplaySize(20,100);
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true)
        this.droite.body.setVelocityY(0);


        //Raquette Gauche

        this.gauche=this.physics.add.image(0,this.hauteur/2,'square').setOrigin( 0, 0);
        this.gauche.setDisplaySize(20,100);
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)
        this.gauche.body.setVelocityY(0);

        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.haut);
        this.physics.add.collider(this.balle,this.droite);
        this.physics.add.collider(this.balle,this.gauche);



        this.initKeyboard();
    }
    initKeyboard(){

        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.gauche.body.setVelocityY(-400);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche.body.setVelocityY(400);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.droite.body.setVelocityY(-400);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.droite.body.setVelocityY(400);
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.gauche.body.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche.body.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.droite.body.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.droite.body.setVelocityY(0);
                    break;
            }
        });
    }

        update(){

            if(this.balle.x>this.largeur) {
                this.balle.x = 0
            }

            if(this.balle.y>this.largeur){
                this.balle.y = 0
            }

            if(this.balle.y>this.hauteur){
                this.balle.y = 0
            }

        }




    }

