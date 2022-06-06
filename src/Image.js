import Component from "./Component.js";


/**
 * 'Question' class denotes a set of objects that constructs a question, including a Q icon, question text, etc.
 * A 'Question' object can have a parent object that could be a 'Quiz' object.
 * A 'Question' object can have several components like icons, boxes, or text.
 */
export default class Image extends Component {

    m_objImage = null;

    /**
     * A constructor.
     */
    constructor() {
        super();
        this.m_objImage = Component.createImage(40, 40, 0, 0, true);
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
    setSrc(img_url) {
        this.m_objImage.img.src = img_url;
    }

    setAction(key, func) {
        this.m_objImage.img.addEventListener("click", func);
    }
}
