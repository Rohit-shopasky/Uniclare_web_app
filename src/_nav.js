export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Masters',
    },
    {
      name: 'Degree Group',
      url: '/masters/degreegroup',
      icon: 'icon-layers',
    },
    {
      name: 'Combination',
      url: '/masters/combination',
      icon: 'icon-pencil',
    },
    {
      name: 'College',
      url: '/masters/college',
      icon: 'fa fa-building-o',
    },
    {
      name: 'Student',
      url: '/masters/student',
      icon: 'icon-user',
    },
    {
      title: true,
      name: 'Before Exam',
    },
    {
      name: 'TimeTable',
      icon: 'icon-calendar',
      children: [
        {
          name: 'Holiday Master',
          url: '/timetable/holidayMaster',
          icon: 'icon-calendar',
        },
        {
          name: 'Date Master',
          url: '/timetable/dateMaster',
          icon: 'icon-calendar',
        },
        {
          name: 'Generate Time Table',
          url: '/timetable/gentimetable',
          icon: 'icon-calendar',
        },
        {
          name: 'Update Time Table',
          url: '/timetable/timetable',
          icon: 'icon-calendar',
        }
      ],
    },
    {
      name: 'Exam Centres (All)',
      url: '/masters/centres',
      icon: 'fa fa-tags',
    },
    {
      name: 'Exam Centres (Ind.)',
      url: '/masters/ccentres',
      icon: 'fa fa-tags',
    },
    {
      name: 'QP Indent',
      url: '/masters/qpindent',
      icon: 'icon-pencil',
    },
    {
      name: 'HT Download Status',
      url: '/masters/htdwonload',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Utilities',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Grievances',
      url: '/utils/grv',
      icon: 'icon-link ',
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
      name: 'Practicals',
    },
    {
      name: 'Practical Reports',
      url: '/practicals/batchdetails',
      icon: 'icon-wrench',
    },
    {
      title: true,
      name: 'During Exam',
    },
    {
      name: 'Exam Center',
      url: '/duringexam/examcenter',
      icon: 'fa fa-building-o',
    }
  ],
};
