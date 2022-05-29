import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'SubjectsController.store')
  Route.get('/', 'SubjectsController.index')
})
  .prefix('/subjects')
  .middleware('log')
  .middleware('auth')
