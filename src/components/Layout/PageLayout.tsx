import SideNav from './SideNav';
import Content from '../Content';

export default function PageLayout() {
  return (
    <div style={{ maxHeight: 'calc(100vh - 92px)', display: 'flex' }}>
      <SideNav />
      <Content />
    </div>
  );
}
