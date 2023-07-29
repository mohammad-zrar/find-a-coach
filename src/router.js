import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/choaches/CoachDetail.vue';
import CoachList from './pages/choaches/CoachesList.vue';
import CoachRegistration from './pages/choaches/ChoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      children: [
        { path: 'contact', component: ContactCoach }, // coaches/c1/contact
      ],
    },
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestReceived },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
