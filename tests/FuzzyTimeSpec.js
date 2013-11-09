/* global FuzzyTime,describe,it,expect */
describe("FuzzyTime", function() {
    var minute = 60,
        hour = 3600,
        day = 86400,
        week = 604800;

    it("should throw exceptions for invalid inputs", function() {
        expect(function () { FuzzyTime.getFuzzyTimeString(''); }).toThrow();
        expect(function () { FuzzyTime.getFuzzyTimeString({}); }).toThrow();
        expect(function () { FuzzyTime.getFuzzyTimeString(false); }).toThrow();
        expect(function () { FuzzyTime.getFuzzyTimeString(null); }).toThrow();
        expect(function () { FuzzyTime.getFuzzyTimeString(NaN); }).toThrow();
        expect(function () { FuzzyTime.getFuzzyTimeString([]); }).toThrow();
    });
    
    it("should handle 0", function() {
        expect(FuzzyTime.getFuzzyTimeString(0)).toBe('now');
    });
    
    it("should pluralize properly", function() {
        expect(FuzzyTime.getFuzzyTimeString(1)).toBe('1 second ago');
        expect(FuzzyTime.getFuzzyTimeString(2)).toBe('2 seconds ago');
    });
    
    it("should work for negative values", function() {
        expect(FuzzyTime.getFuzzyTimeString(-1)).toBe('1 second before');
        expect(FuzzyTime.getFuzzyTimeString(-10 * 60)).toBe('10 minutes before');
    });
    
    it("should work properly when it needs to use combined metrics", function() {
        expect(FuzzyTime.getFuzzyTimeString(minute + 1)).toBe('1 minute 1 second ago');
        expect(FuzzyTime.getFuzzyTimeString(2 * minute + 1)).toBe('2 minutes 1 second ago');
    });
    
    it("should handle weeks", function() {
        expect(FuzzyTime.getFuzzyTimeString(week + minute + 1)).toBe('1 week 1 minute 1 second ago');
        expect(FuzzyTime.getFuzzyTimeString(week + 2 * minute + 1)).toBe('1 week 2 minutes 1 second ago');
    });
    
    it("should handle cases with 5 metrics", function() {
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + day + hour + minute + 1)).toBe('2 weeks 1 day 1 hour 1 minute 1 second ago');
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + 3 * day + 8 * hour + 2 * minute + 1)).toBe('2 weeks 3 days 8 hours 2 minutes 1 second ago');
    });
    
    
    it("should support limiting the maxLevels", function() {
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + day + hour + minute + 1, { maxLevels: 5 })).toBe('2 weeks 1 day 1 hour 1 minute 1 second ago');
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + 3 * day + 8 * hour + 2 * minute + 1, { maxLevels: 5 })).toBe('2 weeks 3 days 8 hours 2 minutes 1 second ago');
        
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + day + hour + minute + 1, { maxLevels: 2 })).toBe('2 weeks 1 day ago');
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + 3 * day + 8 * hour + 2 * minute + 1, { maxLevels: 2 })).toBe('2 weeks 3 days ago');
        
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + hour + minute + 1, { maxLevels: 2 })).toBe('2 weeks ago');
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + 8 * hour + 2 * minute + 1, { maxLevels: 2 })).toBe('2 weeks ago');
        
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + hour + minute + 1, { maxLevels: 3 })).toBe('2 weeks ago');
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + 8 * hour + 2 * minute + 1, { maxLevels: 3 })).toBe('2 weeks ago');
    });
    
    it("should support limiting the maxUnits", function() {
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + day + hour + minute + 1, { maxUnits: 5 })).toBe('2 weeks 1 day 1 hour 1 minute 1 second ago');
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + 3 * day + 8 * hour + 2 * minute + 1, { maxUnits: 5 })).toBe('2 weeks 3 days 8 hours 2 minutes 1 second ago');
        
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + day + hour + minute + 1, { maxUnits: 2 })).toBe('2 weeks 1 day ago');
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + 3 * day + 8 * hour + 2 * minute + 1, { maxUnits: 2 })).toBe('2 weeks 3 days ago');
        
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + hour + minute + 1, { maxUnits: 2 })).toBe('2 weeks 1 hour ago');
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + 8 * hour + 2 * minute + 1, { maxUnits: 2 })).toBe('2 weeks 8 hours ago');
        
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + hour + minute + 1, { maxUnits: 3 })).toBe('2 weeks 1 hour 1 minute ago');
        expect(FuzzyTime.getFuzzyTimeString(week * 2 + 8 * hour + 2 * minute + 1, { maxUnits: 3 })).toBe('2 weeks 8 hours 2 minutes ago');
    });
});