import Component from "./Component.js";


/**
 * 'Quiz' class denotes quiz components that include questions, choices, etc.
 * A 'Quiz' object can have a parent object, which could be a 'Page' object.
 * A 'Quiz' object can have several quiz components as children.
 */
export default class Quiz extends Component {

    /**
     * A constructor.
     * @param {Object} parent
     */
    constructor() {
        super();
    }

    /**
     * A reset function.
     */
    reset() {
        super.reset();
    }

    setParent(parent, parent_dom) {
        super.setParent(parent, parent_dom);
        super.attachAllChildren();
    }

    appendChild(key, child) {
        child.setParent(this, this.m_objParentDOM);
        super.appendChild(key, child);
    }
}