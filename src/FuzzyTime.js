var FuzzyTime = {
    format: function ($diff) {
        var $breakpoints = {
                1: ['second', 'seconds'],
                60: ['minute', 'minutes'],
                3600: ['hour', 'hours'],
                86400: ['day', 'days']
            },
            $keys = [],
            i,
            $prev_value = 0,
            $text = '',
            $value,
            $unit,
            $units;
    
        if (typeof $diff !== 'number' || isNaN($diff)) {
            throw new Error('Only numbers are accepted');
        }
        
        for (i in $breakpoints) {
            if ($breakpoints.hasOwnProperty(i)) {
                $keys.push(i);
            }
        }
        
        do {
            $value = $keys.pop();
            $unit = $breakpoints[$value];
            
            $units = $diff;
            if ($prev_value) {
                $units %= $prev_value;
            }
            
            $units /= $value;
            $units = Math.floor(Math.abs($units));
            
            if ($units) {
                $text += $units + ' ' + $unit[($units > 1) ? 1 : 0] + ' ';
            }
            
            $prev_value = $value;
            
        } while ($keys.length);
        
        if ($diff < 0) {
            $text += 'before';
        } else {
            $text += 'ago';
        }
        
        return $text;
    }
};