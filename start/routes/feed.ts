import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/get-feed', 'FeedsController.getFeed')
  Route.get('/get-subject', 'FeedsController.getSubject')
  Route.get('/search-post', 'FeedsController.searchPost')
})
  .prefix('/feed')
  .middleware('log')
  .middleware('auth')
