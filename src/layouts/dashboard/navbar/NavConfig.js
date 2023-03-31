// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import SubjectIcon from '@mui/icons-material/Subject';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import TopicIcon from '@mui/icons-material/Topic';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ClassIcon from '@mui/icons-material/Class';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  classes: <ClassIcon />,
  subjects: <SubjectIcon />,
  boards: <DashboardIcon />,
  users: <GroupIcon />,
  topics: <TopicIcon />,
  courses: <AccountTreeIcon />,
  evaluations: <QuestionAnswerIcon/>,
  cms: <DisplaySettingsIcon />,
  resources: <FilePresentIcon />,
  earnings: <AttachMoneyIcon />,
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'subjects', path: PATH_DASHBOARD.general.subjects, icon: ICONS.subjects },
      { title: 'qualification', path: PATH_DASHBOARD.general.classes, icon: ICONS.classes },
      { title: 'evaluations', path: PATH_DASHBOARD.general.evaluations, icon: ICONS.evaluations },
      { title: 'boards', path: PATH_DASHBOARD.general.boards, icon: ICONS.boards },
      { title: 'courses', path: PATH_DASHBOARD.general.courses, icon: ICONS.courses },
      { title: 'users', path: PATH_DASHBOARD.general.users, icon: ICONS.users },
      // { title: 'topics', path: PATH_DASHBOARD.general.topics, icon: ICONS.topics },
      
      { title: 'resources', path: PATH_DASHBOARD.general.resources, icon: ICONS.resources },
      { title: 'earnings', path: PATH_DASHBOARD.general.earnings, icon: ICONS.earnings },
      { title: 'cms', path: PATH_DASHBOARD.general.cms, icon: ICONS.cms },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // MANAGEMENT : USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.newUser },
  //         { title: 'edit', path: PATH_DASHBOARD.user.editById },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },

  //     // MANAGEMENT : E-COMMERCE
  //     {
  //       title: 'e-commerce',
  //       path: PATH_DASHBOARD.classes.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.classes.shop },
  //         { title: 'product', path: PATH_DASHBOARD.classes.productById },
  //         { title: 'list', path: PATH_DASHBOARD.classes.list },
  //         { title: 'create', path: PATH_DASHBOARD.classes.newProduct },
  //         { title: 'edit', path: PATH_DASHBOARD.classes.editById },
  //         { title: 'checkout', path: PATH_DASHBOARD.classes.checkout },
  //         { title: 'invoice', path: PATH_DASHBOARD.classes.invoice },
  //       ],
  //     },

  //     // MANAGEMENT : BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.postById },
  //         { title: 'new post', path: PATH_DASHBOARD.blog.newPost },
  //       ],
  //     },
  //   ],
  // },

  // // APP
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: (
  //         <Label variant="outlined" color="error">
  //           +32
  //         </Label>
  //       ),
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },
];

export default navConfig;
