class CoverFragment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
        this.active = true;
    }

    render() {
        if(this.active){
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

class Cover {
    constructor() {
        this.coverFragments = [];
    }

    render() {
        for (let i = 0; i < this.coverFragments.length; i++) {
           this.coverFragments[i].render();
        }
    }
}



function createCovers(coversArray) {
    console.log (coversArray);

    coversArray.push(new Cover());
    coversArray.push(new Cover());
    coversArray.push(new Cover());
    coversArray.push(new Cover());

    var square = 5;
    var posy = 200;
    var posx = canvas.width/8;
    coversArray[0].coverFragments = createCoverFragment(posx, posy, square);
    var posx = canvas.width/3;
    coversArray[1].coverFragments = createCoverFragment(posx, posy, square);
    var posx = 2*canvas.width/3 - square*18 ;
    coversArray[2].coverFragments = createCoverFragment(posx, posy, square);
    var posx = 7*canvas.width/8 - square*18;
    coversArray[3].coverFragments = createCoverFragment(posx, posy, square);
}

function createCoverFragment(posx, posy, square) {
    var fragmentsArray = [];
    for (let i = 0; i < 10; i++) {
        fragmentsArray.push(new CoverFragment((posx + i * square)+ square*4, canvas.height - posy));
    }
    for (let i = 0; i < 12; i++) {
        fragmentsArray.push(new CoverFragment((posx + i * square)+ square*3, canvas.height - posy + square));
    }
    for (let i = 0; i < 14; i++) {
        fragmentsArray.push(new CoverFragment((posx + i * square)+ square*2, canvas.height - posy + square*2));
    }
    for (let i = 0; i < 16; i++) {
        fragmentsArray.push(new CoverFragment((posx + i * square)+ square, canvas.height - posy + square*3));
    }
    for (let i = 0; i < 18; i++) {
        fragmentsArray.push(new CoverFragment((posx + i * square), canvas.height - posy + square*4));
    }
    for (let i = 0; i < 18; i++) {
        fragmentsArray.push(new CoverFragment((posx + i * square), canvas.height - posy + square*5));
    }
    for (let i = 0; i < 18; i++) {
        fragmentsArray.push(new CoverFragment((posx + i * square), canvas.height - posy + square*6));
    }
    for (let i = 0; i < 18; i++) {
        fragmentsArray.push(new CoverFragment((posx + i * square), canvas.height - posy + square*7));
    }
    for (let i = 0; i < 18; i++) {
        fragmentsArray.push(new CoverFragment((posx + i * square), canvas.height - posy + square*8));
    }
    for (let i = 0; i < 18; i++) {
        if(i != 7 && i != 8 && i != 9 && i != 10)
        fragmentsArray.push(new CoverFragment((posx + i * square), canvas.height - posy + square*9));
    }
    for (let i = 0; i < 18; i++) {
        if(i!=6 && i != 7 && i != 8 && i != 9 && i != 10 && i != 11)
        fragmentsArray.push(new CoverFragment((posx + i * square), canvas.height - posy + square*10));
    }
    for (let i = 0; i < 18; i++) {
        if(i!=5 && i!=6 && i != 7 && i != 8 && i != 9 && i != 10 && i != 11 && i != 12)
        fragmentsArray.push(new CoverFragment((posx + i * square), canvas.height - posy + square*11));
    }
    for (let i = 0; i < 18; i++) {
        if(i!=5 && i!=6 && i != 7 && i != 8 && i != 9 && i != 10 && i != 11 && i != 12)
        fragmentsArray.push(new CoverFragment((posx + i * square), canvas.height - posy + square*12));
    }
    return fragmentsArray;
}