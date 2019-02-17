import _ from 'lodash';

import { MEASUREMENT_UNIT_OBJECTS } from '../constants';


export const convertMeasurementValue = ({ fromValue, fromUnitName, toUnitName }) => {
  const fromUnit = _.find(MEASUREMENT_UNIT_OBJECTS, {name: fromUnitName});
  const toUnit = _.find(MEASUREMENT_UNIT_OBJECTS, {name: toUnitName});
  const toValue = fromValue * (toUnit.perInch / fromUnit.perInch);
  return toValue;
}


export const formatDisplayMeasurement = ({ measurement, measurementValue, displayUnit }) => {
  let displayMeasurementValue = measurementValue;
  // if the value is non-empty and this is a numerical measurement, convert units
  if (measurement.type === 'number' && displayMeasurementValue) {
    displayMeasurementValue = convertMeasurementValue({
      fromValue: measurementValue,
      fromUnitName: 'inch',
      toUnitName: displayUnit.name,
    });
    displayMeasurementValue = displayMeasurementValue.toFixed(2);
  }
  return displayMeasurementValue;
}