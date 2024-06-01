import  TagExpressionParser  from '@cucumber/tag-expressions';
import { glob } from 'glob';
import * as fs from 'node:fs';
import * as process from 'node:process';


export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function decodeUrl(url: string) {
  if (url == undefined) {
    throw new Error('Decode URL cannot be empty or undefined');
  }

  return decodeURIComponent(url);
}

/**
 * Formats a date by adding a specified number of days to the current date and applying a format.
 * @param {number} daysToAdd - The number of days to add to the current date.
 * @param {string} format - The format string for the resulting date (e.g., 'dd MMMM yyyy').
 * @returns {Promise<string>} A promise that resolves to the formatted date string.
 */
export async function formatDatePlusDays(daysToAdd: number, format = 'dd MMMM yyyy'): Promise<string> {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysToAdd);

  const options: Intl.DateTimeFormatOptions = {};

  if (format.includes('dd')) options.day = 'numeric';
  if (format.includes('MM')) options.month = 'long';
  if (format.includes('yyyy')) options.year = 'numeric';

  return targetDate.toLocaleDateString('en-US', options);
}

/**
 * Asynchronously selects a random item from a given list.
 *
 * @param list - An array containing items from which to select a random item.
 * @returns A Promise that resolves to a randomly selected item from the list, or undefined if the list is empty.
 */
export async function getRandomListItem<T>(list: T[]): Promise<T | undefined> {
  if (list.length === 0) {
    throw new Error('List can not be empty');
  }
  const randomIndex = Math.floor(Math.random() * list.length);

  return list[randomIndex];
}


/**
 * Get the current year.
 * @param needThaiYear - A boolean flag indicating whether to return the Thai Buddhist year.
 * @returns A Promise that resolves to either the current year in Gregorian calendar (number)
 * or the current year in Thai Buddhist calendar (string) based on the provided options.
 */
export async function getCurrentYear(needThaiYear?: boolean): Promise<string | number> {
  /**
   * If needThaiYear is true, format the current year in the Thai Buddhist calendar
   * and return it as a number.
   * If needThaiYear is false or not provided, return the current year in the Gregorian calendar as a number.
   */
  return needThaiYear
    ? parseInt(new Intl.DateTimeFormat('en-US-u-ca-buddhist', { year: 'numeric' }).format(new Date()), 10)
    : new Date().getFullYear();
}


function getRandomPhoneNumber(countryName: string): string {
  const country: string = countryName;
  let random: string;
  let mobilePrefix: string;
  /**
   * Basic mobile, excluding country code, generation rule for different marketplaces: SG: 85xx
   * xxxx MY: 4xxx xxxx DD: 8xxxx xxxx there might be variations in prefix of
   * mobile formats, please add more when necessary *
   */
  switch (country) {
    case 'sg':
      random = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
      mobilePrefix = '85';
      break;
    case 'my':
      random = String(Math.floor(Math.random() * 10000000)).padStart(7, '0');
      mobilePrefix = '4';
      break;
    case 'dd':
    case 'dde':
      random = String(Math.floor(Math.random() * 100000000)).padStart(8, '0');
      mobilePrefix = '8';
      break;
    default:
      random = String(Math.floor(Math.random() * 100000000)).padStart(8, '0');
      mobilePrefix = '1';
      break;
  }

  // Return the formatted phone number
  return mobilePrefix + random;
}




/**
 * Generates a random date string within the past number of days specified.
 *
 * @param {number} days - The number of days in the past from today's date to generate the random date within.
 * @returns {string} - The random date string in the format 'YYYY-MM-DD HH:MM:SS'.
 */
export const getRandomPastDate = (days: number) => {
  const endDate = new Date();
  const startDate = new Date();

  startDate.setDate(endDate.getDate() - days);

  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

  return randomDate.toISOString().replace('T', ' ').substring(0, 19);
};

/**
 * Replaces placeholders in a format string with provided arguments.
 *
 * @param {string} format - The format string containing placeholders.
 * @param {...string} args - The arguments to replace placeholders in the format string.
 * @returns {string} The formatted string with placeholders replaced.
 *
 *  @example
 * // Replace placeholders in a format string
 * const formattedString = formatString('Hello {0}, welcome to {1}!', 'John', 'Playground');
 * console.log(formattedString); // Output: 'Hello John, welcome to Playground!'
 *
 */
export const formatString = (format: string, ...args: string[]): string => {
  return format.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
};



/**
 * Get a current date string in the format 'YYYY-MM-DD' from ISO string format 'YYYY-MM-DDTHH:mm:ss.sssZ'.
 *
 * @returns The current date string in the format 'YYYY-MM-DD'.
 */
export function getCurrentDateFromIsoDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get localized date parts (day, month, year) from a given date and locale.
 * @param date The date to get parts from.
 * @param locale The locale string representing the desired locale (e.g., 'en-SG', 'en-MY', 'th-TH').
 * @returns An object containing the day, month, and year parts of the date.
 */
export function getLocalizedDateParts(date: Date, locale: string): { day: string; month: string; year: string } {
  const formatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const parts = formatter.formatToParts(date);
  let day = '',
    month = '',
    year = '';
  for (const part of parts) {
    if (part.type === 'day') {
      day = part.value;
    } else if (part.type === 'month') {
      month = part.value;
    } else if (part.type === 'year') {
      year = part.value;
    }
  }
  return { day, month, year };
}

/**
 * Get a localized date string in the format 'DD MMM YY' (e.g., '23 Apr 24') from a given date and locale.
 * Adjusts the year for the Thai locale ('th-TH') accordingly to convert the year from Buddhist year to Georgian Year
 * @param date The date to format.
 * @param locale The locale string representing the desired locale (e.g., 'en-SG', 'en-MY', 'th-TH').
 * @returns The date string in the format 'DD MMM YY'.
 */
export function getLocalizedStringForDateAsDDMonYY(date: Date, locale: string): string {
  const { day, month, year } = getLocalizedDateParts(date, locale);
  let modifiedYear = year;
  if (locale === 'th-TH') modifiedYear = (parseInt(year) - 543).toString();
  return `${day} ${month} ${modifiedYear.slice(-2)}`;
}

export function filterCucumberFeaturesByTags(featuresPath: string, tags: string) {
  const tagParser =  TagExpressionParser(tags); // Initialize TagExpressionParser
  const featureFiles = glob.sync(process.cwd()+featuresPath, { nodir: true });
  const filteredFeatureFiles = featureFiles // Filter feature files based on tags
    .filter((featureFile: string) => {
      const content = fs.readFileSync(featureFile, "utf8"); // Read file content directly
      if (content.length > 0) {
        const regex = new RegExp("@(?:\\w+=\\w+|\\w+)| (@\\w+-\\w+)", "g"); // regex to get all text with @ in feature files
        const tagsInFile = content.match(regex) || [];
        if (tagParser.evaluate(tagsInFile)) {
          return true;
        }
      }
      return false;
    });

  console.log(`Filtered Total Features: ${filteredFeatureFiles.length}`);

  return filteredFeatureFiles;
}