import { absMovePen,
		 relMovePen,
		 drawAbsLine,
		 drawRelLine,
		 drawAbsBez,
		 drawAbsBezRelPoint,
		 closePath } from './../svgHelpers/drawing'

it('moves pen (absolute)', () => {
	let pathString = '';
	let endPoint = {x: 10, y: 10};
	let newPathString = absMovePen(pathString, endPoint);
	expect(newPathString).toBe(' M 10 10');
});

it('moves pen (relative)', () => {
	let pathString = '';
	let endPoint = {x: 10, y: 10};
	let newPathString = relMovePen(pathString, endPoint);
	expect(newPathString).toBe(' m 10 10');
});

it('draws line (absolute)', () => {
	let pathString = '';
	let endPoint = {x: 10, y: 10};
	let newPathString = drawAbsLine(pathString, endPoint);
	expect(newPathString).toBe(' L 10 10');
});

it('draws line (relative)', () => {
	let pathString = '';
	let endPoint = {x: 10, y: 10};
	let newPathString = drawRelLine(pathString, endPoint);
	expect(newPathString).toBe(' l 10 10');
});

it('draws bezier with absolute control point (absolute bezier)', () => {
	let pathString = '';
	let endPoint = {x: 10, y: 10};
	let controlPoint = {x: 3, y: 3};
	let newPathString = drawAbsBez(pathString, endPoint, controlPoint);
	expect(newPathString).toBe(' Q 3 3 10 10');
});

it('closes path', () => {
	let pathString = 'L 0 0 L 10 10 L 0 10';
	let endPoint = {x: 10, y: 10};
	let newPathString = closePath(pathString, endPoint);
	expect(newPathString).toBe('L 0 0 L 10 10 L 0 10 Z');
});

it('creates svg with all drawing functions', () => {
	let pathString = '';
	let endPoint = {x: 10, y: 10};
	pathString = absMovePen(pathString, endPoint);
	pathString = relMovePen(pathString, endPoint);
	pathString = drawAbsLine(pathString, endPoint);
	pathString = drawRelLine(pathString, endPoint);

	let controlPoint = {x: 3, y: 3};
	pathString = drawAbsBez(pathString, endPoint, controlPoint);

	pathString = closePath(pathString, endPoint);
	expect(pathString).toBe(' M 10 10 m 10 10 L 10 10 l 10 10 Q 3 3 10 10 Z');
});











