import React, { Component } from 'react';
import { getHeight,
		getWidth,
		getTopLeftX,
		getTopLeftY,
		joinPaths,
		translatePath,
		createPathElement,
		createFormattedPath,
		concatStrokes,
		addPathToElement,
		centerAndScalePath,
		calculateScaleFactor,
		calculateTranslation
		} from 'svgHelpers/elements'

it('joins paths', () => {
	const path1 = [
					{command: 'M', end: {x: 2, y: 4}, absolute: true},
					{command: 'l', end: {x: 5, y: 0}, absolute: false},
				 ];

	const path2 = [
					{command: 'l', end: {x: 0, y: -10}, absolute: false},
				 ];
	const joinedPaths = joinPaths(path1, path2);
	expect(joinedPaths).toEqual([
					{command: 'M', end: {x: 2, y: 4}, absolute: true},
					{command: 'l', end: {x: 5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: -10}, absolute: false},
				 ]);
});

it('translates path', () => {
	const path = [
					{command: 'M', end: {x: 10, y: 10}, absolute: true},
					{command: 'm', end: {x: 10, y: 10}, absolute: false},
					{command: 'L', end: {x: 10, y: 10}, absolute: true},
					{command: 'l', end: {x: 10, y: 10}, absolute: false},
					{command: 'Q', end: {x: 10, y: 10}, control: {x: 20, y: 20}, absolute: true},
					{command: 'Z'},
				 ]
	const translation = {x: 10, y: 10};
	const translatedPath = translatePath(path, translation);
	expect(translatedPath).toEqual([
					{command: 'M', end: {x: 20, y: 20}, absolute: true},
					{command: 'm', end: {x: 10, y: 10}, absolute: false},
					{command: 'L', end: {x: 20, y: 20}, absolute: true},
					{command: 'l', end: {x: 10, y: 10}, absolute: false},
					{command: 'Q', end: {x: 20, y: 20}, control: {x: 30, y: 30}, absolute: true},
					{command: 'Z'},
				 ]);
});

it('gets path height', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const path = [
					{command: 'M', end: {x: 2, y: 4}, absolute: true},
					{command: 'l', end: {x: 5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: 10}, absolute: false},
					{command: 'l', end: {x: -5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: -10}, absolute: false},
				 ];
	const height = getHeight(path);
	expect(height).toEqual(10);
});

it('gets path width', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const path = [
					{command: 'M', end: {x: 2, y: 4}, absolute: true},
					{command: 'l', end: {x: 5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: 10}, absolute: false},
					{command: 'l', end: {x: -5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: -10}, absolute: false},
				 ];
	const width = getWidth(path);
	expect(width).toEqual(5);
});

it('gets path top left x', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const path = [
					{command: 'M', end: {x: 2, y: 4}, absolute: true},
					{command: 'l', end: {x: 5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: 10}, absolute: false},
					{command: 'l', end: {x: -5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: -10}, absolute: false},
				 ];
	const topLeftX = getTopLeftX(path);
	expect(topLeftX).toEqual(2);
});

it('gets path top left y', () => {
	// Draw a 5x10 rectangle that starts at (2, 4) 
	const path = [
					{command: 'M', end: {x: 2, y: 4}, absolute: true},
					{command: 'l', end: {x: 5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: 10}, absolute: false},
					{command: 'l', end: {x: -5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: -10}, absolute: false},
				 ];
	const topLeftY = getTopLeftY(path);
	expect(topLeftY).toEqual(-4);
});

it('creates path element', () => {
	const id = 'testId';
	const path = [
					{command: 'M', end: {x: 0, y:0}, absolute: true},
					{command: 'l', end: {x: 10, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: 10}, absolute: false},
					{command: 'l', end: {x: -10, y: 0}, absolute: false},
					{command: 'Z'},
				];
	const displayDimensions = {x: 10, y: 10};
	const pathElement = createPathElement(id, path, displayDimensions);
	expect(pathElement).toEqual(
		<g transform="translate(0.5 9.5) scale(0.9)"> <path 
			d="M 0 0 l 10 0 l 0 10 l -10 0 Z " 
			fill="none" 
			id="testId" 
			stroke="black" 
			strokeWidth="1" 
			vectorEffect="non-scaling-stroke" /> </g>);
});

