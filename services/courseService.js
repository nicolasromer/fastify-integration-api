
/*
interface Course {
	id: string;
	title: string;
	date: Date;
	trainerId: string;
	learnerIds: string[];
}
*/

/*
interface CourseRepresentation {
	id: string;
	title: string;
	date: ISODateString;
	trainer: Trainer;
	learners: Learner[];
}
*/

// todo: create proper client abstraction
const courseProvider = {
	url: 'https://kbfszrxx5vacidgrgdhqzu25r40vyyuw.lambda-url.eu-central-1.on.aws/api/courses/',
	map: ({
		id,
		title,
		date,
		trainerId,
		learners
	})/* : Course */ => ({
		id,
		title,
		date: new Date(date),
		trainerId,
		learnerIds: learners,
	})
}

module.exports = {
	get(courseId) /* Promise */ {
		return fetch(courseProvider.url + courseId)
	    	.then(response => response.json())
	    	.then(courseProvider.map);
	},
	transform: ({id, title, date} /*: Course */) /* : CourseRepresentation */ => ({
  		id, 
  		title,
  		date: date.toISOString(),
	}),
}

