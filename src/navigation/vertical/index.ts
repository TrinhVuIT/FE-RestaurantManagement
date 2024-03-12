import type { VerticalNavItems } from '@/@layouts/types'

const PATH_PREFIX = '/admin'

export default [
  {
    title: 'Sample page',
    to: { path: `${PATH_PREFIX}/samplepage` },
    icon: { icon: 'tabler-file' },
  },
  {
    title: 'Khóa học',
    to: { path: `${PATH_PREFIX}/khoahocpage` },
    icon: { icon: 'tabler-file' },
  },
  {
    title: 'Biểu đồ',
    to: { path: `${PATH_PREFIX}/bieudopage` },
    icon: { icon: 'tabler-file' },
  },
  {
    title: 'ChiTiet',
    to: { path: `${PATH_PREFIX}/chitietpage` },
    icon: { icon: 'tabler-file' },
  },
] as VerticalNavItems
