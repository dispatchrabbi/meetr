const expect = require('chai').expect;
const Schedule = require('../../models/schedule.js');

describe('Schedule', function () {
  describe('date validation', function () {
    it('allows weekdays for indefinite schedules', function () {
      const schedule = new Schedule({
        title: 'Indefinite Schedule',
        definite: false,
        days: ['Monday', 'Friday'],
        timezone: 'America/Chicago',
        startTime: 0,
        endTime: 86400,
      });

      const actual = schedule.validate();

      return expect(actual).to.be.fulfilled;
    });

    it('does not allow non-weekdays for indefinite schedules', function () {
      const schedule = new Schedule({
        title: 'Indefinite Schedule',
        definite: false,
        days: ['Monday', 'Nonesday'],
        timezone: 'America/Chicago',
        startTime: 0,
        endTime: 86400,
      });

      const actual = schedule.validate();

      return expect(actual).to.be.rejected;
    });

    it('allows dates for definite schedules', function () {
      const schedule = new Schedule({
        title: 'Definite Schedule',
        definite: true,
        days: ['2016-06-04', '2016-07-02'],
        timezone: 'America/Chicago',
        startTime: 0,
        endTime: 86400,
      });

      const actual = schedule.validate();

      return expect(actual).to.be.fulfilled;
    });

    it('does not allow non-dates for definite schedules', function () {
      const schedule = new Schedule({
        title: 'Definite Schedule',
        definite: true,
        days: ['2016-06-04', '2016-13-02'],
        timezone: 'America/Chicago',
        startTime: 0,
        endTime: 86400,
      });

      const actual = schedule.validate();

      return expect(actual).to.be.rejected;
    });
  });
});
