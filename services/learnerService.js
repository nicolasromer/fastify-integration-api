const baseUrl = 'https://kbfszrxx5vacidgrgdhqzu25r40vyyuw.lambda-url.eu-central-1.on.aws/api/learners';

/*
interface Learner {
	id: string;
	name: string;
}
*/

const mapLearner = ({
		id,
		name
	})/* : Learner */ => ({
		id,
		name
	});

module.exports = {
	getAll(learnerIds) /* : Learner[] */ {
		return learnersPromise = fetch(baseUrl)
			.then(response => response.json())
			.then(data => data.learners.map(mapLearner))
			.then(learners => learners.filter(learner => learnerIds.includes(learner.id)));
	}
}

