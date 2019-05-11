import _ from 'lodash';
import { front,
        back } from 'slopers/bodice.js'

export const convertMeasurements = (measurements) => {
  const convertedMeasurements = {
	  neck: createFrontBack(get("neck", measurements).measurement, 6, 1/4, 3/8),
	  shoulder: get("shoulder", measurements).measurement,
	  length: {
	  	front: get("frontLength", measurements).measurement,
	  	back: get("backLength", measurements).measurement
	  },
	  figureLength: get("figureLength", measurements).measurement,
	  figureBreadth: get("figureBreadth", measurements).measurement / 2,
	  cross: {
	  	front: get("crossFront", measurements).measurement / 2,
	  	back: get("crossBack", measurements).measurement / 2,
	  },
	  bust: createFrontBack(get("bust", measurements).measurement, 4, 1/4, -1/4),
	  cup: get("bust", measurements).measurement - get("underBust", measurements).measurement,
	  waist: createFrontBack(get("waist", measurements).measurement, 4, 1/4, -1/4),
	  hip: {
	  	high: createFrontBack(get("highHip", measurements).measurement, 4, 1/4, -1/4),
	  	low: createFrontBack(get("lowHip", measurements).measurement, 4, 1/4, -1/4),
	  },
	  side: get("side", measurements).measurement,
	  armhole: createFrontBack(get("armhole", measurements).measurement, 2, -1/4, 1/4),
  };

  convertedMeasurements.hip.high.depth = get("highHipDepth", measurements).measurement;
  convertedMeasurements.hip.low.depth = get("lowHipDepth", measurements).measurement;
  return convertedMeasurements;
};

export const createFrontBack = (measurement, divideBy=1, frontChange=0, backChange=0) => {
	const front = measurement / divideBy + frontChange;
	const back = measurement / divideBy + backChange;
	return {front: front, back: back};
};

export const get = (name, measurements) => {
    return _.find(measurements, (entry) => {
    return entry.name === name;
  })
}

export const isPositiveValidNumber = (input) => {
    const positiveValidNumber = RegExp('^[+]?([0-9]+(?:[.][0-9]*)?|.[0-9]+)$')
    return positiveValidNumber.test(input) && input > 0
}

export const brokePattern = (measurements) => {
	let brokePattern = false;
	try {
          // Include these in the try block because they will generate an error if measurements didn't work
          front(measurements);
          back(measurements);
        }
        catch(error) {
          brokePattern = true;
        }

  return brokePattern
}