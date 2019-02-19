import { absMovePen,
		 relMovePen,
		 drawAbsLine,
		 drawRelLine,
		 drawAbsBezAbsPoint,
		 drawAbsBezRelPoint,
		 closePath } from './../svgHelpers/drawing'

it('moves pen (absolute)', () => {
	let pathString = '';
	let movePoint = {x: 10, y: 10};
	let newPathString = absMovePen(pathString, movePoint);
	newPathString = 'M 10 10';
});

it('moves pen (relative)', () => {
	let pathString = '';
	let movePoint = {x: 10, y: 10};
	let newPathString = relMovePen(pathString, movePoint);
	newPathString = 'm 10 10';
});

it('draws line (absolute)', () => {
	let pathString = '';
	let movePoint = {x: 10, y: 10};
	let newPathString = drawAbsLine(pathString, movePoint);
	newPathString = 'L 10 10';
});

it('draws line (relative)', () => {
	let pathString = '';
	let movePoint = {x: 10, y: 10};
	let newPathString = drawRelLine(pathString, movePoint);
	newPathString = 'l 10 10';
});

it('draws bezier with absolute control point (absolute bezier)', () => {
	let pathString = '';
	let movePoint = {x: 10, y: 10};
	let controlPoint = {x: 3, y: 3};
	let newPathString = drawAbsBezAbsPoint(pathString, movePoint, controlPoint);
	newPathString = 'Q 3 3 10 10';
});

it('draws bezier with relative control point (absolute bezier)', () => {
	let pathString = '';
	let movePoint = {x: 10, y: 10};
	let startPoint = {x: 10, y: 10};
	let fractionAlongLine = .5;
	let controlPointXMove = 1;
	let controlPointYMove = 1;
	let newPathString = drawAbsBezRelPoint(movePoint, startPoint, fractionAlongLine, controlPointXMove, controlPointYMove);
	newPathString = 'Q 6 6 10 10';
});

it('closes path', () => {
	let pathString = 'L 0 0 L 10 10 L 0 10';
	let movePoint = {x: 10, y: 10};
	let newPathString = closePath(pathString, movePoint);
	newPathString = 'L 0 0 L 10 10 L 0 10 Z';
});

it('creates svg with all drawing functions', () => {
	let pathString = '';
	let movePoint = {x: 10, y: 10};
	pathString = absMovePen(pathString, movePoint);
	pathString = relMovePen(pathString, movePoint);
	pathString = drawAbsLine(pathString, movePoint);
	pathString = drawRelLine(pathString, movePoint);

	let controlPoint = {x: 3, y: 3};
	pathString = drawAbsBezAbsPoint(pathString, movePoint, controlPoint);
	
	let startPoint = {x: 10, y: 10};
	let fractionAlongLine = .5;
	let controlPointXMove = 1;
	let controlPointYMove = 1;
	pathString = drawAbsBezRelPoint(movePoint, startPoint, fractionAlongLine, controlPointXMove, controlPointYMove);
	pathString = closePath(pathString, movePoint);
	pathString = 'M 10 10 m 10 10 L 10 10 l 10 10 Q 3 3 10 10 Q 6 6 10 10 Z';
});











