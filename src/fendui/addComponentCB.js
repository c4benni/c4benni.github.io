let c = await addComponents.components({
  id: "uitransition",
  description: `Transitions are vital to any user interface. The <code>UiTransition</code> component is a wrapper component that adds more <em>functionality</em> and <em>simplicity</em> to the existing Vue <code>Transition</code> component.<br/>This means you'd get to use all the features of Vue's <code>Transition</code> component features <mark><em>Plus many more!</em></mark>`,
  state: "done",
  functional: false,
  core: true,
  extended: false,
  mixes: null,
  has_animation: false,
  data_attr: null,
  background: "hsl(150, 100%, 98%)",
  text_color: "#000",
  meta: {},
  uses: [
    "Can be used a base transition component",
    "Can be used as a sub component for transition purposes"
  ],
  styled: false
});

addComponents.props({
  component: "ui:",
  array: [
    {
      id: "config",
      type: [
        {
          title: "String",
          description: `A saved transition in <code>FendUi.config.transitions</code>. Can be written as a dynamic transition with arguments (<em>fade(0, 1)</em>) or as a static transition (<em>fade</em>).`,
          example: ["fade", "fade(0, 1)"]
        },
        {
          title: "Object",
          description: `A config <code>Object</code> that can be dynamic! You can define a config object with an <code>enter:</code> and <code>leave:</code> path for a more precised transition, or have all the paths on the <code>config</code> object. However, the following props are required however <pre>{ from: Object, to: Object, duration: String }</pre>`,
          example: [
            `<pre>{ from: { opacity: '0', transform: 'scale3d('0.5', '0.5', '1')' }, duration: '200ms', ease: 'ease' }`,
            `<pre>{ enter: { from: { opacity: '0', transform: 'rotate(180deg)' }, duration: '400ms' }, from: { opacity: '0', }, ease: 'ease-out' }`
          ]
        },
        {
          title: "Array",
          description: `When the <code>config</code> prop is of type <code>Array</code>, it joins the value of index 0 with index 1, replacing any value at index 0 that exists in index 1. Both indexes can be either a <code>String</code> that is a saved transition, or a config <code>Object</code>.`,
          example: [
            `['fade', { duration: '1000ms' }]`,
            `['fade', 'slide-y']`,
            `[{duration: '100ms'}, 'fade']`
          ]
        },
        {
          title: "Boolean",
          description: `When the value type of the <code>config</code> prop is a <code>Boolean</code> value, the default <code>'fade'</code> will be used if <code>config</code> is <code>true</code> and <code>{}</code> if <code>config</code> is false.`
        }
      ],
      initial: "fade",
      required: false,
      rating: 5,
      description: `The <code>config</code> prop is used to fine tune the <code>&ltUiTransition/&gt</code> component to your preference.`
    },
    {
      id: "group",
      type: [{ title: "Boolean" }],
      initial: "false",
      required: false,
      rating: 3,
      description: `Used to define if the <code>&ltUiTransition&gt</code> should act as a <code>&ltTransition&gt</code> component or a <code>&ltTransitionGroup&gt</code> component.`
    }
  ]
});

addComponents.emits({
  array: [
    {
      id: "--ext-transition",
      payload:
        "https://v3.vuejs.org/guide/transitions-enterleave.html#javascript-hooks",
      validation: null,
      description: `Emits all the events Vue's <a href='https://v3.vuejs.org/guide/transitions-enterleave.html#javascript-hooks' target='_blank' rel='noopener' title="vue's transition events"><code>&ltTransition&gt</code></a> emits.`,
      rating: 5
    }
  ],
  component: "uitransition"
});

addComponents.classes({
  array: [
    {
      id: "--ext-uitransition",
      selector: ".ui-transition:id",
      type: "Object",
      description: `<code>&ltUiTransition&gt inherits the <code>name</code> prop of Vue's <a href='https://v3.vuejs.org/guide/transitions-enterleave.html#transition-classes' target'_blank' rel='noopener noreferrer'><code>&ltTransition/&gt</code></a> component.`,
      value:
        "https://v3.vuejs.org/guide/transitions-enterleave.html#transition-classes",
      meta: {
        alert: {
          title: "Note",
          description:
            "<code>&ltUiTransition&gt</code> classes only works when <code>config</code> prop is not null."
        }
      }
    }
  ],
  component: "uitransition"
});

addComponents.css_variables({
  array: [
    {
      id: "--transition",
      value: `CSS`,
      description: `Dynamic CSS <code>transition</code> property to define the collapse transition.`
    },
    {
      id: "--height",
      value: `CSS`,
      description: `Dynamic CSS <code>height</code> property to added before transitioning and on breakpoint change. To enable a collapse transition.`
    },
    {
      id: "--max-height",
      value: `User defined`,
      description: `Maximum height allowed for the content wrapper. This CSS variable is based on the <code>maxHeight</code> prop.`
    }
  ],
  component: "uicollapse"
});

addComponents.features({
  array: [
    {
      id: "Create dynamic transitions",
      rating: 5,
      description: `Create dynamic CSS transitions with ease!`
    },
    {
      id: "Renders no wrapper",
      rating: 3,
      description: `Renders no additional root element.`
    },
    {
      id: "Easily customizable",
      rating: 4,
      description: `Can be easily customized in your <code>&lttemplate&gt</code> or in <code>FendUi.config.transitions</code> for quicker reference`
    }
  ],
  component: "uitransition"
});
