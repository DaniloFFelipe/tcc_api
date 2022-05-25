import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/signup', 'UsersController.signUp')
  Route.post('/login', 'UsersController.login')
  Route.post('/checkUsername', 'UsersController.checkUsername')
  Route.post('/checkEmail', 'UsersController.checkEmail')
  Route.post('/avatar', 'UsersController.addAvatar').middleware('auth')
}).prefix('/users')
