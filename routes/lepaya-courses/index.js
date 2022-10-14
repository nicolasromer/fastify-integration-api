'use strict'
const courseService = require("../../services/courseService.js");
const trainerService = require("../../services/trainerService.js");
const learnerService = require("../../services/learnerService.js");
const fetch = require("node-fetch");

const trainerTransformer = ({id, name}) => {id, name}
const learnerTransformer = ({id, name}) => {id, name}
const courseTransformer = ({id, title, date}, trainer, learners) => ({
  id,
  title,
  date: date.toISOString(),
  trainer: trainerTransformer(trainer),
  learners: learners.map(learnerTransformer(learner)),
})

module.exports = async function (fastify, opts) {
  fastify.get('/:courseId', async function (request, reply) {
    const { courseId } = request.params;
    
    const course = await courseService.get(courseId)
   
    const [trainer, learners] = await Promise.all([
      trainerService.get(course.trainerId),
      learnerService.getAll(course.learnerIds)
    ]);   

    const courseRepresentation = courseTransformer(course, trainer, learners);

    reply.send(courseRepresentation);
  })
}