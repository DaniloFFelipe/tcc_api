import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/upload', 'ThumbnailsController.upload')
})
  .prefix('/thumbnails')
  .middleware('log')
  .middleware('auth')
