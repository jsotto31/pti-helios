export function useDisplayLeaveDescription(value: string) {
  const items = [
    { title: "Vacation Leave", value: 'vacation-leave' },
    { title: "Sick Leave", value: 'sick-leave' },
    { title: "Birthday Leave", value: 'birthday-leave' },
    { title: "Emergency Leave", value: 'emergency-leave' },
  ];

  const found = items.find(item => item.value === value);
  return found ? found.title : value;
}

export function useDisplayOBTypeDescription(value: string) {
  const items = [
    {
      title: "Offial Business",
      value: 'ob'
    },
    {
      title: "Work From Home",
      value: 'wfh'
    },
  ];

  const found = items.find(item => item.value === value);
  return found ? found.title : value;
}

export const online_application_types = [
  {
    title: 'Leave Application',
    value: 'leave_application',
  },
  {
    title: 'Overtime Application',
    value: 'overtime_application',
  },
  {
    title: 'Official Business / Work From Home',
    value: 'ob_application',
  },
  {
    title: 'Time Correction',
    value: 'correction_application',
  },
  {
    title: 'Change Schedule',
    value: 'change_schedule_application',
  },
];
