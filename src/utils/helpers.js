export function arrayMoveItem(array, index, newIndex) {
	let newArr = [];

	// If the index to move doesn't exist, do nothing
	if (index > array.length - 1) {
		return array;
	}

	const movedItem = array.slice(index, index + 1)[0];
	array.splice(index, 1);
	array.splice(newIndex, 0, movedItem);

	return array;
}

console.log(arrayMoveItem([1, 2, 3], 1, 2));
console.log(arrayMoveItem([1, 2, 3], 2, 4));
