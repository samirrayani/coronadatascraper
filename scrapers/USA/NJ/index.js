import path from 'path';
import * as fetch from '../../../lib/fetch.js';
import * as parse from '../../../lib/parse.js';
import * as transform from '../../../lib/transform.js';
import * as datetime from '../../../lib/datetime.js';
import * as rules from '../../../lib/rules.js';
import * as fs from '../../../lib/fs.js';

/*
  Each scraper must return the following object or an array of the following objects:

  {
    city: String†,
    county: String†,   // County or region name, complete with "County" or "Parish" at the end
    country: String†,  // ISO 3166-1 alpha-3 country code
    cases: Integer,    // Confirmed cases (including presumptive)
    deaths: Integer,
    recovered: Integer,
    tested: Integer
  }

  † Optional, not required if provided in the main scraper definition
*/

// Set county to this if you only have state data, but this isn't the entire state
const UNASSIGNED = '(unassigned)';

const scraper = {
  url: 'https://opendata.arcgis.com/datasets/8840fd8ac1314f5188e6cf98b525321c_0.csv',
  country: 'USA',
  state: 'NJ',
  aggregate: 'county',
  async scraper() {
    const data = await fetch.csv(this.url);
    const counties = [];
    for (const county of data) {
      counties.push({
        county: parse.string(county.COUNTY_LAB),
        cases: parse.number(county.Positives),
        tested: parse.number(county.Negatives) + parse.number(county.Positives)
      });
    }
    counties.push(transform.sumData(counties));
    return counties;
  }
};

export default scraper;