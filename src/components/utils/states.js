import { reactive } from "@vue/reactivity"

export default reactive({
    mobileMenu: false,
    showSuccess: false,
    appMounted: false,
    activeHeaderIndex:0,
    intersections: {
        0: false,
        1: false,
        2: false
    },
    socials: [
                  {
                    title: "my twitter page",
                    href: "https://twitter.com/c4benn",
                    icon: "twitter",
                  },
                  {
                    title: "my github page",
                    href: "https://github.com/c4benni",
                    icon: "github",
                  },
                ]
})