/**
 * @jest-environment node
 */
import puppeteer from 'puppeteer';

describe('filter events by city', () => {

  let browser, page;
  let citySearchInput, numOfEventsInput;
  let suggestionListItems;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.event');
    citySearchInput = await page.waitForSelector('.city');
    numOfEventsInput = await page.waitForSelector('#number-of-events');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user hasn\'t searched for a city, show upcoming events from all cities', async () => {
    //Events should default to show 32 events for all cities, check length of list of events
    const eventList = await page.$$('.event');
    expect(eventList.length).toBe(32);
    // *!* Is there a more accurate way to check this than just default number of events listed? 

    // *!* Make sure city search box has no input value
    const citySearchInputText = await citySearchInput.evaluate(input => input.value.trim());
    expect(citySearchInputText).toBe("");

  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'London', { delay: 100 });
    suggestionListItems = await page.$$('.suggestion-item');
    expect(suggestionListItems).toBeDefined();
  });

  test('User can select a city from the suggested list', async () => {

    // [ ] Click an item on the suggestions
    const selectedCity = await suggestionListItems[0].evaluate(item => item.textContent.trim());
    await suggestionListItems[0].click();

    // [ ] Ensure city search matches selection
    //!NOTE! waitForFunction runs in the browser context, so we can use document.querySelector(), element.textContent, etc
    await page.waitForFunction((expectedSelection) => {
      const input = document.querySelector('.city');
      return input && input.value.trim() === expectedSelection;
    }, {}, selectedCity);

    const citySearchInputText = await citySearchInput.evaluate(input => input.value.trim());
    expect(citySearchInputText).toBe(selectedCity);

    // [ ] Check list of events to all be located in London
    const eventsLocationsList = await page.$$eval('.event .event-location', locations => {
      return locations.map(elem => elem.textContent.trim())
    });

    for (const text of eventsLocationsList) {
      expect(text).toBe(selectedCity);
    }

  });

});

describe('show/hide event details', () => {

  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

});