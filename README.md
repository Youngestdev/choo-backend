## Running

```bash
export AUTH0_CLIENT_ID=AA...
export AUTH0_DOMAIN=your-subdomain.auth0.com
npm start

# get current recipes
curl localhost:8081

# get an $ID_TOKEN somehow
# insert recipe
curl -X POST localhost:8081 -h 'Authorization: Bearer '$ID_TOKEN -d '{
  title: 'Quick Tomato Sandwich',
  ingredients: 'Two slices of bread, ham, cheese, and butter',
  directions: 'Spread the butter on both slices, add cheese and ham, and enjoy.'
}'
```
