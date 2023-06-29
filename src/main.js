import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import MainMenuView from './view/main-menu.js';
import ButtonNewView from './view/button-new.js';
import StatisticsView from './view/statistics.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import { generatePointData } from './mock/point-data-generator.js';
import { generateRandomOffers } from './mock/offer-data-generator';
import { remove, render } from './utils/render.js';
import { FilterType, FlagMode, MenuItem, UpdateType } from './const.js';


const POINT_COUNT = 20;

const siteBodyElement = document.querySelector('.page-body');
const headerElement = siteBodyElement.querySelector('.page-header__container');
const mainElement = siteBodyElement.querySelector('.page-main__container');
const menuElement = siteBodyElement.querySelector('.trip-controls__navigation');
const filterElement = siteBodyElement.querySelector('.trip-controls__filters');
const tripDetailsElement = siteBodyElement.querySelector('.trip-main');
const tripBoardElement = siteBodyElement.querySelector('.trip-events');

let statisticsComponent = null;

const offersModel = new OffersModel();
const randomOffersData = generateRandomOffers();
offersModel.setOffers(randomOffersData);
const allTypeOffers = offersModel.getOffers();

const randomPointsData = new Array(POINT_COUNT).fill(null).map(generatePointData);

const pointsModel = new PointsModel();
pointsModel.setPoints(randomPointsData);
const filterModel = new FilterModel();

const mainMenuComponent = new MainMenuView();
render(menuElement, mainMenuComponent);
const buttonNewComponent = new ButtonNewView();
render(tripDetailsElement, buttonNewComponent);

const tripPresenter = new TripPresenter(tripBoardElement, tripDetailsElement, pointsModel, filterModel, offersModel);
tripPresenter.init();
const filterPresenter = new FilterPresenter(filterElement, filterModel, pointsModel);
filterPresenter.init();


const onNewPointClose = () => {
    buttonNewComponent.toggleDisablesStatus();
};

const onMenuClick = (menuItem) => {
    switch (menuItem) {
        case MenuItem.NEW_EVENT:
            tripPresenter.destroy();
            filterModel.setActiveFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
            tripPresenter.init();
            tripPresenter.createPoint(onNewPointClose);
            buttonNewComponent.toggleDisablesStatus();
            break;
        case MenuItem.TABLE:
            remove(statisticsComponent);
            filterModel.setActiveFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
            tripPresenter.init();
            filterPresenter.init();
            buttonNewComponent.toggleDisablesStatus();
            headerElement.classList.toggle('page-header__container--statistics');
            mainElement.classList.toggle('page-main__container--statistics');
            break;
        case MenuItem.STATS:
            filterPresenter.init(FlagMode.TRUE);
            tripPresenter.destroy();
            buttonNewComponent.toggleDisablesStatus();
            headerElement.classList.toggle('page-header__container--statistics');
            mainElement.classList.toggle('page-main__container--statistics');
            statisticsComponent = new StatisticsView(pointsModel.getPoints());
            render(mainElement, statisticsComponent);
            break;
        default:
            throw new Error('Unknown menu-item. Check MenuItem value');
    }
};

mainMenuComponent.setMenuListener(onMenuClick);
buttonNewComponent.setButtonNewListener(onMenuClick);

export { allTypeOffers };
