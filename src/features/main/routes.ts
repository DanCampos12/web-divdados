import MainComponent from './MainComponent.vue'
import HomeComponent from './pages/home/HomeComponent.vue'
import OperationComponent from './pages/operation/OperationComponent.vue'
import EventComponent from './pages/event/EventComponent.vue'
import ObjectiveComponent from './pages/objective/ObjectiveComponent.vue'
import CategoryComponent from './pages/category/CategoryComponent.vue'
import SettingsComponent from './pages/settings/SettingsComponent.vue'

export default [
  {
    path: '/main',
    name: 'Main',
    redirect: { name: 'Main.Home' },
    component: MainComponent,
    children: [
      {
        path: 'home',
        name: 'Main.Home',
        component: HomeComponent,
        meta: { title: 'DivDados - Inicío' }
      },
      {
        path: 'operation',
        name: 'Main.Operation',
        component: OperationComponent,
        meta: { title: 'DivDados - Operações' }
      },
      {
        path: 'event',
        name: 'Main.Event',
        component: EventComponent,
        meta: { title: 'DivDados - Eventos' }
      },
      {
        path: 'objective',
        name: 'Main.Objective',
        component: ObjectiveComponent,
        meta: { title: 'DivDados - Objetivos' }
      },
      {
        path: 'category',
        name: 'Main.Category',
        component: CategoryComponent,
        meta: { title: 'DivDados - Categorias' }
      },
      {
        path: 'settings',
        name: 'Main.Settings',
        component: SettingsComponent,
        meta: { title: 'DivDados - Configurações' }
      }
    ]
  }
]
