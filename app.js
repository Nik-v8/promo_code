

const calculatePromocode = (code) => {
	const getDigit = (index) => {
		const l = Math.pow(10, Math.floor(Math.log(code) / Math.log(10)) - index);
    	const b = Math.floor(code / l);
    	const digit = b - Math.floor(b / 10) * 10;

    	return digit;
	}

	const digitArray = [];

	for (let i = 0; i < 8; i++) {
		const digit = getDigit(i);		
      	digitArray.push(digit);
	}

	const maxPriorityValidation = () => {
		const firstPair = {
			start: null,
			end: null,
		};

		const secondPair = {
			start: null,
			end: null,
		};

		let firstPairCreated = false;
		let secondPairCreated = false;

		let isPrevOdd = false;

		digitArray.forEach((digit, index) => {
			const isCurrentOdd = digit % 2 !== 0;

			if (!isPrevOdd && isCurrentOdd) {
				isPrevOdd = true;

				if (!firstPairCreated) {
					firstPair.start = {
						index: index,
						value: digit,
					};
				} else if (!secondPairCreated) {
					secondPair.start = {
						index: index,
						value: digit,
					};
				}				

			} else if (isPrevOdd && isCurrentOdd) {
				isPrevOdd = false;

				if (!firstPairCreated) {
					firstPair.end = {
						index: index,
						value: digit,
					};
				} else if (!secondPairCreated) {
					secondPair.end = {
						index: index,
						value: digit,
					};
				}

			} else if (isPrevOdd && !isCurrentOdd) {
				isPrevOdd = false;
			}	

			if (firstPair.start !== null && firstPair.end !== null) {
				firstPairCreated = true;
			}

			if (secondPair.start !== null && secondPair.end !== null) {
				secondPairCreated = true;
			}
		});


		if (firstPairCreated && secondPairCreated 
			&& (firstPair.start.value < firstPair.end.value) && (secondPair.start.value < secondPair.end.value)
			) {


			let validationResult = digitArray.some((digit, index) => {
				const isCurrentEven = digit % 2 === 0;

				if (index > firstPair.end.index && index < secondPair.start.index && isCurrentEven) {
					return true;
				} 	
			});

			return validationResult;
		} else {
			return false;
		}

		return false;
	}

	const secondPriorityValidation = () => {
		const firstPair = {
			start: null,
			end: null,
		};

		const secondPair = {
			start: null,
			end: null,
		};

		let firstPairCreated = false;
		let secondPairCreated = false;

		let isPrevOdd = false;

		digitArray.forEach((digit, index) => {
			const isCurrentOdd = digit % 2 !== 0;

			if (!isPrevOdd && isCurrentOdd) {
				isPrevOdd = true;

				if (!firstPairCreated) {
					firstPair.start = index;
				} else if (!secondPairCreated) {
					secondPair.start = index;
				}				

			} else if (isPrevOdd && isCurrentOdd) {
				isPrevOdd = false;

				if (!firstPairCreated) {
					firstPair.end = index;
				} else if (!secondPairCreated) {
					secondPair.end = index;
				}

			} else if (isPrevOdd && !isCurrentOdd) {
				isPrevOdd = false;
			}	

			if (firstPair.start !== null && firstPair.end !== null) {
				firstPairCreated = true;
			}

			if (secondPair.start !== null && secondPair.end !== null) {
				secondPairCreated = true;
			}
		});


		if (firstPairCreated && secondPairCreated) {
			let validationResult = digitArray.some((digit, index) => {
				const isCurrentEven = digit % 2 === 0;

				if (index > firstPair.end && index < secondPair.start && isCurrentEven) {
					return true;
				} 	
			});

			return validationResult;
		} else {
			return false;
		}

		return false;
	}

	const thirdPriorityValidation = () => {
		let oddSum = 0;
		let evenSum = 0;
	
		digitArray.forEach((digit) => {
          	if (digit % 2 !== 0) {
          		oddSum += digit;
          	} else {
          		evenSum += digit;	
          	}
		});

		return evenSum > oddSum;
	}

	if (maxPriorityValidation()) {
		return 2000;
	} else if (secondPriorityValidation()) {
		return 1000;
	} else if (thirdPriorityValidation()) {
		return 100;
	} else {
		return 0;
	}

  // 2000  -> 11 14 37 88

  // 1000  -> 11 44 37 88

  // 100   -> 11 44 37 88  \\ 1 + 1 + 3 + 7 

  // 0
}

console.log('2000', calculatePromocode(37283988));
console.log('1000', calculatePromocode(73289388));
console.log('100', calculatePromocode(48183276));
console.log('0', calculatePromocode(84533920));


