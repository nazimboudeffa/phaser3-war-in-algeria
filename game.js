class LoadScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'load', active: false });
    }

    preload ()
    {
        this.load.image('algeria', 'assets/algeria.png');

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
    }
}


const config = {
    type: Phaser.AUTO,
    parent: 'phaser3-war-in-algeria',
    width: 800,
    height: 600,
    scene: [
        LoadScene, PlayScene
    ]
};

const game = new Phaser.Game(config);
game.scene.start('load');