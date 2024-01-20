import { Tabs } from '@neo4j-ndl/react';

export default function Nav({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (e: string) => void }) {
  return (
    <>
      <Tabs size='large' fill='underline' onChange={(e) => setActiveTab(e)} value={activeTab}>
        <Tabs.Tab tabId={'Templates'}>Templates</Tabs.Tab>
        <Tabs.Tab tabId={'Component'}>Component</Tabs.Tab>
      </Tabs>
    </>
  );
}
