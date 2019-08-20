# CakesWithMates

This is Next js SSR React app styled with Material-ui, and a graphql backend using Graphql Yoga. It was deployed on Now.

You will need to install Next and Now to run the app locally.

### Demo

A live demo can be found [here](https://ph-cakes-test.now.sh), it is a demo server so is frozen relatively quickly when it is inactive.
So the first time you visit it it may be a bit slow to load, as the server may have to be unfrozen (rebuilt). This is also true for the
backend server, so the first time the page loads it may cause an error as the client will trigger the backend to be unfrozen, and the cakes
wont load as the backend isn't immidiatly available. If this happens then try refreshing the page, that should fix the issue.

### Testing

I have split components out to presentational and container components that handle data fetching. This helps with testing in that, I can
test the component handling props and the data fetching seperatly as they are two different concerns.
