import type { VerticalNavItems } from "@/@layouts/types";

const PATH_PREFIX = "/trangchu";
const PATH_MENU = "/thucdon";

export default [
  {
    title: "Trang Chủ",
    to: { path: `${PATH_PREFIX}/bieudopage` },
    icon: { icon: "tabler-home" },
  },
  {
    title: "Thực Đơn",
    to: { path: `${PATH_MENU}` },
    icon: { icon: "tabler-file-description" },
  },
  {
    title: "Giới Thiệu",
    to: { path: `${PATH_PREFIX}/bieudopage` },
    icon: { icon: "tabler-pencil-check" },
  },
  {
    title: "Đặt Món",
    to: { path: `${PATH_PREFIX}/bieudopage` },
    icon: { icon: "tabler-file-check" },
  },
  {
    title: "Liên Hệ",
    to: { path: `${PATH_PREFIX}/bieudopage` },
    icon: { icon: "tabler-user-plus" },
  },
] as VerticalNavItems;
