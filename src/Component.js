/**
 * This class should be split as 'Component' and 'ComponentManager' in order to keep the Single Responsibility Principle.
 */
const FONT_STEP_SIZE = 0.1;

export default class Component {
    /**
     * The parent object of the current object.
     * @type {Object}
     */
    m_objParent = null;

    /**
     * A dictionary of children objects.
     */
    m_arrChildren = {};

    /**
     * The parent DOM object of the current object. The current object will be attached to this DOM object.
     * @type {Object}
     */
    m_objParentDOM = null;

    /**
     * The current DOM object.
     * @type {Object}
     */
    m_objCurrentDOM = null;

    /**
     * The flag indicates whether the current object is appended to its parent or not.
     * @type {Boolean}
     */
    m_bAppended = false;

    /**
     * A bunch of elements that should be attached to the parent DOM object.
     */
    // m_arrDomElements = [];

    /**
     * A flag indicates whether the animation was invoked is completed or not.
     * @type {Boolean}
     */
    m_bAnimationCompleted = true;

    constructor() { }

    #appendOnce() {
        if (this.m_objCurrentDOM && this.m_objParentDOM && !this.m_bAppended) {
            this.m_objParentDOM.appendChild(this.m_objCurrentDOM);
            this.m_bAppended = true;
        }
    }

    setParent(parent, parent_dom) {
        this.m_objParent = parent;
        this.m_objParentDOM = parent_dom;
        this.#appendOnce();
    }

    appendChild(key, child) {
        this.m_arrChildren[key] = child;
        this.#appendOnce();
    }

    deleteChild(key, child) {
        this.m_arrChildren[key].reset();
        delete this.m_arrChildren[key];
    }

    /**
     * Attach all children to the parent DOM object.
     * @type {Node}
     */
    attachAllChildren() {
        if (this.m_objParentDOM) {
            Object.entries(this.m_arrChildren).forEach(([key, child]) => {
                child.setParent(this, this.m_objParentDOM);
            });
        }
    }

    /**
     * A reset function.
    */
    reset() {
        Object.entries(this.m_arrChildren).forEach(([key, child]) => {
            child.reset();
        });
        this.m_arrChildren = {};
        if (this.m_objCurrentDOM) {
            this.m_objCurrentDOM.innerHTML = '';
            this.m_objCurrentDOM.parentNode.removeChild(this.m_objCurrentDOM);
        }
        this.m_objParentDOM = null;
        this.m_objCurrentDOM = null;
        this.m_objParent = null;
        this.m_bAppended = false;
        this.m_bAnimationCompleted = true;
    }


    // Utils

    static getObjectWidth(percent) {
        let client_width = document.documentElement.clientWidth;
        return percent / 100 * client_width;
    }

    static getObjectHeight(percent) {
        let client_height = document.documentElement.clientHeight;
        return percent / 100 * client_height;
    }

    static getObjectPositionX(percent, obj_size) {
        let client_width = document.documentElement.clientWidth;
        return (50 + percent) * client_width / 100 - (obj_size / 2);
    }

    static getObjectPositionY(percent, obj_size) {
        let client_height = document.documentElement.clientHeight;
        return (50 + percent) * client_height / 100 - (obj_size / 2);
    }

    static createLayer() {
        let w = Component.getObjectWidth(100);
        let h = Component.getObjectHeight(100);

        let objTd = document.createElement('td');
        objTd.style.textAlign = 'center';
        objTd.style.verticalAlign = 'middle';

        let objTr = document.createElement('tr');
        objTr.append(objTd);

        let objTable = document.createElement('table');
        objTable.style.position = 'absolute';
        //objTable.style.visibility = 'hidden';
        objTable.style.zIndex = String(Number.MAX_SAFE_INTEGER);
        objTable.style.width = w + 'px';
        objTable.style.height = h + 'px';
        objTable.style.left = Component.getObjectPositionX(0, w) + 'px';
        objTable.style.top = Component.getObjectPositionY(0, h) + 'px';
        objTable.append(objTr);

        window.addEventListener('resize', function(event) {
            let w = Component.getObjectWidth(100);
            let h = Component.getObjectHeight(100);
            objTable.style.width = w + 'px';
            objTable.style.height = h + 'px';
        }, true);

        return {
            table: objTable,
            tr: objTr,
            td: objTd
        };
    }

    static adjustFontSize(objTable, objTd, table_height) {
        let h = Component.getObjectHeight(table_height);
        let real_h = objTable.getBoundingClientRect().height;
        let font_size = parseFloat(objTd.style.fontSize);
        if (real_h > h) {
            while (real_h > h && font_size > 0) {
                objTd.style.fontSize = String(font_size - FONT_STEP_SIZE) + 'pt';
                real_h = objTable.getBoundingClientRect().height;
                font_size = parseFloat(objTd.style.fontSize);
            }
        } else {
            while (Math.abs(real_h - h) < 0.5) {
                objTd.style.fontSize = String(font_size + FONT_STEP_SIZE) + 'pt';
                real_h = objTable.getBoundingClientRect().height;
                if (real_h - h > 0.5) {
                    objTd.style.fontSize = String(font_size - FONT_STEP_SIZE) + 'pt';
                    break;
                }
                font_size = parseFloat(objTd.style.fontSize);
            }
        }
    }

    static createImage(width, height, position_x, position_y) {
        let w = Component.getObjectWidth(width);
        let h = Component.getObjectHeight(height);

        let objImg = document.createElement('img');
        objImg.style.position = 'absolute';
        objImg.style.zIndex = String(Number.MAX_SAFE_INTEGER);
        //objImg.style.width = w + 'px';
        objImg.style.height = h + 'px';
        objImg.style.left = Component.getObjectPositionX(position_x, h) + 'px';
        objImg.style.top = Component.getObjectPositionY(position_y, h) + 'px';

        window.addEventListener('resize', function(event) {
            let w = Component.getObjectWidth(width);
            let h = Component.getObjectHeight(height);
            //objImg.style.width = w + 'px';
            objImg.style.height = h + 'px';
            objImg.style.left = Component.getObjectPositionX(position_x, h) + 'px';
            objImg.style.top = Component.getObjectPositionY(position_y, h) + 'px';
        }, true);

        return {
            img: objImg
        };

    }

    static createButton(width, height, position_x, position_y, auto_font_size=false) {
        let w = Component.getObjectWidth(width);
        let h = Component.getObjectHeight(height);

        let objButton = document.createElement('Button');
        objButton.innerText = "Button";
        objButton.textAlign = 'center';
        objButton.verticalAlign = 'middle';
        objButton.style.position = 'absolute';
        objButton.style.zIndex = String(Number.MAX_SAFE_INTEGER);
        objButton.style.width = w + 'px';
        objButton.style.height = h + 'px';
        objButton.style.left = Component.getObjectPositionX(position_x, w) + 'px';
        objButton.style.top = Component.getObjectPositionY(position_y, h) + 'px';

        let resizeId = null;

        window.addEventListener('resize', function(event) {
            let w = Component.getObjectWidth(width);
            let h = Component.getObjectHeight(height);
            objButton.style.width = w + 'px';
            objButton.style.height = h + 'px';
            objButton.style.left = Component.getObjectPositionX(position_x, w) + 'px';
            objButton.style.top = Component.getObjectPositionY(position_y, h) + 'px';

//            if (auto_font_size) {
//                if (resizeId)
//                    clearTimeout(resizeId);
//
//                resizeId = setTimeout(() => {
//                    Component.adjustFontSize(objButton, objButton, height);
//                }, 300);
//            }
        }, true);

        return {
            button: objButton
        };
    }

    static createWideBox(height, position_y, auto_font_size=false) {
        let w = Component.getObjectWidth(100);
        let h = Component.getObjectHeight(height);

        let objTd = document.createElement('td');
        objTd.style.textAlign = 'center';
        objTd.style.verticalAlign = 'middle';

        let objTr = document.createElement('tr');
        objTr.append(objTd);

        let objTable = document.createElement('table');
        objTable.style.position = 'absolute';
        //objTable.style.visibility = 'hidden';
        objTable.style.zIndex = String(Number.MAX_SAFE_INTEGER);
        objTable.style.width = w + 'px';
        objTable.style.height = h + 'px';
        objTable.style.left = Component.getObjectPositionX(0, w) + 'px';
        objTable.style.top = Component.getObjectPositionY(position_y, h) + 'px';
        objTable.append(objTr);

        let resizeId = null;

        window.addEventListener('resize', function(event) {
            let w = Component.getObjectWidth(100);
            let h = Component.getObjectHeight(height);
            objTable.style.width = w + 'px';
            objTable.style.height = h + 'px';
            objTable.style.left = Component.getObjectPositionX(0, w) + 'px';
            objTable.style.top = Component.getObjectPositionY(position_y, h) + 'px';

            if (auto_font_size) {
                if (resizeId)
                    clearTimeout(resizeId);

                resizeId = setTimeout(() => {
                    Component.adjustFontSize(objTable, objTd, height);
                }, 300);
            }
        }, true);

        return {
            table: objTable,
            tr: objTr,
            td: objTd
        };
    }

    static createInsideWideBox(height, auto_font_size=false) {
        let h = Component.getObjectHeight(height);

        let objTd = document.createElement('td');
        objTd.style.textAlign = 'center';
        objTd.style.verticalAlign = 'middle';
        objTd.style.padding = '0px';

        let objTr = document.createElement('tr');
        objTr.append(objTd);

        let objTable = document.createElement('table');
        objTable.style.position = 'relative';
        objTable.style.width = '100%';
        objTable.style.height = h + 'px';
        objTable.style.border = '0px solid #444444';
        objTable.style.borderSpacing = '0px';
        objTable.append(objTr);

        let resizeId2 = null;

        window.addEventListener('resize', function(event) {
            let h = Component.getObjectHeight(height);
            objTable.style.height = h + 'px';

            if (auto_font_size) {
                if (resizeId2) {
                    clearTimeout(resizeId2);
                }

                resizeId2 = setTimeout(() => {
                    Component.adjustFontSize(objTable, objTd, height);
                }, 300);
            }
        }, true);

        return {
            table: objTable,
            tr: objTr,
            td: objTd
        };
    }
};

