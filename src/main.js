import { createApp } from 'vue'
import fendui from './fendui/entry.esm'

import { createRouter, createWebHistory} from 'vue-router'

import App from './App.vue'
import config from './fendui/config'

import '/asset/CSS/main.css';

import homePage from '../pages/index.vue'
import notFoundPage from '../pages/notFound.vue'


const app = createApp(App)

app.use(fendui, config)


const configRouter = () => {
    const Home = {
        path: '/',
        component:homePage
    }

    const NotFound =  {path: '/:pathMatch(.*)*', name: 'not-found', component: notFoundPage 
    }

    const routes = [Home,NotFound]

    const router = createRouter({
        history: createWebHistory('/'),
        routes,
    })

    return router   
}

const router = configRouter()

app.use(router);

app.mount('#app')
