import Component from "./Component.js";


export default class Progress extends Component {

    m_objBox = null;
    m_nCurrent = 0;
    m_nTotal = 0;

    /**
     * A constructor.
     */
    constructor() {
        super();
        this.m_objBox = Component.createBox(40, 10, 0, -30, true);
        this.m_objBox.table.style.backgroundColor = '#777777';
        this.m_objCurrentDOM = this.m_objBox.table;
    }

    /**
     * A reset function.
     */
     reset() {
        this.m_objBox.td.innerHTML = '';
        super.reset();
    }

    setZero() {
        this.m_nCurrent = 0;
        this.m_nTotal = 0;

        this.m_objBox.td.style.fontSize = Component.getObjectHeight(0) + 'px';
        this.m_objBox.td.style.fontWeight = '500';
        this.m_objBox.td.innerHTML = this.m_nCurrent + "/" + this.m_nTotal;

        setTimeout(() => {
            Component.adjustFontSize(this.m_objBox.table, this.m_objBox.td, 10);
        }, 100);
    }

    adjustFontSize() {
        setTimeout(() => {
            Component.adjustFontSize(this.m_objBox.table, this.m_objBox.td, 10);
        }, 100);
    }

    setProgress(current, total) {
        this.m_objBox.td.innerHTML = current + "/" + total;
    }
}
