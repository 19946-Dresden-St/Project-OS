const Clock = require('../modules/clock').default;

describe("Clock class", () => {
    let clock;
  
    beforeEach(() => {
      clock = new Clock();
    });
  
    describe("getHours method", () => {
      it("should return the current hour in 24-hour format", () => {
        const date = new Date();
        jest.spyOn(date, "toLocaleTimeString").mockReturnValue("13:23:45");
        jest.spyOn(global.Date, "now").mockImplementation(() => date.getTime());
        // add 0 to the hour if it is less than 10
        expect(clock.getHours()).toEqual(date.getHours() < 10 ? "0" + date.getHours() + " h": date.getHours() + " h");
      });
    });
  
    describe("getMinutes method", () => {
      it("should return the current minute", () => {
        // create a date object representing 1:23:45 PM
        const date = new Date();
        // mock the `toLocaleTimeString` method to return a fixed string
        jest.spyOn(date, "toLocaleTimeString").mockReturnValue("13:23:45");
        // set the current time to the mocked date
        jest.spyOn(global.Date, "now").mockImplementation(() => date.getTime());
        
        expect(clock.getMinutes()).toEqual(date.getMinutes().toString());
      });
    });
  
    describe("getSeconds method", () => {
      it("should return the current second", () => {
        // create a date object representing 1:23:45 PM
        const date = new Date();
        jest.spyOn(global.Date, "now").mockImplementation(() => date.getTime());
        
        expect(clock.getSeconds()).toEqual(date.getSeconds().toString());
      });
    });

      

  });
  

