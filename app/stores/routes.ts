

export const useRouteStore = defineStore('routes', function () {
    const menuItems = ref([
        {
            type: 'item',
            title: 'Dashboard',
            icon: 'mdi-view-dashboard-outline',
            link: '/',
        },
        {
            type: 'group',
            title: 'Daily Time Record',
            icon: 'mdi-table',
            model: 'feature',
            children: [
                { title: 'Schedule List', icon: 'mdi-file', link: '/' },
                { title: 'Individual Schedule', icon: 'mdi-file', link: '/' },
                { title: 'Holiday Setup', icon: 'mdi-file', link: '/' },
                { title: 'Manage In/Out', icon: 'mdi-file', link: '/' },
                { title: 'Employee Attendance', icon: 'mdi-file', link: '/' },
                { title: 'Attendance Cutoff', icon: 'mdi-file', link: '/' },
            ],
        },
        {
            type: 'group',
            title: 'Employee Database',
            icon: 'mdi-database',
            children: [
                { title: 'Employee 201 File', icon: 'mdi-file', link: '/' },
                { title: 'Employee Status', icon: 'mdi-file', link: '/' },
                { title: 'Employee Clearance', icon: 'mdi-file', link: '/' },
            ],
        },
        {
            type: 'group',
            title: 'Online Application',
            icon: 'mdi-list-status',
            children: [
                { title: 'Approval Setup', icon: 'mdi-file', link: '/online-application/approval-setup' },
                { title: 'Leave Application', icon: 'mdi-file', link: '/online-application/leave-application' },
                { title: 'OB/WFH Application', icon: 'mdi-file', link: '/online-application/ob-application' },
                { title: 'Correction Application', icon: 'mdi-file', link: '/online-application/correction-application' },
                { title: 'Change Schedule', icon: 'mdi-file', link: '/' },
            ],
        },
        {
            type: 'group',
            title: 'Maintenance',
            icon: 'mdi-folder-open',
            children: [
                { title: 'Placeholder', icon: 'mdi-file', link: '/' },
            ],
        },
        {
            type: 'group',
            title: 'Payroll Module',
            icon: 'mdi-bookmark',
            children: [
                { title: 'Placeholder', icon: 'mdi-file', link: '/' },
            ],
        },
        {
            type: 'group',
            title: 'Payroll Setup',
            icon: 'mdi-cards',
            children: [
                { title: 'Placeholder', icon: 'mdi-file', link: '/' },
            ],
        },
    ])

    return {menuItems};
});