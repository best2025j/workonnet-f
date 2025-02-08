export const LocalStore = defineStore('local-store', {
  state: () => ({
    isExpandedNav: false,
    isMobileMenuOpened: false,
    errorData: null,
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
    setError(errorData: any) {
      this.errorData = errorData;
    },
  },
});
