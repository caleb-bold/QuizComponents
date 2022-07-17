import Component from "./Component.js";
import Image from "./Image.js";
import Queue from "./Queue.js";


/**
 * 'Question' class denotes a set of objects that constructs a question, including a Q icon, question text, etc.
 * A 'Question' object can have a parent object that could be a 'Quiz' object.
 * A 'Question' object can have several components like icons, boxes, or text.
 */
export default class ImageLoader extends Component {

    m_imageQueue = new Queue();
    // queue.enqueue(1);
    // queue.dequeue(); // 1
    
}