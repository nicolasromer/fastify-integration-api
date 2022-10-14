'use strict'

const fetch = require("node-fetch");

// module.exports = async function (fastify, opts) {
//   fastify.get('/', async function (request, reply) {
//     return 'Lepaya course api'
//   })
// }

module.exports = async function (fastify, opts) {
  fastify.get('/:courseUid', async function (request, reply) {
    const { courseUid } = request.params;

    const baseUrl = 'https://kbfszrxx5vacidgrgdhqzu25r40vyyuw.lambda-url.eu-central-1.on.aws/api';
    
    const courseUrl = baseUrl + '/courses/' + courseUid;
    const course = await fetch(courseUrl)
      .then(response => response.json());

   
    const { trainerId, learners } = course;

    const trainerUrl = baseUrl + '/trainers/' + trainerId;
    const trainerPromise = fetch(trainerUrl)
      .then(response => response.json());

    const learnersUrl = baseUrl + '/learners';
    const learnersPromise = fetch(learnersUrl)
      .then(response => response.json());

    const [trainerData, learnersData] = await Promise.all([trainerPromise, learnersPromise]);

    const relevantLearners = learnersData.learners.filter(learner => course.learners.includes(learner.id) )


    const {id, title, date} = course;

    const payload = {
      id, title, date,
      trainer: trainerData,
      learners: relevantLearners,
    };

    reply.send(payload);
  })
}