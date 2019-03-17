import { MEASUREMENTS } from 'constants.js';
import _ from 'lodash';

export const convertMeasurements = (measurements) => {
  const convertedMeasurements = {
	  neck: createFrontBack(get("neck").measurement, 6, 1/4, 3/8),	
	  shoulder: get("shoulder").measurement,
	  length: {front: get("frontLength").measurement,
	  	back: get("backLength").measurement},
	  figureLength: get("figureLength").measurement,
	  figureBreadth: get("figureBreadth").measurement / 2,
	  cross: {
	  	front: get("crossFront").measurement / 2,
	  	back: get("crossBack").measurement / 2,
	  },
	  bust: createFrontBack(get("bust").measurement, 4, 1/4, -1/4),
	  cup: get("bust").measurement - get("underBust").measurement,
	  waist: createFrontBack(get("waist").measurement, 4, 1/4, -1/4),
	  hip: {
	  	high: createFrontBack(get("highHip").measurement, 4, 1/4, -1/4),
	  	low: createFrontBack(get("lowHip").measurement, 4, 1/4, -1/4),
	  },
	  side: get("side").measurement,
	  armhole: createFrontBack(get("armhole").measurement, 2, -1/4, 1/4),
  };
  
  convertedMeasurements.hip.high.depth = get("highHipDepth").measurement;
  convertedMeasurements.hip.low.depth = get("lowHipDepth").measurement;
  return convertedMeasurements;
};

export const createFrontBack = (measurement, divideBy=1, frontChange=0, backChange=0) => {
	const front = measurement / divideBy + frontChange;
	const back = measurement / divideBy + backChange;
	return {front: front, back: back};
};

export const get = (name) => {
  return _.find(MEASUREMENTS, (entry) => {
    return entry.name == name;
  })
}

export const isPositiveValidNumber = (input) => {
  const positiveValidNumber = RegExp('^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$')
  return positiveValidNumber.test(input) && input > 0
}