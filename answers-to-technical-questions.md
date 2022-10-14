# Questions

## How much time spent? 
About 4 hours total spent on this trivial solution. 

If I had more time there are many basic function not yet implemented like validation, error handling, endpoint versioning, thinking about service configuration (horizontal scaling, health checks, monitoring, stress testing), adding API documentation like swagger, etc. I would also implement typescript throughout, I have noted some types in comments where I thought they were relevant to my main idea here. I think Typescript is actually essential for my approach to really make sense.

I would also like to extract a client for the 3rd party api so that we can easily create a new client for any new integrations. Without more details on how this service will be used and what other integrations will be needed it's hard to create a multi-client abstraction at this point.

The test should use mock data, or a test endpoint if the 3rd party api supplied it.

## Solution in plain english

Since we are dealing with a third party api, I wanted to focus on having clear states for the data we are fetching and serving. Here are the three states as I understand it:

1. raw data provided by 3rd party APIs
2. our internal representation of those domain entities
3. our exposed representation, served by the API

In the services I created we would be able to see all those states beside each other in one file — see the types in `courseService.js` for example. This helps to have clarity on our data transformations and makes our entities easier to reason about, e.g where to use which data, what data is available, etc.

In the controller we use the services to optimize our data fetching, for example by parellelizing where possible. Otherwise business logic and transformations should be hidden away.

regarding DDD: I think without more domain knowledge it's hard to split up the learners/trainers/courses properly. If this were to grow I would have separate folders at the root for each of the important domain entities with all the relevant logic therein.

## Today I learned
i used `Fastify.js` for the first time today, I have wanted to try it out for ages. It's a blazing fast node API with really minimal and non-opinionated functioning, so I thought it good for a small backend project. This would also be good for this kind of integration since we may need to scale up and down quickly, and having a lightweight application like this will make spinning up new pods efficient. There is also a plugin system that would allow us to create some interesting re-usable components, while keeping things decoupled on a process level. The whole framework is geared towards keeping the code clean enough to later extract into microservices.

## Improving the third party API
3 ideas in order of complexity:
1. ideally the third party would have a webhook that would send us a notification whenever a course or learner is created or altered. Then we could keep our own up-to-date representation of the courses in a database by having a separate worker process fetching the data continually. This way we can accelerate the requests for our users, implement caching, and also have a fallback if the third party API goes down.

2. if it were a graphql api we could have only one api request for our controller.
3. they could allow parameters, for example sending a list of learner IDs, or a list of course IDs, to fetch them in a single request. then we could really optimize the current solution by batching requests.

# nicolas-romer.json
```
{
	"nickname": "nick",
	"formerCareers": ["bike mechanic", "painter"],
	"languagesSpoken": ["English", "French", "Dutch"],
	"nextHoliday": "bike to paris",
	"instrumentsPlayed": ["ukulele"],
	"funFact": "likes Chiuauas a bit too much",
	"height": "195cm",
	"sportsPlayed": ["padel", "basketball", "bouldering"],
	"placeOfOrigin": "montreal, canada",
	"favouritePlaceholderText": "i love bacon",
}
```



