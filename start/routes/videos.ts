import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/upload', 'VideosController.upload')
})
  .prefix('/videos')
  .middleware('auth')
