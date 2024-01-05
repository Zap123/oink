// Made with RosebudAI

function AssetURL(textDescription) {
    return `assets/${textDescription}.png`;
}

class Example extends Phaser.Scene {
    constructor() {
        super();
        this.coins = 0;
        this.powerUpBonus = 0;
        this.balloonPowerup = 0;
    }

    preload() {
        this.load.image('happy farm wallpaper', 'https://storage.googleapis.com/rosebud_assets_storage/cf6fe138-7e3e-4e7d-bfd6-76516fd47f07.png');
        this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
        this.load.image('baloon_wallpaper', 'https://storage.googleapis.com/rosebud_assets_storage/ac9559cc-60e1-4225-8532-b8faea32b344.png');
        this.load.image('bouncing pigs', 'https://storage.googleapis.com/rosebud_assets_storage/7cde4462-e84e-4b88-9e12-0a598abc9cda.png');
        this.load.image('pig', 'https://storage.googleapis.com/rosebud_assets_storage/8d01621d-9347-4758-ae9f-b31f8c473c47.png');
        this.load.image('powerup_coin', 'https://storage.googleapis.com/rosebud_assets_storage/17b7cfca-e17c-44fa-8f91-d2f6bca02623.png');
        this.load.image('coin', 'https://storage.googleapis.com/rosebud_assets_storage/e16e9483-b4e6-4fce-b297-52b4c1f03876.png');
        this.load.image('particle effect', 'https://storage.googleapis.com/rosebud_assets_storage/32fb0137-97ea-4663-9b94-c1057c57a638.png');
        this.load.image('powerup_baloon', 'https://storage.googleapis.com/rosebud_assets_storage/3dda9cf1-0ee9-4e3e-8f09-3ac06f27b720.png');
        this.load.image('baloon_icon', 'https://storage.googleapis.com/rosebud_assets_storage/079334a7-92c6-4dff-87b8-0870216e2c99.png');
        this.load.image('sea_wallpaper', 'https://storage.googleapis.com/rosebud_assets_storage/e7da1924-4061-492b-8bc2-7dc9cce0afcf.png');

    }


    create() {
        var background = this.add.image(400, 300, 'happy farm wallpaper');
        background.setDisplaySize(config.width, config.height);
        background.setTint(0xeeeeee);
        background.setAlpha(0.9);
        const particles = this.add.particles('red');
        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        var bottomText = this.add.text(670, 580, 'made with RosebudAI by @Zap123',
            { fontFamily: 'Serif', fontSize: 14, color: '#AFFFFF' }).setOrigin(0.5);

        var danceParticles = this.add.particles('particle effect').setVisible(false);
        var danceEmitter = danceParticles.createEmitter({
            speed: 100,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD'
        });

        var coin = this.add.image(400, 300, 'coin').setVisible(false);
        danceEmitter.startFollow(coin);
        coin.setScale(0.5);

        const bouncingPigs = this.physics.add.image(400, 100, 'bouncing pigs');

        bouncingPigs.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bouncingPigs.setBounce(1);
        bouncingPigs.setCollideWorldBounds(true);
        bouncingPigs.setScale(0.2);

        var isOinkSpeaking = false;
        var oinkCount = 0;
        var clickCount = 0;

        const utterance = new SpeechSynthesisUtterance('oink');
        utterance.onstart = function () {
            isOinkSpeaking = true;
        }
        utterance.onend = function () {
            isOinkSpeaking = false;
        }
        var quotes = ['I love mud baths!', 'This little piggy stayed home.', 'I\'m on a see-food diet!', 'I\'m so good at sleeping, I can do it with my eyes closed!', 'Life is like a blanket of snow. Be careful where you step.', 'Pigs are smarter than dogs!', 'I\'m not lazy, I\'m on energy saving mode.', 'I\'m in shape. Round is a shape!', 'My diet plan: make all my friends cupcakes. The fatter they get, the thinner I look!', 'If I won the award for laziness, I would send somebody to pick it up for me.', 'I’m not weird, I’m limited edition!', 'I\'m not lazy. I\'m just on my energy saving mode.', 'I don\'t need a hair stylist, my pillow gives me a new hairstyle every morning.', 'I\'m not arguing, I\'m simply explaining why I\'m right.', 'With great power, comes great electricity bill.', 'I’m so cool, ice cubes are jealous.', 'I am the ghost of the pigs past!', 'Today is a good day for a good day.', 'Did you know? Pigs can\'t look up at the sky!', 'I\'ll do it oink oink... Tomorrow!', 'Beware of the pig!', 'I\'ve never met a piece of mud I didn\'t like.', 'I’m just a pig standing in front of a boy… asking him to love her.', 'I’m not fat… I’m just so darn fluffy.', 'I’m the pig your mom warned you about.', 'Did you hear about the pig who opened a pawn shop? He called it \'Ham Hocks\'.', 'Why was the pig a great actor? Because he was always hogging the spotlight.', 'What do you get if you cross a pig and a cactus? A porky-pine!', 'How does a pig go to hospital? In a hambulance!', 'Why was the pig ejected from the football game? For playing dirty.',
            'You can\'t pull the wool over a pig\'s eyes.', 'Pigs might fly.', 'Like a pig in a poke.', 'As happy as a pig in muck.', 'Every pig has his day.', 'Make a pig\'s ear of something.', 'Even a blind pig can find an acorn when it falls on its head.', 'Never wrestle with a pig.', 'A pig in a poke.', 'It is easier to teach a pig to fly than to convince a fool of his folly.', 'You can put lipstick on a pig, but it is still a pig.', 'Sweating like a pig.', 'Life is like a pig. You have to get down in the mud to enjoy it.', 'To a pig, all things are pig.', 'Pigs may whistle, but they have poor mouths for it.', 'A pig used to dirt turns its nose up at fresh air.', 'The pig that cannot find dirt will wallow in the ash.', 'Better a pig than a swine.'];

        var quoteText = this.add.text(400, 550, '',
            { fontFamily: 'Arial', fontSize: 20, color: '#FFFFFF' }).setOrigin(0.5);

        var bonusText = this.add.text(400, 400, '+10',
            { fontFamily: 'Arial', fontSize: 40, color: '#FFFF00' }).setOrigin(0.5).setVisible(false);

        var quoteHideDelay;

        const colorChangeDuration = 1000;


        var powerUpButton = this.add.image(700, 300, 'pig').setInteractive().setVisible(false);
        powerUpButton.setScale(0.2);
        powerUpButton.on('pointerup', () => {
            bouncingPigs.setVelocity(bouncingPigs.body.velocity.x / 2);
            this.time.delayedCall(10000, () => {
                bouncingPigs.setVelocity(bouncingPigs.body.velocity.x * 2);
            }, [], this);
            this.coins -= 10; // subtract 20 from coins 
            powerUpButton.setVisible(false); // hide power up button
        });

        var powerUpButton2 = this.add.image(700, 350, 'powerup_coin').setInteractive().setVisible(false);
        powerUpButton2.setScale(0.2);
        powerUpButton2.on('pointerup', () => {
            this.powerUpBonus += 5;
            bonusText.setText('+' + (10 + this.powerUpBonus));
            this.coins -= 25; // subtract 50 from coins
            powerUpButton2.setVisible(false); // hide power up button
        });

        var powerUpButton3 = this.add.image(700, 400, 'powerup_baloon').setInteractive().setVisible(false);
        powerUpButton3.setScale(0.2);
        powerUpButton3.on('pointerup', () => {
            this.coins -= 30; // subtract 60 from coins
            powerUpButton3.setVisible(false); // hide power up button
            this.balloonPowerup++;

            for (let i = 0; i < this.balloonPowerup; i++) {
                let balloonIcon = this.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'baloon_icon').setVisible(true);
                balloonIcon.setInteractive();
                balloonIcon.setScale(0.2);

                balloonIcon.on('pointerup', () => {
                    var popText = this.add.text(0, 0, 'POP!', { fontFamily: 'Arial', fontSize: 40, color: '#FF0000' }).setVisible(false);
                    oinkCount += 5;
                    balloonIcon.setVisible(false);
                    popText.setPosition(balloonIcon.x, balloonIcon.y);
                    popText.setVisible(true);
                    this.time.delayedCall(300, () => { popText.setVisible(false); }, [], this);
                });
            }
        })


