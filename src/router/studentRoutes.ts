export default [
  {
    path: '/hocvien',
    name: 'chat',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        name: 'chatBot',
        path: 'chatbot',
        component: () => import('../views/apps/chat/ChatApp.vue'),
      },
      {
        name: 'chatBotBaiTap',
        path: 'chatbot/:id',
        component: () => import('../views/apps/chat/ChatApp.vue'),
      },
      {
        name: 'thongtincanhan',
        path: 'thongtincanhan',
        component: () => import('../views/dashboard/DemoThongTinCaNhan.vue'),
      },
      {
        name: 'demoHocVienDiemDanh',
        path: 'diemdanh',
        component: () => import('@/views/dashboard/DemoHocVienDiemDanh.vue'),
      },
      {
        path: 'khoahoc',
        name: 'demoKhoaHocCuaToi',
        component: () => import('@/views/dashboard/DemoKhoaHocCuaToi.vue'),
      },
    ],
  },
];
