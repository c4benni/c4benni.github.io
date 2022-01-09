<script>
import { h, resolveComponent } from "@vue/runtime-core";
import states from './utils/states';

const section = (d, c) => h("section", d, c);
const div = (d, c) => h("div", d, c);
const footer = (d, c) => h("footer", d, c);

const scoping = { "data-ps": "" };

const btn = (d, c) => h(resolveComponent("UiBtn"), d, c);

const projectItem = (d) => h(resolveComponent("ProjectsItem"), d);

const Intersection = (d, c)=> h(resolveComponent('UiIntersection'),d,c)


const h2 = (d, c) => h("h2", d, c);

export default {
  name: "Projects-page",
  meta: {
    title: "Projects page",
  },
  setup() {
    return function () {
      const isMobile = /sm|xs|xxs/.test(this.$breakpoints.is)

      return section(
        {
          ...scoping,
          class: ["root fade-slide-x-appear",{'fill-before': isMobile}],
        },
        [
          Intersection({
              once: true,
              config:{thresholds:0.2}
            },{
              default: payload => {
                const reveal = payload.isIntersecting;

                return h2({  
                  ...scoping,
                  class:'reveal-wrap relative'
                },[
                  
                  div({
                    ...scoping,
                    class:'reveal gradient-text title app-title truncate-text',
                    style: {
                      opacity: reveal ? '1' : '0',
                      transform: `translate3d(0,${reveal?'0': '.5rem'},0)`
                    }
                  },['Projects.'])
                ]) 
              }
          }),

          div(
            {
              ...scoping,
              class: ["items-wrap"],
            },
            [
              Intersection({
                thresholds: [0, 0.25, 0.5, 0.75, 1]
              },{
                default: payload => {
                  if(!payload.inactive){
                    requestAnimationFrame(()=>{
                      states.intersections['1'] = payload.isIntersecting
                    })
                  }

                  return div({  
                    class:'pseudo header-tracker'
                  },[ ]) 
                }
              }),
              projectItem({
                ariaLabel: "Payzone Nigeria",
                date: "2019",
                title: "Payzone.ng",
                subtitle: "Payment gateway for services and comodities",
                images: [{
                  alt: "image of payzone.ng landing page",
                  src: "/img/payzone.png",
                },{
                  alt: "second image of payzone.ng landing page",
                  src: "/img/payzone_.png",
                }],
                to: "https://payzone.ng/",
                live: true,
              }),

              projectItem({
                ariaLabel: "Vending app",
                date: "2021",
                title: "Vending app",
                subtitle: "An implementation of a Vending machine with buyer and seller roles",
                images: [{
                  alt: "image of vending app",
                  src: "/img/vending.png",
                },{
                  alt: "second image of vending app",
                  src: "/img/vending_.png",
                }],
                to: "https://c4benni-vending.herokuapp.com",
              }),

              projectItem({
                ariaLabel: "Minna Bank Demo",
                date: "2021",
                title: "Bank App UI",
                subtitle: "Bank app mockup",
                images: [{
                  alt: "image of minna bank landing page",
                  src: "/img/minna.png",
                },{
                  alt: "second image of minna bank landing page",
                  src: "/img/minna_.png",
                }],
                to: "https://c4benni.github.io/minna/",
              }),

              projectItem({
                ariaLabel: "Nina Recipes",
                date: "2021",
                title: "Food Recipes",
                subtitle: "A food recipe app.",
                images: [{
                  alt: "image of nina recipe",
                  src: "/img/nina.png",
                },{
                  alt: "second image of nina recipe",
                  src: "/img/nina_.png",
                }],
                to: "https://c4benni.github.io/nina/",
              }),
            ]
          ),
        ]
      );
    };
  },
};
</script>

<style>
.root[data-ps] {
  padding: var(--qtr-x-gutter) var(--x-gutter);
  --title-font-size: max(8vw, 124px);
  min-height: 100vh;
}

.sm-down .root[data-ps] {
  --title-font-size: 56px;
}

.title[data-ps] {
  font-size: var(--title-font-size);
  font-weight: 800;
  text-align: left;
  background-image: linear-gradient(
    30deg,
    var(--theme-surface-invert),
    var(--secondary) 60%
  );
}

.sm-down .title[data-ps] {
  text-align: center;
  margin-bottom: 2rem;
}

.items-wrap[data-ps] {
  display: grid;
  row-gap: var(--x-gutter);
  padding: var(--half-x-gutter);
  margin-bottom: var(--square-x-gutter);
  position: relative;
}

.md-up .items-wrap[data-ps]{
  grid-template-columns: 50% 50%;
  column-gap: var(--x-gutter);
}

.sm-down .items-wrap[data-ps] {
  padding: 0;
  row-gap: calc(var(--x-gutter) * 1.25);
}

.br-xxs .items-wrap[data-ps] {
  padding: 0;
  row-gap: calc(var(--x-gutter) * 1.25);
}

.app-footer[data-ps] {
  position: relative;
  margin-bottom: 32px;
}
</style>
