/**
 * 'Root' class denotes a document object of a file that includes several pages.
 * A 'Root' object has no object as a parent.
 * A 'Root' object can have several pages as children.
 */
class Root extends Component {

    /**
     * A constructor.
    */
    constructor(parent_dom) {
        super();
        super.setParent(null, parent_dom);
    }

    /**
     * A reset function.
    */
    reset() {
        super.reset();
    }

    appendChild(key, child) {
        // 'Root' object doesn't have any DOM object so 'this.dom_parent' should be passed as the second argument to it's child.
        child.setParent(this, this.m_objParentDOM);
        super.appendChild(key, child);
    }
}