it('creates formatted path', () => {
	const path = [
					{command: 'M', end: {x: 10, y:10}, absolute: true},
					{command: 'l', end: {x: 10, y:10}, absolute: false},
					{command: 'Z'},
				];
	const formattedPath = createFormattedPath(path);
	expect(formattedPath).toEqual('M 10 10 l 10 10 Z ');
});

it('concats strokes', () => {
	const formattedPath = 'M 10 10 l 10 10 '
	const strokeToAdd = 'Z'
	const concattedStrokes = concatStrokes(formattedPath, strokeToAdd);
	expect(concattedStrokes).toEqual('M 10 10 l 10 10 Z ');
});

it('adds path to element', () => {
	const id = 'testId';
	const path = [
					{command: 'M', end: {x: 10, y: 10}, absolute: true},
					{command: 'l', end: {x: 10, y: 10}, absolute: false},
					{command: 'Z'}
				 ];
	const pathDiv = addPathToElement(id, path);
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
	// Draw a 5x5 rectangle that starts at (2, 4) 
	const path = [
					{command: 'M', end: {x: 2, y: 4}, absolute: true},
					{command: 'l', end: {x: 5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: 5}, absolute: false},
					{command: 'l', end: {x: -5, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: -5}, absolute: false},
				 ];
	const displayDimensions = {x: 100, y: 100};
	const pathElement = <div> "Test path element" </div>
	const newPath = centerAndScalePath(pathElement, path, displayDimensions);
	expect(newPath).toEqual(<g transform="translate(3 99) scale(18)"> <div> "Test path element" </div> </g>);
});

it('calculates scale factor (vertical dimension is bigger)', () => {
	// 1x3 path that scales up to 3x9
	const path = [
					{command: 'M', end: {x: 0, y: 0}, absolute: true},
					{command: 'l', end: {x: 1, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: 3}, absolute: false},
					{command: 'l', end: {x: -1, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: -3}, absolute: false},
				 ];
	const displayWidth = 10;
	const displayHeight = 10;
	const scalefactor = calculateScaleFactor(path, displayWidth, displayHeight);
	expect(scalefactor).toEqual(3);
});

it('calculates scale factor (horizontal dimension is bigger)', () => {
	// 3x1 path that scales up to 9x3
	const path = [
					{command: 'M', end: {x: 0, y: 0}, absolute: true},
					{command: 'l', end: {x: 3, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: 1}, absolute: false},
					{command: 'l', end: {x: -3, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: -1}, absolute: false},
				 ];
	const displayWidth = 10;
	const displayHeight = 10;
	const scalefactor = calculateScaleFactor(path, displayWidth, displayHeight);
	expect(scalefactor).toEqual(3);
});

it('calculates translation without scale factor', () => {
	// Display is 10x10. Path is 2x4, with the bottom left corner at (0,0)
	const path = [
					{command: 'M', end: {x: 0, y: 0}, absolute: true},
					{command: 'l', end: {x: 2, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: -4}, absolute: false},
					{command: 'l', end: {x: -2, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: 4}, absolute: false},
				 ];
	const displayWidth = 10;
	const displayHeight = 10;
	const scaleFactor = 1; 
	const translation = calculateTranslation(path, displayWidth, displayHeight, scaleFactor);
	expect(translation).toEqual({x: 4, y: 3});
});

it('calculates translation with scale factor', () => {
	// Display is 10x10. Path is 1x2, with the bottom left corner at (0,0)
	const path = [
					{command: 'M', end: {x: 0, y: 0}, absolute: true},
					{command: 'l', end: {x: 1, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: -2}, absolute: false},
					{command: 'l', end: {x: -1, y: 0}, absolute: false},
					{command: 'l', end: {x: 0, y: 2}, absolute: false},
				 ];
	const displayWidth = 10;
	const displayHeight = 10;
	const scaleFactor = 2;
	const translation = calculateTranslation(path, displayWidth, displayHeight, scaleFactor);
	expect(translation).toEqual({x: 4, y: 5});
});