        bouncingPigs.setInteractive();
        bouncingPigs.on('pointerdown', () => {
            if (!isOinkSpeaking) {
                window.speechSynthesis.speak(utterance);
                oinkCount++;
                oinkText.setText('You oinked ' + oinkCount + ' times');
                clickCount++;

                if (clickCount % 10 === 0) {

                    danceParticles.setVisible(true)
                    danceEmitter.start();

                    coin.setVisible(true);
                    bonusText.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        coin.setVisible(false);
                        bonusText.setVisible(false);
                        danceEmitter.stop();
                        danceParticles.setVisible(false);
                    }, [], this);

                    this.coins += 10 + this.powerUpBonus;

                    if (this.coins >= 20) { // Check if coins are more than 20
                        powerUpButton.setVisible(true);
                    }

                    if (this.coins >= 50) { // Check if coins are more than 50
                        powerUpButton2.setVisible(true);
                    }

                    if (this.coins >= 60) { // Check if coins are more than 50
                        powerUpButton3.setVisible(true);
                    }

                    if (clickCount === 100) {
                        background.setTexture('baloon_wallpaper');
                        background.setTint(0xeeeeee);
                        background.setAlpha(0.9);
                        background.setDisplaySize(config.width, config.height);
                    } else if (clickCount === 200) {
                        background.setTexture('sea_wallpaper');
                        background.setDisplaySize(config.width, config.height);
                        background.setTint(0xeeeeee);
                        background.setAlpha(0.9);
                    }
                }

                quoteText.setText(quotes[Math.floor(Math.random() * quotes.length)]);
                quoteText.visible = true;

                if (quoteHideDelay) quoteHideDelay.remove(false);

                quoteHideDelay = this.time.delayedCall(2000, function () {
                    quoteText.visible = false;
                }, [], this);

                bouncingPigs.setVelocity(-bouncingPigs.body.velocity.x + Phaser.Math.Between(-100, 100), -bouncingPigs.body.velocity.y + Phaser.Math.Between(-100, 100));

                emitter.setTint(Phaser.Display.Color.RandomRGB().color);
                this.time.delayedCall(colorChangeDuration, () => {
                    emitter.setTint(0xFFFFFF);
                }, [], this);
            }
        });

        emitter.startFollow(bouncingPigs);

        var oinkText = this.add.text(600, 50, 'You oinked 0 times',
            { fontFamily: 'Arial', fontSize: 20, color: '#FFFFFF' });

        this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
            },
        });
    }

}

const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    audio: {
        disableWebAudio: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: Example
};

window.phaserGame = new Phaser.Game(config);
