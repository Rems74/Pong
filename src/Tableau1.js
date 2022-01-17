
class Tableau1 extends Phaser.Scene {


    preload() {
        this.load.image('circle','assets/moon.png')
        this.load.image('square','assets/carre.png')
        this.load.image('space','assets/space.jpg')
        this.load.image('ovni','assets/ovni.png')
    }


    create() {
        this.hauteur=500
        this.largeur=1000

        let Space=this.add.image(0,0,'space').setOrigin(0,0);
        Space.scale=1.2

        //Barre Haut
        this.haut=this.physics.add.image(0,0,'square').setOrigin( 0, 0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true)
        this.haut.setTintFill(0xffffff)

        //Barre Bas
        this.bas=this.physics.add.image(0,this.hauteur-20,'square').setOrigin( 0, 0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true)
        this.bas.setTintFill(0xffffff)


        //Balle

        this.balle=this.physics.add.image(this.largeur/2,this.hauteur/2,'circle').setOrigin(0,0)
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.2,1.2)
        this.balle.setVelocity(300)
        this.balle.setVelocityX(Phaser.Math.Between(-200,200))
        this.balle.setVelocityY(Phaser.Math.Between(0,0))
        this.balle.body.setMaxVelocityY(200,200)



        //Raquette Droite

        this.droite=this.physics.add.image(this.largeur-40,this.hauteur/2-50,'ovni').setOrigin( 0, 0);
        this.droite.setDisplaySize(20,100);
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true)
        this.droite.body.setVelocityY(0);


        //Raquette Gauche

        this.gauche=this.physics.add.image(10,this.hauteur/2-50,'ovni').setOrigin( 0, 0);
        this.gauche.setDisplaySize(20,100);
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)
        this.gauche.body.setVelocityY(0);

        //Physique

        let me=this;

        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.haut);

        this.physics.add.collider(this.balle,this.droite, function(){
            console.log('touche droit')
            me.rebond(me.droite)
        });
        this.physics.add.collider(this.balle,this.gauche);



        this.initKeyboard();
    }

    rebond(raquette){

        let me=this;

        console.log(raquette.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(raquette.y))

        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette =(this.balle.y-raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);
        console.log(positionRelativeRaquette);

        this.balle.setVelocityY( this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)

    }

    //Initialisation touches


    initKeyboard(){

        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    if(me.gauche.y < me.haut.y+20){
                        me.gauche.setVelocityY(0)
                    }
                    else {
                        me.gauche.body.setVelocityY(-400);
                    }
                    break;


                case Phaser.Input.Keyboard.KeyCodes.Q:
                    if(me.gauche.y > me.bas.y-100){
                        me.gauche.setVelocityY(0)
                    }else {
                        me.gauche.body.setVelocityY(400);
                    }
                    break;


                case Phaser.Input.Keyboard.KeyCodes.P:
                    if(me.droite.y < me.haut.y+20){
                        me.droite.setVelocityY(0)
                    }
                    else{
                        me.droite.body.setVelocityY(-400);
                    }
                    break;


                case Phaser.Input.Keyboard.KeyCodes.M:
                    if(me.droite.y > me.bas.y-100){
                        me.droite.setVelocityY(0)
                    }else {
                        me.droite.body.setVelocityY(400);
                    }
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

            if(this.balle.x > this.largeur){
                this.balle.x = this.largeur/2;
                this.balle.y = this.hauteur/2;
                this.balle.body.setVelocityX(Phaser.Math.Between(-300,300));
                this.balle.body.setVelocityY(Phaser.Math.Between(-300,300));
            }
            if(this.balle.x < 0){
                this.balle.x = this.largeur/2;
                this.balle.y = this.hauteur/2;
                this.balle.body.setVelocityX(Phaser.Math.Between(-300,300));
                this.balle.body.setVelocityY(Phaser.Math.Between(-300,300));
            }
            if(this.balle.y < 0){
                this.balle.y = 0
            }
            if(this.balle.y > this.hauteur){
                this.balle.y = this.hauteur
            }

        }

    }

