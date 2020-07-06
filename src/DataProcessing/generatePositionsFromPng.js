

import { createWorker } from 'tesseract.js';

/**
 * Create a tsv that contains the position of each text box contain in the png image
 * @param {png image} inputPNG 
 */
async function GenerateTSV(inputPNG) {

    const worker = createWorker({
      logger: (m) => console.log(m),
    });

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    await worker.setParameters({
      tessedit_create_box: '1',
      tessedit_create_unlv: '1',
      tessedit_create_osd: '1',
    });
    const { data: { hocr, tsv} } = await worker.recognize(inputPNG);

    console.log(tsv); 
    return tsv; 
  };

  export default GenerateTSV; 