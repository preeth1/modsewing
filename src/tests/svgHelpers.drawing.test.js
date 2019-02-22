import { absMovePen,
		 relMovePen,
		 drawAbsLine,
		 drawRelLine,
		 drawAbsBez,
		 drawAbsBezRelPoint,
		 closePath } from './../svgHelpers/drawing'

it('moves pen (absolute)', () => {
	const path = [];
	const end = {x: 10, y: 10};
	absMovePen(path, end);
	expect(path).toEqual([{command: 'M', end: {x: 10, y:10}}]);
});

it('moves pen (relative)', () => {
	const path = [];
	const end = {x: 10, y: 10};
	relMovePen(path, end);
	expect(path).toEqual([{command: 'm', end: {x: 10, y:10}}]);
});

it('draws line (absolute)', () => {
	const path = [];
	const end = {x: 10, y: 10};
	drawAbsLine(path, end);
	expect(path).toEqual([{command: 'L', end: {x: 10, y:10}}]);
});

it('draws line (relative)', () => {
	const path = [];
	const end = {x: 10, y: 10};
	drawRelLine(path, end);
	expect(path).toEqual([{command: 'l', end: {x: 10, y:10}}]);
});

it('draws bezier with absolute control point (absolute bezier)', () => {
	const path = [];
	const end = {x: 10, y: 10};
	const control = {x: 3, y: 3};
	drawAbsBez(path, end, control);
	expect(path).toEqual([
					{command: 'Q', end: {x: 10, y:10}, control: {x: 3, y: 3}
				}]);
});

it('closes path', () => {
	const path = [
					{command: 'M', end: {x: 10, y:10}},
					{command: 'l', end: {x: 10, y:10}},
				 ];
	const end = {x: 10, y: 10};
	closePath(path);
	expect(path).toEqual([
					{command: 'M', end: {x: 10, y:10}},
					{command: 'l', end: {x: 10, y:10}},
					{command: 'Z'},
				 ]);
});

it('creates svg with all drawing functions', () => {
	let path = [];
	const end = {x: 10, y: 10};
	const control = {x: 3, y: 3};
	absMovePen(path, end);
	relMovePen(path, end);
	drawAbsLine(path, end);
	drawRelLine(path, end);
	drawAbsBez(path, end, control);
	closePath(path);
	expect(path).toEqual([
					{command: 'M', end: {x: 10, y:10}},
					{command: 'm', end: {x: 10, y:10}},
					{command: 'L', end: {x: 10, y:10}},
					{command: 'l', end: {x: 10, y:10}},
					{command: 'Q', end: {x: 10, y:10}, control: {x: 3, y: 3}},
					{command: 'Z'},
				 ]);
});











