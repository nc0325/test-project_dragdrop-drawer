import {
  FooterType,
  LayoutType,
  MenuStyle,
  NavStyle,
  ThemeDirection,
  ThemeMode,
  ThemeStyle,
} from '../../../shared/constants/AppEnums';

export const DarkSidebar = {
  sidebarBgColor: '#313541',
  sidebarTextColor: '#fff',
  sidebarHeaderColor: '#313541',
  sidebarMenuSelectedBgColor: '#F4F7FE',
  sidebarMenuSelectedTextColor: 'rgba(0, 0, 0, 0.87)',
  mode: ThemeMode.DARK,
};
export const LightSidebar = {
  sidebarBgColor: '#fff',
  sidebarTextColor: 'rgba(0, 0, 0, 0.60)',
  sidebarHeaderColor: '#fff',
  sidebarMenuSelectedBgColor: '#F4F7FE',
  sidebarMenuSelectedTextColor: 'rgba(0, 0, 0, 0.87)',
  mode: ThemeMode.LIGHT,
};
const defaultConfig = {
  sidebar: {
    borderColor: '#757575',
    menuStyle: MenuStyle.DEFAULT,
    isSidebarBgImage: false,
    sidebarBgImage: 1,
    colorSet: LightSidebar,
  },
  locale:
    localStorage.getItem('locale') && localStorage.getItem('locale') === 'en'
      ? {
          languageId: 'english',
          locale: 'en',
          name: 'English',
          icon: 'us',
        }
      : {
          languageId: 'saudi-arabia',
          locale: 'ar',
          name: 'عربي',
          icon: 'sa',
        },
  themeStyle: ThemeStyle.STANDARD,
  direction:
    localStorage.getItem('locale') && localStorage.getItem('locale') === 'en'
      ? ThemeDirection.LTR
      : ThemeDirection.RTL,
  themeMode: ThemeMode.SEMI_DARK,
  footerType: FooterType.FLUID,
  navStyle: NavStyle.DEFAULT,
  layoutType: LayoutType.FRAMED,
  footer: false,
  rtlLocale: ['ar'],
};

export default defaultConfig;
