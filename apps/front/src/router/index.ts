import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    // Learn about nested routes - all these will use MainLayout
    children: [
      {
        // Learn about default child route
        path: '',
        redirect: '/articles' // Default route redirects to articles
      },
      {
        // Learn about route configuration with lazy loading
        path: 'articles',
        name: 'articles',
        component: () => import('../pages/ArticlesPage.vue') // Lazy loaded
      },
      {
        path: 'sources',
        name: 'sources',
        component: () => import('../pages/SourcesPage.vue')
      },
      // {
      //   path: 'prompts',
      //   name: 'prompts',
      //   component: () => import('../pages/PromptsPage.vue')
      // },
      // {
      //   // Learn about dynamic route parameters
      //   path: 'articles/:id/edit',
      //   name: 'article-edit',
      //   component: () => import('../pages/ArticleEditPage.vue'),
      //   // Learn about route props
      //   props: true
      // }
    ]
  },
  {
    // Learn about catch-all/404 route
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue')
  }
]

// Create and configure router instance
const router = createRouter({
  // Learn about history mode
  history: createWebHistory(),
  routes
})

// Learn about navigation guards
router.beforeEach((to, from, next) => {
  // Example of global navigation guard
  // You can add authentication logic here later
  next()
})

export default router