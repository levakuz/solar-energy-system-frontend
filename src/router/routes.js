const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/registration",
    component: () => import("layouts/RegistrationLayout.vue"),
    children: [
      {
        path: "user",
        component: () => import("pages/UserRegistrationPage.vue"),
      },
      {
        path: "company",
        component: () => import("pages/CompanyRegistrationPage.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("layouts/UserLayout.vue"),
    children: [
      { path: "", component: () => import("pages/user/UserIndexPage.vue") },
      {
        path: "projects",
        component: () => import("pages/user/UserProjectsPage.vue"),
      },
      {
        path: "projects/create",
        component: () => import("pages/user/CreateProjectPage.vue"),
      },
      {
        path: "projects/:id",
        component: () => import("pages/user/BrowseProjectPage.vue"),
      },
      {
        path: "devices",
        component: () => import("pages/user/DevicesPage.vue"),
      },
      {
        path: "companies",
        component: () => import("pages/user/CompaniesPage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
