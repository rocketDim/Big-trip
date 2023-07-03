import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FlagMode } from './../const.js';

dayjs.extend(duration);

const DAYS_COUNT = 10;

const TimeFormat = {
    HOUR_PER_DAY: 1440,
    MINUTE_PER_HOUR: 60,
    MILLISECOND_PER_MINUTE: 60000,
};


export const pickElementDependOnValue = (value, elements, descriptionFlag) => {
    if (descriptionFlag) {
        return elements.find((element) => element.name === value);
    }
    return elements.find((element) => element.type === value).offers;
};


const dateConverter = {
    'D MMM': (date) => dayjs(date).format('D MMM'),
    'HH:mm': (date) => dayjs(date).format('HH:mm'),
    'YYYY-MM-DDTHH:mm': (date) => dayjs(date).format('YYYY-MM-DDTHH:mm'),
    'DD/MM/YY HH:mm': (date) => dayjs(date).format('DD/MM/YY HH:mm'),
};
export const humanizeDate = (date, format = 'HH:mm') => dateConverter[format](date);


export const compareTwoDates = (dateA, dateB) => {
    if (dateA === null || dateB === null) {
        return null;
    }
    return dayjs(dateA).diff(dateB);
};


export const humanizeDateDuration = (tripTime) => {
    const duration = dayjs.duration(tripTime).$d;

    const day = duration.days < DAYS_COUNT ? `0${duration.days}D` : `${duration.days}D`;
    const hour = duration.hours < DAYS_COUNT ? `0${duration.hours}H` : `${duration.hours}H`;
    const minute = duration.minutes < DAYS_COUNT ? `0${duration.minutes}M` : `${duration.minutes}M`;
    const total = (tripTime / TimeFormat.MILLISECOND_PER_MINUTE) > TimeFormat.HOUR_PER_DAY ? `${day} ${hour} ${minute}` : (tripTime / TimeFormat.MILLISECOND_PER_MINUTE) > TimeFormat.MINUTE_PER_HOUR ? `${hour} ${minute}` : minute;
    return total;
};


export const getTimeDuration = (initialDate, expirationDate) => {
    const difference = compareTwoDates(expirationDate, initialDate);
    return humanizeDateDuration(difference);
};


export const isDateExpired = (date) => dayjs().isAfter(date, 'm');
export const isDateInFuture = (date) => dayjs().isBefore(date, 'm');
export const isDateCurrent = (date) => dayjs().isSame(date, 'm');


export const isEventContinues = (dateFrom, dateTo) => {
    return isDateExpired(dateFrom) && isDateInFuture(dateTo);
};


const getSortWeightForEmptyValue = (valueA, valueB) => {
    if (valueA === null) {
        return 1;
    }

    if (valueB === null) {
        return -1;
    }

    if (valueA === null && valueB === null) {
        return 0;
    }

    return null;
};


export const sortByPrice = (pointA, pointB) => {
    const sortWeightForEmptyValue = getSortWeightForEmptyValue(pointA.basePrice, pointB.basePrice);

    if (sortWeightForEmptyValue !== null) {
        return sortWeightForEmptyValue;
    }

    return pointB.basePrice - pointA.basePrice;
};


export const sortByTime = (pointA, pointB) => {
    const durationPointA = compareTwoDates(pointA.dateTo, pointA.dateFrom);
    const durationPointB = compareTwoDates(pointB.dateTo, pointB.dateFrom);

    const sortWeightForEmptyValue = getSortWeightForEmptyValue(durationPointA, durationPointB);

    if (sortWeightForEmptyValue !== null) {
        return sortWeightForEmptyValue;
    }

    return durationPointB - durationPointA;
};


export const sortByDate = (pointA, pointB) => {
    const startDatePointA = pointA.dateFrom;
    const startDatePointB = pointB.dateFrom;

    const sortWeightForEmptyValue = getSortWeightForEmptyValue(startDatePointA, startDatePointB);

    if (sortWeightForEmptyValue !== null) {
        return sortWeightForEmptyValue;
    }

    return dayjs(startDatePointA).diff(startDatePointB);
};


export const isDateTheSame = (dateA, dateB) => {
    return (dateA === null && dateB === null) ? FlagMode.TRUE : dayjs(dateA).isSame(dateB, 'm');
};

export const isOffersTheSame = (previousPointState, currentPointState) => {
    if (currentPointState.offers.length === previousPointState.offers.length) {
        const totalOffers = Array.from(new Set([...previousPointState.offers, ...currentPointState.offers]));
        return totalOffers.length === previousPointState.offers.length;
    }
    return false;
};
