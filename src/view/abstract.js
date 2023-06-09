import { createElement } from '../utils/render.js';

const SHAKE_TIMEOUT = 600;
const DURATION_MULTIPLIER = 1000;

export default class Abstract {
    constructor() {
        if (new.target === Abstract) {
            throw new Error('Can\'t instantiate Abstract, only concrete one.');
        }
        this._element = null;
        this._callback = {};
    }

    getTemplate() {
        throw new Error('Abstract method not implemented: getTemplate');
    }

    getElement() {
        if (!this._element) {
            this._element = createElement(this.getTemplate());
        }
        return this._element;
    }

    removeElement() {
        this._element = null;
    }


    shake(callback) {
        this.getElement().style.animation = `
    shake ${SHAKE_TIMEOUT / DURATION_MULTIPLIER}s`;
        setTimeout(() => {
            this.getElement().style.animation = '';
            callback();
        }, SHAKE_TIMEOUT);
    }
}
