import Component from "./Component.js";
import Space from "./Space.js";


/**
 * 'Choices' class denotes a set of objects that includes a choice, including number, icon, answer text, etc.
 * A 'Choices' object can have a parent object, which could be a 'Quiz' object.
 * A 'Choices' object can have several 'Choice' components.
 */
export default class Choices extends Component {

    m_objWideBox = null;

    /**
     * A constructor.
     */
    constructor() {
        super();
        this.m_objWideBox = Component.createWideBox(20.6, 10, false);
        this.m_objWideBox.table.style.backgroundColor = '#cccccc';
        this.m_objCurrentDOM = this.m_objWideBox.table;
    }

    /**
     * A reset function.
     */
    reset() {
        this.m_objWideBox.td.innerHTML = '';
        super.reset();
    }

    appendChild(key, child) {
        if (Object.keys(this.m_arrChildren).length > 0) {
            let objSpace = new Space();
            objSpace.setParent(this, this.m_objWideBox.td);
            super.appendChild(key, objSpace);
        }
        child.setParent(this, this.m_objWideBox.td);
        super.appendChild(key, child);
    }
}
