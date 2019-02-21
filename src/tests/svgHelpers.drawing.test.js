import { absMovePen,
		 relMovePen,
		 drawAbsLine,
		 drawRelLine,
		 drawAbsBez,
		 drawAbsBezRelPoint,
		 closePath } from './../svgHelpers/drawing'

it('moves pen (absolute)', () => {
	const pathString = '';
	const endPoint = {x: 10, y: 10};
	const newPathString = absMovePen(pathString, endPoint);
	expect(newPathString).toBe(' M 10 10');
});

it('moves pen (relative)', () => {
	const pathString = '';
	const endPoint = {x: 10, y: 10};
	const newPathString = relMovePen(pathString, endPoint);
	expect(newPathString).toBe(' m 10 10');
});

it('draws line (absolute)', () => {
	const pathString = '';
	const endPoint = {x: 10, y: 10};
	const newPathString = drawAbsLine(pathString, endPoint);
	expect(newPathString).toBe(' L 10 10');
});

it('draws line (relative)', () => {
	const pathString = '';
	const endPoint = {x: 10, y: 10};
	const newPathString = drawRelLine(pathString, endPoint);
	expect(newPathString).toBe(' l 10 10');
});

it('draws bezier with absolute control point (absolute bezier)', () => {
	const pathString = '';
	const endPoint = {x: 10, y: 10};
	const controlPoint = {x: 3, y: 3};
	const newPathString = drawAbsBez(pathString, endPoint, controlPoint);
	expect(newPathString).toBe(' Q 3 3 10 10');
});

it('closes path', () => {
	const pathString = 'L 0 0 L 10 10 L 0 10';
	const endPoint = {x: 10, y: 10};
	const newPathString = closePath(pathString, endPoint);
	expect(newPathString).toBe('L 0 0 L 10 10 L 0 10 Z');
});

it('creates svg with all drawing functions', () => {
	let pathString = '';
	const endPoint = {x: 10, y: 10};
	pathString = absMovePen(pathString, endPoint);
	pathString = relMovePen(pathString, endPoint);
	pathString = drawAbsLine(pathString, endPoint);
	pathString = drawRelLine(pathString, endPoint);

	const controlPoint = {x: 3, y: 3};
	pathString = drawAbsBez(pathString, endPoint, controlPoint);

	pathString = closePath(pathString, endPoint);
	expect(pathString).toBe(' M 10 10 m 10 10 L 10 10 l 10 10 Q 3 3 10 10 Z');
});











