import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {name: 'home', path: '/', component:() => import('@/pages/HomePage.vue')  },
    {
        name: 'auth',
        path: '/auth',
        component:() => import('@/pages/AuthPage.vue'),
        children: [
            {name: 'login', path: 'login', component:() => import('@/components/forms/LoginForm.vue')},
            {name: 'register', path: 'register', component: () => import('@/components/forms/RegisterForm.vue')},
            {path: '', redirect: { name: 'register' }},
        ]
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;