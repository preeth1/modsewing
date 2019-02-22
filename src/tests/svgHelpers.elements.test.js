import React, { Component } from 'react';
import { getHeight,
		getWidth,
		getTopLeftX,
		getTopLeftY,
		createPathElement,
		createFormattedPath,
		concatStrokes,
		createPathDiv,
		centerAndScalePath,
		calculateScaleFactor,
		calculateTranslation
		} from './../svgHelpers/elements'

it('gets path height', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const path = 'M 2 4 l 5 0 l 0 10 l -5 0 l 0 -10'
	const height = getHeight(path);
	expect(height).toEqual(10);
});

it('gets path width', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const path = 'M 2 4 l 5 0 l 0 5 l -5 0 l 0 -5'
	const width = getWidth(path);
	expect(width).toEqual(5);
});

it('gets path top left x', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const path = 'M 2 4 l 5 0 l 0 5 l -5 0 l 0 -5'
	const topLeftX = getTopLeftX(path);
	expect(topLeftX).toEqual(2);
});

it('gets path top left y', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const path = 'M 2 4 l 5 0 l 0 5 l -5 0 l 0 -5'
	const topLeftY = getTopLeftY(path);
	expect(topLeftY).toEqual(4);
});

it('creates path element', () => {
	const id = 'testId';
	const path = [
					{command: 'M', end: {x: 10, y:10}},
					{command: 'Q', control: {x: 20, y:20}, end: {x: 10, y: 10}},
					{command: 'Z'},
				];
	const pathElement = createPathElement(id, path);
	expect(pathElement).toEqual(<path
					id='testId'
					d='M 10 10 Q 20 20 10 10 Z '
					vectorEffect="non-scaling-stroke"
					strokeWidth="1"
					stroke="black"
					fill="none"
					>
				    </path>);
});

it('creates formatted path', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const path = [
					{command: 'M', end: {x: 10, y:10}},
					{command: 'l', end: {x: 10, y:10}},
					{command: 'Z'},
				];
	const formattedPath = createFormattedPath(path);
	expect(formattedPath).toEqual('M 10 10 l 10 10 Z ');
});

it('concats strokes', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const formattedPath = 'M 10 10 l 10 10 '
	const strokeToAdd = 'Z'
	const concattedStrokes = concatStrokes(formattedPath, strokeToAdd);
	expect(concattedStrokes).toEqual('M 10 10 l 10 10 Z ');
});

it('creates path div', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const id = 'testId';
	const path = 'M 10 10 l 10 10 Z '
	const pathDiv = createPathDiv(id, path);
	expect(pathDiv).toEqual(<path
					id='testId'
					d='M 10 10 l 10 10 Z '
					vectorEffect="non-scaling-stroke"
					strokeWidth="1"
					stroke="black"
					fill="none"
					>
				    </path>);
});

it('centers and scales path', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const path = 'M 2 4 l 5 0 l 0 5 l -5 0 l 0 -5'
	const displayWidth = 100;
	const displayHeight = 100;
	const pathElement = <div> "Test path element" </div>
	const newPath = centerAndScalePath(pathElement, path, displayWidth, displayHeight);
	expect(newPath).toEqual(<g transform="translate(3 1) scale(18)"> <div> "Test path element" </div> </g>);
});

it('calculates scale factor (vertical dimension is bigger)', () => {
	// 1x3 path that scales up to 3x9
	const path = 'M 0 0 l 1 0 l 0 3 l -1 0 l 0 -3'
	const displayWidth = 10;
	const displayHeight = 10;
	const scalefactor = calculateScaleFactor(path, displayWidth, displayHeight);
	expect(scalefactor).toEqual(3);
});

it('calculates scale factor (horizontal dimension is bigger)', () => {
	// 3x1 path that scales up to 9x3
	const path = 'M 0 0 l 3 0 l 0 1 l -3 0 l 0 -1'
	const displayWidth = 10;
	const displayHeight = 10;
	const scalefactor = calculateScaleFactor(path, displayWidth, displayHeight);
	expect(scalefactor).toEqual(3);
});

it('calculates translation without scale factor', () => {
	// Display is 10x10. Path is 2x4, with the bottom left corner at (0,0)
	const path = 'M 0 0 l 2 0 l 0 -4 l -2 0 l 0 4'
	const displayWidth = 10;
	const displayHeight = 10;
	const scaleFactor = 1;
	const translation = calculateTranslation(path, displayWidth, displayHeight, scaleFactor);
	expect(translation).toEqual({x: 4, y: 7});
});

it('calculates translation with scale factor', () => {
	// Display is 10x10. Path is 1x2, with the bottom left corner at (0,0)
	const path = 'M 0 0 l 1 0 l 0 -2 l -1 0 l 0 2'
	const displayWidth = 10;
	const displayHeight = 10;
	const scaleFactor = 2;
	const translation = calculateTranslation(path, displayWidth, displayHeight, scaleFactor);
	expect(translation).toEqual({x: 4, y: 5});
});