var shell = $('.shell').resizable({
    minHeight: 108,
    minWidth: 250
}).draggable({
    handle: '> .status-bar .title'
});

var cmdlist = ['ls', 'less', 'cd', 'cat', 'help', 'whoami', 'resume', 'echo', 'exit']
var dircontent = ['readme.md', 'blog']

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
        var prompt = term.get_prompt();
        if (prompt == "i@mour: root/blog $ ") {
            term.echo("index.html")
        } else {
            term.echo(dircontent);
        }
    },
    cd: function (path) {
        var prompt = term.get_prompt();
        if (path == "blog") {
            term.set_prompt("i@mour: root/blog $ ")
        } else if (path === "..") {
            term.set_prompt("i@mour:$ ")
            var np = prompt.split()
        } else if (path == ".") {
            term.echo("")
        }else {
            term.echo(path + " is not directory")
        }
    },
    cat: function (fname) {
        if (fname == "readme.md") {
            term.echo(readme)
        } else if (fname == "index.html" || fname == "blog/index.html") {
            term.echo("Now you would redirect to blog homepage");
            window.location.href = "https://iami.xyz";
        } else {
            term.echo("cat: " + fname + ": No such file or directory")
        }
    },
    exit: function () {
        window.location.href = "about:blank";
        window.close();
    },
    // echo: function(){
    // // how to support mutliple args
    //     if (args) {
    //         this.echo(arguments)
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
        document.getElementById("greeting").style.display = "None";
        if (command.match(/^y$/i)) {
            
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


// code from https://code.sololearn.com/Wj7ZWBg5m2OG/#html
var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//chinese characters - taken from the unicode charset
var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
//converting the string into an array of single characters
matrix = matrix.split("");

var font_size = 10;
var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++)
    drops[x] = 1;

//drawing the characters
function draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++) {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}

setInterval(draw, 35);