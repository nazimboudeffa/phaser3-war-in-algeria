class LoadScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'load', active: false });
    }

    preload ()
    {
        this.load.image('algeria', 'assets/algeria.png');
        this.load.image('location', 'assets/location.png');
        this.load.image('algiers', 'assets/algiers-transformed.png');
        this.load.image('eye', 'assets/eye.png');
        this.load.video('milkbar-explosion', 'assets/milkbar-explosion.mp4');

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
        this.scene.start('play');
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
        this.add.text(100, 100, 'Menu', { fill: '#0f0' });
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
        this.add.image(0, 0, 'algeria').setOrigin(0, 0);

        const location = this.add.sprite(436, 13, 'location').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });

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
            const intro = this.add.video(710, 662, 'milkbar-explosion');
            intro.play();
            intro.on('complete', () => {
                intro.destroy();
            });
        });
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser3-war-in-algeria',
    width: 800,
    height: 600,
    scene: [
        LoadScene, PlayScene, MapScene
    ]
};

const game = new Phaser.Game(config);
game.scene.start('load');