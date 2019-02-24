export const calculateArmholeShoulderCenterFrontDart = (cup) => {
	const dartWidth = Math.min(.125 * cup + .25, .75);
	return dartWidth;
}

export const calculateSideDart = (cup) => {
	const dartWidth = Math.min(.25 * cup + .5, 1.5);
	return dartWidth;
}

export const calculateWaistDart = (waistMeasurement, lowHipMeasurement) => {
	const waitLowHipDiff = lowHipMeasurement - waistMeasurement;
	const dartWidth = Math.max(.085 * waitLowHipDiff + .1, 3/8);
	return dartWidth;
}
