/**
 * 'Page' class denotes a layer object representing one of the several pages in a root document.
 * (Note that the 'Page' does not mean an HTML page or a website file.)
 * A 'Pages' object can have a 'Root' object as a parent.
 * A 'Pages' object can have several sections or components as children.
 */
class Page extends Component {

    m_objLayer = null;

    /**
     * A constructor.
     * @param {Object} parent
     */
    constructor() {
        super();
        this.m_objLayer = Component.createLayer();
        this.m_objCurrentDOM = this.m_objLayer.table;
    }

    /**
     * A reset function.
     */
    reset() {
        super.reset();
    }

    setParent(parent, parent_dom) {
        super.setParent(parent, parent_dom);
    }

    appendChild(key, child) {
        child.setParent(this, this.m_objLayer.td);
        super.appendChild(key, child);
    }
}