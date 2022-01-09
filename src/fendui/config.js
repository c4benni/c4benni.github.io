export default {
  theme: {
    initial: "dark",
    addToHTML: false
  },
  breakpoints: {
    use: true,
    orientation: true,
    values: {
      xxs: [0, 349],
      xs: [350, 599],
      sm: [600, 959],
      md: [960, 1279],
      lg: [1280, 1919],
      xl: [1920, Infinity]
    }
  },

  props: {
    UiRoot: {
      utilityClasses: true,
      breakpointClasses: true,
      tag: "div",
      id: "ui-root"
    },

    UiInteract: {
      tag: "span",
      componentProps: {},
      config: {},
      range: 0,
      nativeTag: true,
      effects: {
        click: true,
        longPress: false,
        hover: false
      },
      addWillChangeClass: true,
      addActiveClass: true,
      addHoverActiveClass: true,
      addHoverClass: true,
      pressDelay: 500,
      hoverDelay: 0
    },

    UiIntersection: {
      once: false,
      config: {},
      onNextTick: true,
      disabled: false,
      sleep: 1
    },

    UiImg: {
      tag: "div",
      height: undefined,
      width: undefined,
      src: "",
      alt: "",
      notIntersectingText: undefined,
      loading: "lazy",
      backgroundImage: false
    },

    UiLoadingBar: {
      initial: 0,
      // running, paused, anything
      state: "anything",
      transformOffset: 3,
      timeOffset: 50,
      stoppedDuration: 300,
      useStyle: true,
      showBar: true,
      rootBackground: "#ff000059",
      background: "#ff0000",
      showShimmer: true,
      useAnimationFrame: true
    },

    UiToggle: {
      modelValue: undefined,
      disabled: false
    },

    UiAccordion: {
      modelValue: undefined,
      headerClass: "",
      title: "Detail",
      headerAttrs: {},
      headerActiveClass: undefined,
      tag: "section",
      contentAttrs: undefined,
      hideArrow: false,
      activeClass: undefined,
      transition: "1ms",
      active: false
    },

    UiTransition: {
      config: "fade(0,1)",
      group: false,
      previousTransform: undefined,
      optimise: true
    },

    UiOverlay: {
      modelValue: undefined,
      disabled: false,
      to: "body",
      restoreScroll: true,
      restoreFocus: true,
      // transition: {
      //   config: "fade"
      // },
      transition: false,
      focusContent: true,
      methods: {},
      name: undefined,
      zIndex: undefined,
      minZIndex: "100",
      useStyle: true,
      htmlActiveClass: undefined,
      accessible: true,
      accessibleRole: "dialog",
      alwaysRender: false
    },

    UiCollapsible: {
      modelValue: undefined,
      disabled: false,
      readonly: false,
      maxHeight: undefined,
      useStyle: true,
      tag: "div",
      activeClass: undefined,
      transition: "1ms",
      active: false
    },

    UiClick: {
      range: undefined,
      addWillChangeClass: true,
      self: false,
      activeClass: "Active"
    },

    UiDelayedToggle: {
      activeClass: undefined,
      delay: undefined
    },

    UiHover: {
      activeClass: undefined,
      delay: undefined
    },

    UiFocus: {
      activeClass: undefined,
      delay: undefined
    },

    UiLongPress: {
      activeClass: undefined,
      delay: 500,
      allowContenxtMenu: false
    },

    UiModal: {
      htmlActiveClass: "ui-modal-active",
      backdrop: true,
      modelValue: undefined,
      transition: true,
      tag: "div",
      alwaysRender: false,
      zIndex: undefined,
      wrapContent: false,
      contentData: {},
      rootData: {},
      backdropData: {}
    },

    UiSheet: {
      modelValue: undefined,
      backdrop: true,
      isSheet: true,
      staticBackdrop: false,
      fullscreen: false,
      useStyle: true
    },

    UiPosition: {
      modelValue: undefined,
      width: undefined,
      height: undefined,
      align: "bottom",
      justify: "end",
      inset: undefined,
      mainAxis: "y",
      root: undefined,
      autoAlign: false,
      offset: 0,
      activator: undefined,
      contextMenu: false,
      flip: false,
      containerTransition: true,
      transition: false
    },

    UiSwitch: {
      modelValue: undefined,
      tag: "button",
      id: undefined,
      hideInput: false,
      required: undefined,
      readonly: undefined,
      disabled: undefined,
      validate: undefined,
      initial: undefined,
      height: undefined,
      width: undefined
    }
  },

  transitions: {
    fade: (from = 0, to = 1) => {
      return {
        enter: {
          from: {
            opacity: from
          },
          to: {
            opacity: to
          }
        },
        leave: {
          from: {
            opacity: to
          },
          to: {
            opacity: from
          }
        },
        duration: "300ms",
        ease: "ease",
        origin: "center",
        willChange: "opacity"
      };
    },
    "slide-y-fade": ({
      from = "100%",
      to = "0%",
      fadeFrom = 0,
      fadeTo = 1
    } = {}) => {
      return {
        enter: {
          from: {
            opacity: fadeFrom,
            transform: `translate3d(0,${from},0)`
          },
          to: {
            opacity: fadeTo,
            transform: `translate3d(0,${to},0)`
          }
        },
        leave: {
          from: {
            opacity: fadeTo,
            transform: `translate3d(0,${to},0)`
          },
          to: {
            opacity: fadeFrom,
            transform: `translate3d(0,${from},0)`
          }
        },
        ease: "ease",
        origin: "center",
        willChange: "opacity, transform",
        duration: "300ms"
      };
    },
    rotate: (s = "0.5", r = "90") => ({
      from: {
        transform: `scale3d(${s},${s},1) rotate(${r}deg)`,
        opacity: "0"
      },
      to: {
        transform: "scale3d(1,1,1)",
        opacity: "1"
      },
      duration: "500ms",
      ease: "ease-out"
    }),

    scale: (x = "0.5", y = ".5", fFrom = "0", fTo = "0") => ({
      from: {
        transform: `scale3d(${`${x}` || "0"},${`${y}` || `${x}` || "0"},1)`,
        opacity: fFrom
      },
      duration: "500ms",
      ease: "ease-out"
    })
  }
};
