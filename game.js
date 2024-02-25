class LoadScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'load', active: false });
    }

    preload ()
    {
        this.load.image('algeria', 'assets/algeria.png');
        this.load.image('algeria2', 'assets/carte-algerie-transformed.png');
        this.load.image('algiers', 'assets/algiers-transformed.png');
        this.load.image('eye', 'assets/eye.png');
        this.load.image('eye-plain', 'assets/eye-plain.png');
        this.load.image('play', 'assets/play.png');
        this.load.image('play-button', 'assets/play-button.png');
        this.load.image('casino', 'assets/casino.png');
        this.load.image('milkbar', 'assets/milkbar.png');
        this.load.image('start', 'assets/start.png');
        this.load.image('camp1', 'assets/camp1.png');
        this.load.image('camp2', 'assets/camp2.png');
        this.load.audio('moriconne', 'assets/menu.mp3');
        this.load.video('milkbar-explosion', 'assets/milkbar-explosion.mp4');
        this.load.video('attentat-casino', 'assets/attentat-casino-cut.mp4');

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        });

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.width / 2, this.game.renderer.height * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", () => {
            console.log("complete");
        });

        this.load.on("load", (file) => {
            console.log(file.src)
        })
    }

    create ()
    {
        this.scene.start('menu');
    }
}

class MenuScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'menu', active: false });
    }

    create ()
    {
        let music = this.sound.add('moriconne');
        music.play();
        music.loop = true; 


        const camp1 = this.add.sprite(106, 20, 'camp1').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });

        camp1.on('pointerover', function (event)
        {
            this.setTint(0x00ff00);
        });

        camp1.on('pointerout', function (event)
        {
            this.clearTint();
        });

        camp1.on('pointerdown', () => {
            music.stop();
            this.scene.start('play');
        });

        const camp2 = this.add.sprite(424, 20, 'camp2').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });

        camp2.on('pointerover', function (event)
        {
            this.setTint(0x00ff00);
        });

        camp2.on('pointerout', function (event)
        {
            this.clearTint();
        });

        camp2.on('pointerdown', () => {
            music.stop();
            this.scene.start('play');
        });


        let startButton = this.add.image(200, 478, 'start').setOrigin(0, 0);
        this.tweens.add({
            targets: startButton,
            alpha: 0,
            ease: 'Linear1',
            duration: 500,
            repeat: -1,
            yoyo: true
        });

    }
}

class PlayScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'play', active: false });
    }

    create ()
    {
        this.add.image(0, 0, 'algeria2').setOrigin(0, 0);

        const location = this.add.sprite(352, 90, 'eye').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });

        location.on('pointerdown', () =>
        {
            this.scene.start('map');
        });
    }
}


class MapScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'map', active: false });
    }

    create ()
    {
        this.add.image(0, 0, 'algiers').setOrigin(0, 0);

        const eye = this.add.sprite(35, 30, 'eye').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });
        eye.setTint(0x00ff00);

        const eye2 = this.add.sprite(710, 662, 'eye').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });

        const eye3 = this.add.sprite(669, 104, 'eye').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });

        

        let cam = this.cameras.main;

        this.input.on("pointermove", function (p) {
            if (!p.isDown) return;
        
            cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
            cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;
        });

        eye.on('pointerdown', () =>
        {
            this.scene.start('play');
        });

        eye2.on('pointerdown', () =>
        {
            this.scene.start('gamescenemilkbar');
        });

        eye3.on('pointerdown', () =>
        {
            this.scene.start('gamescenecorniche');
        });
    }
}

class GameSceneCorniche extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'gamescenecorniche', active: false });
    }

    create ()
    {
        this.add.image(10, 10, 'casino').setOrigin(0, 0);
        
        const playvid = this.add.sprite(500, 10, 'play').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });
        const eye = this.add.sprite(500, 300, 'eye-plain').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });

        this.add.sprite(500, 400, 'play-button').setOrigin(0, 0);

        playvid.on('pointerdown', () =>
        {
            const intro = this.add.video(10, 10, 'attentat-casino').setOrigin(0, 0);
            intro.play();
            intro.on('complete', () => {
                intro.destroy();
            });
        });

        eye.on('pointerdown', () =>
        {
            this.scene.start('map');
        });
        
    }
}

class GameSceneMilkBar extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'gamescenemilkbar', active: false });
    }

    create ()
    {
        this.add.image(10, 10, 'milkbar').setOrigin(0, 0);
        
        const playvid = this.add.sprite(500, 10, 'play').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });
        const eye = this.add.sprite(500, 300, 'eye-plain').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });

        this.add.sprite(500, 400, 'play-button').setOrigin(0, 0);

        playvid.on('pointerdown', () =>
        {
            const intro = this.add.video(10, 50, 'milkbar-explosion').setOrigin(0, 0);
            intro.play();
            intro.on('complete', () => {
                intro.destroy();
            });
        });

        eye.on('pointerdown', () =>
        {
            this.scene.start('map');
        });
        
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser3-war-in-algeria',
    width: 800,
    height: 600,
    scene: [
        LoadScene, MenuScene, PlayScene, MapScene, GameSceneCorniche, GameSceneMilkBar
    ]
};

const game = new Phaser.Game(config);
game.scene.start('load');