import Header from '../shared/components/Header';
import Content from './Content';

export default function Home() {
  return (
    <div>
      <Header title='Neoshop' navItems={[]} />
      <Content />
    </div>
  );
}
