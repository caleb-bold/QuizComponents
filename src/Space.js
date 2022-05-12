/**
 * 'Space' class denotes a specific sized vertical space object that is the 'Inside' type of table object.
 * A 'Space' object can have a parent object that could be any 'Component' object.
 * A 'Space' object can not have any components as a child.
 */
class Space extends Component {

    m_objInsideWideBox = null;

    /**
     * A constructor.
     */
    constructor() {
        super();
        this.m_objInsideWideBox = Component.createInsideWideBox(0.1);
        //this.m_objInsideWideBox.table.style.backgroundColor = '#777777';
        this.m_objCurrentDOM = this.m_objInsideWideBox.table;
    }

    /**
     * A reset function.
     */
    reset() {
        this.m_objInsideWideBox.td.innerHTML = '';
        super.reset();
    }
}
