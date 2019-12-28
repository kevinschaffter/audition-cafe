export const routePaths = [
  { path: '/', component: 'Home' },
  { path: '/post', component: 'PostVacancy', restriction: 'employer' },
  { path: '/manage-vacancies', component: 'ManageVacancies', restriction: 'employer' },
  { path: '/find-a-job/:instrument', component: 'ListVacancies', exact: false },
];
