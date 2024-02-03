export const LayoutsViewEnum = {
    LayoutMain: "LayoutMain",
    LayoutNoHeader: "LayoutNoHeader",
    LayoutWithLogo: "LayoutWithLogo",

    getLayout (layoutName) {
        return this[layoutName] || this.LayoutMain;
    },
};
