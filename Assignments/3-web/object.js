export default class User {
    constructor(x,y,r,name,gender,loc,age){
        this.x = x;
        this.y = y; 
        this.r = r;
        this.name = name;
        this.gender = gender;
        this.loc = loc;
        this.age = age;
    };
    
    render(p){
        p.fill(255);
        
        p.ellipse(this.x,this.y,400);

        p.fill(0);
        p.text(this.name, this.x, this.y);
    }
    

    
}


//     constructor(x,y,r,name, location, input)
