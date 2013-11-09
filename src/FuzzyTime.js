var FuzzyTime = {
    _units: {
        1: ['second', 'seconds'],
        60: ['minute', 'minutes'],
        3600: ['hour', 'hours'],
        86400: ['day', 'days'],
        604800: ['week', 'weeks']
    },
    /**
     * Contains the breakpoint units.
     * 
     * @type Array
     */
    _lengths: [],
    format: function (diff) {
        var keys = FuzzyTime._lengths.slice(0),
            previousLength = 0,
            text = '',
            length,
            unitName,
            unitCount;
        
        if (typeof diff !== 'number' || isNaN(diff)) {
            throw new Error('Only numbers are accepted');
        }
        
        if (diff === 0) {
            return 'now';
        }
        
        do {
            length = keys.pop();
            unitName = FuzzyTime._units[length];
            
            unitCount = diff;
            if (previousLength) {
                unitCount %= previousLength;
            }
            
            unitCount /= length;
            unitCount = Math.floor(Math.abs(unitCount));
            
            if (unitCount) {
                text += unitCount + ' ' + unitName[(unitCount > 1) ? 1 : 0] + ' ';
            }
            
            previousLength = length;
            
        } while (keys.length);
        
        if (diff < 0) {
            text += 'before';
        } else {
            text += 'ago';
        }
        
        return text;
    }
};

(function () {
    var i;
    
    for (i in FuzzyTime._units) {
        if (FuzzyTime._units.hasOwnProperty(i)) {
            FuzzyTime._lengths.push(parseInt(i, 10));
        }
    }
    
    /**
     * Ensure that our keys array is sorted, because the JS runtime does 
     * not guarranty the order on which the for in iterator returns the keys. 
     */
    FuzzyTime._lengths.sort(function (a, b) {
        if (a > b) {
            return 1;
        }

        if (a < b) {
            return -1;
        }

        return 0;
    });
}());