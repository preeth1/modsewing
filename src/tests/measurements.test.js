import { convertMeasurements,
				 createFrontBack,
				} from 'measurements'

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
	const measurements = {
    neck: 14.25,
    shoulder: 10,
    frontLength: 10,
    backLength: 10,
    figureLength: 10,
    figureBreadth: 10,
    crossFront:10,
    crossBack: 10,
    bust: 10,
    underBust: 10,
    waist: 10,
    highHip: 10,
    highHipDepth: 10,
    lowHip: 10,
    lowHipDepth: 10,
    side: 10,
    armhole: 10
	};
	const convertedMeasurements = convertMeasurements(measurements);
	expect(convertedMeasurements).toEqual(
		{
			armhole: {back: 5.25, front: 4.75},
			bust: {back: 2.25, front: 2.75},
			cross: {back: 5, front: 5},
			figureBreadth: 5, figureLength: 10,
			hip: {
				high: {back: 2.25, depth: 10, front: 2.75},
				low: {back: 2.25, depth: 10, front: 2.75}},
			length: {back: 10, front: 10},
			neck: {back: 2.75, front: 2.625},
			shoulder: 10, side: 10,
			cup: 0,
			waist: {back: 2.25, front: 2.75}}
		);
});


