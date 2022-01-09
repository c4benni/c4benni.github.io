<script>
import { computed, reactive } from "@vue/reactivity";
import {
  defineComponent,
  h,
  resolveComponent,
  resolveDynamicComponent,
  watch,
} from "@vue/runtime-core";
import props from "./props";
export default defineComponent({
  name: "UiImg",
  props: props(),
  emits: ["loaded:true", "loaded:false", "is-intersecting"],
  setup(props, { emit, attrs, slots }) {
    const data = reactive({
      loaded: false,
      intersecting: false,
    });

    const payload = computed(() => {
      return {
        ...data,
      };
    });

    watch(
      () => props.src,
      () => {
        data.intersecting = false;
        data.loaded = null;
      }
    );

    const ariaLabel = {
      "aria-label": attrs["aria-label"] || props.alt,
    };

    return () => {
      const img = () => {
        if (!data.intersecting && /lazy/i.test(props.loading)) {
          const intersection = resolveComponent("ui-intersection");

          return h(intersection, null, {
            default: (payload) => {
              if (payload.isIntersecting) {
                emit("is-intersecting", true);
              }

              data.intersecting = payload.isIntersecting;

              return h(
                "a",
                {
                  style: {
                    opacity: 0,
                    ...(props.height || props.width
                      ? {
                          height: props.height,
                          width: props.width,
                        }
                      : {}),
                  },
                  href: props.src,
                  ...ariaLabel,
                  title: props.alt || "loading image",
                  role: "img",
                },
                [props.notIntersectingText || props.alt]
              );
            },
          });
        } else {
          const iAttrs = {
            src: props.src,
            alt: props.alt,
            height: props.height,
            width: props.width,
            // loading: props.loading,
            ...ariaLabel,
            style:
              props.height || props.width
                ? {
                    height: props.height,
                    width: props.width,
                  }
                : undefined,
          };
          const backgroundImage = () => {
            const { height, width, style, src } = iAttrs;

            return h(
              resolveDynamicComponent(props.tag),
              {
                height,
                width,
                ...ariaLabel,
                role: "img",
                style: {
                  ...style,
                  backgroundImage: `url(${src})`,
                },
                ...attrs,
              },
              [slots?.backgroundContent?.(payload.value)]
            );
          };
          const img = () =>
            h("img", {
              ...iAttrs,
              ...attrs,
            });

          return [
            props.backgroundImage ? backgroundImage() : img(),
            slots?.default?.(payload.value),
          ];
        }
      };

      return img();
    };
  },
});
</script>
