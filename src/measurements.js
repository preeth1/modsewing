export const convertMeasurements = (measurements) => {
  const convertedMeasurements = {
	  neck: createFrontBack(measurements.neck.measurement, 6, 1/4, 3/8),	
	  shoulder: measurements.shoulder.measurement,
	  length: {front: measurements.frontLength.measurement,
	  	back: measurements.backLength.measurement},
	  figureLength: measurements.figureLength.measurement,
	  figureBreadth: measurements.figureBreadth.measurement / 2,
	  cross: {
	  	front: measurements.crossFront.measurement / 2,
	  	back: measurements.crossBack.measurement / 2,
	  },
	  bust: createFrontBack(measurements.bust.measurement, 4, 1/4, -1/4),
	  cup: measurements.bust.measurement - measurements.underBust.measurement,
	  waist: createFrontBack(measurements.waist.measurement, 4, 1/4, -1/4),
	  hip: {
	  	high: createFrontBack(measurements.highHip.measurement, 4, 1/4, -1/4),
	  	low: createFrontBack(measurements.lowHip.measurement, 4, 1/4, -1/4),
	  },
	  side: measurements.side.measurement,
	  armhole: createFrontBack(measurements.armhole.measurement, 2, -1/4, 1/4),
  };
  
  convertedMeasurements.hip.high.depth = measurements.highHipDepth.measurement;
  convertedMeasurements.hip.low.depth = measurements.lowHipDepth.measurement;
  return convertedMeasurements;
};

export const createFrontBack = (measurement, divideBy=1, frontChange=0, backChange=0) => {
	const front = measurement / divideBy + frontChange;
	const back = measurement / divideBy + backChange;
	return {front: front, back: back};
};