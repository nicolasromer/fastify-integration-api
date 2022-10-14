const baseUrl = 'https://kbfszrxx5vacidgrgdhqzu25r40vyyuw.lambda-url.eu-central-1.on.aws/api/trainers/';

/*
interface Trainer {
	id: string;
	name: string;
}
*/

const mapData = ({
		id,
		name
	}) => ({
		id,
		name
	});

module.exports = {
	get(trainerId) /* : Promise */ {
		return fetch(baseUrl + trainerId)
			.then(response => response.json())
			.then(mapData);
	},
	transform: ({id, name} /*: Trainer */) /* : TrainerRepresentation */ => ({
  		id, 
  		name,
	}),
}

