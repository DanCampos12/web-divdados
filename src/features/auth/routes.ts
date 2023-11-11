import AuthComponent from './AuthComponent.vue'
import SignInComponent from './pages/sign-in/SignInComponent.vue'
import SignUpComponent from './pages/sign-up/SignUpComponent.vue'
import RecoverPasswordComponent from './pages/recover-password/RecoverPasswordComponent.vue'
import ChangePasswordComponent from './pages/change-password/ChangePasswordComponent.vue'

export default [
  {
    path: '/auth',
    name: 'Auth',
    redirect: { name: 'Auth.SignIn' },
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        name: 'Auth.SignIn',
        component: SignInComponent,
        meta: { title: 'DivDados - Login' }
      },
      {
        path: 'sign-up',
        name: 'Auth.SignUp',
        component: SignUpComponent,
        meta: { title: 'DivDados - Cadastre-se' }
      },
      {
        path: 'recover-password',
        name: 'Auth.RecoverPassword',
        component: RecoverPasswordComponent,
        meta: { title: 'DivDados - Recuperar Senha' }
      },
      {
        path: 'change-password',
        name: 'Auth.ChangePassword',
        component: ChangePasswordComponent,
        meta: { title: 'DivDados - Alterar Senha' }
      }
    ]
  }
]
