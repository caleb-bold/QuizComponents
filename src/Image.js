import Component from "./Component.js";


/**
 * 'Question' class denotes a set of objects that constructs a question, including a Q icon, question text, etc.
 * A 'Question' object can have a parent object that could be a 'Quiz' object.
 * A 'Question' object can have several components like icons, boxes, or text.
 */
export default class Image extends Component {

    m_objImage = null;

    m_size = {w:40, h:40};
    m_position = {x:0, y:0};

    /**
     * A constructor.
     */
    constructor() {
        super();
        this.m_objImage = Component.createImage(this.m_size, this.m_position, true);
        this.m_objCurrentDOM = this.m_objImage.img;
    }

    /**
     * A reset function.
     */
    reset() {
        this.m_objImage.img.src = '';
        super.reset();
    }

    /**
     * Set text of the question
     * @param {String} text
     */
    m_bLoaded = 0;
    onLoad(e) {
        if (e.currentTarget.myObj.m_objImage.img.complete && e.currentTarget.myObj.m_objImage.img.naturalHeight !== 0)
            e.currentTarget.myObj.m_bLoaded = 1;
        else
            e.currentTarget.myObj.m_bLoaded = -1;
    }
    onError(e) {
        e.currentTarget.myObj.m_bLoaded = -1;
    }
    setSrc(img_url) {
        this.m_bLoaded = false;
        this.m_objImage.img.style.visibility = 'hidden';
        this.m_objImage.img.src = img_url;
        this.m_objImage.img.myObj = this;   
             
        this.m_objImage.img.addEventListener("load", this.onLoad);
        this.m_objImage.img.addEventListener("error", this.onError);
    }
    isLoaded() {
        if (this.m_bLoaded == 0)
            console.log("not loaded");
        if (this.m_bLoaded == 1)
            console.log("loaded");
        if (this.m_bLoaded == -1)
            console.log("loading failed");
        return this.m_bLoaded;
    }
    setVisible() {
        this.m_objImage.img.style.visibility = 'visible';
    }
    setInvisible() {
        this.m_objImage.img.style.visibility = 'hidden';
    }

    setAction(key, func) {
        this.m_objImage.img.addEventListener("click", func);
    }

    setPosition(x, y) {
        this.m_position.x = x;
        this.m_position.y = y;
        // should use getBoundingRect
        let w = Component.getObjectWidth(this.m_size.w);
        let h = Component.getObjectHeight(this.m_size.h);
        this.m_objImage.img.style.left = Component.getObjectPositionX(x, h) + 'px';
        this.m_objImage.img.style.top = Component.getObjectPositionY(y, h) + 'px';
    }

    setHeight(height) {
        this.m_size.h = height;
        //let w = Component.getObjectWidth(width);
        let h = Component.getObjectHeight(height);
        //this.m_objImage.img.style.width = w + 'px';
        this.m_objImage.img.style.height = h + 'px';
    }
}
