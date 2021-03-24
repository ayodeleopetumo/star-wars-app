/**
 * Outputs a title, and the properties of an object.
 * If the object is an array, it will be output via console.table, otherwise, console.info
 * Since the browser will update the display, this should be regarded as a live view
 */

export const dump = (title: string, obj: any): void => {
  console.log(`========== ${title} ==========`);

  if (Array.isArray(obj)) {
    console.table(obj);
  } else {
    console.dir(obj);
  }
};
