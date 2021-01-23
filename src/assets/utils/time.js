function timeArrToLocaleTime(arr) {
	arr = arr.slice(0, -1);
	arr[0] -= 1;
	return new Date(...arr).toLocaleString();
}

export {
	timeArrToLocaleTime
};