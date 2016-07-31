// Body 

var zodiac = [
{
    sign: "Aries",
    text: "March 21 - April 19: Aries is the first sign of the zodiac. Those who are Aries are independent and courageous. They enjoy leading others and bringing excitement into the lives of others. An Aries is enthusiastic and very goal-oriented.",
    image: "img/aries.png"
},
{
    sign: "Taurus",
    text: "April 20 - May 20: The second sign of the zodiac, those who are a Taurus are solid and fight for what they want. A Taurus is very easy going but can also be stubborn. A Taurus can be procrastinators but also have a good-work ethic.",
    image: "img/taurus.png"
},
{
    sign: "Gemini",
    text: "May 21 - June 20: Gemini is the third sign of the zodiac. Geminis have many sides and are known for their energy. They are very talkative and are considered social butterflies. A Gemini will always take their lives in the direction they want to go.",
    image: "img/gemini.png"
},
{
    sign: "Cancer",
    text: "June 21 - July 22: Cancer is the fourth sign of the zodiac. This sign is marked by inconsistency. They enjoy security but also seek adventure. A Cancer is not very predictable and always keep others guessing.",
    image: "img/cancer.png"
},
{
    sign: "Leo",
    text: "July 23 - August 22: Leo is the fifth sign in the zodiac. Leos have high self esteem and are very devoted. They are also very kind and generous. A Leo is known for being hot tempered yet forgiving.",
    image: "img/leo.png"
},
{
    sign: "Virgo",
    text: "August 23 - September 22: The sixth sign of the zodiac, Virgo is very mind oriented. They are constantly analyzing and thinking. They enjoy bettering themselves and those around them",
    image: "img/virgo.png"
},
{
    sign: "Libra",
    text: "September 23 - October 22: The seventh sign of the zodiac, Libras are known for their diplomatic nature. They get along well with everyone and are ambitious. They have very expensive taste and work hard to make money.",
    image: "img/libra.png"
},
{
    sign: "Scorpio",
    text: "October 23 - November 2: The eight sign of the zodiac, Scorpios are very intense. They like to question everything and work hard at making sense of things. Scorpios treat others with kindness and loyalty.",
    image: "img/scorpio.png"
},
{
    sign: "Sagittarius",
    text: "November 22 - December 21: The ninth sign of the zodiac, a Sagittarius has a very positive outlook on life. They have vibrant personalities and enjoy meeting new people. They can also be reckless.",
    image: "img/sagittarius.png"
},
{
    sign: "Capricorn",
    text: "December 22 - January 19: The 10th sign of the zodiac, those who are Capricorns are marked by their ambitious nature. They have very active minds and always have to be in control of their lives.",
    image: "img/capricorn.png"
},
{
    sign: "Aquarius",
    text: "January 20 - February 18: Aquarius is the 11th sign of the zodiac. Aquarians don't always care what others think about them. They take each opportunity they have and work towards formulating new ideas.",
    image: "img/aquarius.png"
},
{
    sign: "Pisces",
    text: "February 19 - March 20: Pisces is the 12th and last sign of the zodiac. Those who are Pisces are extremely sensitive and reserved. They like to escape from reality. A Pisces is a very good listener and friend.",
    image: "img/pisces.png"
}
]

function horoscopeMe(){
    var horoscope = document.getElementById("horoscope").value

    for (i = 0; i < zodiac.length; i++) {
        if (horoscope === zodiac[i].sign) {
            document.getElementById("symbols").src = zodiac[i].image
            document.getElementById("yourSign").innerHTML = zodiac[i].sign
            document.getElementById("fortune").innerHTML = zodiac[i].text
            
            return
        }   else {
            document.getElementById("yourSign").innerHTML = "Unknown"
            document.getElementById("fortune").innerHTML = "I don't know about that one buddy!" 
            
        }
    }
}

// For the Background


(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        
        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
})();


