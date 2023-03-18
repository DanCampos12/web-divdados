import AuthComponent from './AuthComponent.vue'
import SignInComponent from './components/sign-in/SignInComponent.vue'
import SignUpComponent from './components/sign-up/SignUpComponent.vue'

export default [
  {
    path: 'auth',
    name: 'Main.Auth',
    redirect: { name: 'Main.Auth.SignIn' },
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        name: 'Main.Auth.SignIn',
        component: SignInComponent,
        meta: { title: 'DivDados - Login' }
      },
      {
        path: 'sign-up',
        name: 'Main.Auth.SignUp',
        component: SignUpComponent,
        meta: { title: 'DivDados - Cadastre-se' }
      }
    ]
  }
]
