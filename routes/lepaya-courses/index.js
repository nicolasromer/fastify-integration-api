'use strict'
const courseService = require("../../services/courseService.js");
const trainerService = require("../../services/trainerService.js");
const learnerService = require("../../services/learnerService.js");
const fetch = require("node-fetch");

// decouple our internal representation from the external one
const fullCourseTransformer /* FullCourseRepresentation  */ = (course, trainer, learners) => ({
  ...courseService.transform(course),
  trainer: trainerService.transform(trainer),
  learners: learnerService.transformAll(learners),
})

module.exports = async function (fastify, opts) {
  fastify.get('/:courseId', async function (request, reply) {
    const { courseId } = request.params;
    
    const course = await courseService.get(courseId);  
   
    const [trainer, learners] = await Promise.all([
      trainerService.get(course.trainerId),
      learnerService.getAll(course.learnerIds)
    ]);   

    const courseRepresentation = fullCourseTransformer(course, trainer, learners);

    reply.send(courseRepresentation);
  })
}