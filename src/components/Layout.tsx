import { useState } from 'react';
import { Menu, MenuItem, Flex, Heading, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import 'tailwindcss/tailwind.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex direction="column" height="100vh">
      <Header onMenuClick={toggleSidebar} />
      <Flex direction="row" flex="1" className="relative">
        <Sidebar isOpen={isSidebarOpen} />
        <MainContent
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        >
          {children}
        </MainContent>
      </Flex>
      <Footer />
    </Flex>
  );
};

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Flex
      as="header"
      backgroundColor="blue.60"
      padding="1rem"
      alignItems="center"
    >
      <Menu className="bg-white-300">
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      </Menu>
      <Heading level={3} margin="0 auto">
        タイトル
      </Heading>
    </Flex>
  );
};

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <View
      as="nav"
      className={`bg-gray-100 w-64 fixed lg:relative transform lg:translate-x-0 transition-transform h-screen lg:h-auto z-20 ${
        isOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      <ul className="h-full overflow-auto">
        <li className="p-2">Option 1</li>
        <li className="p-2">Option 2</li>
        <li className="p-2">Option 3</li>
      </ul>
    </View>
  );
};
interface MainContentProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({
  isSidebarOpen,
  children,
}) => {
  return (
    <View flex="1" padding="1rem" className="relative">
      <div className={`relative ${isSidebarOpen ? 'z-20' : ''}`}>
        {children}
      </div>
    </View>
  );
};

const Footer: React.FC = () => {
  return (
    <Flex
      as="footer"
      backgroundColor="blue.60"
      padding="1rem"
      justifyContent="center"
    >
      フッター
    </Flex>
  );
};

export default Layout;
