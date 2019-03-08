import { _calculatePatternPageInitialValues,
        _calculateNewTopLeftCoordinates } from 'patternGenerators/printButtonHelpers'

it('creates canvas element', () => {
	const canvas = {width: 13, height: 31}
	const initialVals = _calculatePatternPageInitialValues(canvas);
	expect(initialVals.numberHeightPages).toEqual(3);
	expect(initialVals.numberWidthPages).toEqual(2);
	expect(initialVals.topLeftX).toEqual(2);
	expect(initialVals.topLeftY).toEqual(1);
});

it('creates canvas element', () => {
	const canvas = {width: 13, height: 31}
	const initialVals = _calculatePatternPageInitialValues(canvas);
	let heightPage = 0;
	let widthPage = 0;
	let topLeftCoordinates = _calculateNewTopLeftCoordinates(initialVals, heightPage, widthPage);
	expect(topLeftCoordinates.x).toEqual(2);
	expect(topLeftCoordinates.y).toEqual(1);

	heightPage = 0;
	widthPage = 1;
	topLeftCoordinates = _calculateNewTopLeftCoordinates(initialVals, heightPage, widthPage);
	expect(topLeftCoordinates.x).toEqual(2);
	expect(topLeftCoordinates.y).toEqual(-10);

	heightPage = 1;
	widthPage = 0;
	topLeftCoordinates = _calculateNewTopLeftCoordinates(initialVals, heightPage, widthPage);
	expect(topLeftCoordinates.x).toEqual(-6.5);
	expect(topLeftCoordinates.y).toEqual(1);

	heightPage = 1;
	widthPage = 1;
	topLeftCoordinates = _calculateNewTopLeftCoordinates(initialVals, heightPage, widthPage);
	expect(topLeftCoordinates.x).toEqual(-6.5);
	expect(topLeftCoordinates.y).toEqual(-10);
});
