export const LocalStore = defineStore('local-store', {
  state: () => ({
    isExpandedNav: false,
    isMobileMenuOpened: false,
    errorData: null,
    currentUserType: LOGGED_USER.ADMIN,
  }),
  getters: {
    expandedNav: (state) => state.isExpandedNav,
    openedMobileMenu: (state) => state.isMobileMenuOpened,
    getErrorData: (state) => state.errorData,
  },
  actions: {
    toggleNavState() {
      this.isExpandedNav = !this.isExpandedNav;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpened = !this.isMobileMenuOpened;
    },
    setCurrentUserType(userType: LOGGED_USER) {
      this.currentUserType = userType;
    },
    setError(errorData: any) {
      this.errorData = errorData;
    },
  },
});
