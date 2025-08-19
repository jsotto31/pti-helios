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