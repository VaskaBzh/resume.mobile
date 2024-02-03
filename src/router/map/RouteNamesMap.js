export const RouteNamesMap = {
    public: {
        login: "LoginPage",
        registration: "RegistrationPage",
    },
    private: {
        home: "HomePage",
        income: "IncomePage",
        referral_cabinet: "ReferralCabinetPage",
        referral_list: "ReferralListPage",
        referral_income: "ReferralIncomePage",
        settings: "SettingsPage",
        settings_user: "SettingsUserPage",
        settings_sublist: "SubListPage",
        settings_sub: "SettingsSubPage",
        statistic: "StatisticPage",
        wallets: "WalletsPage",
        wallets_sub: "WalletsPage",
        watcher: "WatchersPage",
        watcher_sub: "WatchersPage",
        workers: "WorkersPage",
        connection: "ConnectionPage",
        connection_sub: "ConnectionPage",
        faq: "FaqPage",
        worker: "WorkerPage",
        disconnect: "DisconnectPage",
    },

    findRouteComponent(isPrivate, component) {
        if (isPrivate) {
            return this.private[component];
        }
        
        return this.public[component];
    }
}