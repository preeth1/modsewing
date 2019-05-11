import { convertMeasurements,
				 createFrontBack,
				 isPositiveValidNumber
				} from 'measurementHelpers'

import { get_measurements } from 'constants.js'

it('creates front and back measurements- the values should change from initial', () => {
	const measurement = 10;
	const divideBy= 2;
	const frontChange= 3;
	const backChange= -4;
	const frontBackMeasurements = createFrontBack(measurement, divideBy, frontChange, backChange);
	expect(frontBackMeasurements).toEqual({front: 8, back: 1});
});


it('creates front and back measurements- the values should not change from initial', () => {
	const measurement = 10;
	const frontBackMeasurements = createFrontBack(measurement);
	expect(frontBackMeasurements).toEqual({front: 10, back: 10});
});

it('converts measurements', () => {
	const convertedMeasurements = convertMeasurements(get_measurements({}));
	expect(convertedMeasurements).toEqual(
		{"armhole": {"back": 8.625, "front": 8.125}, "bust": {"back": 8.75, "front": 9.25}, "cross": {"back": 6.625, "front": 6.25}, "cup": 7, "figureBreadth": 4, "figureLength": 8.5, "hip": {"high": {"back": 8.25, "depth": 4.5, "front": 8.75}, "low": {"back": 9, "depth": 8.5, "front": 9.5}}, "length": {"back": 17, "front": 15.5}, "neck": {"back": 2.75, "front": 2.625}, "shoulder": 4.75, "side": 9, "waist": {"back": 6.25, "front": 6.75}}
		);
});

it('Validates inputted measurement', () => {
	expect(isPositiveValidNumber('10')).toEqual(true);
	expect(isPositiveValidNumber('10.10')).toEqual(true);
	expect(isPositiveValidNumber('-10')).toEqual(false);
	expect(isPositiveValidNumber('a10')).toEqual(false);
	expect(isPositiveValidNumber('10a')).toEqual(false);
	expect(isPositiveValidNumber('1a0')).toEqual(false);
	expect(isPositiveValidNumber('0')).toEqual(false);
	expect(isPositiveValidNumber('')).toEqual(false);
});

