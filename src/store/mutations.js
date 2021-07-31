export default {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    OPEN_ROUTER(state, data) {
        state.openRouterUse = data;
    },
}