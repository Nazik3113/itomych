Array.prototype.uniq = function name() {
    let uniq = [];
    for (var index = 0; index < this.length; index++) {
        if (uniq.indexOf(this[index]) === -1 && this[index] !== '') {
            uniq.push(this[index]);
        }
    }
    return uniq;
}; // нативна реалізація

// Array.prototype.uniq = function name() {
//     return [...new Set(this)];
// }; // реалізація через можливості ES6

console.log([1, 1, 2, 2, 3, 3, "a", "a"].uniq());