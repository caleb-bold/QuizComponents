import Component from "./Component.js";


/**
 * 'Choice' class denotes a set of objects that construct a choice, including number, icon, answer text, etc.
 * A 'Choice' object can have a parent object, which could be a 'Choices' object.
 * A 'Choice' object can have several components like a box, an icon, or a text.
 */
export default class Choice extends Component {

    m_objInsideWideBox = null;

    static get TableHeight() { return 4; }

    /**
     * A constructor.
     */
    constructor() {
        super();
        this.m_objInsideWideBox = Component.createInsideWideBox(Choice.TableHeight, true);
        this.m_objInsideWideBox.table.style.backgroundColor = '#777777';
        this.m_objCurrentDOM = this.m_objInsideWideBox.table;
    }

    /**
     * A reset function.
     */
    reset() {
        this.m_objInsideWideBox.td.innerHTML = '';
        super.reset();
    }

    /**
     * Set text of the question
     * @param {String} text
     */
    setText(text) {
        this.m_objInsideWideBox.td.style.fontSize = Component.getObjectHeight(0) + 'px';
        this.m_objInsideWideBox.td.style.fontWeight = '500';
        this.m_objInsideWideBox.td.innerText = text;

        setTimeout(() => {
            Component.adjustFontSize(this.m_objInsideWideBox.table, this.m_objInsideWideBox.td, Choice.TableHeight);
        }, 100);
    }
}
