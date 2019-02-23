import { absMovePen,
		 relMovePen,
		 drawAbsLine,
		 drawRelLine,
		 drawAbsBez,
		 drawAbsBezRelPoint,
		} from 'svgHelpers/drawing'

it('moves pen (absolute)', () => {
	const end = {x: 10, y: 10};
	const path = [
		...absMovePen(end)
		];
	expect(path).toEqual([{command: 'M', end: {x: 10, y: 10}, absolute: true}]);
});

it('moves pen (relative)', () => {
	const end = {x: 10, y: 10};
	const path = [
		...relMovePen(end)
		];
	expect(path).toEqual([{command: 'm', end: {x: 10, y: 10}, absolute: false}]);
});

it('draws line (absolute)', () => {
	const end = {x: 10, y: 10};
	const path = [
		...drawAbsLine(end)
		];
	expect(path).toEqual([{command: 'L', end: {x: 10, y: 10}, absolute: true}]);
});

it('draws line (relative)', () => {
	const end = {x: 10, y: 10};
	const path = [
		...drawRelLine(end)
		];
	expect(path).toEqual([{command: 'l', end: {x: 10, y: 10}, absolute: false}]);
});

it('draws bezier with absolute control point (absolute bezier)', () => {
	const end = {x: 10, y: 10};
	const control = {x: 3, y: 3};
	const path = [
		...drawAbsBez(end, control)
		];
	expect(path).toEqual([
					{command: 'Q', end: {x: 10, y: 10}, control: {x: 3, y: 3}, absolute: true
				}]);
});

it('creates svg with all drawing functions', () => {
	const end = {x: 10, y: 10};
	const control = {x: 3, y: 3};
	let path = [
		...absMovePen(end),
		...relMovePen(end),
		...drawAbsLine(end),
		...drawRelLine(end),
		...drawAbsBez(end, control),
	];
	expect(path).toEqual([
					{command: 'M', end: {x: 10, y: 10}, absolute: true},
					{command: 'm', end: {x: 10, y: 10}, absolute: false},
					{command: 'L', end: {x: 10, y: 10}, absolute: true},
					{command: 'l', end: {x: 10, y: 10}, absolute: false},
					{command: 'Q', end: {x: 10, y: 10}, control: {x: 3, y: 3}, absolute: true},
				 ]);
});











