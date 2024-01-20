import SideNav from './SideNav';
import Content from '../Content';

export default function PageLayout() {
  return (
    <div style={{ height: 'calc(100vh - 58px)', width: '100%', display: 'flex' }}>
      <SideNav />
      <Content />
    </div>
  );
}
