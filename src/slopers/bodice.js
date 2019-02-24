import { STANDARD_MEASUREMENTS } from 'constants.js'
import { convertMeasurements } from 'measurements'	
import { absMovePen, 
				 relMovePen, 
				 drawAbsLine, 
				 drawRelLine, 
				 drawAbsBez } from 'svgHelpers/drawing'


export const front = (size) => {

  const convertedMeasurements = convertMeasurements(STANDARD_MEASUREMENTS[size]);

  const frontPath = [
    ...absMovePen({x: 0, y: 0}),
    ...drawRelLine({x: 10, y: 0}),
    ...drawRelLine({x: 0, y: 10}),
    ...drawRelLine({x: -10, y: 0}),
    ...drawRelLine({x: 0, y: -10}),
    ]

	return frontPath;
}
