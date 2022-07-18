//import Component from "./Component.js";
import Image from "./Image.js";
//import Queue from "./Queue.js";


/**
 * 'Question' class denotes a set of objects that constructs a question, including a Q icon, question text, etc.
 * A 'Question' object can have a parent object that could be a 'Quiz' object.
 * A 'Question' object can have several components like icons, boxes, or text.
 */
export default class ImageLoader
{
    m_cases = [];
    m_imageQueue = [];
    
    
    static get preloadSize() { return 5; }
    
    
    /**
     * A constructor.
     */
    constructor() {
        //this.m_cases = [];
        //this.m_imageQueue = [];
        
        //this.m_objImage = Component.createImage(this.m_size, this.m_position, true);
        //this.m_objCurrentDOM = this.m_objImage.img;
    }
    
    /**
     * A reset function.
     */
    reset() {
        this.m_cases = [];
        this.m_imageQueue = [];
        //super.reset();
    }
    
    addCases(cases) {
        this.m_cases = cases;
        
        let cnt = 0;
        
        for (let i = 0; i < this.m_cases.length; i++) {
            if (i == ImageLoader.preloadSize) break;
            
            console.log(this.m_cases[i]);
            
            let choice0 = new Image();
            let choice1 = new Image();
            choice0.setSrc("./img/choices/1.correct." + this.m_cases[i][0] + ".png");
            choice1.setSrc("./img/choices/1.wrong." + this.m_cases[i][1] + ".png");
            
            let arrChoices = {};
            arrChoices.correct = choice0;
            arrChoices.wrong = choice1;
            //console.log(arrChoices);
            this.m_imageQueue.push(arrChoices);
            //console.log(this.m_imageQueue);
            
            cnt++;
        }
        
        for (let i = 0; i < cnt; i++)
            this.m_cases.shift();
    }
    
    popCase() {
        let choices = this.m_imageQueue[0]; //.shift();
        console.log(choices.correct);
        console.log(choices.wrong);
        //let case = this.m_cases.shift();
        console.log(this.m_cases[0]);
        //return this.m_imageQueue.shift();
    }
}






























