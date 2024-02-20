import Header from '../shared/components/Header';
import PageLayout from './Layout/PageLayout';

export default function QuickStarter() {

  return (
    <div>
      <Header
        title={'StarterKit'}
        navItems={[]}
        useNeo4jConnect={false}
        userHeader={true}
      />
      <PageLayout />
    </div>
  );
}
