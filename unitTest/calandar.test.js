const Calendar = require('../modules/calendar').default;

global.Date = class extends Date {
    constructor() {
      super('2023-02-28T12:00:00Z');
    }
  };
  
  describe('Calendar', () => {
    let calendar;
  
    beforeEach(() => {
      calendar = new Calendar();
    });
  
    describe('getDay', () => {
      test('returns the current day with ordinal suffix', () => {
        expect(calendar.getDay()).toBe('28th,');
      });
    });
  
    describe('getMonth', () => {
      test('returns the current month', () => {
        expect(calendar.getMonth()).toBe('Feb');
      });
    });
  
    describe('getYear', () => {
      test('returns the current year', () => {
        expect(calendar.getYear()).toBe('2023');
      });
    });
});