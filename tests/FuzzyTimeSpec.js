describe("FuzzyTime", function() {
    var minute = 60,
        hour = 3600,
        day = 86400,
        week = 604800;

    it("should throw exceptions for invalid inputs", function() {
        expect(function () { FuzzyTime.format(''); }).toThrow();
        expect(function () { FuzzyTime.format({}); }).toThrow();
        expect(function () { FuzzyTime.format(false); }).toThrow();
        expect(function () { FuzzyTime.format(null); }).toThrow();
        expect(function () { FuzzyTime.format(NaN); }).toThrow();
        expect(function () { FuzzyTime.format([]); }).toThrow();
    });
    
    it("should handle 0", function() {
        expect(FuzzyTime.format(0)).toBe('now');
    });
    
    it("should pluralize properly", function() {
        expect(FuzzyTime.format(1)).toBe('1 second ago');
        expect(FuzzyTime.format(2)).toBe('2 seconds ago');
    });
    
    it("should work properly when it needs to use combined metrics", function() {
        expect(FuzzyTime.format(minute + 1)).toBe('1 minute 1 second ago');
        expect(FuzzyTime.format(2 * minute + 1)).toBe('2 minutes 1 second ago');
    });
    
    it("should handle weeks", function() {
        expect(FuzzyTime.format(week + minute + 1)).toBe('1 week 1 minute 1 second ago');
        expect(FuzzyTime.format(week + 2 * minute + 1)).toBe('1 week 2 minutes 1 second ago');
    });
    
    it("should handle cases with 5 metrics", function() {
        expect(FuzzyTime.format(week * 2 + day + hour + minute + 1)).toBe('2 weeks 1 day 1 hour 1 minute 1 second ago');
        expect(FuzzyTime.format(week * 2 + 3 * day + 8 * hour + 2 * minute + 1)).toBe('2 weeks 3 days 8 hours 2 minutes 1 second ago');
    });
});