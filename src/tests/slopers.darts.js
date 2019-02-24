import { calculateArmholeShoulderCenterFrontDart,
				 calculateSideDart,
				 calculateWaistDart } from 'slopers/darts'

it('calculateArmholeShoulderCenterFrontDart', () => {
	const cup = 1;
	const dartWidth = calculateArmholeShoulderCenterFrontDart(cup);
	expect(dartWidth).toEqual(3/8);

	const cup = 2;
	const dartWidth = calculateArmholeShoulderCenterFrontDart(cup);
	expect(dartWidth).toEqual(1/2);

	const cup = 3;
	const dartWidth = calculateArmholeShoulderCenterFrontDart(cup);
	expect(dartWidth).toEqual(5/8);

	const cup = 10;
	const dartWidth = calculateArmholeShoulderCenterFrontDart(cup);
	expect(dartWidth).toEqual(3/4);
});

it('calculateSideDart', () => {
	const cup = 1;
	const dartWidth = calculateSideDart(cup);
	expect(dartWidth).toEqual(3/4);

	const cup = 2;
	const dartWidth = calculateSideDart(cup);
	expect(dartWidth).toEqual(1);

	const cup = 3;
	const dartWidth = calculateSideDart(cup);
	expect(dartWidth).toEqual(1.25);

	const cup = 10;
	const dartWidth = calculateSideDart(cup);
	expect(dartWidth).toEqual(1.5);
});

it('calculateWaistDart', () => {
	const cup = 10;
	const dartWidth = xxxxxx(cup);
	expect(dartWidth).toEqual(xxxxxxx);
});









export const calculateArmholeDart = (cup) => {
	return genericDartFunction();
}

export const  = (cup) => {
	return genericDartFunction();
}

export const  = (cup) => {
	return genericDartFunction();
}

export const  = (cup) => {
	const dartWidth = Math.min(.125 * cup + .25, .75);
	return dartWidth;
}

export const  = (cup) => {
	const dartWidth = Math.min(.25 * cup + .5, 1.5);
	return dartWidth;
}

export const  = (waistMeasurement, lowHipMeasurement) => {
	const waitLowHipDiff = lowHipMeasurement - waistMeasurement;
	const dartWidth = Math.max(.085 * waitLowHipDiff + .1, 3/8);
	return dartWidth;
}
