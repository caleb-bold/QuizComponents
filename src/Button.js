import Component from "./Component.js";


/**
 * 'Question' class denotes a set of objects that constructs a question, including a Q icon, question text, etc.
 * A 'Question' object can have a parent object that could be a 'Quiz' object.
 * A 'Question' object can have several components like icons, boxes, or text.
 */
export default class Button extends Component {

    m_objButton = null;

    /**
     * A constructor.
     */
    constructor() {
        super();
        this.m_objButton = Component.createButton(80, 20, 0, 0, true);
        this.m_objCurrentDOM = this.m_objButton.button;
    }

    /**
     * A reset function.
     */
    reset() {
        this.m_objButton.button.innerText = '';
        super.reset();
    }

    /**
     * Set text of the question
     * @param {String} text
     */
    setText(text) {
        this.m_objButton.button.style.fontSize = Component.getObjectHeight(10) + 'px';
        this.m_objButton.button.style.fontWeight = '500';
        this.m_objButton.button.innerText = text;

//        setTimeout(() => {
//            Component.adjustFontSize(this.m_objButton.button, this.m_objButton.button, 10);
//        }, 100);
    }

    setAction(key, func) {
        this.m_objButton.button.addEventListener("click", func);
    }
}
