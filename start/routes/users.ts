import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/signin', 'UsersController.signUp')
  Route.post('/login', 'UsersController.login')
  Route.post('/checkUsername', 'UsersController.checkUsername')
  Route.post('/checkEmail', 'UsersController.checkEmail')
  Route.post('/avatar', 'UsersController.addAvatar').middleware('auth')
  Route.get('/me', 'UsersController.me').middleware('auth')
  Route.get('/me/posts', 'PostsController.postMe').middleware('auth')
})
  .prefix('/users')
  .middleware('log')
