import { calculateArmholeShoulderCenterFrontDart,
				 calculateSideDart,
				 calculateWaistDart } from 'slopers/darts'

it('calculateArmholeShoulderCenterFrontDart', () => {
	let cup = 1;
	let dartWidth = calculateArmholeShoulderCenterFrontDart(cup);
	expect(dartWidth).toEqual(3/8);

	cup = 2;
	dartWidth = calculateArmholeShoulderCenterFrontDart(cup);
	expect(dartWidth).toEqual(1/2);

	cup = 3;
	dartWidth = calculateArmholeShoulderCenterFrontDart(cup);
	expect(dartWidth).toEqual(5/8);

	cup = 10;
	dartWidth = calculateArmholeShoulderCenterFrontDart(cup);
	expect(dartWidth).toEqual(3/4);
});

it('calculateSideDart', () => {
	let cup = 1;
	let dartWidth = calculateSideDart(cup);
	expect(dartWidth).toEqual(3/4);

	cup = 2;
	dartWidth = calculateSideDart(cup);
	expect(dartWidth).toEqual(1);

	cup = 3;
	dartWidth = calculateSideDart(cup);
	expect(dartWidth).toEqual(1.25);

	cup = 10;
	dartWidth = calculateSideDart(cup);
	expect(dartWidth).toEqual(1.5);
});

it('calculateWaistDart', () => {
	let waistMeasurement = 5;
	let lowHipMeasurement = 10;
	let dartWidth = calculateWaistDart(waistMeasurement, lowHipMeasurement);
	expect(dartWidth).toEqual(0.525);

	waistMeasurement = 10;
	lowHipMeasurement = 12;
	dartWidth = calculateWaistDart(waistMeasurement, lowHipMeasurement);
	expect(dartWidth).toEqual(0.375);
});
