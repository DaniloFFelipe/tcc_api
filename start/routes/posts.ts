import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'PostsController.store')
  Route.get('/', 'PostsController.index')
  Route.get('/:id', 'PostsController.show')
  Route.put('/:id', 'PostsController.update')
  Route.delete('/:id', 'PostsController.destroy')
  Route.get('/mine', 'PostsController.postMe')
})
  .prefix('/posts')
  .middleware('log')
  .middleware('auth')
