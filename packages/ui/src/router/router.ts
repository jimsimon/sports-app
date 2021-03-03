import { Router } from '@vaadin/router';

const outlet = document.querySelector('theme-provider');
export const router: Router = new Router(outlet);
router.setRoutes([
  {
    path: '/login',
    component: 'login-page',
    action: async () => {
      await import('../components/login-page/login-page.container');
    },
  },
  {
    path: '/signup',
    component: 'signup-page',
    action: async () => {
      await import('../components/signup-page/signup-page.container');
    },
  },
  {
    path: '(.*)',
    component: 'page-not-found',
    action: async () => {
      await import('../components/page-not-found/page-not-found');
    },
  },
]);
