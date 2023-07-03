import PointEditorView from './../view/point-editor.js';
import { remove, render, RenderPosition } from './../utils/render.js';
import { isEscEvent } from './../utils/common.js';
import { FlagMode, UpdateType, UserAction } from './../const.js';


export default class PointNew {
    constructor(pointListContainer, changeData) {
        this._pointListContainer = pointListContainer;
        this._changeData = changeData;
        this._offers = null;
        this._destinations = null;

        this._pointEditorComponent = null;
        this._resumeNewButton = null;

        this._onEditorPointEscKeydown = this._onEditorPointEscKeydown.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
        this._onFormDelete = this._onFormDelete.bind(this);
    }


    init(resumeNewButton, offers, destinations) {
        this._resumeNewButton = resumeNewButton;
        this._offers = offers;
        this._destinations = destinations;

        if (this._pointEditorComponent !== null) {
            return;
        }
        this._pointEditorComponent = new PointEditorView(this._offers, this._destinations);

        this._pointEditorComponent.setSubmitListener(this._onFormSubmit);
        this._pointEditorComponent.setDeleteListener(this._onFormDelete);

        render(this._pointListContainer, this._pointEditorComponent, RenderPosition.AFTERBEGIN);
        document.addEventListener('keydown', this._onEditorPointEscKeydown);
    }


    destroy() {
        if (this._pointEditorComponent === null) {
            return;
        }
        if (this._resumeNewButton !== null) {
            this._resumeNewButton();
        }
        remove(this._pointEditorComponent);
        this._pointEditorComponent = null;
        document.removeEventListener('keydown', this._onEditorPointEscKeydown);
    }


    _onEditorPointEscKeydown(evt) {
        if (isEscEvent(evt)) {
            evt.preventDefault();
            this.destroy();
        }
    }


    setSavingStatus() {
        this._pointEditorComponent.updateData(
            {
                isSaving: FlagMode.TRUE,
                isDisabled: FlagMode.TRUE,
            },
        );
    }


    setAbortingStatus() {
        const resetState = () => {
            this._pointEditorComponent.updateData({
                isSaving: FlagMode.FALSE,
                isDeleting: FlagMode.FALSE,
                isDisabled: FlagMode.FALSE,
            });
        };
        this._pointEditorComponent.shake(resetState);
    }


    _onFormSubmit(point) {
        this._changeData(
            UserAction.ADD_POINT,
            UpdateType.MINOR,
            point,
        );
    }


    _onFormDelete() {
        this.destroy();
    }
}
