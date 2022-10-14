const baseUrl = 'https://kbfszrxx5vacidgrgdhqzu25r40vyyuw.lambda-url.eu-central-1.on.aws/api/courses/';

/*
interface Course {
	id: string;
	title: string;
	date: Date;
	trainerId: string;
	learnerIds: string[];
}
*/

const mapCourse = ({
		id,
		title,
		date,
		trainerId,
		learners
	}) => ({
		id,
		title,
		date: new Date(date),
		trainerId,
		learnerIds: learners,
	});

module.exports = {
	get(courseId) /* Promise */ {
		return fetch(baseUrl + courseId)
	    	.then(response => response.json())
	    	.then(mapCourse);
	},
	transform: ({id, title, date} /*: Course */) /* : CourseRepresentation */ => ({
  		id, 
  		title,
  		date: date.toISOString(),
	}),
}

