import Component from "./Component.js";


export default class RealtimeScore extends Component {

    m_objBox = null;
    m_nScore = 0;

    /**
     * A constructor.
     */
    constructor() {
        super();
        this.m_objBox = Component.createBox(20, 10, 30, -30, true);
        this.m_objBox.table.style.backgroundColor = '#777777';
        this.m_objCurrentDOM = this.m_objBox.table;
        this.m_objBox.td.innerHTML = '-';
    }

    /**
     * A reset function.
     */
    reset() {
        this.m_objBox.td.innerHTML = '';
        super.reset();
    }

    setZero() {
        this.m_nScore = 0;

        this.m_objBox.td.style.fontSize = Component.getObjectHeight(0) + 'px';
        this.m_objBox.td.style.fontWeight = '500';
        this.m_objBox.td.innerHTML = this.m_nScore;
        console.log(this.m_objBox.td.innerHTML);
        
        setTimeout(() => {
            Component.adjustFontSize(this.m_objBox.table, this.m_objBox.td, 10);
        }, 100);
    }

    adjustFontSize() {
        setTimeout(() => {
            Component.adjustFontSize(this.m_objBox.table, this.m_objBox.td, 10);
        }, 100);
    }
    
    setScore(score) {
        this.m_nScore = score;
        this.m_objBox.td.innerHTML = this.m_nScore;
    }

    addScore(score) {
        this.m_nScore += score;
        this.m_objBox.td.innerHTML = this.m_nScore;
    }
}
