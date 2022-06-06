<!--
 * @Author: shiliangL
 * @Date: 2022-05-06 15:09:56
 * @LastEditTime: 2022-05-20 09:11:45
 * @LastEditors: Do not edit
 * @Description: 封装表格组件组件
-->
<script>

import { Table, TableColumn } from 'element-ui'
export default {
  name: 'DvaTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Table,
    TableColumn,
    RenderCustom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: () => null
        }
      },
      render: (h, opt) => {
        const params = {
          row: opt.props.row,
          index: opt.props.index
        }
        if (opt.props.column) params.column = opt.props.column
        return opt.props.render(h, params)
      }
    }
  },
  render(h) {
    const { columns, data } = this
    const { $DVATABLECONFIG } = this
    return h('Table', {
      ref: 'DvaTable',
      on: {
        ...this.$listeners
      },
      props: {
        ...this.$attrs,
        ...$DVATABLECONFIG,
        data: data
      }
    }, [
      columns.map((item) => {
        return h('TableColumn', {
          props: {
            ...item
          },
          scopedSlots: {
            default: !item.type ? ({ row, column, $index }) => {
              const tableCell = item.renderCell ? h('RenderCustom', {
                props: {
                  row,
                  index: $index,
                  render: item.renderCell
                }
              }) : h('span', {}, row[column.property])
              return tableCell
            } : null
          }
        })
      })
    ])
  }
}
</script>
