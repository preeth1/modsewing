import React, { Component } from 'react';
import { getHeight,
		getWidth,
		getTopLeftX,
		getTopLeftY,
		createPathElement 
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