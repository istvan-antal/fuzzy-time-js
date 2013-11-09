describe("FuzzyTime", function() {

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
        expect(FuzzyTime.format(60 + 1)).toBe('1 minute 1 second ago');
        expect(FuzzyTime.format(120 + 1)).toBe('2 minutes 1 second ago');
    });
});