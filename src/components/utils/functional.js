import { h } from "@vue/runtime-core"

export function Checked(data={}) {
    
    return h(
      'span',
      {
        ...data,
        class: [`svg-checked`, data.class],
      },
      [
        h(
          'svg',
          {
              fill: 'none',
              stroke: 'currentColor',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': '2',
              version: '1.1',
              viewBox: '0 0 24 24',
              xmlns: 'http://www.w3.org/2000/svg',
          },
          [
            h('path', {
                d: 'M22 11.07V12a10 10 0 1 1-5.93-9.14',
            }),
            h('polyline', {
                points: '23 3 12 14 9 11',
            }),
          ]
        ),
      ]
    )
}