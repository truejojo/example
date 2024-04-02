const useDate = () => {
	const short = new Intl.DateTimeFormat('de-DE', { dateStyle: 'short' });
	const medium = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium' });
	const long = new Intl.DateTimeFormat('de-DE', { dateStyle: 'long' });
	const full = new Intl.DateTimeFormat('de-DE', { dateStyle: 'full' });

	const getTimestampDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month =
			date.getMonth() + 1 < 10
				? '0' + (date.getMonth() + 1)
				: date.getMonth() + 1;
		const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

		return `${year}${month}${day}`;
	};

	const getTimestampFull = () => {
		const date = new Date();
		const hours =
			date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		const minutes =
			date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		const seconds =
			date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

		return `${getTimestampDate()}${hours}${minutes}${seconds}`;
	};

	const getShortDate = () => short.format(new Date());

	const getMediumDate = () => medium.format(new Date());

	const getLongDate = () => long.format(new Date());

	const getFullDate = () => full.format(new Date());

	return {
		getTimestampDate,
		getTimestampFull,
		getShortDate,
		getMediumDate,
		getLongDate,
		getFullDate,
	};
};

export default useDate;
