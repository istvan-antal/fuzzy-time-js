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
    getUnitDistribution: function (amount) {
        var keys = FuzzyTime._lengths.slice(0),
            previousLength = 0,
            length,
            unitCount,
            result = [];
        
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error('Only numbers are accepted');
        }
        
        if (amount === 0) {
            return [];
        }
        
        do {
            length = keys.pop();
            
            unitCount = amount;
            if (previousLength) {
                unitCount %= previousLength;
            }
            
            unitCount /= length;
            unitCount = Math.floor(Math.abs(unitCount));
            
            result.push({
                length: length,
                count: unitCount
            });
            
            previousLength = length;
            
        } while (keys.length);
        
        return result;
    },
    /**
     * Returns a fuzzy represenation of the time diff that is more human readable.
     * 
     * @param {Number} diff
     * @param {?Object} options
     * 
     * @returns {String}
     */
    getFuzzyTimeString: function (diff, options) {
        var text = '',
            done = false,
            foundFirstLevel = false,
            levels,
            units,
            distribution = FuzzyTime.getUnitDistribution(diff);
        
        if (!distribution.length) {
            return 'now';
        }
        
        options = options || {};
        levels = options.maxLevels || - 1;
        units = options.maxUnits || - 1;
        
        distribution.forEach(function (item) {
            if (done) {
                return;
            }
            
            if (item.count) {
                text += item.count + ' ' + FuzzyTime._units[item.length][(item.count > 1) ? 1 : 0] + ' ';
                foundFirstLevel = true;
            }
            
            if (foundFirstLevel && levels !== -1) {
                levels -= 1;
                
                if (!levels || !item.count) {
                    done = true;
                }
            }
            
            if (foundFirstLevel && item.count && units !== -1) {
                units -= 1;
                
                if (!units) {
                    done = true;
                }
            }
        });
        
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
    
    /*
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