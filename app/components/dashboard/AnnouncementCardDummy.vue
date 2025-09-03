<template>
    <AnnouncementCard v-for="(item, index) in announcements" :key="index" :title="item.title" :message="item.message"
        :color="item.color" :actionText="item.actionText" @action="handleAction(item)" />
</template>

<script setup lang="ts">
const announcements = [
    {
        title: "New Employee Orientation",
        message: "Orientation for new hires will be held on Monday at 9:00 AM in the main hall.",
        color: "primary",
        actionText: "View Details",
    },
    {
        title: "Holiday Announcement",
        message: "The office will be closed on August 30 in observance of National Heroes Day.",
        color: "success",
        actionText: "",
    },
    {
        title: "Payroll Update",
        message: "Salary release will be moved to August 28 due to the upcoming holiday.",
        color: "info",
        actionText: "Check Payslip",
    },
    {
        title: "Wellness Program",
        message: "Join our new employee wellness program starting next week with free yoga sessions.",
        color: "secondary",
        actionText: "Sign Up",
    },
    {
        title: "Policy Reminder",
        message: "Please update your HR records with your latest contact information before Sept 10.",
        color: "warning",
        actionText: "Update Now",
    },
]

const handleAction = (item: object) => {
    console.log("Action clicked:", item)
    // You can navigate or open modal here
}
</script>
