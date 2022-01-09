<script lang='ts'>
import {defineComponent, h, reactive, RendererElement, RendererNode, resolveComponent, VNode, VNodeArrayChildren, VNodeProps} from 'vue'


type VNodeData =  VNodeProps&{ __v_isVNode?: never;[Symbol.iterator]?: never; }&Record<string, any>

type VNodeChild = string|number|boolean|VNode<RendererNode, RendererElement, { [key: string]: any; }>|VNodeArrayChildren|(() => any)|{ [name: string]: unknown; $stable?: boolean; }

const nav =  (d: VNodeData, c: VNodeChild) => h('nav', d, c)
const ul =  (d: VNodeData, c: VNodeChild) => h('ul', d, c)
const li =  (d: VNodeData, c: VNodeChild) => h('li', d, c)
const span =  (d: VNodeData, c: VNodeChild) => h('span', d, c)


// @ts-ignore
const btn =  (d: VNodeData, c: VNodeChild) => h(resolveComponent('UiBtn'), d, c)
// @ts-ignore
const Img =  (d: VNodeData) => h(resolveComponent('UiImg'), d)


export default defineComponent({
    name: 'BottomNav',
    setup(){
        return function(){

            const state = reactive({
                icons : [
                    {
                        title: 'Home',
                        icon:'home'
                    },
                    {
                        title: 'About',
                        icon: 'about'
                    },
                    {
                        title: 'Projects',
                        icon:'project'
                    },
                    {
                        title:'Reach out',
                        icon:'contact'
                    }
                ]
            })

            return nav({
                class:'root fill-before'
            },[
                ul({
                    class: 'ul'
                },[
                    state.icons.map((item,key)=>{
                        return li({
                            key,
                            class: ['li',{
                                'fill-before': key < state.icons.length - 1
                            }]
                        },[
                            btn({
                                // tag: 'router-link',
                                class:[{
                                    active: key == 0
                                }]
                            },{
                                default: ()=>{
                                    return [
                                        span({
                                            class:'icon'
                                        },[
                                            Img({
                                                src: `https://res.cloudinary.com/c4benn/image/upload/c_scale,h_128/v1641718581/portfolio/navIcons/${item.icon}.png`,
                                                alt: `${item.title} icon`,
                                                height: '24px',
                                                width: '24px',
                                                class:'icon'
                                            })
                                        ])
                                    ]
                                }
                            })
                        ])
                    })
                ])
            ])
        }
    }
})
</script>

<style scoped>
    .root{
        --ui-rounded: 1rem;
        height: 64px;
        min-width: 280px;
        width: calc(100%  - 4rem);
        max-width: 450px;
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        border-radius: var(--ui-rounded);
        z-index: 99;
        background-color: rgba(26, 26, 26, 0.9875);
    }

    .root:before{
        border: 0.5px solid;
        opacity: .1;
    }

    .br-sm.or-la .root{
        height: 56px;;
    }

    .ul{
        display: flex;
        align-items: center;
        height: 100%;
    }

    .li{
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        position: relative;
    }

    .li::before{
        border-right: 0.75px solid;
        opacity: 0.1;
        height: 60%;
        top: auto;
    }

    .ui-btn{
        height: 100%;
        width: 100%;
        border-radius: 0;
        opacity: 0.7;
    }

    .icon{
        opacity: .7;
        transition: opacity 0.25s linear 0.15s;
    }

    .ui-btn.active .icon{
        opacity: 1;
    }

    .ui-btn.active{
        opacity: 1;
    }

    .li:first-of-type .ui-btn{
        border-top-left-radius: var(--ui-rounded);
        border-bottom-left-radius: var(--ui-rounded);
    }

    .li:last-of-type .ui-btn{
        border-top-right-radius: var(--ui-rounded);
        border-bottom-right-radius: var(--ui-rounded);
    }
</style>