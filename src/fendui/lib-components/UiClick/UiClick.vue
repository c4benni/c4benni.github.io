<script>
import { computed, reactive } from "@vue/reactivity";
import { defineComponent, h, inject, nextTick } from "@vue/runtime-core";
import eventKey from "/src/fendui/utils/eventKey";
import props from "./props";
export default defineComponent({
  name: "UiClick",
  props: props(),
  emits: ["click:within-range"],
  setup(p, { emit, slots }) {
    const props = computed(() => p);

    const fendui = inject("$fendui");

    const data = reactive({
      willChange: false,
      active: false,
      clientX: null,
      clientY: null,
      key: null,
      withinRange: false,
      clientRect: undefined,
      outOfRange: [],
    });

    const payload = computed(() => ({ ...data }));

    const triggerSelf = (e) => {
      const stopPropagation = () => {
        if (props.value.self && e.target?.isSameNode?.(e.currentTarget)) {
          e.stopPropagation();
        }
      };
      if (/^key/.test(e.type)) {
        const key = eventKey(e);

        key != "tab" && stopPropagation();
      } else {
        stopPropagation();
      }
    };

    const movePosition = reactive({
      clientRect: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      initial: {
        x: 0,
        y: 0,
      },
      current: {
        x: 0,
        y: 0,
      },
      reset() {
        this.initial = { x: 0, y: 0 };
        this.current = this.initial;
      },
      set({ path, value }) {
        if (typeof value == "object") {
          if (path == "initial") {
            if (!this.initial.x && !this.initial.y) {
              this.initial = value;
            }
          } else {
            this[path] = value;
          }
        }
      },
    });

    const setClient = (e) => {
      const { clientX, clientY } = /touch/.test(e.type)
        ? e.touches?.[0] || {}
        : e;

      data.clientX = clientX;
      data.clientY = clientY;

      data.key = null;
    };

    const getRange = computed(() => {
      if (/string|number/.test(typeof props.value.range)) {
        const parsedRange = parseFloat(props.value.range);

        return {
          x: parsedRange,
          y: parsedRange,
        };
      }
      return { x: 0, y: 0 };
    });

    const hasRange = getRange.value.x || getRange.value.y;

    const toggleWithinRange = (value) => (hasRange ? value : undefined);

    const updateClick = async ({ active, clientRect = true, e }) => {
      const evt = e || {};

      if (active) {
        data.willChange = true;

        data.withinRange = toggleWithinRange(true);

        await nextTick();
      } else {
        if (data.withinRange && /move/.test(evt.type)) {
          evt.currentTarget?.click();
          emit("click:within-range", e);
        }

        data.willChange = false;
        data.clientY = null;
        data.clientX = null;
        data.key = null;
        data.withinRange = toggleWithinRange(false);
        movePosition.reset();
        clientRect &&
          (movePosition.clientRect = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          });
        data.outOfRange = hasRange ? [] : undefined;
      }

      data.active = active;
    };

    const getEvents = computed(() => {
      const touchEvents = {
        start: async (e) => {
          if (data.active) {
            return;
          }

          triggerSelf(e);

          setClient(e);

          updateClick({
            active: true,
          });

          if (hasRange) {
            const { top, bottom, right, left, x, y } =
              e.currentTarget.getBoundingClientRect();

            movePosition.clientRect = {
              top,
              right,
              bottom,
              left,
              x,
              y,
            };
          }
        },
        onTouchmovePassive: (e) => {
          if (!hasRange) {
            return (
              data.active &&
              updateClick({
                active: false,
                e,
              })
            );
          }

          const positions = {
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
          };

          movePosition.set({
            path: "initial",
            value: positions,
          });

          movePosition.set({
            path: "current",
            value: positions,
          });

          const activeArea = {
            top: false,
            right: false,
            bottom: false,
            left: false,
          };

          activeArea.top =
            movePosition.clientRect.top - getRange.value.y <
            movePosition.current.y;

          activeArea.right =
            movePosition.clientRect.right + getRange.value.x >
            movePosition.current.x;

          activeArea.bottom =
            movePosition.clientRect.bottom + getRange.value.y >
            movePosition.current.y;

          activeArea.left =
            movePosition.clientRect.left - getRange.value.x <
            movePosition.current.x;

          let withinRange = true;

          for (let entry of Object.entries(activeArea)) {
            const key = entry[0];
            const value = entry[1];

            if (!value) {
              data.outOfRange.push(key);
              withinRange = false;
            }
          }

          data.withinRange = withinRange;

          data.active = withinRange;
        },
        onTouchcancel: (e) => {
          updateClick({
            active: false,
            e,
          });
        },
        onTouchend: (e) => {
          updateClick({
            active: false,
            e,
          });
        },
      };

      touchEvents["onTouchstartPassive"] = touchEvents.start;

      delete touchEvents.start;

      const mouseEvents = {
        start: (e) => {
          triggerSelf(e);

          setClient(e);

          updateClick({
            active: true,
          });
        },
        onMousemovePassive: (e) => {
          data.active &&
            updateClick({
              active: false,
              e,
            });
        },
        onMouseup: () => {
          data.active &&
            updateClick({
              active: false,
            });
        },
      };

      const keyEvents = {
        start: (e) => {
          const key = eventKey(e);

          if (/^space$|^enter$/i.test(key)) {
            triggerSelf(e);

            e.preventDefault();

            data.clientX = null;
            data.clientY = null;
            data.key = key;

            updateClick({
              active: true,
            });
          }
        },

        onKeyup: (e) => {
          const key = eventKey(e);

          if (/space|^enter$/i.test(key)) {
            e.preventDefault();

            e.currentTarget?.click?.();

            updateClick({
              active: false,
            });
          }
        },
      };

      mouseEvents.onMousedownPassive = mouseEvents.start;

      delete mouseEvents.start;

      keyEvents.onKeydown = keyEvents.start;

      delete keyEvents.start;

      const extractEvents = () => {
        let events = {
          onBlur: () => {
            updateClick({
              active: false,
            });
          },

          onClick: () => {
            updateClick({
              active: false,
            });
          },
          ...keyEvents,
        };

        if (fendui.cssUtils.isTouchDevice) {
          events = { ...events, ...touchEvents };
        }

        if (!fendui.cssUtils.isStrictTouchDevice) {
          events = { ...events, ...mouseEvents };
        }

        return events;
      };

      return extractEvents();
    });

    return () => {
      return h(slots?.default?.(payload.value)?.[0] || "slot", {
        ...(getEvents.value || {}),
        class:
          props.value.addWillChangeClass || props.value.activeClass
            ? [
                data.active ? props.value.activeClass : "",
                data.willChange ? "will-change-transform" : "",
              ]
            : [],
      });
    };
  },
});
</script>

<style></style>
