<script>
import {
  inject,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  reactive,
  watch,
  computed,
  getCurrentInstance,
  h,
  defineComponent,
} from "@vue/runtime-core";
import { isHTML, nextAnimFrame } from "/src/fendui/utils/core";
import props from "./props";

export default defineComponent({
  name: "UiIntersection",

  props: props(),

  emits: {
    "once-intersected": null,
  },

  setup(p, { emit, slots }) {
    const fendui = inject("$fendui");

    const props = reactive(p);

    const i = getCurrentInstance();

    const $vnode = reactive({ el: null });

    const el = computed(() => $vnode.el || i?.ctx?.$el || null);

    const defaultConfig = {
      threshold: "0",
      rootMargin: "0px 0px 0px 0px",
      root: null,
    };

    const data = reactive({
      isMounted: false,

      entry: {
        inactive: true,
      },

      isIntersecting: false,
    });

    const observer = reactive({
      class: null,
      async callback(entries) {
        for (let entry of entries) {
          const setPayload = () => {
            data.entry = entry;
            data.isIntersecting = entry.isIntersecting;
          };

          const callback = () => {
            if (props.once) {
              setPayload();
              if (data.isIntersecting) {
                methods.disconnect(entry.target);
                this.class = null;
              }

              return;
            }

            setPayload();
          };

          // await nextAnimFrame();
          await nextTick();

          callback();
        }
      },
    });

    data.isMounted = false;

    onMounted(() => {
      data.isMounted = true;
    });

    const methods = {
      async connect(elem) {
        if (
          observer.class ||
          props.disabled ||
          !data.isMounted ||
          !isHTML(elem)
        ) {
          return;
        }

        let initialOptions = {
          ...defaultConfig,
          ...props.config,
        };

        let options = {
          ...initialOptions,
          threshold: /string|number/i.test(typeof initialOptions.threshold)
            ? parseFloat(initialOptions.threshold)
            : initialOptions.threshold,
        };

        initialOptions = 0;

        await nextAnimFrame();

        if (!props.disabled) {
          nextTick(() => {
            observer.class = new IntersectionObserver(
              observer.callback,
              options
            );

            nextTick(() => {
              observer.class.observe(elem || el.value);

              options = 0;
            });
          });
        }
      },
      async observe() {
        if (!data.isMounted) {
          return;
        }

        data.entry = {};
        await nextTick();

        this.connect();
      },
      disconnect(elem) {
        if (isHTML(elem)) {
          observer.class?.unobserve(elem || el.value);

          observer.class?.disconnect();

          nextTick(() => {
            observer.class = null;

            data.entry = { inactive: true };
          });
        }
      },
      refresh() {
        this.disconnect();
        nextTick(this.connect);
      },
    };

    const payload = computed(() => {
      const entry = data.entry;

      if (!props.once && (entry.inactive || typeof entry.intersectionRatio == "undefined")) {
        return {
          inactive: true,
          entries: {},
        };
      }

      return {
        isIntersecting: data.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
        leaveTop: !data.isIntersecting && ((entry.boundingClientRect?.bottom||0) < (entry.rootBounds?.top||0)),
        leaveBottom: !data.isIntersecting && ((entry.boundingClientRect?.top ||0)> (entry.rootBounds?.bottom||0)),
        entry: {
          boundingClientRect: entry.boundingClientRect,
          intersectionRatio: entry.intersectionRatio,
          intersectionRect: entry.intersectionRect,
          isIntersecting: entry.isIntersecting,
          isVisible: entry.isVisible,
          rootBounds: entry.rootBounds,
          //   time: entry.time,
        },
      };
    });

    watch(
      () => fendui.breakpoints.is,
      () => data.isMounted && methods.refresh()
    );
    watch(
      () => props.disabled,
      () => data.isMounted && methods.refresh()
    );
    watch(
      () => data.isMounted,
      (n) => {
        n && methods.refresh();
      }
    );
    watch(
      () => props.config,
      () => data.isMounted && methods.refresh()
    );

    onMounted(() => methods.observe());

    onActivated(() => methods.observe());

    onDeactivated(() => methods.disconnect());

    onBeforeUnmount(() => methods.disconnect());

    return () => {
      return h(slots?.default?.(payload.value)?.[0] || null, {
        async onVnodeMounted(vnode) {
          $vnode.el = vnode.el;

          await nextAnimFrame();

          methods.connect(vnode.el);
          methods.observe();
        },
        onVnodeBeforeUnmount() {
          methods.disconnect(el.value);
        },
      });
    };
  },
});
</script>
