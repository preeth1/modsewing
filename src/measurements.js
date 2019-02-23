export const convertMeasurements = (measurements) => {
	
	const createFrontBack = (measurement, divideBy=1, frontChange=0, backChange=0) => {
		const front = measurement / divideBy + frontChange;
		const back = measurement / divideBy + backChange;
		return {front: front, back: back};
	}

  const convertedMeasurements = {
	  neck: createFrontBack(measurements.neck, 6, 1/4, 3/8),	
	  shoulder: measurements.shoulder,
	  length: {front: measurements.frontLength,
	  	back: measurements.backLength},
	  figureLength: measurements.figureLength,
	  figureBreadth: measurements.figureBreadth / 2,
	  cross: {
	  	front: measurements.crossFront / 2,
	  	back: measurements.crossBack / 2,
	  },
	  bust: createFrontBack(measurements.bust, 4, 1/4, -1/4),
	  underbust: "Figure this out later",
	  waist: createFrontBack(measurements.waist, 4, 1/4, -1/4),
	  hip: {
	  	high: createFrontBack(measurements.highHip, 4, 1/4, -1/4),
	  	low: createFrontBack(measurements.lowHip, 4, 1/4, -1/4),
	  },
	  side: measurements.side,
	  armhole: createFrontBack(measurements.armhole, 2, -1/4, 1/4),
  };
  
  convertedMeasurements.hip.high.depth = measurements.highHipDepth;
  convertedMeasurements.hip.low.depth = measurements.lowHipDepth;
  debugger
  return convertedMeasurements;
}