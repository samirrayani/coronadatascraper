import { locationData } from './dataQualityHelpers.js';

// simple test for demonstration purposes
test.each(locationData).skip('%s: location tz == timeseries tz', (locName, locObj, tsObj) => {
  if ('tz' in locObj && 'tz' in tsObj) {
    expect(locObj.tz[0]).toBe(tsObj.tz[0]);
  }
});
