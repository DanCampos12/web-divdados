import MainComponent from './MainComponent.vue'
import HomeComponent from '../home/HomeComponent.vue'
import OperationComponent from '../operation/OperationComponent.vue'
import EventComponent from '../event/EventComponent.vue'
import ObjectiveComponent from '../objective/ObjectiveComponent.vue'
import CategoryComponent from '../category/CategoryComponent.vue'

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
        component: HomeComponent
      },
      {
        path: 'operation',
        name: 'Main.Operation',
        component: OperationComponent
      },
      {
        path: 'event',
        name: 'Main.Event',
        component: EventComponent
      },
      {
        path: 'objective',
        name: 'Main.Objective',
        component: ObjectiveComponent
      },
      {
        path: 'category',
        name: 'Main.Category',
        component: CategoryComponent
      }
    ]
  }
]
