export const parseResult = (defenderHp: number, damageArray: number | number[] | [number[], number[]]) => {
    if (typeof(damageArray) === 'number') {
        return  '0-0 (0 - 0%) -- possibly the worst move ever';
    }

    if (damageArray[0] instanceof Array) {
        throw 'Invalid string';
    }

    const minDamage = damageArray[0];
    const maxDamage = damageArray[damageArray.length - 1] as number;

    const minPercent = minDamage * 100 / defenderHp;
    const maxPercent = maxDamage * 100 / defenderHp;

    let conclusion = 'possibly the worst move ever';
    
    [9, 8, 7, 6, 5, 4, 3, 2].forEach(n => {
        if (maxPercent > 100 / n && minPercent < 100 / n) conclusion = 'possible ' + n + 'HKO'
        if (minPercent > 100 / n && maxPercent < 100 / (n - 1)) conclusion = 'guaranteed ' + n + 'HKO';
    });

    if (minPercent > 100) conclusion = 'guaranteed OHKO';
    else if (maxPercent > 100 && minPercent < 100) conclusion = 'chance to OHKO';
    
    return minDamage + '-' + maxDamage + ' (' + minPercent.toFixed(1) + ' - ' + maxPercent.toFixed(1) + '%) -- ' + conclusion;
}
