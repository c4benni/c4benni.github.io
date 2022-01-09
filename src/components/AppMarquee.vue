<script lang='ts'>
import {defineComponent, h, onMounted, reactive, RendererElement, RendererNode, resolveComponent, VNode, VNodeArrayChildren, VNodeProps} from 'vue'

type VNodeData =  VNodeProps&{ __v_isVNode?: never;[Symbol.iterator]?: never; }&Record<string, any>

type VNodeChild = string|number|boolean|VNode<RendererNode, RendererElement, { [key: string]: any; }>|VNodeArrayChildren|(() => any)|{ [name: string]: unknown; $stable?: boolean; }

const div =  (d: VNodeData, c: VNodeChild) => h('div', d, c)

type IntersectionPayload = {
    isIntersecting: boolean
}

export default defineComponent( {
    name:'AppMarquee',

    setup(){
        const state = reactive({
            items: [{
                title:'CSS',
                icon:'css'
            },{
                title:'JavaScript',
                icon:'js'
            },{
                title:'NodeJS',
                icon:'node'
            },{
                title:'PostgreSQL',
                icon:'postgresql'
            },
            {
                title:'TypeScript',
                icon:'ts'
            },{
                title:'VueJs',
                icon:'vue'
            },{
                title:'NuxtJS',
                icon:'nuxt'
            },{
                title:'React Native',
                icon:'react'
            },{
                title:'TailwindCSS',
                icon:'tailwind'
            },{
                title:'Vuetify',
                icon:'vuetify'
            },{
                title: 'MySQL',
                icon: 'mysql'
            },{
                title:'Git',
                icon:'git'
            },{
                title:'Supabase',
                icon:'supabase'
            },{
                title:'Firebase',
                icon:'firebase'
            },{
                title:'GraphQL',
                icon:'graphql'
            }],
            mounted: false,
            intersecting: false
        })

        onMounted(()=>{
            state.mounted = true;
        })

        return function(){
            const isMobile = /sm|xs|xxs/.test(this.$breakpoints.is)

            return div({
                class:'root'
            },[
                // @ts-ignore
                h(resolveComponent('UiIntersection'), {}, {
                    default: (payload: IntersectionPayload) => {
                        state.intersecting = payload.isIntersecting;

                        return div({
                            class: 'pseudo fill-before'
                        },[])
                    }
                }),

                div({
                    class: 'wrap',
                    style:{
                        animationPlayState: !state.intersecting ? 'paused' : undefined,
                        willChange: !state.intersecting ? 'auto' : undefined
                    }
                },[
                    [1, 2].map(()=> {
                        return state.items.map((item, index)=>{

                            const imgHeight = isMobile ? '56' : '96'

                            return  div({
                                key: index,
                                class:'item',
                            },  [
                                h(resolveComponent('UiImg'),{
                                    src: `https://res.cloudinary.com/c4benn/image/upload/c_scale,h_${imgHeight}/v1641660749/portfolio/icons/${item.icon}.png`,
                                    alt: `${item.title} logo`,
                                    height: `${imgHeight}px`
                                }),

                                div({
                                    class: 'overlay'
                                },[
                                    div({
                                        class: 'label fill-before'
                                    },[
                                        item.title
                                    ])
                                ])
                            ]) 
                        })
                    })
                ])
            ])
        }
    },
})
</script>

<style scoped> 
    .root{
        width: min(100vw, 1200px);
        height: 200px;
        margin: 8rem 0;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
        isolation: isolate;
        pointer-events: none;
    }

    .sm-down .pseudo::before{
        border: solid;
        border-width: 0.75px 0;
        opacity: .15;
        border-radius: 0;
    }

    .md-up .root{
        margin: 8rem 0;
    }

    @media (min-width: 1200px){
        .root::before,
        .root::after{
            content: '';
            width: 50px;
            height: 100%;
            display: block;
            background-image: linear-gradient(var(--linear-dir), #000, #00000000);
            z-index: 1;
            pointer-events: auto;
        }

        .root::before{
            --linear-dir: to right;
        }

        .root::after{
            --linear-dir: to left;
        }                               
    }

    .wrap{
        will-change: transform;
        animation: marquee 60s linear infinite;
        display: grid;
        grid-auto-flow: column;
        column-gap: 1.5rem;
        align-items: center;
        flex-grow: 1;
        border-radius: var(--ui-rounded-lg);
        position: absolute;
        z-index: -1;
        height: 100%;
        pointer-events: auto;
    }

    .item{
        --size: 124px;
        min-width: var(--size);
        height: var(--size);
        border-radius: inherit;
        background: #111;
        pointer-events: auto;
        display: grid;
        justify-content: center;
        text-align: center;
        align-items: center;
        position: relative;
        transition: .25s transform cubic-bezier(0.18, 0.89, 0.32, 1.28);
        font-weight: 500;
    }

    .md-up .item{
        --size: 180px;
    }

    @media (pointer: fine) and (hover: hover){
        .wrap:hover .item{
            transform: scale3d(0.95, 0.95, 1);
            opacity: 0.8;
        }

        .item:hover{
            transform: scale3d(1.1, 1.1, 1) !important;
            opacity: 1 !important;
        }

        .overlay{
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            left: 0;
            top: 0;
            background-color: #2e2e2ea4;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.25s linear;
            opacity: 0;
        }

        .overlay:hover{
            opacity: 1;
        }

        .label{
            color: #fff;
            font-weight: 500;
            font-size: 0.9rem;
            padding: 0 1.5rem;
            border-radius: 999px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            isolation: isolate;
            transition: .2s cubic-bezier(0.4, 0, 1, 1);
            transition-property: transform, opacity;
            opacity: 0;
            transform: translate3d(0, .5rem, 0);
        }

        .item:hover .label{
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }

        .label::before{
            background-color: #121213;
            z-index: -1;
            transition: opacity 0.25s;
        }

        .label:hover::before{
            opacity: .9;
        }
    }

    @keyframes marquee {  
        from {
            transform: translate3d(0, 0, 0);
        }  
        to {
            transform: translate3d(-50%, 0, 0);
        }
    }
</style>