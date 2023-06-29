import PointPresenter from './point.js';
import PointNewPresenter from './point-new.js';
import TripInfoView from './../view/trip-info.js';
import TripCostView from './../view/trip-cost.js';
import PointListView from './../view/point-list.js';
import TripSortView from './../view/trip-sort.js';
import ListEmptyView from './../view/list-empty.js';
import { remove, render, RenderPosition } from './../utils/render.js';
import { FlagMode, SortType, UpdateType, UserAction } from './../const.js';
import { sortByDate, sortByPrice, sortByTime } from './../utils/point.js';
import { filter } from './../utils/filter.js';


export default class Trip {
    constructor(tripContainer, tripDetailsContainer, pointsModel, filterModel, offersModel) {
        this._tripContainer = tripContainer;
        this._tripDetailsContainer = tripDetailsContainer;

        this._tripSortComponent = null;
        this._tripInfoComponent = null;
        this._tripCostComponent = null;
        this._pointListComponent = new PointListView();
        this._listEmptyComponent = new ListEmptyView();
        this._pointsModel = pointsModel;
        this._filterModel = filterModel;
        this._offersModel = offersModel;

        this._pointPresenter = {};
        this._offers = this._offersModel.getOffers();

        this._currentSortType = SortType.DATE;

        this._onViewAction = this._onViewAction.bind(this);
        this._onModelEvent = this._onModelEvent.bind(this);
        this._onPointModeChange = this._onPointModeChange.bind(this);
        this._onChangeSort = this._onChangeSort.bind(this);

        this._pointNewPresenter = new PointNewPresenter(this._pointListComponent, this._onViewAction, this._offers);
    }


    init() {
        render(this._tripContainer, this._pointListComponent);
        this._pointsModel.addObserver(this._onModelEvent);
        this._filterModel.addObserver(this._onModelEvent);
        this._renderBoard();
    }


    destroy() {
        this._clearBoard({ resetSorting: FlagMode.TRUE, withoutTripInfo: FlagMode.TRUE });
        remove(this._pointListComponent);
        this._pointsModel.removeObserver(this._onModelEvent);
        this._filterModel.removeObserver(this._onModelEvent);
    }


    createPoint(callback) {
        this._pointNewPresenter.init(callback);
    }


    _getOffers() {
        this._offers = this._offersModel.getOffers();
    }


    _getPoints() {
        const activeFilter = this._filterModel.getActiveFilter();
        const points = this._pointsModel.getPoints();
        const filteredPoints = filter[activeFilter](points);

        switch (this._currentSortType) {
            case SortType.DATE:
                return filteredPoints.sort(sortByDate);
            case SortType.TIME:
                return filteredPoints.sort(sortByTime);
            case SortType.PRICE:
                return filteredPoints.sort(sortByPrice);
            default:
                throw new Error('Unknown sort-type. Check SortType value');
        }
    }


    _onViewAction(actionType, updateType, updatedPoint) {
        switch (actionType) {
            case UserAction.UPDATE_POINT:
                this._pointsModel.updatePoint(updateType, updatedPoint);
                break;
            case UserAction.ADD_POINT:
                this._pointsModel.addPoint(updateType, updatedPoint);
                break;
            case UserAction.DELETE_POINT:
                this._pointsModel.deletePoint(updateType, updatedPoint);
                break;
            default:
                throw new Error('Unknown action-type. Check UserAction value');
        }
    }


    _onModelEvent(updateType, data) {
        switch (updateType) {
            case UpdateType.PATCH:
                this._pointPresenter[data.id].init(data);
                break;
            case UpdateType.MINOR:
                this._clearBoard();
                this._renderBoard();
                break;
            case UpdateType.MAJOR:
                this._clearBoard({ resetSorting: FlagMode.TRUE });
                this._renderBoard();
                break;
            default:
                throw new Error('Unknown update-type. Check UpdateType value');
        }
    }


    _onChangeSort(sortType) {
        if (this._currentSortType === sortType) {
            return;
        }
        this._currentSortType = sortType;
        this._clearBoard();
        this._renderBoard();
    }


    _renderTripSort() {
        if (this._tripSortComponent !== null) {
            this._tripSortComponent = null;
        }
        this._tripSortComponent = new TripSortView(this._currentSortType);
        render(this._tripContainer, this._tripSortComponent, RenderPosition.AFTERBEGIN);
        this._tripSortComponent.setSortTypeChangeListener(this._onChangeSort);
    }


    _renderPoint(point) {
        const pointPresenter = new PointPresenter(this._pointListComponent, this._onViewAction, this._onPointModeChange, this._offers);
        pointPresenter.init(point);
        this._pointPresenter[point.id] = pointPresenter;
    }


    _renderPoints(points) {
        points.forEach((point) => this._renderPoint(point));
    }


    _renderListEmpty() {
        render(this._tripContainer, this._listEmptyComponent);
    }


    _clearBoard({ resetSorting = FlagMode.FALSE, withoutTripInfo = FlagMode.FALSE } = {}) {
        this._pointNewPresenter.destroy();
        Object.values(this._pointPresenter).forEach((pointPresenter) => pointPresenter.destroy());
        this._pointPresenter = {};
        remove(this._tripSortComponent);
        remove(this._listEmptyComponent);


        if (resetSorting) {
            this._currentSortType = SortType.DATE;
        }

        if (withoutTripInfo) {
            return;
        }
        remove(this._tripInfoComponent);
        remove(this._tripCostComponent);
        this._tripInfoComponent = null;
    }


    _onPointModeChange() {
        this._pointNewPresenter.destroy();
        Object.values(this._pointPresenter).forEach((pointPresenter) => pointPresenter.resetView());
    }


    _renderTripInfo(points) {
        this._tripInfoComponent = new TripInfoView(points);
        render(this._tripDetailsContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
        this._tripCostComponent = new TripCostView(points);
        render(this._tripInfoComponent, this._tripCostComponent);
    }


    _renderBoard() {
        const points = this._getPoints();
        if (points.length === 0) {
            this._renderListEmpty();
            return;
        }
        this._renderTripSort();
        this._renderPoints(points);
        if (this._tripInfoComponent === null) {
            this._renderTripInfo(points);
        }
    }
}
