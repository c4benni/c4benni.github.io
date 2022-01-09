<script>
import { computed, reactive } from "@vue/reactivity";
import {
  defineComponent,
  getCurrentInstance,
  h,
  resolveComponent,
  resolveDynamicComponent,
  watch,
} from "@vue/runtime-core";

import props from "/src/fendui/lib-components/UiAccordion/props";
import eventKey from "/src/fendui/utils/eventKey";

export default defineComponent({
  name: "UiAccordion",
  props: props(),
  emits: ["toggle:true", "toggle:false", "update:modelValue"],
  setup(p, { emit, slots }) {
    const data = reactive({
      manualVmodel: false,
      manualActive: false,
    });

    const props = computed(() => p);

    data.manualActive = props.value.active;

    const active = computed(() => {
      if (data.manualActive) {
        return true;
      }

      if (typeof props.value.modelValue == "boolean") {
        return props.value.modelValue;
      }

      return data.manualVmodel;
    });

    const i = getCurrentInstance();

    const uid = `ui-accordion-${i.uid}`;

    const div = (d, c) => h("div", d, c);

    const scoping = {
      "data-ui-accordion": props.value.useStyle ? "" : undefined,
    };

    const updateSelfModel = (e) => {
      emit("update:modelValue", e);

      emit(`toggle:${e}`, e);

      data.manualVmodel = e;

      data.manualActive = false;
    };

    const payload = computed(() => ({
      active: active.value,
      toggle: () => updateSelfModel(!active.value),
      open: () => updateSelfModel(true),
      close: () => updateSelfModel(false),
    }));

    watch(() => props.value.modelValue, updateSelfModel);

    const headerSlot = () => slots.header?.({ ...payload })?.[0] || null;
    const header = () => {
      const headerTitle = props.value.title;

      if (!headerSlot() && !headerTitle) {
        return null;
      }

      const { event, disabled, readonly, activeClass } = props.value;

      const headerAttrs = props.value.headerAttrs || {};

      return (
        headerSlot() ||
        h(
          resolveComponent("UiToggle"),
          {
            ref: "root",
            "onUpdate:modelValue": updateSelfModel,
            event,
            disabled,
            readonly,
            activeClass,
            modelValue: active.value,
          },
          {
            default: (payload) => {
              return (
                (props.value.title &&
                  div(
                    {
                      ...scoping,
                      class: [
                        props.value.useStyle
                          ? [
                              "__header",
                              {
                                __active: payload.active,
                                "__hide-arrow": props.value.hideArrow,
                              },
                            ]
                          : "",
                        headerAttrs.class || "",
                        payload.active ? props.value.headerActiveClass : [],
                      ],
                      role: "button",
                      "aria-expanded": payload.active,
                      "aria-controls": uid,
                      tabindex: !props.value.disabled ? "0" : undefined,
                      ...headerAttrs,
                      onKeydown: (e) => {
                        const key = eventKey(e);

                        if (/space|enter/.test(key)) {
                          e.preventDefault();
                        }
                      },
                      onKeyup: (e) => {
                        const key = eventKey(e);

                        if (
                          /space|enter/.test(key) &&
                          e.currentTarget == e.target
                        ) {
                          e.preventDefault();

                          e.stopPropagation();

                          e.currentTarget.click();
                        }
                      },
                      onClick: payload.toggle,
                    },
                    headerTitle
                  )) ||
                null
              );
            },
          }
        )
      );
    };

    return () => {
      const tag = resolveDynamicComponent(props.value.tag);

      return h(
        tag,
        {
          key: props.value.tag,
          ...scoping,
          class: props.value.useStyle
            ? ["root", active.value ? props.value.activeClass : []]
            : active.value
            ? props.value.activeClass
            : [],
        },
        [
          header(),
          h(
            resolveComponent("UiCollapsible"),
            {
              maxHeight: props.value.maxHeight,
              useStyle: props.value.useStyle,
              activeClass: props.value.activeClass,
              transition: props.value.transition,
              modelValue: active.value,
              disabled: props.value.disabled,
              readonly: props.value.readonly,
              active: props.value.active,
              role: "region",
              "aria-labelledby":
                props.value.headerAttrs?.["aria-controls"] || uid,
            },
            {
              default: (pay) => {
                return slots.default?.({ ...pay, ...payload.value });
              },
            }
          ),
        ]
      );
    };
  },
});
</script>

<style>
.__header[data-ui-accordion]:after {
  content: "▼";
  margin-left: 2px;
  opacity: 0.875;
  font-size: 0.9em;
}
.__header[data-ui-accordion].__hide-arrow::after {
  display: none;
}
.__header[data-ui-accordion].__active {
  font-weight: 600;
}
.__header[data-ui-accordion].__active::after {
  content: "▲";
}
</style>
