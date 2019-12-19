const routes = [
  {
    path: "/",
    component: () => import("layouts/Main.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/services", component: () => import("pages/Services.vue") },
      { path: "/pricing", component: () => import("pages/Pricing.vue") },
      { path: "/order", component: () => import("pages/Order.vue") },
      { path: "/tracking", component: () => import("pages/Tracking.vue") },
      { path: "/about", component: () => import("pages/About.vue") },
      {
        path: "/general-conditions",
        component: () => import("pages/Conditions.vue")
      },
      {
        path: "/privacy-policy",
        component: () => import("pages/PrivacyPolicy.vue")
      }
    ]
  },
  {
    path: "/user",
    redirect: "/",
    component: () => import("layouts/Main.vue"),
    children: [
      { path: "orders", component: () => import("pages/Orders.vue") },
      { path: "setting", component: () => import("pages/Setting.vue") }
    ]
  },
  {
    path: "/auth",
    redirect: "/",
    component: () => import("layouts/Blank.vue"),
    children: [
      { path: "login", component: () => import("pages/Login.vue") },
      {
        path: "registration",
        component: () => import("pages/Registration.vue")
      },
      { path: "recovery", component: () => import("pages/Recovery.vue") },
      {
        path: "change-password",
        component: () => import("pages/ChangePassword.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
