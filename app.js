function findNumbersWithTwoSums(numArray) {
    //create an empty array called result
    const result = [];

    //loop through the numbers in the numArray
    for (let i = 0; i < numArray.length; i++) {
        //create another loop that loop that iterates through numArray 
        //starting from the index immediately following the [i] loop selected number.
        for (let j = i + 1; j < numArray.length; j++) {
            //calculate the sum of individual numbers in [i] and [j] and store it in the sum variable.
            const sum = numArray[i] + numArray[j];
            //if sum is present in numArray and if it hasn't already been added to the result array.
            if (numArray.includes(sum) && !result.includes(sum)) {
                //add the sum to the result array.
                result.push(sum);
            }
        }
    }

    return result;
}

const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numbersWithTwoSums = findNumbersWithTwoSums(numArray);
console.log(numbersWithTwoSums); // This will print [4, 5, 6, 7, 8, 9, 10]