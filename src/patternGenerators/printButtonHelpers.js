import 'App.css';
import { a4 } from '..//constants';
import * as jsPDF  from 'jspdf'
import * as canvg  from 'canvg'
import _ from 'lodash';

export const _createCanvasElement = (canvasWidth, canvasHeight, scaleFactor) => {
  var svg = document.getElementById('PatternDisplay').innerHTML;
  var canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  // This function makes the canvas only as big as the svg
  canvg(canvas, svg);
  const width = canvas.width/scaleFactor
  const height = canvas.height/scaleFactor;
  const image = canvas.toDataURL('image/png');
  return {width: width, height: height, image: image};
}

export const _initializeDoc = () => {
  const orientation = 'p'; // portrait ('p') or landscape ('l')
  const unit = 'in'; // points ('pt'), 'mm', 'cm', 'in'
  const format = 'a4'; // 'a3', 'a4','a5' ,'letter' ,'legal'
  return new jsPDF(orientation, unit, format);
}

export const _addPreviewPage = (doc, canvas) => {
  doc.setTextColor(150, 147, 155);
  doc.setFontSize(80)
  doc.text(.75, 4, 'Bodice Sloper')
  doc.setFontSize(33)
  doc.setTextColor(117, 188, 198);
  doc.text(2, 5, 'www.easysloper.com')
}

export const _addPatternPage = (doc, canvas, topLeftX, topLeftY, heightPage, widthPage) => {
  doc.addPage();
  doc.addImage(canvas.image, 'PNG', topLeftX, topLeftY, canvas.width, canvas.height);
  doc.setFontSize(30)
  doc.setTextColor(117, 188, 198);
  doc.text(1, 2, 'Row: ' + heightPage)
  doc.text(1, 3, 'Column: ' + widthPage)
}

export const _calculatePatternPageInitialValues = (canvas) => {
  const numberHeightPages = Math.ceil(canvas.height / a4.height);
  const numberWidthPages = Math.ceil(canvas.width / a4.width);
  let topLeftX = (numberWidthPages * a4.width - canvas.width) / 2;
  let topLeftY = (numberHeightPages * a4.height - canvas.height) / 2;
  return {numberHeightPages: numberHeightPages,
          numberWidthPages: numberWidthPages,
          topLeftX: topLeftX,
          topLeftY: topLeftY
        };
}

export const _calculateNewTopLeftCoordinates = (initialVals, heightPage, widthPage) => {
  const x = initialVals.topLeftX - (a4.width * heightPage);
  const y = initialVals.topLeftY - (a4.height * widthPage);
  return {x: x, y: y};
}

export const _generatePatternPages = (doc, canvas, initialVals, pdfTitle) => {
  _.times(initialVals.numberHeightPages, (heightPage) => {
    _.times(initialVals.numberWidthPages, (widthPage) => {
      let topLeftCoordinates = _calculateNewTopLeftCoordinates(initialVals, heightPage, widthPage);
      _addPatternPage(doc, canvas, topLeftCoordinates.x, topLeftCoordinates.y, heightPage, widthPage)
    });
  });
  doc.save(pdfTitle + ".pdf");
}