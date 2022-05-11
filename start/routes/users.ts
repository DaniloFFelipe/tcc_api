import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'UsersController.signUp')
  Route.post('/checkUsername', 'UsersController.checkUsername')
  Route.post('/checkEmail', 'UsersController.checkEmail')
}).prefix('/users')
