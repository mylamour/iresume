var shell = $('.shell').resizable({
    minHeight: 108,
    minWidth: 250
}).draggable({
    handle: '> .status-bar .title'
});

var cmdlist = ['ls', 'less', 'cat', 'help', 'whoami', 'resume']
var dircontent = ['readme.md']
var readme = "Hi, guys, welcome to my little secret place. i make it use juqery.terminal. and this is static website, so this file readme.md is not exist actually. it only few line string here. As for me, i am learning programing since 5 years ago, when i was go to college. I always have a greate passions to new things. i try to play hacking, programing, reading. and others, also i am writing it in my blog, gitbook. and all above this, it;s just for fun. Hope you would found your interesting things. And have a nice day"


var term = $('.content').terminal({
    help: function () {
        term.echo(cmdlist)
    },
    less: function (url) {
        try {
            var ext = url.match(/\.([^.]+)$/)[1];
        } catch (e) { }
        $.get(url).then(function (file) {
                term.less(file);
        });
    },
    resume: function () {
        show();
    },
    whoami: function () {
        term.echo("mour");
    },
    ls: function () {
        term.echo(dircontent);
    },
    cat: function (fname) {
        if (fname == "readme.md") {
            term.echo(readme)
        } else {
            term.echo("cat: " + fname + ": No such file or directory")
        }
    },
    // echo: function(args){
    // how to support mutliple args
    //     if (fcon) {
    //         term.echo(fcon)
    //     } else {
    //         term.echo("Echo echo echo ....")
    //     }
    // },
    // logo: function(){
    //     document.getElementById("greeting").style.display="Inherit";        
        
    // },
},

    {
        greetings: false,
        prompt: 'i@mour:$ '
    });

function show() {
    term.push(function (command) {
        document.getElementById("greeting").style.display="None";             
        if (command.match(/^y$/i)) {
            profiles = {
                "name": "mour",
                "sex": "M",
                "mail": "mour at iami.xyz",
                "progaming": "Python, Shell, javascript, node, little rust...",
                "skills": " Web security, Machine Learning, Deep Learning",
                "status": "Working on BTCC as Security Architect",
                "exprience": "2 years",
                "About": "I am a security researcher, also a devops, and with great passion in machine learning and deep learning.",
            }
            var whoami = Object.keys(profiles).map(function (key) {
                var value = profiles[key];
                return '[[b;#fff;]' + key + ']: ' + '[[;springgreen;]' + value + ']';
            }).join('\n');

            term.echo(whoami, {
                // I don't know why it doesn't working...
                // finalize: function (div) {
                //     div.css("background", "white");
                // }
            });
            term.pop().history().enable();
        } else if (command.match(/^n$/i)) {
            term.pop();
            greeting = '[[b;#fff;]' + "Have a nice day" + "]\n" + "type " + '[[;springgreen;]' + "help " + ']' + " to get list of commands";
            term.echo(greeting);
        }
    }, {
            prompt: 'Do you want to know who am i (y|n): '
        });        
}
term.history().disable();
show();       


//code from https://code.sololearn.com/Wj7ZWBg5m2OG/#html
// var c = document.getElementById("c");
// var ctx = c.getContext("2d");

// //making the canvas full screen
// c.height = window.innerHeight;
// c.width = window.innerWidth;

// //chinese characters - taken from the unicode charset
// var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
// //converting the string into an array of single characters
// matrix = matrix.split("");

// var font_size = 10;
// var columns = c.width / font_size; //number of columns for the rain
// //an array of drops - one per column
// var drops = [];
// //x below is the x coordinate
// //1 = y co-ordinate of the drop(same for every drop initially)
// for (var x = 0; x < columns; x++)
//     drops[x] = 1;

// //drawing the characters
// function draw() {
//     //Black BG for the canvas
//     //translucent BG to show trail
//     ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
//     ctx.fillRect(0, 0, c.width, c.height);

//     ctx.fillStyle = "#0F0"; //green text
//     ctx.font = font_size + "px arial";
//     //looping over drops
//     for (var i = 0; i < drops.length; i++) {
//         //a random chinese character to print
//         var text = matrix[Math.floor(Math.random() * matrix.length)];
//         //x = i*font_size, y = value of drops[i]*font_size
//         ctx.fillText(text, i * font_size, drops[i] * font_size);

//         //sending the drop back to the top randomly after it has crossed the screen
//         //adding a randomness to the reset to make the drops scattered on the Y axis
//         if (drops[i] * font_size > c.height && Math.random() > 0.975)
//             drops[i] = 0;

//         //incrementing Y coordinate
//         drops[i]++;
//     }
// }

// setInterval(draw, 35);