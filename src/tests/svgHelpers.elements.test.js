import React, { Component } from 'react';
import { getHeight,
		getWidth,
		getTopLeftX,
		getTopLeftY,
		createPathElement,
		centerAndScalePath,
		calculateScaleFactor,
		calculateTranslation
		} from './../svgHelpers/elements'

it('gets path height', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	let pathString = 'M 2 4 l 5 0 l 0 10 l -5 0 l 0 -10'
	let height = getHeight(pathString);
	height = 10
});

it('gets path width', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	let pathString = 'M 2 4 l 5 0 l 0 5 l -5 0 l 0 -5'
	let width = getWidth(pathString);
	width = 5
});

it('gets path top left x', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	let pathString = 'M 2 4 l 5 0 l 0 5 l -5 0 l 0 -5'
	let topLeftX = getTopLeftX(pathString);
	topLeftX = 2
});

it('gets path top left y', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	let pathString = 'M 2 4 l 5 0 l 0 5 l -5 0 l 0 -5'
	let topLeftY = getTopLeftY(pathString);
	topLeftY = 4
});

it('creates path element', () => {
	let id = 'testId';
	let path = 'M 0 0';
	let pathElement = createPathElement(id, path);
	pathElement = <path
					id='testId'
					d='M 0 0'
					vectorEffect="non-scaling-stroke"
					stroke-width="1"
					stroke="black"
					fill="none"
					>
				    </path>;
});

it('centers and scales path', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const pathString = 'M 2 4 l 5 0 l 0 5 l -5 0 l 0 -5'
	const displayWidth = 100;
	const displayHeight = 100;
	const pathElement = <div> "Test path element" </div>
	const newPath = centerAndScalePath(pathElement, pathString, displayWidth, displayHeight);
	expect(newPath).toEqual(<g transform="translate(3 1) scale(18)"> <div> "Test path element" </div> </g>);
});

it('calculates scale factor (vertical dimension is bigger)', () => {
	// 1x3 path that scales up to 3x9
	const pathString = 'M 0 0 l 1 0 l 0 3 l -1 0 l 0 -3'
	const displayWidth = 10;
	const displayHeight = 10;
	const scalefactor = calculateScaleFactor(pathString, displayWidth, displayHeight);
	expect(scalefactor).toEqual(3);
});

it('calculates scale factor (horizontal dimension is bigger)', () => {
	// 3x1 path that scales up to 9x3
	const pathString = 'M 0 0 l 3 0 l 0 1 l -3 0 l 0 -1'
	const displayWidth = 10;
	const displayHeight = 10;
	const scalefactor = calculateScaleFactor(pathString, displayWidth, displayHeight);
	expect(scalefactor).toEqual(3);
});

it('calculates translation without scale factor', () => {
	// Display is 10x10. Path is 2x4, with the bottom left corner at (0,0)
	const pathString = 'M 0 0 l 2 0 l 0 -4 l -2 0 l 0 4'
	const displayWidth = 10;
	const displayHeight = 10;
	const scaleFactor = 1;
	const translation = calculateTranslation(pathString, displayWidth, displayHeight, scaleFactor);
	expect(translation).toEqual({x: 4, y: 7});
});

it('calculates translation with scale factor', () => {
	// Display is 10x10. Path is 1x2, with the bottom left corner at (0,0)
	const pathString = 'M 0 0 l 1 0 l 0 -2 l -1 0 l 0 2'
	const displayWidth = 10;
	const displayHeight = 10;
	const scaleFactor = 2;
	const translation = calculateTranslation(pathString, displayWidth, displayHeight, scaleFactor);
	expect(translation).toEqual({x: 4, y: 5});
});