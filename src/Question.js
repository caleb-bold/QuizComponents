import Component from "./Component.js";


/**
 * 'Question' class denotes a set of objects that constructs a question, including a Q icon, question text, etc.
 * A 'Question' object can have a parent object that could be a 'Quiz' object.
 * A 'Question' object can have several components like icons, boxes, or text.
 */
export default class Question extends Component {
    
    m_objWideBox = null;

    /**
     * A constructor.
     */
    constructor() {
        super();
        this.m_objWideBox = Component.createWideBox(10, -20, true);
        this.m_objWideBox.table.style.backgroundColor = '#777777';
        this.m_objCurrentDOM = this.m_objWideBox.table;
    }

    /**
     * A reset function.
     */
    reset() {
        this.m_objWideBox.td.innerHTML = '';
        super.reset();
    }

    /**
     * Set text of the question
     * @param {String} text
     */
    setText(text) {
        this.m_objWideBox.td.style.fontSize = Component.getObjectHeight(0) + 'px';
        this.m_objWideBox.td.style.fontWeight = '500';
        this.m_objWideBox.td.innerText = text;
        
        setTimeout(() => {
            Component.adjustFontSize(this.m_objWideBox.table, this.m_objWideBox.td, 10);
        }, 100);
    }
}
