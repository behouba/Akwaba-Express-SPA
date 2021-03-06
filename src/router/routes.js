const routes = [
  {
    path: "/",
    component: () => import("layouts/Main.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/services", component: () => import("pages/Services.vue") },
      { path: "/pricing", component: () => import("pages/Pricing.vue") },
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
    path: "/order",
    redirect: "/",
    component: () => import("layouts/Main.vue"),
    children: [
      { path: "checkout", component: () => import("pages/Order.vue") },
      { path: "success", component: () => import("pages/Success.vue") }
    ]
  },
  {
    path: "/account",
    redirect: "/",
    component: () => import("layouts/Account.vue"),
    children: [
      { path: "orders", component: () => import("pages/Orders.vue") },
      { path: "setting", component: () => import("pages/Setting.vue") },
      { path: "password", component: () => import("pages/Password.vue") },
      { path: "contacts", component: () => import("pages/Contacts.vue") }
    ]
  },
  {
    path: "/account",
    component: () => import("layouts/Main.vue"),
    children: [
      { path: "order", component: () => import("pages/OrderInfo.vue") }
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
        path: "new-password",
        component: () => import("pages/NewPassword.vue")
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
